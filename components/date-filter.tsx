"use client"

import { useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
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
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { format, subDays, startOfMonth, endOfMonth, startOfYear, endOfYear, subMonths, subYears } from "date-fns"
import { ja } from "date-fns/locale"
import { DateRange } from "react-day-picker"
import { useMobile } from "@/hooks/use-mobile"


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
  const pathname = usePathname()

  const today = new Date()

  const [preset, setPreset] = useState<DatePreset>(
    (searchParams.get("preset") as DatePreset) || "bulan-ini"
  )

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

  function calculateDateRange(preset: DatePreset): DateRange {
    switch (preset) {
      case "bulan-ini":
        return { from: startOfMonth(today), to: today }

      case "kemarin":
        const yesterday = subDays(today, 1)
        return { from: yesterday, to: yesterday }

      case "bulan-lalu":
        const lastMonth = subMonths(today, 1)
        return { from: startOfMonth(lastMonth), to: endOfMonth(lastMonth) }

      case "tahun-ini":
        return { from: startOfYear(today), to: today }

      case "tahun-lalu":
        const lastYear = subYears(today, 1)
        return { from: startOfYear(lastYear), to: endOfYear(lastYear) }

      case "12-bulan-terakhir":
        return { from: subMonths(today, 12), to: today }

      case "custom":
        return dateRange || { from: today, to: today }

      default:
        return { from: startOfMonth(today), to: today }
    }
  }

  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const handlePresetChange = (value: DatePreset) => {
    if (value === "custom" && preset === "custom") {
      setIsCalendarOpen(true)
      return
    }

    setPreset(value)

    if (value !== "custom") {
      const newRange = calculateDateRange(value)
      setDateRange(newRange)
      applyFilter(value, newRange)
    } else {
      setTimeout(() => setIsCalendarOpen(true), 100)
    }
  }

  const applyFilter = (selectedPreset: DatePreset, range: DateRange) => {
    if (!range.from || !range.to) return

    const params = new URLSearchParams(searchParams)
    params.set("preset", selectedPreset)
    params.set("startDate", format(range.from, "yyyy-MM-dd"))
    params.set("endDate", format(range.to, "yyyy-MM-dd"))

    router.push(`${pathname}?${params.toString()}`)
  }

  const handleCustomDateChange = (range: DateRange | undefined) => {
    setDateRange(range)
    if (range?.from && range?.to) {
      setPreset("custom")
      applyFilter("custom", range)
    }
  }

  const isMobile = useMobile();

  const dateRangeText = dateRange?.from && dateRange?.to
    ? `${format(dateRange.from, "yyyy年MM月dd日", { locale: ja })} - ${format(dateRange.to, "yyyy年MM月dd日", { locale: ja })}`
    : ""

  return (
    <div className="flex items-center gap-2">
      <Select value={preset} defaultValue="custom" onValueChange={handlePresetChange}>
        <SelectTrigger className="w-30 md:w-40 h-8 md:h-10 text-xs md:text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {isMobile && dateRangeText && (
              <>
                <SelectLabel className="text-xs text-muted-foreground font-normal px-2 py-1.5 mb-1">
                  {dateRangeText}
                </SelectLabel>
                <div className="border-b border-gray-200 mx-2 mb-2" />
              </>
            )}
            <SelectItem value="bulan-ini">今月</SelectItem>
            <SelectItem value="kemarin">昨日</SelectItem>
            <SelectItem value="bulan-lalu">先月</SelectItem>
            <SelectItem value="tahun-ini">今年</SelectItem>
            <SelectItem value="tahun-lalu">昨年</SelectItem>
            <SelectItem value="12-bulan-terakhir">過去12ヶ月</SelectItem>
            <SelectItem
              value="custom"
              onPointerDown={(e) => {
                if (preset === "custom") {
                  e.preventDefault()
                  setIsCalendarOpen(true)
                }
              }}
            >
              カスタム
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Custom Date Range Picker - Desktop Only */}
      {preset === "custom" && !isMobile && (
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={isMobile ? "flex-1 min-w-0 justify-start text-left" : "min-w-[240px] justify-start text-left"}
            >
              <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
              <span className="truncate">
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "yyyy年MM月dd日", { locale: ja })} -{" "}
                      {format(dateRange.to, "yyyy年MM月dd日", { locale: ja })}
                    </>
                  ) : (
                    format(dateRange.from, "yyyy年MM月dd日", { locale: ja })
                  )
                ) : (
                  "日付を選択"
                )}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className={isMobile ? "w-[calc(100vw-2rem)]" : "w-auto"}
            align={isMobile ? "center" : "end"}
            side="bottom"
            sideOffset={5}
          >
            <CalendarComponent
              mode="range"
              selected={dateRange}
              onSelect={handleCustomDateChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      )}

      {/* Custom Date Range Picker - Mobile Only */}
      {preset === "custom" && isMobile && (
        <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <DialogContent className="max-w-[70vw] sm:max-w-md">
            <DialogHeader>
              <DialogTitle>期間を選択</DialogTitle>
            </DialogHeader>
            <div className="flex justify-center py-4">
              <CalendarComponent
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={1}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">キャンセル</Button>
              </DialogClose>
              <Button
                onClick={() => {
                  if (dateRange?.from && dateRange?.to) {
                    setPreset("custom")
                    applyFilter("custom", dateRange)
                    setIsCalendarOpen(false)
                  }
                }}
                disabled={!dateRange?.from || !dateRange?.to}
              >
                選択
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {!isMobile && preset !== "custom" && dateRangeText && (
        <div className="text-sm text-muted-foreground">
          {dateRangeText}
        </div>
      )}
    </div>
  )
}
