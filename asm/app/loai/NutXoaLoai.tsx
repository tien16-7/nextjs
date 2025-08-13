// app/loai/NutXoaLoai.tsx
"use client";
import { useRouter } from "next/navigation";

export default function NutXoaLoai({ id }: { id: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Xóa loại này hả?")) return;
    const res = await fetch(`/api/loai/${id}`, { method: "DELETE" });
    
    if (res.ok) router.refresh(); // Làm mới danh sách loại
    else alert("Xóa loại thất bại!");
  };

  return (
    <button onClick={handleDelete} className="text-red-500 mx-2">
      Xóa
    </button>
  );
}
