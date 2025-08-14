import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
     <header className="bg-gradient-to-r from-teal-500 to-lgreen p-8 text-white">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <h1 className="text-3xl font-bold">LJUEduHub</h1>
              <nav className="space-x-4">
                <Link to="/login" className="font-medium">Login</Link>
                <Link to="/editor" className="font-medium">Code Editor</Link>
                <Link to="/notes" className="font-medium">Notes</Link>
              </nav>
            </div>
          </header>
  );
}
