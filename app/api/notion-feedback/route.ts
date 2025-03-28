import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, estimateFeedback, extraFeedback, salaryOutput } = await request.json()

    if (!email || !estimateFeedback) {
      console.error("Missing required fields:", { email, estimateFeedback })
      return NextResponse.json({ success: false, error: "Email and feedback are required" }, { status: 400 })
    }

    console.log("Processing feedback for email:", email)
    console.log("Feedback type:", estimateFeedback)
    if (extraFeedback) console.log("Extra feedback provided:", extraFeedback)
    if (salaryOutput) console.log("Salary output provided:", salaryOutput)

    // First, query the Notion database to find the record with the matching email
    console.log("Querying Notion database for email:", email)
    const queryResponse = await fetch(`https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: {
          property: "Email",
          email: {
            equals: email.toLowerCase().trim(),
          },
        },
      }),
    })

    if (!queryResponse.ok) {
      const errorText = await queryResponse.text()
      console.error("Notion API error during query:", errorText)
      return NextResponse.json({ success: false, error: "Failed to query Notion database" }, { status: 500 })
    }

    const data = await queryResponse.json()
    console.log("Query results count:", data.results.length)

    if (data.results.length === 0) {
      console.error("Email not found in database:", email)
      return NextResponse.json({ success: false, error: "Email not found in database" }, { status: 404 })
    }

    // Get the page ID of the first matching record
    const pageId = data.results[0].id
    console.log("Found page ID:", pageId)

    // Prepare the properties to update with the exact column names
    const properties: any = {
      // Using the exact column name "Feedback Response" as specified
      "Feedback Response": {
        select: {
          name: estimateFeedback === "positive" ? "Positive" : "Negative",
        },
      },
    }

    // Add extra feedback if provided using the exact column name "Additional Feedback"
    if (extraFeedback) {
      properties["Additional Feedback"] = {
        rich_text: [
          {
            text: {
              content: extraFeedback,
            },
          },
        ],
      }
    }

    // Add salary output if provided
    if (salaryOutput) {
      properties["Salary Output"] = {
        rich_text: [
          {
            text: {
              content: salaryOutput,
            },
          },
        ],
      }
    }

    // Update the Notion page with the feedback
    console.log("Updating Notion page with properties:", JSON.stringify(properties))
    const updateResponse = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties,
      }),
    })

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text()
      console.error("Notion API update error:", errorText)
      return NextResponse.json({ success: false, error: "Failed to update Notion record" }, { status: 500 })
    }

    console.log("Successfully updated Notion record with feedback")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating feedback in Notion:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

