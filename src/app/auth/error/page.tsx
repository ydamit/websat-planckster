"use client";

import { signIn } from "next-auth/react";
import React from "react";

const ErrorPage: React.FC = () => {
  return (
    <div>
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-green-500">
        <div className="flex flex-col items-center"></div>
        <h1 className="mb-8 text-4xl  font-bold"> SDA Planckster </h1>
        <h5 className="10s mb-8 animate-pulse text-sm  font-bold">alpha</h5>
        <div className="w-10"></div>
        <div
          className="animate-fade-in mt-8 transform rounded-md border border-gray-300 p-6 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
          onClick={() => signIn()}
        >
          <h2 className="mb-4 text-2xl font-bold">Login</h2>
          <h2>Something went wrong!</h2>
          <button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => signIn()
            }
          >
            Check your credentials and try again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
