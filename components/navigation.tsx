"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export function Navigation() {
  // Get the current pathname once
  const pathname = usePathname()

  // Determine active state for home button
  const isHomeActive = pathname === "/landing"

  return (
    <div className="flex items-center space-x-2">
      <Link href="https://recruitica.io/" target="_blank" rel="noopener noreferrer" passHref>
        <Button
          variant="default"
          size="sm"
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white"
          type="button"
        >
          <Home className="h-4 w-4" />
          <span className="hidden sm:inline">Home</span>
        </Button>
      </Link>
    </div>
  )
}

