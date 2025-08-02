import { useState } from 'react';
import API from '../api';
import { useAuth } from '../context/AuthContext';
export default function AuthForm({ type }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post(`/${type}`, { email, password });
    if (res.data.token) login(res.data.token);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">{type}</button>
    </form>
  );
}