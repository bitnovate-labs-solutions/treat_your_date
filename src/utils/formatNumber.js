// Helper function to format numbers (when likes and ratings reach > 999, convert to 1K and so on)
export const formatNumber = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
};
