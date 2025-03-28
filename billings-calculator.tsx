"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Info, AlertCircle, ThumbsUp, ThumbsDown, Send } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Navigation } from "./components/navigation"

// Salary data from the Recruitica 2025 Salary Guide
const salaryData = {
  "United Kingdom": {
    "Trainee Recruiter": { min: 24000, max: 30000, currency: "£" },
    "180 Recruiter": { min: 23000, max: 30000, currency: "£" },
    "Account Manager": { min: 28000, max: 40000, currency: "£" },
    "360 Senior/Principal Recruiter": { min: 35000, max: 50000, currency: "£" },
    "Business Development Manager": { min: 40000, max: 60000, currency: "£" },
    "Team Leader": { min: 45000, max: 65000, currency: "£" },
    Manager: { min: 55000, max: 80000, currency: "£" },
    Director: { min: 70000, max: 96000, currency: "£" },
  },
  "United States": {
    "Trainee Recruiter": { min: 40000, max: 55000, currency: "$" },
    "180 Recruiter": { min: 50000, max: 70000, currency: "$" },
    "Account Manager": { min: 60000, max: 90000, currency: "$" },
    "360 Senior/Principal Recruiter": { min: 75000, max: 120000, currency: "$" },
    "Business Development Manager": { min: 85000, max: 130000, currency: "$" },
    "Team Leader": { min: 90000, max: 150000, currency: "$" },
    Manager: { min: 95000, max: 160000, currency: "$" },
    Director: { min: 100000, max: 180000, currency: "$" },
  },
  Dubai: {
    "Trainee Recruiter": { min: 120000, max: 180000, currency: "AED" },
    "180 Recruiter": { min: 180000, max: 240000, currency: "AED" },
    "Account Manager": { min: 240000, max: 300000, currency: "AED" },
    "360 Senior/Principal Recruiter": { min: 300000, max: 420000, currency: "AED" },
    "Business Development Manager": { min: 360000, max: 480000, currency: "AED" },
    "Team Leader": { min: 420000, max: 540000, currency: "AED" },
    Manager: { min: 480000, max: 660000, currency: "AED" },
    Director: { min: 600000, max: 840000, currency: "AED" },
  },
  Amsterdam: {
    "Trainee Recruiter": { min: 25000, max: 30000, currency: "€" },
    "180 Recruiter": { min: 30000, max: 40000, currency: "€" },
    "Account Manager": { min: 35000, max: 50000, currency: "€" },
    "360 Senior/Principal Recruiter": { min: 45000, max: 65000, currency: "€" },
    "Business Development Manager": { min: 50000, max: 75000, currency: "€" },
    "Team Leader": { min: 55000, max: 85000, currency: "€" },
    Manager: { min: 70000, max: 100000, currency: "€" },
    Director: { min: 100000, max: 180000, currency: "€" },
  },
  Australia: {
    "Trainee Recruiter": { min: 60000, max: 75000, currency: "A$" },
    "180 Recruiter": { min: 55000, max: 75000, currency: "A$" },
    "Account Manager": { min: 70000, max: 95000, currency: "A$" },
    "360 Senior/Principal Recruiter": { min: 80000, max: 120000, currency: "A$" },
    "Business Development Manager": { min: 90000, max: 140000, currency: "A$" },
    "Team Leader": { min: 100000, max: 160000, currency: "A$" },
    Manager: { min: 120000, max: 200000, currency: "A$" },
    Director: { min: 150000, max: 300000, currency: "A$" },
  },
  Singapore: {
    "Trainee Recruiter": { min: 36000, max: 48000, currency: "S$" },
    "180 Recruiter": { min: 42000, max: 60000, currency: "S$" },
    "Account Manager": { min: 60000, max: 84000, currency: "S$" },
    "360 Senior/Principal Recruiter": { min: 72000, max: 120000, currency: "S$" },
    "Business Development Manager": { min: 84000, max: 144000, currency: "S$" },
    "Team Leader": { min: 96000, max: 180000, currency: "S$" },
    Manager: { min: 120000, max: 240000, currency: "S$" },
    Director: { min: 180000, max: 360000, currency: "S$" },
  },
  "Hong Kong": {
    "Trainee Recruiter": { min: 216000, max: 300000, currency: "HK$" },
    "180 Recruiter": { min: 264000, max: 420000, currency: "HK$" },
    "Account Manager": { min: 336000, max: 540000, currency: "HK$" },
    "360 Senior/Principal Recruiter": { min: 420000, max: 720000, currency: "HK$" },
    "Business Development Manager": { min: 480000, max: 900000, currency: "HK$" },
    "Team Leader": { min: 600000, max: 1080000, currency: "HK$" },
    Manager: { min: 720000, max: 1440000, currency: "HK$" },
    Director: { min: 720000, max: 1440000, currency: "HK$" },
  },
}

// Billings thresholds for each role (in local currency)
const billingsThresholds = {
  "Trainee Recruiter": 100000,
  "180 Recruiter": 200000,
  "Account Manager": 300000,
  "360 Senior/Principal Recruiter": 400000,
  "Business Development Manager": 500000,
  "Team Leader": 600000,
  Manager: 700000,
  Director: 1000000,
}

// Benchmark billings in AED for each role
const benchmarkBillings = {
  "Trainee Recruiter": 200000,
  "180 Recruiter": 300000,
  "Account Manager": 400000,
  "360 Senior/Principal Recruiter": 500000,
  "Business Development Manager": 600000,
  "Team Leader": 700000,
  Manager: 800000,
  Director: 1000000,
}

// Exchange rates for converting to AED
const exchangeRates = {
  "United Kingdom": 0.207, // 1 AED ≈ 0.207 GBP
  "United States": 0.272, // 1 AED ≈ 0.272 USD
  Dubai: 1, // Already in AED
  Amsterdam: 0.25, // Approximate EUR to AED
  Australia: 0.4, // Approximate AUD to AED
  Singapore: 0.36, // Approximate SGD to AED
  "Hong Kong": 0.035, // Approximate HKD to AED
}

// High-demand sectors that get a multiplier
const highDemandSectors = ["Tech", "Finance"]

// Entry-level roles with reduced specialization impact
const entryLevelRoles = ["Trainee Recruiter", "180 Recruiter"]

// Role-based experience bands
const experienceBands = {
  "Trainee Recruiter": { minYears: 0, maxYears: 2, baseFactor: 0.25, maxFactor: 0.4 },
  "180 Recruiter": { minYears: 0, maxYears: 3, baseFactor: 0.25, maxFactor: 0.5 },
  "Account Manager": { minYears: 2, maxYears: 5, baseFactor: 0.3, maxFactor: 0.6 },
  "360 Senior/Principal Recruiter": { minYears: 3, maxYears: 8, baseFactor: 0.4, maxFactor: 0.8 },
  "Business Development Manager": { minYears: 5, maxYears: 10, baseFactor: 0.5, maxFactor: 0.9 },
  "Team Leader": { minYears: 7, maxYears: 12, baseFactor: 0.6, maxFactor: 0.95 },
  Manager: { minYears: 8, maxYears: 15, baseFactor: 0.7, maxFactor: 1.0 },
  Director: { minYears: 10, maxYears: 20, baseFactor: 0.8, maxFactor: 1.0 },
}

// Currency options for billings input
const currencyOptions = [
  { value: "GBP", label: "GBP (£)" },
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "AED", label: "AED (د.إ)" },
  { value: "AUD", label: "AUD (A$)" },
  { value: "SGD", label: "SGD (S$)" },
  { value: "HKD", label: "HKD (HK$)" },
]

// Map sector names from registration form to calculator sectors
const sectorMapping: Record<string, string> = {
  Technology: "Tech",
  Tech: "Tech",
  Finance: "Finance",
  Finance: "Finance",
  Legal: "Legal",
  Healthcare: "Healthcare",
  Construction: "Construction",
  Education: "Education",
  Retail: "Retail",
  Other: "Other",
  // Add any other mappings that might be needed
}

export default function BillingsCalculator() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [formData, setFormData] = useState({
    country: "",
    role: "",
    yearsOfExperience: "",
    sector: "",
    specializationFit: 3,
    metricType: "placements", // Default to placements
    annualPlacements: "",
    annualBillings: "",
    billingsCurrency: "GBP",
    hasClients: false, // New field for client book
  })

  const [calculatedSalary, setCalculatedSalary] = useState<number | null>(null)
  const [currency, setCurrency] = useState("")
  const [isCalculating, setIsCalculating] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [formWarnings, setFormWarnings] = useState<Record<string, string>>({})

  // Feedback state
  const [feedbackType, setFeedbackType] = useState<"positive" | "negative" | null>(null)
  const [extraFeedback, setExtraFeedback] = useState("")
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  // Initialize form data from URL parameters
  useEffect(() => {
    const role = searchParams.get("role")
    const sector = searchParams.get("sector")
    const region = searchParams.get("region")
    const email = searchParams.get("email")

    console.log("URL Parameters:", {
      role,
      sector,
      region,
      email,
      fullUrl: typeof window !== "undefined" ? window.location.href : "",
      searchParams: typeof window !== "undefined" ? window.location.search : "",
    })

    // Set the email from URL parameter
    if (email) {
      setUserEmail(email)
      // Also store in localStorage if not already there
      if (!localStorage.getItem("recruitica_user_email")) {
        localStorage.setItem("recruitica_user_email", email)
      }
      console.log("Email found in URL parameters:", email)
    } else {
      // Fallback: try to get email from the full URL
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search)
        const emailFromUrl = urlParams.get("email")
        if (emailFromUrl) {
          setUserEmail(emailFromUrl)
          // Also store in localStorage if not already there
          if (!localStorage.getItem("recruitica_user_email")) {
            localStorage.setItem("recruitica_user_email", emailFromUrl)
          }
          console.log("Email found in window.location.search:", emailFromUrl)
        } else {
          // Final fallback: check localStorage
          const storedEmail = localStorage.getItem("recruitica_user_email")
          if (storedEmail) {
            setUserEmail(storedEmail)
            console.log("Email found in localStorage:", storedEmail)
          }
        }
      }
    }

    if (role || sector || region) {
      setFormData((prevData) => {
        const updatedData = { ...prevData }

        if (role && roles.includes(role)) {
          updatedData.role = role
        }

        if (sector) {
          // Handle multiple sectors (comma-separated)
          const sectorList = sector.split(",")
          if (sectorList.length > 0) {
            // Map the first sector from registration form to calculator format
            const firstSector = sectorList[0]
            const mappedSector = sectorMapping[firstSector] || firstSector
            if (sectors.includes(mappedSector)) {
              updatedData.sector = mappedSector
            }
          }
        }

        if (region && Object.keys(salaryData).includes(region)) {
          updatedData.country = region
        }

        return updatedData
      })
    }
    // Only run this effect once when the component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Available options for dropdowns
  const countries = Object.keys(salaryData)
  const roles = [
    "Trainee Recruiter",
    "180 Recruiter",
    "Account Manager",
    "360 Senior/Principal Recruiter",
    "Business Development Manager",
    "Team Leader",
    "Manager",
    "Director",
    "Other", // Added to match registration form
  ]
  const sectors = ["Tech", "Finance", "Legal", "Healthcare", "Construction", "Education", "Retail", "Other"]

  const handleChange = (field: string, value: string | number | boolean) => {
    // If changing role to Trainee Recruiter, reset other fields
    if (field === "role" && value === "Trainee Recruiter") {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
        yearsOfExperience: "0",
        sector: prev.sector, // Keep sector for reference
        specializationFit: 1,
        metricType: "placements",
        annualPlacements: "",
        annualBillings: "",
        hasClients: false,
      }))

      // Clear any errors for fields that will be hidden
      setFormErrors({})
      setFormWarnings({})
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }

    // Clear error for this field if it exists
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }

    // Check for warnings on years of experience
    if (field === "yearsOfExperience") {
      const years = Number(value)
      if (years > 30) {
        setFormWarnings((prev) => ({
          ...prev,
          yearsOfExperience: "Experience seems unusually high. Typical values are 0-30 years. Proceed with caution.",
        }))
      } else {
        setFormWarnings((prev) => {
          const newWarnings = { ...prev }
          delete newWarnings.yearsOfExperience
          return newWarnings
        })
      }
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.country) errors.country = "Please select a country"
    if (!formData.role) errors.role = "Please select a role"

    // Skip validation for other fields if Trainee Recruiter is selected
    if (formData.role !== "Trainee Recruiter") {
      if (!formData.yearsOfExperience) {
        errors.yearsOfExperience = "Please enter years of experience"
      } else if (Number(formData.yearsOfExperience) < 0) {
        errors.yearsOfExperience = "Years of experience cannot be negative"
      }
      if (!formData.sector) errors.sector = "Please select a sector"

      // Add validation for hasClients field
      if (formData.hasClients === undefined) {
        errors.hasClients = "Please specify if the candidate has a book of clients"
      }
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const calculateSalary = () => {
    if (!validateForm() || isCalculating) return

    setIsCalculating(true)

    // Reset feedback state when recalculating
    setFeedbackType(null)
    setExtraFeedback("")
    setFeedbackSubmitted(false)

    // Simulate calculation delay for better UX
    setTimeout(() => {
      try {
        const country = formData.country as keyof typeof salaryData
        const role = formData.role as keyof typeof billingsThresholds

        // Get salary range for selected country and role
        const { min, max, currency: currencySymbol } = salaryData[country][role]

        // Special case for Trainee Recruiters - return regional minimum directly
        if (role === "Trainee Recruiter") {
          setCalculatedSalary(min)
          setCurrency(currencySymbol)
          setIsCalculating(false)
          return
        }

        // 1. Initial Base Salary
        // Calculate experience factor using improved logarithmic scale (capped at 1.6 instead of 1.5)
        const experienceFactor = Math.min(1 + Math.log(Number(formData.yearsOfExperience) / 10 + 1), 1.6)

        // Calculate specialization factor with increased weight (20% instead of 15%)
        let specializationFactor = ((Number(formData.specializationFit) - 1) / 4) * 0.2

        // Apply additional multiplier for high-demand sectors
        if (highDemandSectors.includes(formData.sector)) {
          specializationFactor *= 1.2
        }

        // Compute initial base salary
        let initialBase = min + (max - min) * (experienceFactor * 0.4 + specializationFactor)

        // If no billings provided, adjust initialBase
        if (formData.metricType === "billings" && Number(formData.annualBillings) === 0) {
          initialBase = initialBase * 1.2
        }

        // 2. Billings Adjustment
        // Get threshold for the role
        const threshold = billingsThresholds[role]

        // Calculate billings factor with increased impact and higher cap (1.15 instead of 1.1)
        let billingsFactor = 1.0
        if (formData.metricType === "billings" && Number(formData.annualBillings) > 0) {
          billingsFactor = 1 + (Number(formData.annualBillings) / threshold) * 0.05

          // Cap and floor the billings factor (increased to 1.15 from 1.1)
          billingsFactor = Math.max(1.0, Math.min(billingsFactor, 1.15))
        }

        // 3. Final Base Salary
        // Apply enhanced client book boost (tiered system)
        let clientBookMultiplier = 1.0
        if (formData.hasClients) {
          // Higher multiplier if they have clients AND exceed billings threshold
          if (formData.metricType === "billings" && Number(formData.annualBillings) > threshold) {
            clientBookMultiplier = 1.1
          } else {
            clientBookMultiplier = 1.05
          }
        }

        // Compute final base salary
        let finalBase = initialBase * billingsFactor * 0.9 * clientBookMultiplier

        // 4. Enforce Dynamic Caps
        // Higher cap for exceptional performers
        if (billingsFactor > 1.1) {
          // Allow up to 130% of max for high performers
          finalBase = Math.max(min * 0.8, Math.min(finalBase, max * 1.3))
        } else {
          // Standard cap (up to 120% of max)
          finalBase = Math.max(min * 0.8, Math.min(finalBase, max * 1.2))
        }

        // Round to nearest whole number
        setCalculatedSalary(Math.round(finalBase))
        setCurrency(currencySymbol)
      } catch (error) {
        console.error("Calculation error:", error)
        // Don't update state if there's an error
      } finally {
        setIsCalculating(false)
      }
    }, 800)
  }

  const handleLogout = () => {
    // Clear stored email from localStorage
    localStorage.removeItem("recruitica_user_email")
    // Clear user email from state
    setUserEmail(null)
    // Show toast notification
    toast({
      title: "Logged out successfully",
      description: "You've been logged out. You'll need to sign in again next time.",
    })
    // Redirect to landing page
    router.push("/landing")
  }

  // This function is no longer needed as we're handling feedback directly in the button clicks

  const formatCurrency = (value: number, currencySymbol: string) => {
    return `${currencySymbol}${value.toLocaleString()}`
  }

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
          <div className="flex items-center gap-4">
            {userEmail && (
              <div className="hidden md:flex items-center mr-4">
                <span className="text-sm text-gray-600 mr-2">Signed in as:</span>
                <span className="text-sm font-medium">{userEmail}</span>
              </div>
            )}
            <Navigation />
            {userEmail && (
              <Button variant="outline" size="sm" onClick={handleLogout} className="ml-2 text-gray-600 border-gray-300">
                Logout
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Recruitment Salary Calculator</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Estimate your base salary as an agency recruiter based on the Recruitica 2025 Salary Guide.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card>
                  <CardContent className="pt-6">
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Region field */}
                        <div className="space-y-2">
                          <Label htmlFor="country">
                            Region <span className="text-red-500">*</span>
                          </Label>
                          <Select value={formData.country} onValueChange={(value) => handleChange("country", value)}>
                            <SelectTrigger id="country" className={formErrors.country ? "border-red-500" : ""}>
                              <SelectValue placeholder="Select region" />
                            </SelectTrigger>
                            <SelectContent>
                              {countries.map((country) => (
                                <SelectItem key={country} value={country}>
                                  {country}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {formErrors.country && <p className="text-red-500 text-sm mt-1">{formErrors.country}</p>}
                        </div>

                        {/* Role field */}
                        <div className="space-y-2">
                          <Label htmlFor="role">
                            Role <span className="text-red-500">*</span>
                          </Label>
                          <Select value={formData.role} onValueChange={(value) => handleChange("role", value)}>
                            <SelectTrigger id="role" className={formErrors.role ? "border-red-500" : ""}>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              {roles.map((role) => (
                                <SelectItem key={role} value={role}>
                                  {role}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {formErrors.role && <p className="text-red-500 text-sm mt-1">{formErrors.role}</p>}
                        </div>
                      </div>

                      {/* Years of Experience field - hide for Trainee Recruiters */}
                      {formData.role !== "Trainee Recruiter" && (
                        <div className="space-y-2">
                          <div className="flex items-center mb-1">
                            <Label htmlFor="yearsOfExperience" className="mr-2">
                              Years of Experience <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative group">
                              <Info className="h-4 w-4 text-gray-500 cursor-help" />
                              <div className="absolute left-0 bottom-full mb-2 w-72 p-3 bg-gray-800 text-white text-sm rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-50">
                                <p>
                                  Experience is scaled based on role expectations (0-20 years). Entry-level roles with 0
                                  years receive a minimum adjustment, and senior roles with 20+ years may see a slight
                                  premium.
                                </p>
                                <div className="absolute left-0 top-full w-3 h-3 -mt-1 ml-1 transform rotate-45 bg-gray-800"></div>
                              </div>
                            </div>
                          </div>
                          <Input
                            id="yearsOfExperience"
                            type="number"
                            min="0"
                            max="50"
                            placeholder="e.g. 5"
                            value={formData.yearsOfExperience}
                            onChange={(e) => handleChange("yearsOfExperience", e.target.value)}
                            className={formErrors.yearsOfExperience ? "border-red-500" : ""}
                          />
                          {formErrors.yearsOfExperience && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.yearsOfExperience}</p>
                          )}
                          {formWarnings.yearsOfExperience && (
                            <div className="flex items-center text-amber-600 text-sm mt-1">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {formWarnings.yearsOfExperience}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Sector Focus field - hide for Trainee Recruiters */}
                      {formData.role !== "Trainee Recruiter" && (
                        <div className="space-y-2">
                          <Label htmlFor="sector">
                            Sector Focus <span className="text-red-500">*</span>
                          </Label>
                          <Select value={formData.sector} onValueChange={(value) => handleChange("sector", value)}>
                            <SelectTrigger id="sector" className={formErrors.sector ? "border-red-500" : ""}>
                              <SelectValue placeholder="Select sector" />
                            </SelectTrigger>
                            <SelectContent>
                              {sectors.map((sector) => (
                                <SelectItem key={sector} value={sector}>
                                  {sector}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {formErrors.sector && <p className="text-red-500 text-sm mt-1">{formErrors.sector}</p>}
                        </div>
                      )}

                      {/* Has Clients Checkbox - hide for Trainee Recruiters */}
                      {formData.role !== "Trainee Recruiter" && (
                        <div className="space-y-2">
                          <div className="flex items-start space-x-2">
                            <Checkbox
                              id="hasClients"
                              checked={formData.hasClients}
                              onCheckedChange={(checked) => handleChange("hasClients", checked === true)}
                              className={`${formErrors.hasClients ? "border-red-500" : ""} mt-1`}
                            />
                            <div className="flex items-center">
                              <Label htmlFor="hasClients" className="mr-2 text-sm">
                                Has a Book of Clients? <span className="text-red-500">*</span>
                              </Label>
                              <div className="relative group">
                                <Info className="h-4 w-4 text-gray-500 cursor-help" />
                                <div className="absolute left-0 bottom-full mb-2 w-72 p-3 bg-gray-800 text-white text-sm rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-50">
                                  <p>
                                    Recruiters with an existing book of clients typically command higher base salaries
                                    due to their established network and immediate revenue potential.
                                  </p>
                                  <div className="absolute left-0 top-full w-3 h-3 -mt-1 ml-1 transform rotate-45 bg-gray-800"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {formErrors.hasClients && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.hasClients}</p>
                          )}
                        </div>
                      )}

                      {/* Skill Match section - hide for Trainee Recruiters */}
                      {formData.role !== "Trainee Recruiter" && (
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center mb-6">
                              <Label htmlFor="specializationFit" className="block mr-2">
                                Skill Match <span className="text-red-500">*</span>
                              </Label>
                              <div className="relative group">
                                <Info className="h-4 w-4 text-gray-500 cursor-help" />
                                <div className="absolute left-0 bottom-full mb-2 w-72 p-3 bg-gray-800 text-white text-sm rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-50">
                                  <p>
                                    Please rate your expertise in this field on a scale of 1 (novice) to 5 (expert). For
                                    entry-level positions, a higher rating will give a small boost to your estimated
                                    salary. For more experienced roles, a top score can noticeably increase your salary
                                    estimate. If you work in a high-demand area like Tech or Finance, your expertise is
                                    even more valuable and will further raise your estimate.
                                  </p>
                                  <div className="absolute left-0 top-full w-3 h-3 -mt-1 ml-1 transform rotate-45 bg-gray-800"></div>
                                </div>
                              </div>
                            </div>
                            <div className="px-2">
                              <Slider
                                id="specializationFit"
                                min={1}
                                max={5}
                                step={1}
                                value={[formData.specializationFit]}
                                onValueChange={(value) => handleChange("specializationFit", value[0])}
                                className="my-6"
                              />
                              <div className="flex justify-between text-sm text-gray-500 mt-1">
                                <span>Low fit (1)</span>
                                <span className="text-center">Neutral fit (3)</span>
                                <span>Perfect fit (5)</span>
                              </div>
                              <div className="text-center mt-4">
                                <span className="font-medium">
                                  Selected: {formData.specializationFit}
                                  {formData.specializationFit === 1 && " (Low)"}
                                  {formData.specializationFit === 2 && " (Below Average)"}
                                  {formData.specializationFit === 3 && " (Neutral)"}
                                  {formData.specializationFit === 4 && " (Good)"}
                                  {formData.specializationFit === 5 && " (Perfect)"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Optional metrics section - hide for Trainee Recruiters */}
                      {formData.role !== "Trainee Recruiter" && (
                        <div className="space-y-4 pt-2 border-t border-gray-100">
                          <div className="flex items-center">
                            <Label className="block mr-2">
                              Please select the metric you want to report based on your performance in the last 12
                              months:
                            </Label>
                            <div className="relative group">
                              <Info className="h-4 w-4 text-gray-500 cursor-help" />
                              <div className="absolute left-0 bottom-full mb-2 w-72 p-3 bg-gray-800 text-white text-sm rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-50">
                                <p>
                                  Enter the actual numbers from the last 12 months. Using historical data provides more
                                  objective and reliable figures for salary estimates.
                                </p>
                                <div className="absolute left-0 top-full w-3 h-3 -mt-1 ml-1 transform rotate-45 bg-gray-800"></div>
                              </div>
                            </div>
                          </div>

                          <RadioGroup
                            value={formData.metricType}
                            onValueChange={(value) => handleChange("metricType", value)}
                            className="flex space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="placements" id="placements" />
                              <Label htmlFor="placements">Number of Placements Made in the Last 12 Months</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="billings" id="billings" />
                              <Label htmlFor="billings">Total Billings in the Last 12 Months</Label>
                            </div>
                          </RadioGroup>

                          {formData.metricType === "placements" ? (
                            <div className="space-y-2">
                              <Label htmlFor="annualPlacements">Number of Placements Made in the Last 12 Months</Label>
                              <Input
                                id="annualPlacements"
                                type="number"
                                min="0"
                                placeholder="e.g. 8"
                                value={formData.annualPlacements}
                                onChange={(e) => handleChange("annualPlacements", e.target.value)}
                              />
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <Label htmlFor="annualBillings">Total Billings in the Last 12 Months</Label>
                              <div className="grid grid-cols-3 gap-2">
                                <div className="col-span-1">
                                  <Select
                                    value={formData.billingsCurrency}
                                    onValueChange={(value) => handleChange("billingsCurrency", value)}
                                  >
                                    <SelectTrigger id="billingsCurrency">
                                      <SelectValue placeholder="Currency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {currencyOptions.map((currency) => (
                                        <SelectItem key={currency.value} value={currency.value}>
                                          {currency.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="col-span-2">
                                  <Input
                                    id="annualBillings"
                                    type="number"
                                    min="0"
                                    placeholder="e.g. 150000"
                                    value={formData.annualBillings}
                                    onChange={(e) => handleChange("annualBillings", e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Trainee Recruiter Note */}
                      {formData.role === "Trainee Recruiter" && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-md text-blue-800 border border-blue-200">
                          <p className="font-medium mb-2">Trainee Recruiter Information:</p>
                          <p>
                            Trainee Recruiters are assigned the regional minimum salary based on the selected region.
                          </p>
                          <p className="mt-2">No additional criteria are required for this role.</p>
                          {formData.country && (
                            <p className="mt-2 font-medium">
                              Minimum salary for Trainee Recruiters in {formData.country}:
                              {formData.country && salaryData[formData.country as keyof typeof salaryData]
                                ? ` ${salaryData[formData.country as keyof typeof salaryData]["Trainee Recruiter"].currency}${salaryData[formData.country as keyof typeof salaryData]["Trainee Recruiter"].min.toLocaleString()}`
                                : " (Please select a region)"}
                            </p>
                          )}
                        </div>
                      )}

                      <Button
                        type="button"
                        onClick={calculateSalary}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={isCalculating}
                      >
                        {isCalculating ? "Calculating..." : "Calculate Base Salary"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4">Estimated Base Salary</h2>

                    {calculatedSalary !== null ? (
                      <div className="text-center py-6">
                        <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-2 break-words overflow-hidden">
                          {formatCurrency(calculatedSalary, currency)}
                        </div>
                        <p className="text-gray-500 text-sm">Estimated annual base salary</p>

                        {/* Feedback Section */}
                        {!feedbackSubmitted ? (
                          <div className="mt-6 pt-6 border-t border-gray-200">
                            <h3 className="text-lg font-medium mb-3">Was this estimate accurate?</h3>

                            <div className="flex justify-center gap-4 mb-4">
                              <Button
                                type="button"
                                variant={feedbackType === "positive" ? "default" : "outline"}
                                size="sm"
                                className={`w-[120px] h-[40px] flex items-center justify-center gap-1 ${
                                  feedbackType === "positive" ? "bg-green-600 hover:bg-green-700" : ""
                                }`}
                                onClick={async () => {
                                  if (!userEmail) {
                                    toast({
                                      title: "Email not found",
                                      description:
                                        "Your email is required to submit feedback. Please try registering again.",
                                      variant: "destructive",
                                    })
                                    console.error("No email found for feedback submission")
                                    return
                                  }

                                  setIsSubmittingFeedback(true)
                                  try {
                                    // Submit positive feedback immediately
                                    const response = await fetch("/api/notion-feedback", {
                                      method: "POST",
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                      body: JSON.stringify({
                                        email: userEmail,
                                        estimateFeedback: "positive",
                                        extraFeedback: extraFeedback.trim() || undefined,
                                        salaryOutput: formatCurrency(calculatedSalary, currency), // Add the formatted salary
                                      }),
                                    })

                                    const data = await response.json()

                                    if (!data.success) {
                                      throw new Error(data.error || "Failed to submit feedback")
                                    }

                                    setFeedbackType("positive")
                                    toast({
                                      title: "Feedback recorded",
                                      description: "Your positive feedback has been saved.",
                                    })
                                    console.log("Positive feedback submitted successfully for email:", userEmail)
                                  } catch (error) {
                                    console.error("Error submitting feedback:", error)
                                    toast({
                                      title: "Error",
                                      description: "There was a problem submitting your feedback. Please try again.",
                                      variant: "destructive",
                                    })
                                  } finally {
                                    setIsSubmittingFeedback(false)
                                  }
                                }}
                                disabled={isSubmittingFeedback}
                              >
                                <ThumbsUp className="h-4 w-4" />
                                <span>Yes</span>
                              </Button>
                              <Button
                                type="button"
                                variant={feedbackType === "negative" ? "default" : "outline"}
                                size="sm"
                                className={`w-[120px] h-[40px] flex items-center justify-center gap-1 ${
                                  feedbackType === "negative" ? "bg-red-600 hover:bg-red-700" : ""
                                }`}
                                onClick={async () => {
                                  if (!userEmail) {
                                    toast({
                                      title: "Email not found",
                                      description:
                                        "Your email is required to submit feedback. Please try registering again.",
                                      variant: "destructive",
                                    })
                                    console.error("No email found for feedback submission")
                                    return
                                  }

                                  setIsSubmittingFeedback(true)
                                  try {
                                    // Submit negative feedback immediately
                                    const response = await fetch("/api/notion-feedback", {
                                      method: "POST",
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                      body: JSON.stringify({
                                        email: userEmail,
                                        estimateFeedback: "negative",
                                        extraFeedback: extraFeedback.trim() || undefined,
                                        salaryOutput: formatCurrency(calculatedSalary, currency), // Add the formatted salary
                                      }),
                                    })

                                    const data = await response.json()

                                    if (!data.success) {
                                      throw new Error(data.error || "Failed to submit feedback")
                                    }

                                    setFeedbackType("negative")
                                    toast({
                                      title: "Feedback recorded",
                                      description: "Your negative feedback has been saved.",
                                    })
                                    console.log("Negative feedback submitted successfully for email:", userEmail)
                                  } catch (error) {
                                    console.error("Error submitting feedback:", error)
                                    toast({
                                      title: "Error",
                                      description: "There was a problem submitting your feedback. Please try again.",
                                      variant: "destructive",
                                    })
                                  } finally {
                                    setIsSubmittingFeedback(false)
                                  }
                                }}
                                disabled={isSubmittingFeedback}
                              >
                                <ThumbsDown className="h-4 w-4" />
                                <span>No</span>
                              </Button>
                            </div>

                            {feedbackType && (
                              <div className="space-y-3">
                                <div>
                                  <Label htmlFor="extraFeedback">Additional feedback (optional)</Label>
                                  <Textarea
                                    id="extraFeedback"
                                    placeholder="Tell us more about your thoughts on this estimate..."
                                    value={extraFeedback}
                                    onChange={(e) => setExtraFeedback(e.target.value)}
                                    className="mt-1"
                                    rows={3}
                                  />
                                </div>
                                <Button
                                  type="button"
                                  onClick={async () => {
                                    if (!extraFeedback.trim()) {
                                      toast({
                                        title: "No additional feedback",
                                        description: "Please enter some text or close this section.",
                                      })
                                      return
                                    }

                                    if (!userEmail) {
                                      toast({
                                        title: "Email not found",
                                        description:
                                          "Your email is required to submit feedback. Please try registering again.",
                                        variant: "destructive",
                                      })
                                      console.error("No email found for feedback submission")
                                      return
                                    }

                                    setIsSubmittingFeedback(true)
                                    try {
                                      // Submit additional feedback
                                      const response = await fetch("/api/notion-feedback", {
                                        method: "POST",
                                        headers: {
                                          "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                          email: userEmail,
                                          estimateFeedback: feedbackType,
                                          extraFeedback: extraFeedback.trim(),
                                          salaryOutput: formatCurrency(calculatedSalary, currency), // Add the formatted salary
                                        }),
                                      })

                                      const data = await response.json()

                                      if (!data.success) {
                                        throw new Error(data.error || "Failed to submit feedback")
                                      }

                                      setFeedbackSubmitted(true)
                                      toast({
                                        title: "Thank you for your feedback!",
                                        description: "Your additional comments have been saved.",
                                      })
                                      console.log("Additional feedback submitted successfully for email:", userEmail)
                                    } catch (error) {
                                      console.error("Error submitting additional feedback:", error)
                                      toast({
                                        title: "Error",
                                        description:
                                          "There was a problem submitting your additional feedback. Please try again.",
                                        variant: "destructive",
                                      })
                                    } finally {
                                      setIsSubmittingFeedback(false)
                                    }
                                  }}
                                  className="w-full flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700"
                                  disabled={isSubmittingFeedback}
                                >
                                  {isSubmittingFeedback ? (
                                    "Submitting..."
                                  ) : (
                                    <>
                                      <Send className="h-4 w-4" />
                                      <span>Submit Additional Feedback</span>
                                    </>
                                  )}
                                </Button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                            <div className="text-green-600 mb-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 mx-auto"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                            <h3 className="text-lg font-medium mb-1">Thank you for your feedback!</h3>
                            <p className="text-gray-600">Your input helps us improve our salary estimates.</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        <div className="text-3xl md:text-5xl font-bold text-gray-300 mb-2">—</div>
                        <p className="text-gray-500 text-sm">
                          Fill out the form and click "Calculate" to see your estimated base salary.
                        </p>
                      </div>
                    )}

                    <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                      <p className="font-medium mb-1">Note:</p>
                      <p>
                        Base salary is primarily based on role, experience, and location, with adjustments for
                        specialization, performance, and client book. Recruiters with existing clients or in high-demand
                        sectors typically earn higher total compensation once commissions and bonuses are considered.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-6 bg-blue-50 p-4 rounded-md text-sm text-blue-800">
                  <p className="font-medium mb-2">Disclaimer:</p>
                  <p>
                    This calculator is currently optimized for the UK, USA, Dubai, Amsterdam, Australia, Singapore, and
                    Hong Kong. It estimates base salaries only – commissions and bonuses are not included.
                  </p>
                  <p className="mt-2">
                    Please note: Salaries may vary depending on company size, budget, internal salary bands, team
                    structure, culture fit, individual negotiation, and market timing. These estimates serve as a
                    general guide and should not be treated as guaranteed offers.
                  </p>
                  <p className="mt-2">More regions will be supported soon.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-100 py-6 mt-12">
        <div className="container mx-auto px-4 md:px-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Recruitica. All rights reserved.</p>
          <p className="mt-1">Data sourced from the Recruitica 2025 Salary Guide.</p>
        </div>
      </footer>
    </div>
  )
}

