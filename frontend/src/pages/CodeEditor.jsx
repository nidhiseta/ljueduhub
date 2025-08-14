import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CodeEditor(){
  const storedHtml = localStorage.getItem('lj_code_html') || '<!-- HTML here -->';
  const storedCss = localStorage.getItem('lj_code_css') || '/* CSS here */';
  const [html, setHtml] = useState(storedHtml);
  const [css, setCss] = useState(storedCss);
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(()=>{
    const t = setTimeout(()=> {
      setSrcDoc(`<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${html}</body></html>`);
    }, 300);
    return ()=>clearTimeout(t);
  }, [html, css]);

  const save = () => {
    localStorage.setItem('lj_code_html', html);
    localStorage.setItem('lj_code_css', css);
    alert('Code saved locally');
    axios.post(import.meta.env.VITE_API_URL + '/activity', { action: 'code_saved', meta: {} }, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).catch(()=>{});
  };

  const clearAll = () => {
    if(!confirm('Clear editor and local storage?')) return;
    setHtml('');
    setCss('');
    localStorage.removeItem('lj_code_html');
    localStorage.removeItem('lj_code_css');
  };

  const explainCode = async () => {
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + '/ai/explain-code', { html, css }, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      });
      alert(res.data?.explanation || 'AI explanation (simulated).');
    } catch (err) {
      alert('AI explain failed (simulated).');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">HTML / CSS Editor</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">HTML</h3>
          <textarea value={html} onChange={e=>setHtml(e.target.value)} className="w-full h-56 p-2 border rounded" />
          <h3 className="font-semibold mt-4">CSS</h3>
          <textarea value={css} onChange={e=>setCss(e.target.value)} className="w-full h-40 p-2 border rounded" />
          <div className="mt-3 space-x-2">
            <button onClick={save} className="px-3 py-1 bg-teal-600 text-white rounded">Save</button>
            <button onClick={clearAll} className="px-3 py-1 border rounded">Clear</button>
            <button onClick={explainCode} className="px-3 py-1 bg-green-600 text-white rounded">Explain (AI)</button>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Live Preview</h3>
          <iframe srcDoc={srcDoc} title="preview" className="w-full h-[70vh] border" sandbox="allow-scripts" />
        </div>
      </div>
    </div>
  );
}
