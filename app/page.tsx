import { redirect } from "next/navigation"

export default function Home() {
  // Redirect directly to the calculator
  redirect("/billings-calculator")
}

