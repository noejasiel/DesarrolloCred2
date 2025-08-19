// components/Button.js
export default function Button({ children }) {
    return (
      <button className="bg-black text-white px-6 py-3 border border-black hover:bg-white hover:text-black transition-all duration-300">
        {children}
      </button>
    )
  }
  