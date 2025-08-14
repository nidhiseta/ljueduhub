import { useState } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';

export default function UploadNotes() {
  const [title, setTitle] = useState('');
  const [semester, setSemester] = useState('');
  const [part, setPart] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('semester', semester);
    formData.append('part', part);
    formData.append('file', file);

    try {
      await axios.post(
        import.meta.env.VITE_API_URL + '/notes/upload',
        formData,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      alert('Note uploaded successfully!');
      setTitle('');
      setSemester('');
      setPart('');
      setFile(null);
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Upload Notes</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Semester"
            value={semester}
            onChange={e => setSemester(e.target.value)}
            className="border p-2 w-full"
          />
          <select
            value={part}
            onChange={e => setPart(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="">Select Part</option>
            <option value="T1">T1</option>
            <option value="T2">T2</option>
            <option value="T3">T3</option>
            <option value="T4">T4</option>
          </select>
          <input type="file" onChange={e => setFile(e.target.files[0])} />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Upload
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
