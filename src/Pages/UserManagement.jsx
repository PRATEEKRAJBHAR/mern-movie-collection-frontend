import React from "react";
import { Edit, Trash2, UserPlus, Search } from "lucide-react";

function UserManagement() {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@gmail.com",
      role: "admin",
      gender: "male",
      status: "active",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@gmail.com",
      role: "user",
      gender: "female",
      status: "inactive",
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          <UserPlus size={18} /> Add User
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex mb-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search users..."
            className="border w-full pl-10 pr-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg shadow-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Gender</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 capitalize">{user.role}</td>
                <td className="p-3 capitalize">{user.gender}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.status === "active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="p-3 text-center">
                  <div className="flex gap-4 justify-center">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit size={18} />
                    </button>

                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-5">
        <p className="text-sm text-gray-600">Showing 1–10 of 50 users</p>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border rounded-md hover:bg-gray-200">
            Prev
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded-md">
            1
          </button>
          <button className="px-3 py-1 border rounded-md hover:bg-gray-200">
            2
          </button>
          <button className="px-3 py-1 border rounded-md hover:bg-gray-200">
            3
          </button>
          <button className="px-3 py-1 border rounded-md hover:bg-gray-200">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
