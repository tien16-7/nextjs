"use client"
import Link from "next/link"
import NutThoat from "./NutThoat"
import {useEffect, useState } from "react"

export default function Menu(){

    const [user, setUser]  = useState({ho_ten:""})
    const [emai, setEmail]  = useState("")
    useEffect(()=>{
        const u = JSON.parse(sessionStorage.getItem("user")||"{}")
        const email = sessionStorage.getItem("email")||""
        
      
        setEmail(email)
        setUser(u)
        window.addEventListener("login",(e)=>{
            const user = JSON.parse(sessionStorage.getItem("user")||"{}");
            let ht = user.ho_ten||"quy khach";
            setUser(user)
        });
    },[])
    return (
        <>
          <Link href="/" className="hover:text-pink-500 hover:text-lg transition-all duration-300">Trang chủ</Link>{" "}
          <Link href="/san_pham" className="hover:text-pink-500 hover:text-lg transition-all duration-300">Sản phẩm</Link>
          <Link href={"/loai"} className="hover:text-pink-500 hover:text-lg transition-all duration-300">Loại</Link>


          
      
          {!user.ho_ten ? (
            <>
              <Link href="/dangnhap" className="hover:text-pink-500 hover:text-lg transition-all duration-300">Đăng nhập</Link>{" "}
              <Link href="/dangky" className="hover:text-pink-500 hover:text-lg transition-all duration-300">Đăng ký</Link>
            </>
          ) : (
            <>
              <Link href="/doi-pass" className="hover:text-pink-500 hover:text-lg transition-all duration-300">Đổi mật khẩu</Link>{" "}
              <Link href="/quen-pass" className="hover:text-pink-500 hover:text-lg transition-all duration-300">Quên mật khẩu</Link>{" "}
              <Link href="/admin" className="hover:text-pink-500 hover:text-lg transition-all duration-300">Admin</Link>
              <NutThoat/>
            
              <b>chào bạn {user.ho_ten}</b>
            </>
          )
          }
        </>
      )
      
}
