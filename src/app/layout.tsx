import type { Metadata } from "next";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./globals.css";
import localFont from "next/font/local";
import { AuthProvider } from "@/context/AuthContext";
import ThemeRegistry from "@/components/ThemeRegistry";

const Jaini = localFont({
  src: "../../public/fonts/JainiPurva-Regular.ttf",
  display: "swap",
  variable: "--font-jaini-purva",
});

export const metadata: Metadata = {
  title: "Glyph Quest",
  description: "Create and Manage your Maze Rats characters with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${Jaini.variable}`}>
      <body>
        <AuthProvider>
          <ThemeRegistry>{children}</ThemeRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
