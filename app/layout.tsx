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
      <body>{children}</body>
    </html>
  )
}
