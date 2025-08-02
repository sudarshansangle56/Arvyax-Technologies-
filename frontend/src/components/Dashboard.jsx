import { useEffect, useState } from 'react';
import API from '../api';
export default function Dashboard() {
  const [sessions, setSessions] = useState([]);
  useEffect(() => {
    API.get('/sessions').then((res) => setSessions(res.data));
  }, []);
  return <div>{sessions.map((s) => <div key={s._id}>{s.title}</div>)}</div>;
}
