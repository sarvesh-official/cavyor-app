
import "@workspace/ui/globals.css"
import { BrandingProvider } from "@/components/branding-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <BrandingProvider>
          {children}
        </BrandingProvider>
      </body>
    </html>
  );
}
