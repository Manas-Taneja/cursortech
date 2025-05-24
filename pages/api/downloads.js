import fs from 'fs';
import path from 'path';

const downloadsPath = path.join(process.cwd(), 'data/downloads.json');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = JSON.parse(fs.readFileSync(downloadsPath, 'utf8'));
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to read download counts' });
    }
  } else if (req.method === 'POST') {
    try {
      const { slug } = req.body;
      const data = JSON.parse(fs.readFileSync(downloadsPath, 'utf8'));
      
      if (data[slug] !== undefined) {
        data[slug]++;
        fs.writeFileSync(downloadsPath, JSON.stringify(data, null, 2));
        res.status(200).json(data);
      } else {
        res.status(400).json({ error: 'Invalid cursor slug' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update download count' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 