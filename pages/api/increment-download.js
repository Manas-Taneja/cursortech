import fs from 'fs';
import path from 'path';

// Simple logging function - replace with your preferred logging service
const logError = (error, context) => {
  // In production, this would send to your logging service
  // For now, we'll write to a file
  const logPath = path.join(process.cwd(), 'logs', 'errors.log');
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${context}: ${error.message}\n`;
  
  // Ensure logs directory exists
  if (!fs.existsSync(path.dirname(logPath))) {
    fs.mkdirSync(path.dirname(logPath), { recursive: true });
  }
  
  // Append to log file
  fs.appendFileSync(logPath, logEntry);
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ error: 'Slug is required' });
  }

  try {
    // Read current counters
    const countersPath = path.join(process.cwd(), 'data', 'counters.json');
    const counters = JSON.parse(fs.readFileSync(countersPath, 'utf8'));

    // Increment counter
    const currentCount = counters[slug] || 0;
    const newCount = currentCount + 1;

    // Update counters
    counters[slug] = newCount;
    fs.writeFileSync(countersPath, JSON.stringify(counters, null, 2));

    // Only try to trigger GitHub Action if we have the required environment variables
    if (process.env.GITHUB_REPO && process.env.GH_PAT) {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${process.env.GITHUB_REPO}/actions/workflows/update-counter.yml/dispatches`,
          {
            method: 'POST',
            headers: {
              'Accept': 'application/vnd.github.v3+json',
              'Authorization': `token ${process.env.GH_PAT}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ref: 'main',
              inputs: {
                slug,
                count: newCount.toString(),
              },
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          logError(new Error(`GitHub API error: ${errorText}`), 'GitHub Action');
        }
      } catch (error) {
        logError(error, 'GitHub Action');
      }
    } else {
      logError(new Error('GitHub environment variables not set'), 'Configuration');
    }

    return res.status(200).json({ success: true, count: newCount });
  } catch (error) {
    logError(error, 'Download Counter');
    return res.status(500).json({ 
      error: 'Failed to increment download count',
      // Only include details in development
      ...(process.env.NODE_ENV === 'development' && { details: error.message })
    });
  }
} 