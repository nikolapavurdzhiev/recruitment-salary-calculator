import { Suspense } from "react"
import BillingsCalculator from "../../billings-calculator"

export default function CalculatorPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <BillingsCalculator />
    </Suspense>
  )
}

