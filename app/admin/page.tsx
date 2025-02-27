"use client";

import React from "react";
import { SignIn, useUser } from "@clerk/nextjs";
import UserManagement from "../Pages/UserManagement/UserManagement"; // Check if this path is correct

export default function AdminPage() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <p>Loading...</p>;

  if (!isSignedIn) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Sign In</h1>
        <SignIn path="/admin" routing="path" signUpUrl="/admin" />
      </div>
    );
  }

  const adminEmail = "sakthi77383@gmail.com";

  if (user.emailAddresses[0].emailAddress !== adminEmail) {
    return <p>Access Denied. You do not have permission to view this page.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, {user.firstName}!</p>
      <UserManagement />
    </div>
  );
}
