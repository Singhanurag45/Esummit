import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import {
  FaFileDownload,
  FaBookmark as FaBookmarkSolid,
  FaRegBookmark,
  FaShare,
  FaArrowLeft,
  FaExternalLinkAlt,
  FaChevronDown,
  FaChevronUp,
  FaFileAlt,
  FaIdCard,
  FaCheck,
  FaChrome
} from 'react-icons/fa';
import { isSchemeBookmarked, toggleSchemeBookmark } from '../utils/storage';
import { addBrowserBookmark, createShareableUrl, createBookmarkTitle } from '../utils/browserBookmark';

function SchemeResults({
  eligibleSchemes,
  exportResults,
  shareResults,
  goBack
}) {
  const { language, translations } = useAppContext();
  const [expandedScheme, setExpandedScheme] = useState(null);
  const [bookmarkedSchemes, setBookmarkedSchemes] = useState({});
  const [showBookmarkToast, setShowBookmarkToast] = useState(false);
  const [bookmarkToastMessage, setBookmarkToastMessage] = useState('');
  const [isBookmarkingBrowser, setIsBookmarkingBrowser] = useState(false);

  useEffect(() => {
    // Initialize bookmarked state for each scheme
    const bookmarkedState = {};
    eligibleSchemes.forEach(scheme => {
      bookmarkedState[scheme.id] = isSchemeBookmarked(scheme.id);
    });
    setBookmarkedSchemes(bookmarkedState);
  }, [eligibleSchemes]);

  if (!translations) return null;

  const t = translations[language];

  const toggleSchemeDetails = (schemeId) => {
    if (expandedScheme === schemeId) {
      setExpandedScheme(null);
    } else {
      setExpandedScheme(schemeId);
    }
  };

  const handleBookmarkToggle = async (scheme) => {
    // If the scheme has a link and we're bookmarking (not unbookmarking)
    if (scheme.link && !bookmarkedSchemes[scheme.id]) {
      try {
        // Extract domain for the toast message
        let domain = '';
        try {
          const url = new URL(scheme.link);
          domain = url.hostname;
        } catch (e) {
          domain = 'reference site';
        }

        // Create a title for the bookmark
        const title = language === 'english'
          ? `${scheme.name.english} - Government Scheme`
          : `${scheme.name.hindi} - सरकारी योजना`;

        // Add the bookmark to the browser
        const success = await addBrowserBookmark(title, scheme.link);

        if (success) {
          // Show toast message
          setBookmarkToastMessage(
            language === 'english'
              ? `Official site for ${scheme.name.english} bookmarked (${domain})!`
              : `${scheme.name.hindi} की आधिकारिक साइट बुकमार्क की गई (${domain})!`
          );
          setShowBookmarkToast(true);

          // Hide toast after 3 seconds
          setTimeout(() => {
            setShowBookmarkToast(false);
          }, 3000);
        }
      } catch (error) {
        console.error('Error bookmarking scheme link:', error);
      }
    }

    // Also handle the internal app bookmarking as before
    const isCurrentlyBookmarked = bookmarkedSchemes[scheme.id];
    const success = toggleSchemeBookmark(scheme);

    if (success) {
      setBookmarkedSchemes({
        ...bookmarkedSchemes,
        [scheme.id]: !isCurrentlyBookmarked
      });

      // Only show toast for internal bookmarking if we didn't already show one for browser bookmarking
      if (!scheme.link || isCurrentlyBookmarked) {
        // Show toast message
        setBookmarkToastMessage(
          !isCurrentlyBookmarked
            ? (language === 'english' ? 'Scheme bookmarked in app successfully!' : 'योजना ऐप में सफलतापूर्वक बुकमार्क की गई!')
            : (language === 'english' ? 'Scheme removed from app bookmarks!' : 'योजना ऐप बुकमार्क से हटा दी गई!')
        );
        setShowBookmarkToast(true);

        // Hide toast after 3 seconds
        setTimeout(() => {
          setShowBookmarkToast(false);
        }, 3000);
      }
    }
  };

  const bookmarkInBrowser = async () => {
    setIsBookmarkingBrowser(true);

    try {
      // Create a shareable URL with the scheme IDs
      const shareableUrl = createShareableUrl(eligibleSchemes);

      // Create a title for the bookmark
      const title = createBookmarkTitle(eligibleSchemes, language);

      // Add the bookmark to the browser
      const success = await addBrowserBookmark(title, shareableUrl);

      // Show toast message
      if (success) {
        // Create a more informative message that includes the reference site
        let message = '';
        if (eligibleSchemes.length === 1 && eligibleSchemes[0].link) {
          try {
            const url = new URL(eligibleSchemes[0].link);
            const domain = url.hostname;
            message = language === 'english'
              ? `Scheme bookmarked with reference to ${domain}!`
              : `${domain} के संदर्भ के साथ योजना बुकमार्क की गई!`;
          } catch (e) {
            message = language === 'english'
              ? 'Scheme bookmarked with reference site!'
              : 'संदर्भ साइट के साथ योजना बुकमार्क की गई!';
          }
        } else if (eligibleSchemes.length > 1) {
          // Count how many schemes have reference links
          const schemesWithRefs = eligibleSchemes.filter(scheme => scheme.link).length;

          if (schemesWithRefs > 0) {
            message = language === 'english'
              ? `${eligibleSchemes.length} schemes bookmarked with ${schemesWithRefs} reference sites!`
              : `${schemesWithRefs} संदर्भ साइटों के साथ ${eligibleSchemes.length} योजनाएं बुकमार्क की गईं!`;
          } else {
            message = language === 'english'
              ? `${eligibleSchemes.length} schemes bookmarked in your browser!`
              : `${eligibleSchemes.length} योजनाएं आपके ब्राउज़र में बुकमार्क की गईं!`;
          }
        } else {
          message = language === 'english'
            ? 'Page bookmarked in your browser!'
            : 'पेज आपके ब्राउज़र में बुकमार्क किया गया!';
        }

        setBookmarkToastMessage(message);
      } else {
        setBookmarkToastMessage(
          language === 'english'
            ? 'Bookmark cancelled or not supported in this browser.'
            : 'बुकमार्क रद्द किया गया या इस ब्राउज़र में समर्थित नहीं है।'
        );
      }
    } catch (error) {
      console.error('Error bookmarking in browser:', error);
      setBookmarkToastMessage(
        language === 'english'
          ? 'Could not bookmark in browser. Try pressing Ctrl+D manually.'
          : 'ब्राउज़र में बुकमार्क नहीं कर सका। मैन्युअल रूप से Ctrl+D दबाने का प्रयास करें।'
      );
    } finally {
      setIsBookmarkingBrowser(false);
      setShowBookmarkToast(true);

      // Hide toast after 3 seconds
      setTimeout(() => {
        setShowBookmarkToast(false);
      }, 3000);
    }
  };

  const bookmarkAllSchemes = async () => {
    let allBookmarked = true;
    let bookmarkedCount = 0;
    let officialSitesCount = 0;

    // First, bookmark all official sites in the browser
    for (const scheme of eligibleSchemes) {
      if (scheme.link) {
        officialSitesCount++;
        try {
          // Create a title for the bookmark
          const title = language === 'english'
            ? `${scheme.name.english} - Government Scheme`
            : `${scheme.name.hindi} - सरकारी योजना`;

          // Add the bookmark to the browser
          await addBrowserBookmark(title, scheme.link);
          bookmarkedCount++;
        } catch (error) {
          console.error(`Error bookmarking scheme ${scheme.id}:`, error);
        }
      }
    }

    // Then handle the internal app bookmarking
    eligibleSchemes.forEach(scheme => {
      if (!bookmarkedSchemes[scheme.id]) {
        toggleSchemeBookmark(scheme);
        allBookmarked = false;
      }
    });

    // Update state
    const updatedBookmarks = {};
    eligibleSchemes.forEach(scheme => {
      updatedBookmarks[scheme.id] = true;
    });
    setBookmarkedSchemes(updatedBookmarks);

    // Show toast message
    let message = '';
    if (officialSitesCount > 0) {
      message = language === 'english'
        ? `${bookmarkedCount} official sites bookmarked and all schemes saved in app!`
        : `${bookmarkedCount} आधिकारिक साइटें बुकमार्क की गईं और सभी योजनाएं ऐप में सहेजी गईं!`;
    } else {
      message = language === 'english'
        ? 'All schemes saved in app bookmarks!'
        : 'सभी योजनाएं ऐप बुकमार्क में सहेजी गईं!';
    }

    setBookmarkToastMessage(message);
    setShowBookmarkToast(true);

    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowBookmarkToast(false);
    }, 3000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 relative">
      {/* Bookmark Toast Notification */}
      {showBookmarkToast && (
        <div className="absolute top-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-3 rounded shadow-md z-10 animate-fade-in-out">
          <div className="flex items-center">
            <FaCheck className="mr-2" />
            <span>{bookmarkToastMessage}</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">{t.results}</h2>
        <button
          onClick={goBack}
          className="flex items-center text-[#13518e] hover:text-[#0e3b66] text-sm"
        >
          <FaArrowLeft className="mr-1" />
          {t.back}
        </button>
      </div>

      {eligibleSchemes.length > 0 ? (
        <div>
          <div className="space-y-4 mb-8">
            {eligibleSchemes.map(scheme => (
              <div
                key={scheme.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="bg-gray-50 p-4 flex justify-between items-center">
                  <h3
                    className="text-lg font-medium text-[#13518e] cursor-pointer flex-grow"
                    onClick={() => toggleSchemeDetails(scheme.id)}
                  >
                    {scheme.name[language]}
                  </h3>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleBookmarkToggle(scheme)}
                      className="text-yellow-500 hover:text-yellow-600 mr-3 focus:outline-none"
                      aria-label={bookmarkedSchemes[scheme.id] ? "Remove from bookmarks" : "Add to bookmarks"}
                      title={scheme.link
                        ? (language === 'english'
                            ? `Bookmark official site: ${scheme.link}`
                            : `आधिकारिक साइट बुकमार्क करें: ${scheme.link}`)
                        : (language === 'english'
                            ? "Save scheme in app bookmarks"
                            : "योजना को ऐप बुकमार्क में सहेजें")}
                    >
                      {bookmarkedSchemes[scheme.id] ? (
                        <FaBookmarkSolid size={18} />
                      ) : (
                        <FaRegBookmark size={18} />
                      )}
                    </button>
                    {expandedScheme === scheme.id ? (
                      <FaChevronUp
                        className="text-gray-500 cursor-pointer"
                        onClick={() => toggleSchemeDetails(scheme.id)}
                      />
                    ) : (
                      <FaChevronDown
                        className="text-gray-500 cursor-pointer"
                        onClick={() => toggleSchemeDetails(scheme.id)}
                      />
                    )}
                  </div>
                </div>

                <div className={`p-4 border-t border-gray-200 ${expandedScheme === scheme.id ? 'block' : 'hidden'}`}>
                  <p className="text-gray-700 mb-4">
                    {scheme.description[language]}
                  </p>

                  {scheme.applicationProcess && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <FaFileAlt className="mr-2 text-[#13518e]" />
                        {t.applicationProcess}
                      </h4>
                      <p className="text-gray-600 text-sm ml-6">
                        {scheme.applicationProcess[language]}
                      </p>
                    </div>
                  )}

                  {scheme.documents && scheme.documents.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <FaIdCard className="mr-2 text-[#13518e]" />
                        {t.requiredDocuments}
                      </h4>
                      <ul className="list-disc text-gray-600 text-sm ml-10">
                        {scheme.documents.map((doc, index) => (
                          <li key={index}>{doc}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={scheme.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-[#13518e] text-white hover:bg-[#0e3b66] px-3 py-1 rounded text-sm font-medium"
                    >
                      {language === 'english' ? 'Visit Official Site' : 'आधिकारिक साइट पर जाएं'}
                      <FaExternalLinkAlt className="ml-1 text-xs" />
                    </a>
                    <button
                      onClick={() => handleBookmarkToggle(scheme)}
                      className="inline-flex items-center bg-yellow-500 text-white hover:bg-yellow-600 px-3 py-1 rounded text-sm font-medium"
                    >
                      {bookmarkedSchemes[scheme.id] ? (
                        <FaBookmarkSolid className="mr-1" />
                      ) : (
                        <FaRegBookmark className="mr-1" />
                      )}
                      {language === 'english' ? 'Bookmark Official Site' : 'आधिकारिक साइट बुकमार्क करें'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 border-t border-gray-200 pt-6">
            <button
              onClick={exportResults}
              className="flex-1 flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <FaFileDownload className="mr-2" />
              {t.export}
            </button>
            {/* <button
              onClick={bookmarkInBrowser}
              className="flex-1 flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 relative group"
              disabled={isBookmarkingBrowser}
              title={language === 'english'
                ? 'Save this page to your browser bookmarks with scheme reference sites'
                : 'इस पेज को योजना संदर्भ साइटों के साथ अपने ब्राउज़र बुकमार्क में सहेजें'}
            >
              {isBookmarkingBrowser ? (
                <span>{language === 'english' ? 'Bookmarking...' : 'बुकमार्क कर रहा है...'}</span>
              ) : (
                <>
                  <FaChrome className="mr-2" />
                  {language === 'english'
                    ? (eligibleSchemes.length === 1
                        ? 'Bookmark with Reference'
                        : 'Bookmark All with References')
                    : (eligibleSchemes.length === 1
                        ? 'संदर्भ के साथ बुकमार्क करें'
                        : 'संदर्भों के साथ सभी बुकमार्क करें')}
                </>
              )}
            </button> */}
            <button
              onClick={bookmarkAllSchemes}
              className="flex-1 flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaBookmarkSolid className="mr-2" />
              {language === 'english' ? 'Bookmark All Official Sites' : 'सभी आधिकारिक साइटें बुकमार्क करें'}
            </button>
            <button
              onClick={shareResults}
              className="flex-1 flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <FaShare className="mr-2" />
              {t.share}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                {t.noSchemes}
              </p>
              <p className="text-xs text-yellow-600 mt-2">
                {t.tryDifferentCriteria || "Try different criteria to find schemes you may be eligible for."}
              </p>
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 mt-8 italic">
        {t.disclaimer}
      </p>
    </div>
  );
}

export default SchemeResults;