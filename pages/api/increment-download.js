import fs from 'fs';
import path from 'path';

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

    // Trigger GitHub Action
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
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    return res.status(200).json({ success: true, count: newCount });
  } catch (error) {
    console.error('Error incrementing download count:', error);
    return res.status(500).json({ error: 'Failed to increment download count' });
  }
} 