// Initialize download counts for each cursor
const downloadCounts = {};

// Function to get download count for a cursor
export const getDownloadCount = (cursorId) => {
  return downloadCounts[cursorId] || 0;
};

// Function to increment download count
export const incrementDownloadCount = (cursorId) => {
  if (!downloadCounts[cursorId]) {
    downloadCounts[cursorId] = 0;
  }
  downloadCounts[cursorId]++;
  return downloadCounts[cursorId];
};

// Function to get all download counts
export const getAllDownloadCounts = () => {
  return downloadCounts;
}; 