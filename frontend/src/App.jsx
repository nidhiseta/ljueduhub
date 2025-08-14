import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import StudentNotes from './pages/StudentNotes';
import AdminDashboard from './pages/AdminDashboard';
import CodeEditor from './pages/CodeEditor';

function requireAuth() {
  return localStorage.getItem('token');
}

export default function App(){
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/notes' element={ requireAuth() ? <StudentNotes /> : <Navigate to="/login" /> } />
      <Route path='/admin' element={ requireAuth() ? <AdminDashboard /> : <Navigate to="/login" /> } />
      <Route path='/editor' element={ requireAuth() ? <CodeEditor /> : <Navigate to="/login" /> } />
    </Routes>
  );
}
