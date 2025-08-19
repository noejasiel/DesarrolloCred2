export function cn(...inputs) {
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
  