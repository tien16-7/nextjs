'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DangKy() {
  const [ho_ten, setHT] = useState('');
  const [email, setEmail] = useState('');
  const [mat_khau, setPass1] = useState('');
  const [go_lai_mat_khau, setPass2] = useState('');
  const [thong_bao, setThongbao] = useState("");
  const router = useRouter();

  async function handleDangKy(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (mat_khau !== go_lai_mat_khau) { setThongbao('2 mật khẩu không giống'); return; }
    const res = await fetch("http://localhost:3000/api/dangky", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ho_ten, email, mat_khau, go_lai_mat_khau }),
    });
    const data = await res.json();
    setThongbao(data.thong_bao);
    if (res.status === 200) router.push('/camon');
  }

  return (
    <form onSubmit={handleDangKy} className='w-[75%] m-auto border-1 rounded text-black'>
      <h2 className='bg-emerald-500 p-2 font-bold text-center text-white'>Đăng ký thành viên</h2>
      <div className='m-3'>Họ tên:
        <input type="text" className='w-full border p-1'
          value={ho_ten} onChange={(e) => setHT(e.target.value)} />
        {ho_ten.length < 10 ? <i className='text-red-400'>Họ tên nhập từ 10 ký tự</i> : ""}
      </div>
      <div className='m-3'>Email:
        <input type="email" className='w-full border p-1'
          value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className='m-3'>Mật khẩu:
        <input type="password" className='w-full border p-1'
          value={mat_khau} onChange={(e) => setPass1(e.target.value)} />
        {mat_khau.length < 6 ? <i className='text-red-400'>Mật khẩu từ 6 ký tự</i> : ""}
      </div>
      <div className='m-3'>Nhập lại mật khẩu:
        <input type="password" className='w-full border p-1'
          value={go_lai_mat_khau} onChange={(e) => setPass2(e.target.value)} />
        {mat_khau !== go_lai_mat_khau ? <i className='text-red-400'>Hai mật khẩu chưa giống</i> : ""}
      </div>
      <div className='m-3'>
        <button className='bg-emerald-400 px-4 py-2' type="submit">Đăng ký</button>
        {thong_bao && <p style={{ color: 'red' }}>{thong_bao}</p>}
      </div>
    </form>
  );
}
