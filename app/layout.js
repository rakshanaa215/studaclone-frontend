import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Studaclone',
  description: 'Student housing marketplace'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-b from-gray-50 to-white text-gray-900`}>
        <Header />
        <main className="container mx-auto px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
