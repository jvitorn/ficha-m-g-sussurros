// src/app/fonts.js
import { Big_Shoulders_Stencil_Text  } from 'next/font/google';

export const bigShouldersStencil = Big_Shoulders_Stencil_Text({
  subsets: ['latin'],
  variable: '--font-big-shoulders-stencil',
  weight: ['100', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});