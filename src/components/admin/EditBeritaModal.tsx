import React, { useState, useEffect } from 'react';

interface Berita {
  id: string;
  title: string;
  content: string;
  date: string;
}

interface EditBeritaModalProps {
  isOpen: boolean;
  onClose: () => void;
  berita: Berita | null;
}

const EditBeritaModal: React.FC<EditBeritaModalProps> = ({ isOpen, onClose, berita }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (berita) {
      setTitle(berita.title);
      setContent(berita.content);
      setDate(berita.date);
    }
  }, [berita]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call API to update berita
      const response = await fetch('/api/berita/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: berita?.id, title, content, date })
      });
      const result = await response.json();
      if (result.status) {
        // Optionally update state in parent component
        onClose();
      } else {
        alert('Gagal mengubah berita');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen || !berita) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-xl font-bold mb-4">Edit Berita</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Judul</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Konten</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Tanggal</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
              Batal
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBeritaModal;
