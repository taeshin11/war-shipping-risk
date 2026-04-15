import Script from 'next/script'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "War Shipping Risk",
              "url": "https://war-shipping-risk.vercel.app",
              "description": "Real-time maritime security risks, shipping lane threats, and naval incident tracking in conflict zones",
              "publisher": { "@type": "Organization", "name": "War Shipping Risk", "url": "https://war-shipping-risk.vercel.app" }
            })
          }}
        />
      </head>
      <body>
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7098271335538021"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
