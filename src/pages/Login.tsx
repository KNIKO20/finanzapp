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
const API_URL = import.meta.env.VITE_API_URL;

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(`http://${API_URL}:8000/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include"
    })
    .then(()=>navigate("/dashboard"))
    .catch((err)=>console.log(err.message))
  };

  return (
    <>
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className={cn("flex flex-col gap-6")}>
            <div className='fixed top-4 right-2 z-50'>
              <div>
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" children={undefined}>
                </ThemeProvider>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
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
                      <a
                          href="#"
                          className="ml-4 inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a>
                    </div>
                    <div className="flex flex-col gap-3">
                      <Button type="submit" className="w-full text-neutral-50">
                        Login
                      </Button>
                      {/* <Button variant="outline" className="w-full">
                        Login with Google
                      </Button> */}
                    </div>
                  </div>
                  <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link to={"/register"} className="underline underline-offset-4">
                      Sign up
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