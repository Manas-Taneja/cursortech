const handleDownload = async () => {
  try {
    // Increment download count
    const response = await fetch(`/api/increment-download?slug=${cursor.slug}`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error('Failed to increment download count');
    }

    // Download the file
    const link = document.createElement('a');
    link.href = cursor.downloadUrl;
    link.download = `${cursor.slug}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading cursor:', error);
  }
}; 