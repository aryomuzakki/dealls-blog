import localFont from "next/font/local";
import "./globals.css";
import localDayjs from "@/lib/localDayjs";
import DefaultLayout from "@/components/layout/DefaultLayout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const appTitle = "Dealls Blog"
const title = "Blog Seputar Lowongan Kerja " + localDayjs().format("MMMM YYYY") + " | " + appTitle;
const description = "Blog yang membahas tentang lowongan kerja, pekerja, perusahaan, dan lainnya";
const siteURL = "https://dealls-blog.vercel.app";

export const metadata = {
  icons: {
    icon: [
      {
        url: "/favicon-48x48.png",
        sizes: "48x48"
      },
      {
        url: "/favicon.svg",
        type: "image/svg+xml"
      },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180"
      },
    ],
  },
  manifest: "/site.webmanifest",
  other: {
    "apple-mobile-web-app-title": appTitle,
  },
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteURL,
    siteName: appTitle,
    images: [
      {
        url: "https://dealls-blog.vercel.app/dealls-blog-192x192.png",
        width: 192,
        height: 192,
      }
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
    creator: "@DeallsBlog",
    url: siteURL,
    images: ["https://dealls-blog.vercel.app/dealls-blog-192x192.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DefaultLayout>
          {children}
        </DefaultLayout>
      </body>
    </html>
  );
}
