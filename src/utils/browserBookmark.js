/**
 * Utility functions for browser bookmarking
 */

/**
 * Add a bookmark to the browser
 * @param {string} title - The title of the bookmark
 * @param {string} url - The URL to bookmark
 * @returns {Promise<boolean>} - Whether the bookmark was successfully added
 */
export const addBrowserBookmark = (title, url) => {
  // Check if the browser supports the bookmarking API
  if (window.sidebar && window.sidebar.addPanel) {
    // Firefox < 23
    window.sidebar.addPanel(title, url, '');
    return Promise.resolve(true);
  } else if (window.external && ('AddFavorite' in window.external)) {
    // IE
    window.external.AddFavorite(url, title);
    return Promise.resolve(true);
  } else {
    // Modern browsers - can't directly add bookmarks due to security restrictions
    // Instruct the user to press Ctrl+D (or Cmd+D on Mac)
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const keyCommand = isMac ? '⌘+D' : 'Ctrl+D';
    
    return new Promise((resolve) => {
      const confirmed = window.confirm(
        `Press ${keyCommand} to bookmark this page.\n\nOnce you've done that, click OK to continue.`
      );
      resolve(confirmed);
    });
  }
};

/**
 * Create a shareable URL with scheme information embedded
 * @param {Array} schemes - The schemes to include in the URL
 * @returns {string} - The shareable URL
 */
export const createShareableUrl = (schemes) => {
  // Create a base URL
  const baseUrl = window.location.origin + window.location.pathname;

  // Create a query parameter with encoded scheme IDs
  const schemeIds = schemes.map(scheme => scheme.id).join(',');

  // Add reference sites if available
  const references = schemes
    .filter(scheme => scheme.link)
    .map(scheme => encodeURIComponent(scheme.link))
    .join(',');

  // Build the URL with scheme IDs and references
  let url = `${baseUrl}?schemes=${schemeIds}`;
  if (references) {
    url += `&refs=${references}`;
  }

  return url;
};

/**
 * Create a bookmark title based on the schemes
 * @param {Array} schemes - The schemes to include in the title
 * @param {string} language - The current language
 * @returns {string} - The bookmark title
 */
export const createBookmarkTitle = (schemes, language) => {
  if (schemes.length === 0) {
    return language === 'english'
      ? 'Government Scheme Eligibility Results'
      : 'सरकारी योजना पात्रता परिणाम';
  }

  if (schemes.length === 1) {
    const scheme = schemes[0];
    const schemeName = language === 'english' ? scheme.name.english : scheme.name.hindi;

    // Extract domain from link if available
    let reference = '';
    if (scheme.link) {
      try {
        const url = new URL(scheme.link);
        reference = ` (${url.hostname})`;
      } catch (e) {
        // If URL parsing fails, use the link as is
        reference = ` (${scheme.link})`;
      }
    }

    return language === 'english'
      ? `Eligible for: ${schemeName}${reference}`
      : `पात्र योजना: ${schemeName}${reference}`;
  }

  // For multiple schemes, include the first scheme with reference and indicate there are more
  const firstScheme = schemes[0];
  const firstSchemeName = language === 'english' ? firstScheme.name.english : firstScheme.name.hindi;

  // Extract domain from link if available
  let reference = '';
  if (firstScheme.link) {
    try {
      const url = new URL(firstScheme.link);
      reference = ` (${url.hostname})`;
    } catch (e) {
      // If URL parsing fails, use the link as is
      reference = ` (${firstScheme.link})`;
    }
  }

  return language === 'english'
    ? `${firstSchemeName}${reference} and ${schemes.length - 1} more schemes`
    : `${firstSchemeName}${reference} और ${schemes.length - 1} अन्य योजनाएं`;
};