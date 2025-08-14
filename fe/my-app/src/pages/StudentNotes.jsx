import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
export default function StudentNotes() {
  const [notes, setNotes] = useState([]);
  const [partFilter, setPartFilter] = useState(''); // e.g. T1, T2, etc.

  useEffect(() => {
    loadNotes();
  }, [partFilter]);

  async function loadNotes() {
    try {
      const query = partFilter ? `?part=${encodeURIComponent(partFilter)}` : '';
      const res = await axios.get(
        import.meta.env.VITE_API_URL + '/notes' + query,
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
      );
      setNotes(res.data.notes || []);
    } catch (err) {
      alert('Unable to fetch notes');
    }
  }

  const grouped = notes.reduce((acc, n) => {
    acc[n.semester] = acc[n.semester] || [];
    acc[n.semester].push(n);
    return acc;
  }, {});

  return (
    <><Navbar/>
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Notes</h2>

      {/* Filter dropdown */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Part:</label>
        <select
          value={partFilter}
          onChange={(e) => setPartFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All</option>
          <option value="T1">T1</option>
          <option value="T2">T2</option>
          <option value="T3">T3</option>
          <option value="T4">T4</option>
        </select>
      </div>

      {Object.keys(grouped).length === 0 && <p>No notes available.</p>}
      {Object.entries(grouped).map(([sem, items]) => (
        <div key={sem} className="mb-6">
          <h3 className="font-semibold mb-2">{sem}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map(note => (
              <div key={note._id} className="p-4 bg-white rounded shadow">
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold">{note.title}</div>
                    <div className="text-sm text-gray-500">{note.part} • {note.filename}</div>
                  </div>
                  <div>
                    <a
                      href={`${import.meta.env.VITE_API_URL}/uploads/${note.filename}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-teal-600 text-white rounded inline-block"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    </>
  );
}
