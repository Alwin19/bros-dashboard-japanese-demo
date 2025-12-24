"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "@/app/actions/auth";
import { Card, CardContent } from "@/components/ui/card";

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
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary text-sm"
                placeholder="••••••••"
              />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}