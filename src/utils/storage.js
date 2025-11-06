// Local storage utility functions

// Save bookmarked schemes
export const saveBookmarkedSchemes = (schemes) => {
  try {
    localStorage.setItem('bookmarkedSchemes', JSON.stringify(schemes));
    return true;
  } catch (error) {
    console.error('Error saving bookmarked schemes:', error);
    return false;
  }
};

// Get bookmarked schemes
export const getBookmarkedSchemes = () => {
  try {
    const bookmarkedSchemes = localStorage.getItem('bookmarkedSchemes');
    return bookmarkedSchemes ? JSON.parse(bookmarkedSchemes) : [];
  } catch (error) {
    console.error('Error getting bookmarked schemes:', error);
    return [];
  }
};

// Check if a scheme is bookmarked
export const isSchemeBookmarked = (schemeId) => {
  try {
    const bookmarkedSchemes = getBookmarkedSchemes();
    return bookmarkedSchemes.some(scheme => scheme.id === schemeId);
  } catch (error) {
    console.error('Error checking if scheme is bookmarked:', error);
    return false;
  }
};

// Add a scheme to bookmarks
export const addSchemeToBookmarks = (scheme) => {
  try {
    const bookmarkedSchemes = getBookmarkedSchemes();
    if (!isSchemeBookmarked(scheme.id)) {
      bookmarkedSchemes.push(scheme);
      saveBookmarkedSchemes(bookmarkedSchemes);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding scheme to bookmarks:', error);
    return false;
  }
};

// Remove a scheme from bookmarks
export const removeSchemeFromBookmarks = (schemeId) => {
  try {
    const bookmarkedSchemes = getBookmarkedSchemes();
    const updatedBookmarks = bookmarkedSchemes.filter(scheme => scheme.id !== schemeId);
    saveBookmarkedSchemes(updatedBookmarks);
    return true;
  } catch (error) {
    console.error('Error removing scheme from bookmarks:', error);
    return false;
  }
};

// Toggle bookmark status for a scheme
export const toggleSchemeBookmark = (scheme) => {
  if (isSchemeBookmarked(scheme.id)) {
    return removeSchemeFromBookmarks(scheme.id);
  } else {
    return addSchemeToBookmarks(scheme);
  }
};

// Save user preferences
export const saveUserPreferences = (preferences) => {
  try {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    return true;
  } catch (error) {
    console.error('Error saving user preferences:', error);
    return false;
  }
};

// Get user preferences
export const getUserPreferences = () => {
  try {
    const userPreferences = localStorage.getItem('userPreferences');
    return userPreferences ? JSON.parse(userPreferences) : null;
  } catch (error) {
    console.error('Error getting user preferences:', error);
    return null;
  }
};