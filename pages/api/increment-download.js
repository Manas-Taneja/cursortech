import { Octokit } from '@octokit/rest';

// Initialize Octokit with better error handling
const octokit = new Octokit({
  auth: process.env.GH_PAT,
  log: console
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
      hasToken: !!process.env.GH_PAT,
      repo: process.env.GITHUB_REPO
    });
    return res.status(500).json({ error: 'GitHub configuration missing' });
  }

  try {
    const [owner, repo] = process.env.GITHUB_REPO.split('/');
    console.log('Starting counter update for:', { owner, repo, slug });

    // Get the current content
    const { data: fileData } = await octokit.repos.getContent({
      owner,
      repo,
      path: 'data/counters.json',
      ref: 'main'
    }).catch(error => {
      console.error('Error fetching file:', error);
      throw new Error(`Failed to fetch counters file: ${error.message}`);
    });

    // Parse the current content
    const content = Buffer.from(fileData.content, 'base64').toString();
    const counters = JSON.parse(content);
    console.log('Current counters:', counters);

    // Update the counter
    const currentCount = counters[slug] || 0;
    const newCount = currentCount + 1;
    counters[slug] = newCount;
    console.log('Updated counter:', { slug, newCount });

    // Create the update
    const updateResponse = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: 'data/counters.json',
      message: `Update download count for ${slug} to ${newCount}`,
      content: Buffer.from(JSON.stringify(counters, null, 2)).toString('base64'),
      sha: fileData.sha,
      branch: 'main'
    }).catch(error => {
      console.error('Error updating file:', error);
      throw new Error(`Failed to update counters file: ${error.message}`);
    });

    console.log('Update successful:', updateResponse.status);

    // Return success response
    return res.status(200).json({ 
      success: true, 
      count: newCount,
      message: 'Counter updated successfully'
    });

  } catch (error) {
    console.error('Error in increment-download:', {
      message: error.message,
      status: error.status,
      response: error.response?.data,
      stack: error.stack
    });

    // Return error response
    return res.status(500).json({ 
      error: 'Failed to increment download count',
      message: error.message,
      ...(process.env.NODE_ENV === 'development' && { 
        details: error.message,
        status: error.status,
        response: error.response?.data
      })
    });
  }
} 