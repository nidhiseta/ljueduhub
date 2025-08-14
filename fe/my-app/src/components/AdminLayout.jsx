// src/components/AdminLayout.jsx
import { Link, useLocation } from 'react-router-dom';

export default function AdminLayout({ children }) {
  const location = useLocation();
  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Upload Notes', path: '/admin/upload-notes' },
    { name: 'Manage Notes', path: '/admin/manage-notes' },
    { name: 'Student Activity', path: '/admin/student-activity' }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-teal-600 to-lgreen text-white p-6">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-3">
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`block w-full text-left p-2 rounded ${location.pathname === item.path ? 'bg-white/20' : 'bg-white/10'} hover:bg-white/20`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
