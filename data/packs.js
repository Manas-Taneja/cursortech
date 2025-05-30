import { crosshairs } from './crosshairs';

export const packs = [
  {
    id: 1,
    title: 'Minimal Pack',
    description: 'A collection of clean, minimal crosshairs perfect for precision gaming.',
    image: '/packs/minimal-pack.png',
    cursors: crosshairs.filter(c => c.tags.includes('minimal')),
  },
  {
    id: 2,
    title: 'Gaming Pack',
    description: 'High-performance crosshairs designed for competitive gaming.',
    image: '/packs/gaming-pack.png',
    cursors: crosshairs.filter(c => c.tags.includes('gaming')),
  },
  {
    id: 3,
    title: 'Neon Pack',
    description: 'Vibrant neon crosshairs that stand out in any game.',
    image: '/packs/neon-pack.png',
    cursors: crosshairs.filter(c => c.tags.includes('neon')),
  },
]; 