import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { Toaster } from "@/components/ui/sonner";
import ModalProvider from "@/providers/modal-provider";
import { Suspense } from "react";
import Loading from "@/components/auth/loading";
import { ThemeProvider } from "@/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flow Board",
  description: "A generative ideas sharing platform through visual representation. It's just like Miro and Figma.",
  other: {
    'theme-color': "#00d1117",
    'color-scheme': "dark only",
    'twitter-image': "https://flow-board.vercel.app/_next/image?url=%2Flogo.png&w=128&q=75",
    'twitter-card': "summary_large_image",
    'og:url': "https://flow-board.vercel.app",
    'og:image': "https://flow-board.vercel.app/_next/image?url=%2Flogo.png&w=128&q=75",
    'og:type': "website",
    'facebook-image': "https://flow-board.vercel.app/_next/image?url=%2Flogo.png&w=128&q=75",
    'linkedin-image': "https://flow-board.vercel.app/_next/image?url=%2Flogo.png&w=128&q=75",
    'instagram-image': "https://flow-board.vercel.app/_next/image?url=%2Flogo.png&w=128&q=75",
    'pinterest-image': "https://flow-board.vercel.app/_next/image?url=%2Flogo.png&w=128&q=75",
    'whatsapp-image': "https://flow-board.vercel.app/_next/image?url=%2Flogo.png&w=128&q=75",
    'keywords': "flow, board, ideas, collaboration, platform,whiteboard,nepal",
    'robots': "index, follow",
    'author': "Nishan Neupane",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <ConvexClientProvider>
            <Toaster />
            <ModalProvider />
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </ConvexClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
