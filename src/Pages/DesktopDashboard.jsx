// DesktopDashboard.jsx
// Single-file React component (default export) that renders a modern desktop-style admin/dashboard UI.
// Usage: place this file in a React project (Vite / CRA / Next.js) and import <DesktopDashboard /> inside your app.
// Styling: built with Tailwind CSS utility classes. Ensure Tailwind is installed and configured in your project.

import React, { useState, useMemo } from 'react';
import { FiMenu, FiSearch, FiBell, FiSun, FiMoon, FiHome, FiUsers, FiFileText, FiSettings } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const SampleMetrics = ({ title, value, delta }) => (
  <div className="bg-white dark:bg-slate-800 shadow-sm rounded-2xl p-4 min-w-[180px]">
    <div className="text-sm font-medium text-slate-500 dark:text-slate-300">{title}</div>
    <div className="mt-2 flex items-end justify-between">
      <div className="text-2xl font-bold text-slate-900 dark:text-white">{value}</div>
      <div className={`text-sm font-medium ${delta >= 0 ? 'text-green-600' : 'text-red-500'}`}>{delta >= 0 ? `+${delta}%` : `${delta}%`}</div>
    </div>
  </div>
);

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${active ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
    <Icon className="text-lg" />
    <span className="font-medium">{label}</span>
  </button>
);

export default function DesktopDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState('light');
  const [active, setActive] = useState('Home');

  const metrics = useMemo(() => [
    { title: 'Active Users', value: '8,342', delta: 4.5 },
    { title: 'Revenue', value: '$124.3k', delta: 2.1 },
    { title: 'New Signups', value: '1,024', delta: 8.9 },
  ], []);

  // toggle theme (simple class on document.body) — adapt per your app
  React.useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  const sidebarWidth = collapsed ? 72 : 260;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <div className="flex">
        {/* Sidebar */}
        <aside style={{ width: sidebarWidth }} className="h-screen sticky top-0 left-0 p-4 flex flex-col gap-4 transition-all">
          <div className="flex items-center gap-3">
            <button onClick={() => setCollapsed(c => !c)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
              <FiMenu />
            </button>
            {!collapsed && (
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">DB</div>
                <div>
                  <div className="font-bold">My Desktop</div>
                  <div className="text-xs text-slate-500 dark:text-slate-300">Admin Panel</div>
                </div>
              </div>
            )}
          </div>

          <nav className="flex-1 flex flex-col gap-2 mt-3">
            <SidebarItem icon={FiHome} label="Home" active={active==='Home'} onClick={() => setActive('Home')} />
            <SidebarItem icon={FiUsers} label="Users" active={active==='Users'} onClick={() => setActive('Users')} />
            <SidebarItem icon={FiFileText} label="Reports" active={active==='Reports'} onClick={() => setActive('Reports')} />
            <SidebarItem icon={FiSettings} label="Settings" active={active==='Settings'} onClick={() => setActive('Settings')} />
          </nav>

          <div className="mt-auto">
            {!collapsed && <div className="text-xs text-slate-500 dark:text-slate-300 mb-2">Workspace</div>}
            <div className="flex gap-2">
              <button className="flex-1 p-2 rounded-lg text-sm bg-emerald-500 text-white">New</button>
              <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} className="p-2 rounded-lg border dark:border-slate-700">{theme === 'light' ? <FiMoon/> : <FiSun/>}</button>
            </div>
          </div>
        </aside>

        {/* Main area */}
        <main className="flex-1 p-6">
          {/* Topbar */}
          <header className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search..." className="pl-10 pr-4 py-2 rounded-full border dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm focus:outline-none" />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>

              <div className="hidden sm:flex items-center gap-3">
                {metrics.map(m => <SampleMetrics key={m.title} {...m} />)}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"><FiBell /></button>
              <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-3 py-2 rounded-2xl shadow-sm">
                <img src={`https://avatars.dicebear.com/api/initials/admin.svg`} alt="avatar" className="w-8 h-8 rounded-full" />
                <div className="text-sm">
                  <div className="font-medium">Admin</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Superuser</div>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-slate-800 shadow-sm rounded-2xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{active}</h3>
                  <div className="text-sm text-slate-500">Overview</div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border dark:border-slate-700">
                      <div className="text-sm text-slate-500">Latest Activity</div>
                      <ul className="mt-3 space-y-2">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2"></div>
                          <div>
                            <div className="text-sm font-medium">Server backup completed</div>
                            <div className="text-xs text-slate-500">2 hours ago</div>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2"></div>
                          <div>
                            <div className="text-sm font-medium">New user registered</div>
                            <div className="text-xs text-slate-500">3 hours ago</div>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl border dark:border-slate-700">
                      <div className="text-sm text-slate-500">Quick Actions</div>
                      <div className="mt-3 flex gap-2 flex-wrap">
                        <button className="px-3 py-2 rounded-lg border">Export</button>
                        <button className="px-3 py-2 rounded-lg border">Create Report</button>
                        <button className="px-3 py-2 rounded-lg border">Invite Team</button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Recent Items</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="text-sm text-slate-500">
                            <th className="py-2">Name</th>
                            <th className="py-2">Owner</th>
                            <th className="py-2">Status</th>
                            <th className="py-2">Updated</th>
                          </tr>
                        </thead>
                        <tbody>
                          {['Alpha', 'Beta', 'Gamma', 'Delta'].map((n, i) => (
                            <tr key={n} className="border-t dark:border-slate-700">
                              <td className="py-3 font-medium">{n} Project</td>
                              <td className="py-3">Team {i+1}</td>
                              <td className="py-3">{i % 2 === 0 ? 'Live' : 'Staging'}</td>
                              <td className="py-3 text-slate-500 text-sm">{i+1} day(s) ago</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <aside className="space-y-4">
              <div className="bg-white dark:bg-slate-800 shadow-sm rounded-2xl p-4">
                <div className="text-sm text-slate-500">Team Members</div>
                <ul className="mt-3 space-y-2">
                  {['Aarav','Priya','Sameer','Nisha'].map(name => (
                    <li key={name} className="flex items-center gap-3">
                      <img src={`https://avatars.dicebear.com/api/initials/${encodeURIComponent(name)}.svg`} className="w-9 h-9 rounded-full" alt="avatar" />
                      <div>
                        <div className="font-medium">{name}</div>
                        <div className="text-xs text-slate-500">Designer</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800 shadow-sm rounded-2xl p-4">
                <div className="text-sm text-slate-500">Notifications</div>
                <div className="mt-2 text-sm text-slate-500">No new notifications</div>
              </div>
            </aside>
          </section>

          <footer className="text-xs text-slate-500">© {new Date().getFullYear()} My Desktop — Build with React + Tailwind</footer>
        </main>
      </div>
    </div>
  );
}
