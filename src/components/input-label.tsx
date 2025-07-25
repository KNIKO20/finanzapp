import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputWithLabel() {


  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="email">email</Label>
      <Input type="email" id="email" placeholder="email" />
    </div>
  )
}
