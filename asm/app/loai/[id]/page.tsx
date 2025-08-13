import { LoaiModel } from "@/app/lib/models";
import { ILoai } from "@/app/lib/cautrucdata";
export default async function SuaLoai({ params }: { params: { id: string } }) {
  let id = Number(params.id);
  const data = await fetch(`${process.env.APP_URL}/api/loai/${id}`);
  const loai:ILoai = await data.json() as ILoai;
  if (!loai) return <p className="text-red-500">Loại không tồn tại</p>;
  return (
  <div className="p-1 border bg-white text-black text-center">
      <h1 className="text-xl font-bold mb-4 bg-pink-600 p-2">Chỉnh sửa loại</h1>

<form action={`/api/loai/${id}`} method="POST" className="space-y-4 px-2">
  {/* Gửi thêm _method để phía server biết đây là PUT */}
  <input type="hidden" name="_method" value="PUT" />

  <div className="">
    Tên loại
    <input
      type="text"
      name="ten_loai"
      defaultValue={loai.ten_loai}
      className="border p-2 w-100"
    />
  </div>

  <div className="">
    Thứ tự
    <input
      type="number"
      name="thu_tu"
      defaultValue={Number(loai.thu_tu)}
      className="border p-2 w-100"
    />
  </div>

  <div className="">
    Ẩn/Hiện
    <input
      type="radio"
      name="an_hien"
      value="1"
      defaultChecked={loai.an_hien}
      className="ml-4"
    />
    Hiện
    <input
      type="radio"
      name="an_hien"
      value="0"
      defaultChecked={!loai.an_hien}
      className="ml-4"
    />
    Ẩn
  </div>

  <button type="submit" className="bg-pink-600  hover:bg-pink-900 text-white p-2 rounded">
    Lưu loại
  </button>
</form>

  </div>
)}

