import { Suspense } from "react"
import RegistrationForm from "../../registration-form"

export default function RegistrationPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <RegistrationForm />
    </Suspense>
  )
}

