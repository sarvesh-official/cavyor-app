
import { Urbanist } from "next/font/google"

import "@workspace/ui/globals.css"
import { BrandingProvider } from "@/components/branding-provider";

const fontSans = Urbanist({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} font-sans antialiased`}>
        <BrandingProvider>
          {children}
        </BrandingProvider>
      </body>
    </html>
  );
}
