import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();

  const studentLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + '/auth/login', { email, password });
      if(res.data?.token){
        localStorage.setItem('token', res.data.token);
        alert('Student logged in');
        navigate('/notes');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  }

  const adminLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + '/auth/admin-login', { username: 'admin', password: 'admin123' });
      if(res.data?.token){
        localStorage.setItem('token', res.data.token);
        alert('Admin logged in');
        navigate('/admin');
      }
    } catch (err) {
      alert('Admin login failed');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={studentLogin} className="space-y-3">
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Student email" className="w-full p-2 border rounded" />
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-2 border rounded" />
          <button type="submit" className="w-full p-2 bg-teal-600 text-white rounded">Student Login</button>
        </form>
        <div className="mt-4 text-center">
          <button onClick={adminLogin} className="px-4 py-2 rounded border">Admin Quick Login</button>
        </div>
      </div>
    </div>
  );
}
