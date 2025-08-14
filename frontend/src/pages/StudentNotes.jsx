import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function StudentNotes(){
  const [notes, setNotes] = useState([]);

  useEffect(()=>{
    async function load(){
      try {
        const res = await axios.get(import.meta.env.VITE_API_URL + '/notes', {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        });
        setNotes(res.data.notes || []);
      } catch (err) {
        alert('Unable to fetch notes');
      }
    }
    load();
  }, []);

  const handleDownload = (note) => {
    alert(`Simulated download: ${note.filename} — in production this would start a file download.`);
    // optionally log activity
    axios.post(import.meta.env.VITE_API_URL + '/activity', { action: 'download_note', meta: { noteId: note._id } }, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).catch(()=>{});
  };

  const requestSummary = async (note) => {
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + `/notes/summarize/${note._id}`, {}, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }});
      alert(res.data.summary || 'No summary returned (simulated).');
    } catch (err) {
      alert('Summary request failed');
    }
  };

  const grouped = notes.reduce((acc,n) => {
    acc[n.semester] = acc[n.semester] || [];
    acc[n.semester].push(n);
    return acc;
  }, {});

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Notes</h2>
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
                  <div className="space-y-2">
                    <button onClick={()=>handleDownload(note)} className="px-3 py-1 bg-teal-600 text-white rounded">Download</button>
                    <button onClick={()=>requestSummary(note)} className="px-3 py-1 border rounded">AI Summary</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
