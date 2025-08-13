'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const matkhauRef = useRef<HTMLInputElement>(null);
  const thongbaoRef = useRef<HTMLInputElement>(null);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let email = emailRef.current?.value || "";
    let mat_khau = matkhauRef.current?.value || "";
    if (email.trim() == "") {
      thongbaoRef.current!.innerHTML = "Chưa nhập email";
      emailRef.current!.focus(); return;
    }
    let opt = {
      method: "post", body: JSON.stringify({ email, mat_khau }),
      headers: { 'Content-Type': 'application/json' }
    };
    fetch("http://localhost:3000/api/dangnhap", opt)
      .then(res => res.json()).then(data => {
        thongbaoRef.current!.innerHTML = data.thong_bao;
        if (data.token) {
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("expiresIn", data.expiresIn);
          sessionStorage.setItem("user", JSON.stringify(data.info));
          sessionStorage.setItem("email", data.info.email);
          window.dispatchEvent(new Event("login")); // 👈 thêm dòng này
          router.push('/');
        }
      })
      .catch(err => {
        thongbaoRef.current!.innerHTML = "Có lỗi gì đó" + JSON.stringify(err);
      })
  } //handleLogin

  return (
    <form onSubmit={handleLogin} className='w-[50%] m-auto border-1 rounded text-black' >
      <h2 className='bg-emerald-500 p-2 font-bold text-center text-white'>Đăng nhập thành viên</h2>
      <div className='m-3'>Email:
        <input type="email" className='w-full border p-1' ref={emailRef} />
      </div>
      <div className='m-3'>Mật khẩu:
        <input type="password" className='w-full border p-1' ref={matkhauRef} />
      </div>
      <div className='m-3'>
        <button className='bg-emerald-400 px-4 py-2' type="submit">Đăng nhập</button>
        <b ref={thongbaoRef} className='text-rose-500 font-bold'> </b>
      </div>
    </form>
  )
}
