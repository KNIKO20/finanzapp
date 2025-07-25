"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


type Props = {
  value?: Date;
  onChange: (date: Date | undefined) => void;
};

export function Calendar22({ value, onChange }: Props) {


  const [open, setOpen] = React.useState(false)
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(value);
  const [selectedTime, setSelectedTime] = React.useState("10:00:00");
  React.useEffect(() => {
    if (value) {
    const date = new Date(value);
    const timeString = date.toTimeString().split(" ")[0];
    setSelectedTime(timeString);
  }
}, [value]);
 

  React.useEffect(()=> {
    if (selectedDate && selectedTime) {
      const [hours, minutes, seconds] = selectedTime.split(":").map(Number)
      const combined = new Date(selectedDate);
      combined.setHours(hours,minutes,seconds);
      onChange(combined);
    }
}, [onChange, selectedDate, selectedTime])
  

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="date" className="px-1 label-form">
          Date  
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className="w-48 justify-between font-normal text-neutral-50"
            >
              {selectedDate ? selectedDate.toLocaleDateString() : value ? <>{new Date(value).toLocaleDateString('es-ES')}</> : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-x-scroll p-0" align="start">
            <Calendar
              mode="single"
              className="scale-90 w-[320px] sm:w-full h-[280px] "
              selected={selectedDate}
              captionLayout="dropdown"
              onSelect={(date) => {
                setSelectedDate(date ?? undefined)
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3 ">
        <Label htmlFor="time-picker" className="px-1 label-form">
          Time
        </Label>
        <Input
          type="time"
          id="time-picker"
          step="1"
          value={selectedTime}
          onChange={(e)=>setSelectedTime(e.target.value)}
          className=" text-neutral-50 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  )
}
