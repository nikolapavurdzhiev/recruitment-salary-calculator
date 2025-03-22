"use client"

import type React from "react"

import { useState } from "react"

interface MultiSelectProps {
  options: string[]
  selected: string[]
  onChange: (value: string[]) => void
  placeholder: string
  onAddCustomOption?: (value: string) => void
}

export function MultiSelect({ options, selected, onChange, placeholder, onAddCustomOption }: MultiSelectProps) {
  const [customValue, setCustomValue] = useState("")

  const handleSelect = (option: string) => {
    if (selected.includes(option)) {
      // Only update if the item is actually in the array
      onChange(selected.filter((item) => item !== option))
    } else if (!selected.includes(option)) {
      // Only update if the item is not already in the array
      onChange([...selected, option])
    }
  }

  const handleCustomSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && customValue.trim() !== "") {
      e.preventDefault()
      if (onAddCustomOption) {
        onAddCustomOption(customValue.trim())
        setCustomValue("")
      }
    }
  }

  return (
    <div className="border rounded-md">
      <div className="flex flex-wrap gap-1 p-2">
        {selected.length > 0 ? (
          selected.map((item) => (
            <div key={item} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm flex items-center">
              {item}
              <button
                type="button"
                onClick={() => handleSelect(item)}
                className="ml-1 text-blue-500 hover:text-blue-700"
              >
                ×
              </button>
            </div>
          ))
        ) : (
          <div className="text-gray-500">{placeholder}</div>
        )}
      </div>
      <div className="border-t p-2 max-h-60 overflow-y-auto">
        {options.map((option) => (
          <div
            key={option}
            className={`px-2 py-1 cursor-pointer hover:bg-gray-100 ${selected.includes(option) ? "bg-blue-50" : ""}`}
            onClick={() => handleSelect(option)}
          >
            <div className="flex items-center">
              <input type="checkbox" checked={selected.includes(option)} onChange={() => {}} className="mr-2" />
              {option}
            </div>
          </div>
        ))}

        {selected.includes("Other") && (
          <div className="px-2 py-1 mt-2">
            <input
              type="text"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              onKeyDown={handleCustomSubmit}
              placeholder="Type and press Enter to add"
              className="w-full p-1 border rounded"
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  )
}

