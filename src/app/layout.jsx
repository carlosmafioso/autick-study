import { Manrope } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const manrope = Manrope({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: 'Study Assistant',
  description: 'A platform for students and professors',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt" className={manrope.className}>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
