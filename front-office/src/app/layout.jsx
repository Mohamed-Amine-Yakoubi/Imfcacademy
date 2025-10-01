import './globals.css';
import { outfit, poppins } from '../Styles/fonts/fonts';
 
import SessionWrapper from './SessionWrapper';
 

export const metadata = {
  title: 'Enis',
  description: 'Description du site',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} ${poppins.className} dark:bg-gray-900`}>
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
