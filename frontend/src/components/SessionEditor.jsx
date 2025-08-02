import React, { useEffect, useState } from 'react';
import API from '../api';

const SessionEditor = () => {
  const [session, setSession] = useState({ title: '', tags: '', json_file_url: '' });
  const [timeoutId, setTimeoutId] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSession({ ...session, [name]: value });

    if (timeoutId) clearTimeout(timeoutId);

    const id = setTimeout(() => {
      handleSaveDraft();
    }, 5000);

    setTimeoutId(id);
  };

  const handleSaveDraft = async () => {
    try {
      await API.post('/my-sessions/save-draft', session);
      setMessage('Auto-saved');
    } catch (err) {
      setMessage('Failed to auto-save');
    }
  };

  const handlePublish = async () => {
    try {
      await API.post('/my-sessions/publish', session);
      alert('Session published!');
    } catch {
      alert('Error publishing session');
    }
  };

  return (
    <div>
      <input name="title" placeholder="Title" value={session.title} onChange={handleChange} />
      <input name="tags" placeholder="Tags" value={session.tags} onChange={handleChange} />
      <input name="json_file_url" placeholder="JSON URL" value={session.json_file_url} onChange={handleChange} />
      <button onClick={handlePublish}>Publish</button>
      <p>{message}</p>
    </div>
  );
};

export default SessionEditor;
