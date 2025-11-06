import { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';
import SchemeEligibilityForm from '../SchemeEligibilityForm';
import SchemeResults from '../SchemeResults';
import Loading from '../common/Loading';
import Error from '../common/Error';
import { checkEligibility, fetchSchemes } from '../../services/api';
import { FaSearch, FaUsers, FaFileAlt } from 'react-icons/fa';

const Home = () => {
  const { language, translations, loading, error } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    age: '',
    income: '',
    occupation: '',
    caste: '',
    gender: '',
    state: '',
    district: ''
  });
  const [eligibleSchemes, setEligibleSchemes] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [isLoadingBookmarkedSchemes, setIsLoadingBookmarkedSchemes] = useState(false);

  // Check for schemes in URL parameters (for bookmarked pages)
  useEffect(() => {
    const checkForBookmarkedSchemes = async () => {
      const params = new URLSearchParams(location.search);
      const schemeIds = params.get('schemes');

      if (schemeIds) {
        setIsLoadingBookmarkedSchemes(true);
        try {
          // Fetch all schemes
          const allSchemes = await fetchSchemes();

          // Filter to only the bookmarked schemes
          const bookmarkedSchemeIds = schemeIds.split(',');
          let bookmarkedSchemes = allSchemes.filter(scheme =>
            bookmarkedSchemeIds.includes(scheme.id.toString())
          );

          // Check if there are reference URLs in the parameters
          const refs = params.get('refs');
          if (refs && bookmarkedSchemes.length > 0) {
            const referenceUrls = refs.split(',').map(ref => decodeURIComponent(ref));

            // Update schemes with reference URLs if available
            bookmarkedSchemes = bookmarkedSchemes.map((scheme, index) => {
              if (index < referenceUrls.length && !scheme.link) {
                return {
                  ...scheme,
                  link: referenceUrls[index]
                };
              }
              return scheme;
            });
          }

          if (bookmarkedSchemes.length > 0) {
            setEligibleSchemes(bookmarkedSchemes);
            setShowResults(true);
          }
        } catch (error) {
          console.error('Error loading bookmarked schemes:', error);
          setApiError(language === 'english'
            ? 'Failed to load bookmarked schemes. Please try again.'
            : 'बुकमार्क की गई योजनाओं को लोड करने में विफल। कृपया पुनः प्रयास करें।');
        } finally {
          setIsLoadingBookmarkedSchemes(false);
        }
      }
    };

    checkForBookmarkedSchemes();
  }, [location.search, language]);

  if (loading || isLoadingBookmarkedSchemes) return <Loading />;
  if (error) return <Error message={error} />;
  if (apiError) return <Error message={apiError} />;

  const t = translations[language];

  const handleCheckEligibility = async () => {
    try {
      setIsSubmitting(true);
      setApiError(null);
      
      const schemes = await checkEligibility(userDetails);
      setEligibleSchemes(schemes);
      setShowResults(true);
    } catch (err) {
      setApiError('Failed to check eligibility. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const exportResults = () => {
    // Create a text representation of the results
    let text = `${t.title}\n\n`;
    text += `${t.results}:\n`;
    
    eligibleSchemes.forEach(scheme => {
      text += `- ${scheme.name[language]}: ${scheme.description[language]}\n`;
      text += `  ${scheme.link}\n\n`;
    });
    
    // Create a blob and download it
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'eligible-schemes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareResults = () => {
    if (navigator.share) {
      let text = `${t.title}\n\n`;
      text += `${t.results}:\n`;
      
      eligibleSchemes.forEach(scheme => {
        text += `- ${scheme.name[language]}: ${scheme.description[language]}\n`;
        text += `  ${scheme.link}\n\n`;
      });
      
      navigator.share({
        title: t.title,
        text: text
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      alert('Web Share API not supported in your browser');
    }
  };

  // Bookmark functionality is now handled directly in the SchemeResults component

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          {t.subtitle || (language === 'english' ? 'Find welfare schemes you are eligible for' : 'आप जिन कल्याणकारी योजनाओं के लिए पात्र हैं, उन्हें खोजें')}
        </h1>
        <p className="text-gray-600">
          {t.homeDescription || (language === 'english' ? "Find government welfare schemes you're eligible for based on your profile." : "अपने प्रोफ़ाइल के आधार पर आप जिन सरकारी कल्याणकारी योजनाओं के लिए पात्र हैं, उन्हें खोजें।")}
        </p>
      </div>

      {apiError && <Error message={apiError} />}

      {!showResults ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SchemeEligibilityForm
              userDetails={userDetails}
              setUserDetails={setUserDetails}
              onSubmit={handleCheckEligibility}
              isSubmitting={isSubmitting}
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-fit">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {t.howItWorks || (language === 'english' ? "How It Works" : "यह कैसे काम करता है")}
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-[#13518e] rounded-full p-2 text-white">
                  <FaSearch />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-800">
                    {t.step1Title || (language === 'english' ? "Enter Your Details" : "अपना विवरण दर्ज करें")}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    {t.step1Description || (language === 'english' ? "Fill in your personal information in the form." : "फॉर्म में अपनी व्यक्तिगत जानकारी भरें।")}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-[#13518e] rounded-full p-2 text-white">
                  <FaUsers />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-800">
                    {t.step2Title || (language === 'english' ? "Check Eligibility" : "पात्रता जांचें")}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    {t.step2Description || (language === 'english' ? "Our system matches your profile with available schemes." : "हमारी प्रणाली आपके प्रोफ़ाइल को उपलब्ध योजनाओं से मिलान करती है।")}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-[#13518e] rounded-full p-2 text-white">
                  <FaFileAlt />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-800">
                    {t.step3Title || (language === 'english' ? "Get Results" : "परिणाम प्राप्त करें")}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    {t.step3Description || (language === 'english' ? "View, export, or share your eligible schemes." : "अपनी पात्र योजनाओं को देखें, निर्यात करें या साझा करें।")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SchemeResults
          eligibleSchemes={eligibleSchemes}
          exportResults={exportResults}
          shareResults={shareResults}
          goBack={() => {
            setShowResults(false);
            // Clear URL parameters if they exist
            if (location.search) {
              navigate('/');
            }
          }}
        />
      )}
    </div>
  );
};

export default Home;