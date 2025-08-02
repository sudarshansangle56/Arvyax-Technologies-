import { useEffect, useState } from 'react';
import API from '../api';
import SessionEditor from './SessionEditor';
export default function MySessions() {
  const [sessions, setSessions] = useState([]);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    API.get('/my-sessions').then((res) => setSessions(res.data));
  }, []);
  return (
    <div>
      <div>
        {sessions.map((s) => (
          <button key={s._id} onClick={() => setSelected(s)}>{s.title}</button>
        ))}
      </div>
      <SessionEditor session={selected} />
    </div>
  );
}