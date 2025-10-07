"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format, subDays, startOfMonth, endOfMonth, startOfYear, endOfYear, subMonths, subYears } from "date-fns"
import { id } from "date-fns/locale"
import { DateRange } from "react-day-picker"

type DatePreset = 
  | "bulan-ini"
  | "kemarin"
  | "bulan-lalu"
  | "tahun-ini"
  | "tahun-lalu"
  | "12-bulan-terakhir"
  | "custom"

export function DateFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const today = new Date()
  
  // Get preset from URL or default to "bulan-ini"
  const [preset, setPreset] = useState<DatePreset>(
    (searchParams.get("preset") as DatePreset) || "bulan-ini"
  )
  
  // Get dates from URL or calculate from preset
  const getInitialDates = () => {
    const urlStart = searchParams.get("startDate")
    const urlEnd = searchParams.get("endDate")
    
    if (urlStart && urlEnd) {
      return {
        from: new Date(urlStart),
        to: new Date(urlEnd)
      }
    }
    
    return calculateDateRange("bulan-ini")
  }
  
  const [dateRange, setDateRange] = useState<DateRange | undefined>(getInitialDates())

  // Calculate date range based on preset
  function calculateDateRange(preset: DatePreset): DateRange {
    switch (preset) {
      case "bulan-ini":
        return {
          from: startOfMonth(today),
          to: today
        }
      
      case "kemarin":
        const yesterday = subDays(today, 1)
        return {
          from: yesterday,
          to: yesterday
        }
      
      case "bulan-lalu":
        const lastMonth = subMonths(today, 1)
        return {
          from: startOfMonth(lastMonth),
          to: endOfMonth(lastMonth)
        }
      
      case "tahun-ini":
        return {
          from: startOfYear(today),
          to: today
        }
      
      case "tahun-lalu":
        const lastYear = subYears(today, 1)
        return {
          from: startOfYear(lastYear),
          to: endOfYear(lastYear)
        }
      
      case "12-bulan-terakhir":
        return {
          from: subMonths(today, 12),
          to: today
        }
      
      case "custom":
        return dateRange || { from: today, to: today }
      
      default:
        return {
          from: startOfMonth(today),
          to: today
        }
    }
  }

  // Handle preset change
  const handlePresetChange = (value: DatePreset) => {
    setPreset(value)
    
    if (value !== "custom") {
      const newRange = calculateDateRange(value)
      setDateRange(newRange)
      applyFilter(value, newRange)
    }
  }

  // Apply filter and update URL
  const applyFilter = (selectedPreset: DatePreset, range: DateRange) => {
    if (!range.from || !range.to) return

    const params = new URLSearchParams(searchParams)
    params.set("preset", selectedPreset)
    params.set("startDate", format(range.from, "yyyy-MM-dd"))
    params.set("endDate", format(range.to, "yyyy-MM-dd"))
    
    router.push(`/?${params.toString()}`)
  }

  // Handle custom date range selection
  const handleCustomDateChange = (range: DateRange | undefined) => {
    setDateRange(range)
    if (range?.from && range?.to) {
      setPreset("custom")
      applyFilter("custom", range)
    }
  }

  return (
    <div className="flex items-center gap-2">
      {/* Preset Selector */}
      <Select value={preset} onValueChange={handlePresetChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="bulan-ini">Bulan Ini</SelectItem>
          <SelectItem value="kemarin">Kemarin</SelectItem>
          <SelectItem value="bulan-lalu">Bulan Lalu</SelectItem>
          <SelectItem value="tahun-ini">Tahun Ini</SelectItem>
          <SelectItem value="tahun-lalu">Tahun Lalu</SelectItem>
          <SelectItem value="12-bulan-terakhir">12 Bulan Terakhir</SelectItem>
          <SelectItem value="custom">Custom Range</SelectItem>
        </SelectContent>
      </Select>

      {/* Custom Date Range Picker (only show when custom is selected) */}
      {preset === "custom" && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="min-w-[240px] justify-start text-left">
              <Calendar className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "dd MMM yyyy", { locale: id })} -{" "}
                    {format(dateRange.to, "dd MMM yyyy", { locale: id })}
                  </>
                ) : (
                  format(dateRange.from, "dd MMM yyyy", { locale: id })
                )
              ) : (
                <span>Pilih tanggal</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <CalendarComponent
              mode="range"
              selected={dateRange}
              onSelect={handleCustomDateChange}
              numberOfMonths={2}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      )}

      {/* Display current date range */}
      {preset !== "custom" && dateRange?.from && dateRange?.to && (
        <div className="text-sm text-muted-foreground">
          {format(dateRange.from, "dd MMM yyyy", { locale: id })} -{" "}
          {format(dateRange.to, "dd MMM yyyy", { locale: id })}
        </div>
      )}
    </div>
  )
}