const handleDownload = async () => {
  try {
    // Increment download count
    const response = await fetch(`/api/increment-download?slug=${cursor.slug}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      // Silently fail and continue with download
      // The error will be logged server-side
    }

    // Download the file
    const link = document.createElement('a');
    link.href = cursor.downloadUrl;
    link.download = `${cursor.slug}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    // Silently fail and continue with download
    // The error will be logged server-side
    const link = document.createElement('a');
    link.href = cursor.downloadUrl;
    link.download = `${cursor.slug}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}; 