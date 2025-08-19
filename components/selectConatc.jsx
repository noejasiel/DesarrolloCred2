"use client"

import * as React from "react"
import { ChevronDown, Check } from "lucide-react"

// clsx/cn embebido
function cn(...inputs) {
  return inputs
    .flat()
    .map((input) => {
      if (!input) return ""
      if (typeof input === "string" || typeof input === "number") return input
      if (typeof input === "object") {
        return Object.entries(input)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key)
          .join(" ")
      }
      return ""
    })
    .filter(Boolean)
    .join(" ")
}

// Contexto para compartir valor
const SelectContext = React.createContext()

const Select = ({ value, onValueChange, children }) => {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (val) => {
    onValueChange(val)
    setOpen(false)
  }

  return (
    <SelectContext.Provider value={{ open, setOpen, value, onSelect: handleSelect }}>
      <div className="relative w-full">{children}</div>
    </SelectContext.Provider>
  )
}

const SelectTrigger = ({ children, className }) => {
  const { open, setOpen } = React.useContext(SelectContext)

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-3xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-pink-400",
        className
      )}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50 ml-2" />
    </button>
  )
}


const SelectValue = ({ placeholder }) => {
  const { value } = React.useContext(SelectContext)
  return (
    <span className={cn("truncate", !value && "text-white")}>
      {value || placeholder}
    </span>
  )
}

const SelectContent = ({ children, className }) => {
  const { open } = React.useContext(SelectContext)
  if (!open) return null

  return (
    <div
      className={cn(
        "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-3xl border border-white/20 bg-blackbackdrop-blur-md py-1 text-sm shadow-lg text-white",
        className
      )}
    >
      {children}
    </div>
  )
}


const SelectItem = ({ value, children }) => {
  const { value: selectedValue, onSelect } = React.useContext(SelectContext)

  return (
    <div
      onClick={() => onSelect(value)}
      className={cn(
        "cursor-pointer select-none px-4 py-2 rounded-2xl hover:bg-white/20 hover:text-white text-white placeholder:text-white/60 backdrop-blur-md transition-colors",
        selectedValue === value && "bg-white/20 text-white font-semibold"
      )}
    >
      {children}
      {selectedValue === value && <Check className="h-4 w-4 ml-2" />}
    </div>
  )
}


export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
}
