import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ThemeProvider } from "@/components/theme-provider"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { AlertCircleIcon } from "lucide-react"
import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert"
const API_URL = import.meta.env.VITE_API_URL;

export function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
 const [Message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(password !== confirmPassword){
      setMessage("Please put the same password in both fields.")
      setErrorMessage(true);
      return;
    }

    await fetch(`http://${API_URL}:8000/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    .then(res => {if (res.status === 400) {
      setMessage("Does not comply the requirements")
      setErrorMessage(true);
      return;
    } else if (res.status === 409){
      setMessage("Email already resgistered")
      setErrorMessage(true);
    }
    else {navigate("/")}})
    .catch((err)=>console.log(err.message))
  };

  return (
    <>
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
            {errorMessage && (
                <div className="grid w-full max-w-xl items-start justify-center gap-4">
                  <Alert variant="destructive">
                    <AlertCircleIcon />
                    <AlertTitle>{Message}</AlertTitle>
                  </Alert>
                </div> 
          )}
          <div className={cn("flex flex-col gap-6")}>
                  <div className='fixed top-4 right-2 z-50'>
                    <div>
                      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" children={undefined}>
                      </ThemeProvider>
                    </div>
                  </div>
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Please enter a valid email address and create a secure password with at least 8 characters, including uppercase, lowercase, numbers, and symbols.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={email} 
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password" >Password</Label>
                    </div>
                    <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)}/>
                    <div className="flex items-center">
                      <Label htmlFor="password" >Confirm your password</Label>
                    </div>
                    <Input id="confirmPassword" type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full text-neutral-50">
                      Register
                    </Button>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm">
                  Do you have an account?{" "}
                  <Link to={"/"} className="underline underline-offset-4">
                    Log in
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
          </div>
        </div>
        </div>
    </>
  )
}