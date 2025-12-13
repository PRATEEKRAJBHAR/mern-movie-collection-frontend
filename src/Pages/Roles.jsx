import React, { useState } from "react";
import { Edit, Trash2, UserPlus } from "lucide-react";

function Roles() {
  const [roles, setRoles] = useState([
    {
      id: 1,
      roleName: "Admin",
      permissions: {
        users: { view: true, create: true, edit: true, delete: true },
        movies: { view: true, create: true, edit: true, delete: true },
      },
    },
    {
      id: 2,
      roleName: "User",
      permissions: {
        users: { view: false, create: false, edit: false, delete: false },
        movies: { view: true, create: false, edit: false, delete: false },
      },
    },
  ]);

  const modules = ["users", "movies"];
  const actions = ["view", "create", "edit", "delete"];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Roles & Permissions</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          <UserPlus size={18} /> Add Role
        </button>
      </div>

      {/* Roles Table */}
      <div className="overflow-hidden rounded-lg shadow-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Permissions</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {roles.map((role) => (
              <tr key={role.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{role.roleName}</td>

                {/* Permission Grid */}
                <td className="p-4">
                  <div className="space-y-4">
                    {modules.map((module) => (
                      <div key={module}>
                        <h3 className="font-semibold capitalize mb-2">
                          {module} Module
                        </h3>
                        <div className="grid grid-cols-4 gap-4">
                          {actions.map((action) => (
                            <label
                              key={action}
                              className="flex gap-2 items-center text-sm"
                            >
                              <input
                                type="checkbox"
                                checked={
                                  role.permissions[module][action] || false
                                }
                                readOnly
                              />
                              {action}
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </td>

                {/* Action Buttons */}
                <td className="p-3">
                  <div className="flex justify-center gap-4">
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
    </div>
  );
}

export default Roles;
