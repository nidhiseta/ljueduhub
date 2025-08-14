import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const location = useLocation();

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(import.meta.env.VITE_API_URL + '/admin/stats', {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        });
        setStats(res.data.data);
      } catch (err) {
        console.error(err);
        alert('Failed to load admin stats');
      }
    }
    load();
  }, []);

  return (
     <>
       
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-teal-600 to-lgreen text-white p-6">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-3">
          <Link
            to="/admin"
            className={`block w-full text-left p-2 rounded ${location.pathname === '/admin' ? 'bg-white/20' : 'bg-white/10'}`}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/upload-notes"
            className={`block w-full text-left p-2 rounded ${location.pathname === '/admin/upload-notes' ? 'bg-white/20' : 'bg-white/10'}`}
          >
            Upload Notes
          </Link>
          <Link
            to="/admin/manage-notes"
            className={`block w-full text-left p-2 rounded ${location.pathname === '/admin/manage-notes' ? 'bg-white/20' : 'bg-white/10'}`}
          >
            Manage Notes
          </Link>
          <Link
            to="/admin/student-activity"
            className={`block w-full text-left p-2 rounded ${location.pathname === '/admin/student-activity' ? 'bg-white/20' : 'bg-white/10'}`}
          >
            Student Activity
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        {stats ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded shadow">
              <div className="text-sm text-gray-500">Total Notes</div>
              <div className="text-2xl font-bold">{stats.totalNotes}</div>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <div className="text-sm text-gray-500">Total Activities</div>
              <div className="text-2xl font-bold">{stats.totalActivities}</div>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <div className="text-sm text-gray-500">Recent Activity</div>
              <div className="text-sm max-h-40 overflow-auto">
                {stats.recentActivities.map(a => (
                  <div key={a._id} className="border-b py-1 text-xs">
                    {a.action} — {a.userEmail || '—'}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </div>
    </>
  );
}
