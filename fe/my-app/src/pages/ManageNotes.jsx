// src/pages/admin/ManageNotes.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';

export default function ManageNotes() {
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: '', semester: '', part: '' });

  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + '/notes', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      });
      setNotes(res.data.notes);
    } catch (err) {
      console.error(err);
      alert('Failed to load notes');
    }
  }

  async function deleteNote(id) {
    if (!confirm('Delete this note?')) return;
    try {
      await axios.delete(import.meta.env.VITE_API_URL + `/notes/${id}`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      });
      loadNotes();
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  }

  async function saveEdit(id) {
    try {
      await axios.put(import.meta.env.VITE_API_URL + `/notes/${id}`, editData, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      });
      setEditingId(null);
      loadNotes();
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  }

  function startEdit(note) {
    setEditingId(note._id);
    setEditData({ title: note.title, semester: note.semester, part: note.part });
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Manage Notes</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Semester</th>
              <th className="p-3 text-left">Part</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notes.map(note => (
              <tr key={note._id} className="border-t">
                <td className="p-3">
                  {editingId === note._id ? (
                    <input
                      className="border p-1 w-full"
                      value={editData.title}
                      onChange={e => setEditData({ ...editData, title: e.target.value })}
                    />
                  ) : note.title}
                </td>
                <td className="p-3">
                  {editingId === note._id ? (
                    <input
                      className="border p-1 w-full"
                      value={editData.semester}
                      onChange={e => setEditData({ ...editData, semester: e.target.value })}
                    />
                  ) : note.semester}
                </td>
                <td className="p-3">
                  {editingId === note._id ? (
                    <input
                      className="border p-1 w-full"
                      value={editData.part}
                      onChange={e => setEditData({ ...editData, part: e.target.value })}
                    />
                  ) : note.part}
                </td>
                <td className="p-3 space-x-2">
                  {editingId === note._id ? (
                    <>
                      <button onClick={() => saveEdit(note._id)} className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
                      <button onClick={() => setEditingId(null)} className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(note)} className="bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
                      <button onClick={() => deleteNote(note._id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {notes.length === 0 && (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-500">No notes found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
