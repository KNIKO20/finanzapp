"use client"

import * as React from "react"

import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Status = {
  value: string
  label: string
}
type Props = {
  onChange: (value: string | undefined) => void;
  value: string;
};



const statuses: Status[] = [
  {
    value: "expenditure",
    label: "Expenditure",
  },
  {
    value: "income",
    label: "Income",
  },
  {
    value: "monthly-income",
    label: "Monthly Income",
  },
  {
    value: "monthly-expenditure",
    label: "Monthly Expenditure",
  },
  {
    value: "loan",
    label: "Loan",
  },
]


export function ComboBoxResponsiveType({ onChange, value }: Props) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  )

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[170px] justify-start text-neutral-50 overflow-x-auto overflow-y-hidden">
            {selectedStatus ? <>{selectedStatus.label}</> : value ? <>{value[0].toUpperCase() + value.slice(1)}</> :<>+ Set type</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} onChange={onChange}/>
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start text-neutral-50 overflow-x-scroll overflow-y-hidden">
          {selectedStatus ? <>{selectedStatus.label}</> : value ? <>{value[0].toUpperCase() + value.slice(1)}</> : <>+ Set type</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} onChange={onChange}/>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function StatusList({
  setOpen,
  setSelectedStatus,
  onChange
  
}: {
  setOpen: (open: boolean) => void
  setSelectedStatus: (status: Status | null) => void
  onChange: (value: string | undefined) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter type..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {statuses.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                
                const selected = statuses.find((priority) => priority.value === value) || null
                
                setSelectedStatus(selected)
                onChange(selected?.value ?? undefined)
                setOpen(false)
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
