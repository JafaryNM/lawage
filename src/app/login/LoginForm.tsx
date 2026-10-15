"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { AlertCircle, Eye, EyeOff, Loader2, LockKeyhole, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ApiError } from "@/lib/api/client";
import { useLogin } from "@/lib/api/queries";
import { LoginSchema } from "@/lib/validation/schemas";

type LoginValues = z.infer<typeof LoginSchema>;

const labelClass = "text-xs font-normal uppercase tracking-[0.16em] text-muted-foreground";
const inputClass = "h-12 bg-white pl-11 text-sm shadow-none focus-visible:ring-1";

export function LoginForm() {
  const router = useRouter();
  const login = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  // Same schema the API validates with (src/lib/validation/schemas.ts)
  const form = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = (values: LoginValues) =>
    login.mutate(values, {
      onSuccess: () => {
        router.replace("/admin");
        router.refresh();
      },
      onError: (error) => {
        if (!(error instanceof ApiError)) return;
        for (const [field, message] of Object.entries(error.fieldErrors)) {
          form.setError(field as keyof LoginValues, { message });
        }
      },
    });

  const error = login.error;
  const message =
    error instanceof ApiError && !Object.keys(error.fieldErrors).length
      ? error.message
      : error && !(error instanceof ApiError)
        ? "Sign-in is unavailable right now. Please try again later."
        : null;
  const pending = login.isPending || login.isSuccess;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 grid gap-5" noValidate>
        {message && (
          <Alert variant="destructive" className="border-gold/40 bg-gold/5 text-foreground [&>svg]:text-gold">
            <AlertCircle className="size-4" />
            <AlertDescription className="text-foreground">{message}</AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Username</FormLabel>
              <div className="relative">
                <User className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-brand/60" />
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="username"
                    autoFocus
                    placeholder="Your username"
                    className={inputClass}
                  />
                </FormControl>
              </div>
              <FormMessage className="text-gold" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Password</FormLabel>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-brand/60" />
                <FormControl>
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Your password"
                    className={`${inputClass} pr-12`}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute top-1/2 right-2 size-8 -translate-y-1/2 text-muted-foreground hover:bg-transparent hover:text-brand"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </Button>
              </div>
              <FormMessage className="text-gold" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={pending}
          className="mt-2 h-13 text-sm font-normal uppercase tracking-[0.18em] hover:bg-brand-deep"
        >
          {pending && <Loader2 className="size-4 animate-spin" />}
          {pending ? "Signing in…" : "Sign In"}
        </Button>
      </form>
    </Form>
  );
}
