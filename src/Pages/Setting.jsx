
import React, { useState } from 'react';
import { FiUser, FiBell, FiLock, FiMonitor, FiToggleLeft, FiToggleRight } from 'react-icons/fi';

export default function SettingsUI() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6 text-slate-900 dark:text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <div className="space-y-6">
          {/* Profile Settings */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl shadow p-5">
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <FiUser /> Profile Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-500">Full Name</label>
                <input className="w-full p-2 mt-1 rounded-lg border dark:border-slate-700 bg-white dark:bg-slate-700" placeholder="Enter name" />
              </div>
              <div>
                <label className="text-sm text-slate-500">Email</label>
                <input className="w-full p-2 mt-1 rounded-lg border dark:border-slate-700 bg-white dark:bg-slate-700" placeholder="Enter email" />
              </div>
            </div>
          </section>

          {/* Notification Settings */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl shadow p-5">
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <FiBell /> Notifications
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Email Notifications</div>
                  <div className="text-xs text-slate-500">Receive updates on email</div>
                </div>
                <button onClick={() => setEmailNotif(e => !e)} className="text-3xl">
                  {emailNotif ? <FiToggleRight className="text-emerald-500" /> : <FiToggleLeft />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">SMS Alerts</div>
                  <div className="text-xs text-slate-500">Get critical alerts on SMS</div>
                </div>
                <button onClick={() => setSmsNotif(e => !e)} className="text-3xl">
                  {smsNotif ? <FiToggleRight className="text-emerald-500" /> : <FiToggleLeft />}
                </button>
              </div>
            </div>
          </section>

          {/* Privacy & Security */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl shadow p-5">
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <FiLock /> Privacy & Security
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-500">Change Password</label>
                <input type="password" className="w-full p-2 mt-1 rounded-lg border dark:border-slate-700 bg-white dark:bg-slate-700" placeholder="New password" />
              </div>
              <div>
                <label className="text-sm text-slate-500">Two-Factor Authentication</label>
                <button className="mt-1 px-3 py-2 rounded-lg bg-emerald-500 text-white">Enable</button>
              </div>
            </div>
          </section>

          {/* Appearance */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl shadow p-5">
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <FiMonitor /> Appearance
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Dark Mode</div>
                <div className="text-xs text-slate-500">Switch theme between light & dark</div>
              </div>
              <button onClick={() => setDarkMode(d => !d)} className="text-3xl">
                {darkMode ? <FiToggleRight className="text-emerald-500" /> : <FiToggleLeft />}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
