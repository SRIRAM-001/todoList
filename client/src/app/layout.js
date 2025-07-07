// app/layout.tsx or app/layout.js
import './globals.css';
import { ThemeProvider } from 'next-themes';
import NavBar from '@/components/navBar';


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <NavBar/>
          <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
