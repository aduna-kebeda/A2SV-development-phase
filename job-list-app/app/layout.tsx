import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Ensure the correct file extension

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Job Listings</title>
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}