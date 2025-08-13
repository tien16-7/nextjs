'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DoiPass() {
  const [email, setEmail] = useState('');
  const [pass_old, setPassOld] = useState('');
  const [pass_new1, setPass1] = useState('');
  const [pass_new2, setPass2] = useState('');
  const [thong_bao, setThongbao] = useState('');
  const [token, setToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("token") == null) {
      alert("Chưa đăng nhập"); router.push('/dang-nhap');
    }
    setToken(sessionStorage.getItem("token") || "");
    setEmail(sessionStorage.getItem("email") || "");
  }, [])

  async function handleDoiPass(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pass_new1 !== pass_new2) { setThongbao('2 mật khẩu nhập không giống'); return; }
    const res = await fetch('http://localhost:3000/api/doipass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ pass_old, pass_new1, pass_new2 }),
    });
    const data = await res.json();
    setThongbao(data.thong_bao);
    if (res.status === 200) router.push('/thongbao');
  }

  return (
    <form onSubmit={handleDoiPass} className='bg-white w-[75%] m-auto border-1 rounded text-black'>
      <h2 className='bg-pink-500 p-2 font-bold text-center text-white'>Đổi mật khẩu</h2>
      <div className='m-3'>Email:
        <input type="email" className='w-full border p-1' disabled
          value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className='m-3'>Mật khẩu cũ:
        <input type="password" className='w-full border p-1'
          value={pass_old} onChange={(e) => setPassOld(e.target.value)} />
        {pass_old == "" ? <i className='text-red-400'>Mời nhập mật khẩu cũ</i> : ""}
      </div>
      <div className='m-3'>Mật khẩu mới:
        <input type="password" className='w-full border p-1'
          value={pass_new1} onChange={(e) => setPass1(e.target.value)} />
        {pass_new1.length < 6 ? <i className='text-red-400'>Mật khẩu từ 6 ký tự</i> : ""}
      </div>
      <div className='m-3'>Nhập lại mật khẩu mới:
        <input type="password" className='w-full border p-1'
          value={pass_new2} onChange={(e) => setPass2(e.target.value)} />
        {pass_new1 !== pass_new2 ? <i className='text-red-400'>Hai mật khẩu chưa giống nhau</i> : ""}
      </div>
      <div className='m-3'>
        <button className='bg-pink-400 px-4 py-2' type="submit">Đổi mật khẩu</button>
        {thong_bao && <p style={{ color: 'red' }}>{thong_bao}</p>}
      </div>
    </form>
  );
}
