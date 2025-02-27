"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type User = {
  id: string;
  email: string;
  firstName: string;
  banned: boolean;
};

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await res.json();

        if (!data || !Array.isArray(data.users)) {
          throw new Error("Invalid API response format");
        }

        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Error fetching users");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Function to ban or unban a user
  const updateUserStatus = async (userId: string, action: "ban" | "unban") => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action }),
      });

      if (!res.ok) {
        throw new Error(`Failed to ${action} user`);
      }

      toast.success(`User ${action}ned successfully`);
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, banned: action === "ban" } : user
        )
      );
    } catch (error) {
      console.error(`Error ${action}ning user:`, error);
      toast.error(`Error ${action}ning user`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border px-2 py-1">{user.id}</td>
                <td className="border px-2 py-1">{user.email}</td>
                <td className="border px-2 py-1">{user.firstName}</td>
                <td className="border px-2 py-1">
                  {user.banned ? "Banned" : "Active"}
                </td>
                <td className="border px-2 py-1">
                  {user.banned ? (
                    <button
                      onClick={() => updateUserStatus(user.id, "unban")}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Unban
                    </button>
                  ) : (
                    <button
                      onClick={() => updateUserStatus(user.id, "ban")}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Ban
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}
