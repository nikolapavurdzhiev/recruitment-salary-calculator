import type React from "react"
import { Inter, Poppins } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"]
})

const poppins = Poppins({ 
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["600", "700"]
})

export const metadata = {
  title: "Recruitment Salary Calculator",
  description: "Calculate your recruitment salary based on market data",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/calculator-icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/calculator-icon.svg" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}