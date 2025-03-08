"use client";

import { bigShouldersStencil } from './fonts';
import '@/app/styles/global.css';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={bigShouldersStencil.variable}>
      <body>{children}</body>
    </html>
  );
}
