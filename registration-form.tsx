"use client"

import { useEffect } from "react"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { MultiSelect } from "./components/multi-select" // Assuming we have this component from previous code
import { Navigation } from "./components/navigation"

export default function RegistrationForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const emailInitialized = useRef(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    country: "", // Keeping the state variable name for compatibility
    telephone: "",
    currentRole: "",
    recruitmentSector: [] as string[],
    customSectors: [] as string[],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Get email from query parameters if available - FIXED to prevent infinite loop
  useEffect(() => {
    // Only run this effect once
    if (!emailInitialized.current) {
      const email = searchParams.get("email")
      if (email) {
        setFormData((prev) => ({ ...prev, email }))
      }
      emailInitialized.current = true
    }
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (name: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleAddCustomSector = (newSector: string) => {
    setFormData((prev) => ({
      ...prev,
      customSectors: [...prev.customSectors, newSector],
      recruitmentSector: [...prev.recruitmentSector.filter((s) => s !== "Other"), newSector],
    }))
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.firstName) errors.firstName = "First name is required"
    if (!formData.lastName) errors.lastName = "Last name is required"
    if (!formData.email) {
      errors.email = "Email is required"
    } else if (!formData.email.includes("@")) {
      errors.email = "Please enter a valid email"
    }
    if (!formData.country) errors.country = "Region is required" // Updated error message
    if (!formData.currentRole) errors.currentRole = "Current role is required"
    if (formData.recruitmentSector.length === 0) errors.recruitmentSector = "Please select at least one sector"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Submit data to Notion
      const response = await fetch("/api/notion-create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          companyName: formData.companyName,
          location: formData.country, // Keeping the API field name for compatibility
          telephone: formData.telephone,
          currentRole: formData.currentRole,
          recruitmentSector: formData.recruitmentSector,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || "Failed to save your information")
      }

      // Store email in localStorage for persistent authentication
      localStorage.setItem("recruitica_user_email", formData.email)
      console.log("Email stored in localStorage:", formData.email)

      // Success - redirect to calculator with role and sector parameters
      toast({
        title: "Registration successful!",
        description: "Your account has been created. Redirecting to the calculator...",
      })

      // Build query parameters for the redirect
      const queryParams = new URLSearchParams()

      // Add role parameter
      if (formData.currentRole) {
        queryParams.append("role", formData.currentRole)
      }

      // Add sector parameter (use the first sector if multiple are selected)
      if (formData.recruitmentSector.length > 0) {
        // Pass all sectors as a comma-separated string
        queryParams.append("sector", formData.recruitmentSector.join(","))
      }

      // Add region/country parameter
      if (formData.country) {
        queryParams.append("region", formData.country)
      }

      // Add email parameter to ensure it's passed to the calculator
      queryParams.append("email", formData.email)

      // Short delay before redirect for better UX
      setTimeout(() => {
        router.push(`/billings-calculator?${queryParams.toString()}`)
      }, 1500)
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "There was a problem saving your information. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Sample data for dropdowns
  const regions = [
    "United Kingdom",
    "United States",
    "Dubai",
    "Amsterdam",
    "Australia",
    "Singapore",
    "Hong Kong",
    // Add more regions as needed
  ]

  const roles = [
    "Trainee Recruiter",
    "180 Recruiter",
    "Account Manager",
    "360 Senior/Principal Recruiter",
    "Business Development Manager",
    "Team Leader",
    "Manager",
    "Director",
    "Other",
  ]

  const recruitmentSectors = [
    "Technology",
    "Finance",
    "Legal",
    "Healthcare",
    "Construction",
    "Education",
    "Retail",
    "Other",
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="container mx-auto py-4 px-4 md:px-6 flex justify-between items-center">
          <Link href="https://recruitica.io/" target="_blank" rel="noopener noreferrer">
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

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Unlock Your Free Salary Calculator</h1>
              <p className="text-gray-600">Register to access the Salary Calculator and more</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={formErrors.firstName ? "border-red-500" : ""}
                    required
                  />
                  {formErrors.firstName && <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={formErrors.lastName ? "border-red-500" : ""}
                    required
                  />
                  {formErrors.lastName && <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={formErrors.email ? "border-red-500" : ""}
                  required
                />
                {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telephone">Telephone (Optional)</Label>
                <Input
                  id="telephone"
                  name="telephone"
                  type="tel"
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder="e.g., +1 234 567 8900"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="country">
                    Region <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.country} onValueChange={(value) => handleSelectChange("country", value)}>
                    <SelectTrigger id="country" className={formErrors.country ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formErrors.country && <p className="text-red-500 text-sm mt-1">{formErrors.country}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentRole">
                    Current Role <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.currentRole}
                    onValueChange={(value) => handleSelectChange("currentRole", value)}
                  >
                    <SelectTrigger id="currentRole" className={formErrors.currentRole ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formErrors.currentRole && <p className="text-red-500 text-sm mt-1">{formErrors.currentRole}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recruitmentSector">
                  Recruitment Sector <span className="text-red-500">*</span>
                </Label>
                <MultiSelect
                  options={recruitmentSectors}
                  selected={formData.recruitmentSector}
                  onChange={(value) => handleSelectChange("recruitmentSector", value)}
                  placeholder="Select sector(s)"
                  onAddCustomOption={handleAddCustomSector}
                />
                {formErrors.recruitmentSector && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.recruitmentSector}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>

              <p className="text-sm text-gray-500 text-center">
                By submitting, you acknowledge our{" "}
                <Link href="https://recruitica.io/privacy-policy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-100 py-6">
        <div className="container mx-auto px-4 md:px-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Recruitica. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

