import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Register() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <h2 className="mt-10 text-center text-2xl/10 font-bold tracking-tight text-white">
          Register your new account
        </h2>
      </div>
      <div className="mt-10 sm:mx-6 sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6">
          <div>
            <Label htmlFor="username" className="pl-1 font-thin text-base">Username</Label>
            <div className="mt-2">
              <Input
                id="username"
                name="username"
                type="username"
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="pl-1 font-thin text-base">Email</Label>
            <div className="mt-2">
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="pl-1 font-thin text-base">Password</Label>
              <div className="text-sm"></div>
            </div>
            <div className="mt-2">
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                min={8}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="pl-1 font-thin text-base">Confirm password</Label>
              <div className="text-sm"></div>
            </div>
            <div className="mt-2">
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                autoComplete="new-password"
              />
            </div>
          </div>

          <div>
            <Button variant="outline" className="text-base">Sign Up</Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Already a member?{" "}
          <Link
            href="/login"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
