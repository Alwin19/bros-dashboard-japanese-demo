"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "@/app/actions/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90 transition disabled:opacity-50"
    >
      {pending ? "Logging in..." : "Login"}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useActionState(login, undefined);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen min-w-[400px] px-2">
      <Card className="w-full max-w-md mx-auto shadow-lg ">
        <CardContent className="px-6 py-6">
          <h3 className="text-md sm:text-xl font-bold text-center text-primary">
            BROS
          </h3>
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 text-primary">
            Dashboard Eksekutif
          </h3>
          <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-8">Login</h1>
          
          {state?.error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm">
              {state.error}
            </div>
          )}
          
          <form action={formAction} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1">
                Username
              </label>
              <input
                id="username"
                name="username" 
                type="text" 
                autoComplete="username"
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary text-sm"
                placeholder="admin"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="w-full px-3 py-2 pr-10 border rounded focus:outline-none focus:ring focus:border-primary text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}