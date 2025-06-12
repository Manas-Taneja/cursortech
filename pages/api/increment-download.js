import { Octokit } from '@octokit/rest';

// Initialize Octokit
const octokit = new Octokit({
  auth: process.env.GH_PAT
});

export default async function handler(req, res) {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  // Set CORS headers for actual request
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method !== 'POST') {
    console.error('Invalid method:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { slug } = req.query;

  if (!slug) {
    console.error('Missing slug parameter');
    return res.status(400).json({ error: 'Slug is required' });
  }

  if (!process.env.GITHUB_REPO || !process.env.GH_PAT) {
    console.error('Missing GitHub configuration:', {
      hasRepo: !!process.env.GITHUB_REPO,
      hasToken: !!process.env.GH_PAT
    });
    return res.status(500).json({ error: 'GitHub configuration missing' });
  }

  try {
    // Get the current content of counters.json
    const [owner, repo] = process.env.GITHUB_REPO.split('/');
    console.log('Fetching counters from GitHub:', { owner, repo, slug });

    const { data: fileData } = await octokit.repos.getContent({
      owner,
      repo,
      path: 'data/counters.json',
    });

    // Decode and parse the current counters
    const content = Buffer.from(fileData.content, 'base64').toString();
    const counters = JSON.parse(content);
    console.log('Current counters:', counters);

    // Increment the counter
    const currentCount = counters[slug] || 0;
    const newCount = currentCount + 1;
    counters[slug] = newCount;
    console.log('Updated counter:', { slug, newCount });

    // Update the file on GitHub
    const updateResponse = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: 'data/counters.json',
      message: `Update download count for ${slug} to ${newCount}`,
      content: Buffer.from(JSON.stringify(counters, null, 2)).toString('base64'),
      sha: fileData.sha,
    });

    console.log('GitHub update response:', updateResponse.status);

    return res.status(200).json({ success: true, count: newCount });
  } catch (error) {
    console.error('Error updating counter:', {
      message: error.message,
      status: error.status,
      response: error.response?.data
    });
    return res.status(500).json({ 
      error: 'Failed to increment download count',
      ...(process.env.NODE_ENV === 'development' && { 
        details: error.message,
        status: error.status,
        response: error.response?.data
      })
    });
  }
} 