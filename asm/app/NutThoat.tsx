'use client';

import { useRouter } from 'next/navigation';

export default function NutThoat(){
  const router = useRouter();
  const handleClick = () => {
  
    sessionStorage.clear();
    window.dispatchEvent(new CustomEvent("login",{detail:""}));
    router.push("/");
  }
  return (
    <a href="#" onClick={handleClick} className="m-2">Thoát</a>
  )
}
