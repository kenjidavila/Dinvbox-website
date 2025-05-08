"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function CountrySearch({ countries, onSelectCountry }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [filteredCountries, setFilteredCountries] = useState([])
  const searchRef = useRef(null)

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filtered = Object.entries(countries)
        .filter(
          ([code, country]) =>
            country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            code.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .map(([code, country]) => ({ code, ...country }))
        .sort((a, b) => a.name.localeCompare(b.name))

      setFilteredCountries(filtered)
      setIsOpen(filtered.length > 0)
    } else {
      setFilteredCountries([])
      setIsOpen(false)
    }
  }, [searchTerm, countries])

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleCountrySelect = (country) => {
    onSelectCountry(country)
    setSearchTerm("")
    setIsOpen(false)
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case "obligatorio":
        return "Obligatorio"
      case "parcial":
        return "Parcialmente obligatorio"
      case "voluntario":
        return "Voluntario"
      case "planificado":
        return "Planificado"
      default:
        return "Desconocido"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "obligatorio":
        return "bg-green-100 text-green-800"
      case "parcial":
        return "bg-amber-100 text-amber-800"
      case "voluntario":
        return "bg-blue-100 text-blue-800"
      case "planificado":
        return "bg-violet-100 text-violet-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Buscar país..."
          className="pl-10 pr-10 border-gray-200 focus:border-navy-300 focus:ring-navy-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 text-gray-400 hover:text-gray-600"
            onClick={() => setSearchTerm("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto border border-gray-200">
          <ul className="py-1">
            {filteredCountries.map((country) => (
              <li
                key={country.code}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleCountrySelect(country)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{country.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(country.status)}`}>
                    {getStatusLabel(country.status)}
                  </span>
                </div>
                {country.year && (
                  <p className="text-xs text-gray-500 mt-1">
                    {country.status === "planificado" ? "Planificado para" : "Desde"} {country.year}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
