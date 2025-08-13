import Link from "next/link";
import { ILoai } from "../lib/cautrucdata";
import NutXoaLoai from "./NutXoaLoai";
import "./LoaiList.css";




export default async function LoaiList() {
  const data = await fetch(`${process.env.APP_URL}/api/loai`);
  const loai_arr: ILoai[] = await data.json() as ILoai[];

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold uppercase">Danh sách loại</h1>
      <Link href="/loai/them" className="btn btn-primary float-right">Thêm loại</Link>
      <table className="table-auto w-full mt-4 border text-[1em]  bg-white  text-black">
        <thead>
          <tr className="bg-black text-white">
            <th className="p-2">ID</th>
            <th>Tên loại</th>
            <th>Thứ tự</th>
            <th>Ẩn hiện</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {loai_arr.map((loai: any) => (
            <tr key={loai.id} className="border-t border-b border-gray-300 hover:bg-pink-600 transition-colors text-black">
              <td className="p-2">{loai.id}</td>
              <td className="p-2 text-center">{loai.ten_loai}</td>
              <td className="p-2 text-center">{loai.thu_tu}</td>
              <td className="p-2 text-center w-[200px]">
                {loai.an_hien ? "✅" : "❌"}
              </td>
              <td className="p-2 text-center w-[200px]"><Link href={`/loai/${loai.id}`} className="text-black mx-2"> Sửa </Link> | <NutXoaLoai id={loai.id}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
