import { Great_Vibes, Poppins, Outfit } from 'next/font/google';

export const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400' });

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal'],
});

export const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});
