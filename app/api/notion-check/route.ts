import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Query Notion database to check if email exists
    const response = await fetch(`https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: {
          property: "Email",
          rich_text: {
            equals: email.toLowerCase().trim(),
          },
        },
      }),
    })

    if (!response.ok) {
      console.error("Notion API error:", await response.text())
      return NextResponse.json({ error: "Failed to query Notion database" }, { status: 500 })
    }

    const data = await response.json()
    const exists = data.results.length > 0

    return NextResponse.json({ exists, email: email.toLowerCase().trim() })
  } catch (error) {
    console.error("Error checking email in Notion:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

