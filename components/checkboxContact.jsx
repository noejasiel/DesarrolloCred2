import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "./cn"

const Checkbox = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <label className="inline-flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        ref={ref}
        className={cn(
          "peer h-4 w-4 appearance-none rounded-sm border border-primary bg-background text-primary ring-offset-background transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 checked:bg-primary checked:text-primary-foreground",
          className
        )}
        {...props}
      />
      <span className="pointer-events-none absolute text-white">
        <Check className="h-4 w-4 opacity-0 peer-checked:opacity-100" />
      </span>
    </label>
  )
})

Checkbox.displayName = "Checkbox"

export { Checkbox }
