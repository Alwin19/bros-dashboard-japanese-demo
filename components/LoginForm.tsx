"use client";

import { useFormStatus } from "react-dom";
import { login } from "@/app/actions/auth";
import { Card, CardContent } from "@/components/ui/card";

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition disabled:opacity-50 text-base font-medium"
    >
      {pending ? "ログイン中..." : "デモを開始する"}
    </button>
  );
}

export default function LoginForm() {
  return (
    <div className="flex justify-center items-center min-h-screen px-2">
      <Card className="w-full max-w-sm mx-auto shadow-lg">
        <CardContent className="px-8 py-10 flex flex-col items-center gap-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary">BROS</h1>
            <p className="text-lg font-semibold text-primary">経営ダッシュボード</p>
          </div>
          <p className="text-sm text-muted-foreground text-center">デモ版</p>
          <form action={login} className="w-full">
            <LoginButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
