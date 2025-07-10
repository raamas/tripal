import type React from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TripalIcon } from "@/components/tripal-icon";
import Link from "next/link";
import GoogleButton from "@/components/google-button";

export default async function SignInPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <TripalIcon size={32} />
            <h1 className="text-2xl font-bold text-blue-600">TRIPAL</h1>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-medium text-gray-800 mb-6">
              Log In / Sign Up
            </h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-3 pt-2">
              <GoogleButton className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg disabled:opacity-50">
                Login with google
              </GoogleButton>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>
              Don't have an account?{" "}
              <Link
                href="/profile-completion"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Complete your profile
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
