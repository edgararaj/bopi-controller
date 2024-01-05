"use client"
import { NextUIProvider } from "@nextui-org/react";
import './globals.css'

export default async function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextUIProvider>
          <main className="dark text-foreground bg-background h-screen">
            {children}
          </main>
        </NextUIProvider>
      </body>
    </html>
  );
}
