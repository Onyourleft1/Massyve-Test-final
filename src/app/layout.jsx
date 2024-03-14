"use client";

import { LoginProvider } from "@/context/LoginContext";
import { UserProvider } from "@/context/UserContext";
import React from "react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LoginProvider>
          <UserProvider>{children}</UserProvider>
        </LoginProvider>
      </body>
    </html>
  );
}
