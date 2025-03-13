"use client";

import { ThemeProvider } from "next-themes";
import { LoadingProvider, useLoading } from "@/context/loadingContext";
import usePageLoading from "@/hooks/usePageLoading";
import Loader from "@/components/Loader";

import { bigShouldersStencil } from "./fonts";
import "@/app/styles/global.css";

import "bootstrap/dist/css/bootstrap.min.css";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={bigShouldersStencil.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-bs-theme" defaultTheme="system" enableSystem>
          <LoadingProvider>
            <MainLayout>{children}</MainLayout>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

const MainLayout = ({ children }) => {
  const { loading } = useLoading();
  const pageLoading = usePageLoading();

  return (
    <>
      {(loading || pageLoading) && <Loader />}
      {children}
    </>
  );
};
