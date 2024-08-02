import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import theme from "@/src/theme";
import { ThemeProvider } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from '../pages/api/auth/[...nextauth].js'
import Login from "../components/Login";
import Home from "./page";
import SessionProvider from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Store Inventory",
  description: "Revolutionary store inventory system",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          
          <ThemeProvider theme={theme}>{ !session?.user?.name ? (<Login/>): (<Home/>)}</ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
