import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, companyName, location, telephone, currentRole, recruitmentSector } =
      await request.json()

    // Validate required fields
    if (!firstName || !lastName || !email || !location || !currentRole || !recruitmentSector) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 },
      )
    }

    // Parse recruitment sectors for multi-select
    let sectorOptions = []
    if (Array.isArray(recruitmentSector)) {
      sectorOptions = recruitmentSector.map((sector) => ({ name: sector }))
    } else if (typeof recruitmentSector === "string") {
      sectorOptions = recruitmentSector.split(",").map((sector) => ({ name: sector.trim() }))
    }

    // Create properties object for Notion
    const notionProperties = {
      "First Name": {
        title: [
          {
            text: {
              content: firstName,
            },
          },
        ],
      },
      "Last Name": {
        rich_text: [
          {
            text: {
              content: lastName,
            },
          },
        ],
      },
      Email: {
        email: email.toLowerCase().trim(),
      },
      "Company Name": {
        rich_text: [
          {
            text: {
              content: companyName || "",
            },
          },
        ],
      },
      Location: {
        select: {
          name: location,
        },
      },
      "Current Role": {
        select: {
          name: currentRole,
        },
      },
      "Recruitment Sector": {
        multi_select: sectorOptions,
      },
    }

    // Only add telephone if it exists
    if (telephone) {
      // Try with "Telephone" instead of "Telephone Number"
      notionProperties["Telephone"] = {
        rich_text: [
          {
            text: {
              content: telephone,
            },
          },
        ],
      }
    }

    // Create a new page in Notion database
    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: process.env.NOTION_DATABASE_ID },
        properties: notionProperties,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Notion API error:", errorText)
      return NextResponse.json(
        {
          success: false,
          error: "Failed to create record in Notion",
          details: errorText,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error creating record in Notion:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}

