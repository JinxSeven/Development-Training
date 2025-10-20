"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UserLoginRequest, FormFieldValidations } from "../interfaces/user";
import { useEffect, useMemo, useState } from "react";
import { authLogin } from "../api/userService";

export default function Login() {
  const [errors, setErrors] = useState<FormFieldValidations>({});
  const disableSubmit = useMemo(() => {
    return errors.username !== null || errors.password !== null;
  }, [errors.username, errors.password]);

  const validateField = (e: React.FocusEvent<HTMLInputElement>) => {
    const fieldValidations: FormFieldValidations = {};
    const { name, value } = e.target;

    switch (name) {
      case "username":
        if (!/^(?!.*(__|--|\.\.))(?=(.*[a-z]){3})[a-z0-9_.-]+$/.test(value)) {
          fieldValidations.username = "Username not valid";
        } else fieldValidations.username = null;
        break;
      case "password":
        if (value.trim() === "") {
          fieldValidations.password = "Password cannot be empty";
        } else fieldValidations.password = null;
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: fieldValidations[name as keyof FormFieldValidations],
    }));
  };

  async function onSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const loginCred: UserLoginRequest = {
      username: e.target.username.value,
      password: e.target.password.value
    }

    authLogin(loginCred)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <h2 className="mt-10 text-center text-2xl/10 font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-6 sm:w-full sm:max-w-sm">
        <form onSubmit={onSignIn} method="POST" className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="username" className="px-1 font-thin text-base">
                Username
              </Label>
              {errors.username && (
                <div className="text-sm text-red-700">{errors.username}</div>
              )}
            </div>
            <div className="mt-2">
              <Input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                onChange={validateField}
                onBlur={validateField}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="px-1 font-thin text-base">
                Password
              </Label>
              {errors.password && (
                <div className="text-sm text-red-700">{errors.password}</div>
              )}
            </div>
            <div className="mt-2">
              <Input
                id="password"
                name="password"
                type="password"
                // required
                autoComplete="current-password"
                onChange={validateField}
                onBlur={validateField}
                min={8}
              />
            </div>
          </div>

          <div>
            <Button
              variant="outline"
              className="text-base"
              type="submit"
              disabled={disableSubmit}
            >
              Sign In
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Not a member?{" "}
          <Link
            href="/register"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
