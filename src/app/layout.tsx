import type { Metadata } from "next";
import { Bai_Jamjuree, IBM_Plex_Mono, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/store";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { AppModals } from "@/components/common/AppModals";

const baiJamjuree = Bai_Jamjuree({
  variable: "--font-bai-jamjuree",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://daoming-takuapa-hub.pages.dev'),
  title: "โรงเรียนเต้าหมิง ตะกั่วป่า | Dao Ming Living Heritage & Creative Hub",
  description: "โรงเรียนจีนแห่งแรกและแห่งเดียวของจังหวัดพังงา (พ.ศ. ๒๔๔๘/๒๔๖๕) สู่พื้นที่สร้างสรรค์และมรดกมีชีวิตแห่งเมืองเก่าตะกั่วป่า รางวัลอนุรักษ์ศิลปสถาปัตยกรรม ประจำปี ๒๕๖๙ สมาคมสถาปนิกสยามฯ",
  keywords: ["เต้าหมิง", "ตะกั่วป่า", "พังงา", "โรงเรียนจีน", "สถาปัตยกรรม", "ASA 2569", "ชิโนโปรตุกีส", "Dao Ming School", "Living Heritage"],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/assets/logo-305.jpg', type: 'image/jpeg' }
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ]
  },
  openGraph: {
    title: "โรงเรียนเต้าหมิง ตะกั่วป่า | Dao Ming Living Heritage & Creative Hub",
    description: "ชุบชีวิตอาคารประวัติศาสตร์ ๑๐๐ ปี สู่ Creative Living Space แห่งตะกั่วป่า",
    images: ["/img/อาคารปัจจุบัน.jpg"],
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/jpeg" href="/assets/logo-305.jpg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TouristAttraction",
              "name": "โรงเรียนเต้าหมิง ตะกั่วป่า (Dao Ming School)",
              "alternateName": "Dao Ming Living Heritage & Creative Hub",
              "description": "โรงเรียนจีนแห่งแรกและแห่งเดียวของจังหวัดพังงา (พ.ศ. 2448/2465) สู่พื้นที่สร้างสรรค์และมรดกมีชีวิตแห่งเมืองเก่าตะกั่วป่า รางวัลอนุรักษ์ศิลปสถาปัตยกรรม ประจำปี 2569 สมาคมสถาปนิกสยามฯ",
              "image": "/img/อาคารปัจจุบัน.jpg",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "ถนนศรีตะกั่วป่า ตำบลตลาดใหญ่",
                "addressLocality": "ตะกั่วป่า",
                "addressRegion": "พังงา",
                "postalCode": "82110",
                "addressCountry": "TH"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 8.833573,
                "longitude": 98.365061
              },
              "isAccessibleForFree": true,
              "award": "รางวัลอนุรักษ์ศิลปสถาปัตยกรรม ประจำปี 2569 สมาคมสถาปนิกสยาม ในพระบรมราชูปถัมภ์ (ASA)"
            })
          }}
        />
      </head>
      <body
        className={`${baiJamjuree.variable} ${notoSansThai.variable} ${ibmPlexMono.variable} font-sans bg-[#FCF8F2] text-[#122421] antialiased selection:bg-[#E5A31E]/30`}
      >
        <AppProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <AppModals />
        </AppProvider>
      </body>
    </html>
  );
}
