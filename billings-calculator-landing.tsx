"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Navigation } from "./components/navigation"

export default function BillingsCalculatorLanding() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user email exists in localStorage
    const storedEmail = localStorage.getItem("recruitica_user_email")

    if (storedEmail) {
      console.log("Found stored email, auto-redirecting:", storedEmail)
      // Auto-redirect to calculator with the stored email
      router.push(`/billings-calculator?email=${encodeURIComponent(storedEmail)}`)
    }
  }, [router]) // Only run on component mount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Check if email exists in Notion
      const response = await fetch("/api/notion-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error("Failed to check email")
      }

      const data = await response.json()

      // Store the verified email in localStorage
      if (data.exists) {
        localStorage.setItem("recruitica_user_email", email)
        console.log("Existing user email stored in localStorage:", email)
      }

      // Redirect based on whether email exists
      if (data.exists) {
        // Email exists, redirect to calculator with email parameter
        router.push(`/billings-calculator?email=${encodeURIComponent(email)}`)
      } else {
        // Email doesn't exist, redirect to registration form
        // Pass email as query parameter
        router.push(`/registration-form?email=${encodeURIComponent(email)}`)
      }
    } catch (error) {
      console.error("Error checking email:", error)
      toast({
        title: "Error",
        description: "There was a problem checking your email. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="container mx-auto py-4 px-4 md:px-6 flex justify-between items-center">
          <Link href="/landing">
            <Image
              src="/images/recruitica-logo.png"
              alt="Recruitica Logo"
              width={195}
              height={46}
              className="h-12 w-auto cursor-pointer"
              priority
            />
          </Link>
          <Navigation />
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
                  Calculate your recruitment salary in seconds.
                </h1>
                <p className="text-lg md:text-xl text-gray-600">
                  Enter your email to get started with our free Salary Calculator.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="h-12 text-base"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Checking..." : "Get Started for Free"}
                </Button>
              </form>

              <div className="pt-8">
                <p className="text-sm text-gray-500">
                  Join thousands of recruiters who use our calculator to estimate their salaries accurately.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Why use our Salary Calculator?</h2>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Fast Results</h3>
                  <p className="text-gray-600">Get accurate salary estimates in seconds, not hours.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Easy to Use</h3>
                  <p className="text-gray-600">
                    Simple interface designed for busy recruiters to calculate their earnings.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Free Access</h3>
                  <p className="text-gray-600">No cost to get started with our free salary estimator.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100 py-6">
        <div className="container mx-auto px-4 md:px-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Recruitica. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

