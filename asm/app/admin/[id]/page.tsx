import { SanPhamModel, LoaiModel } from "@/app/lib/models";
import { ISanPham, ILoai } from "@/app/lib/cautrucdata";
import UploadImage from "@/app/san_pham/UploadImage";

export default async function SuaSP({ params }: { params: { id: string } }) {
  const id = Number(params.id); // Tiếp nhận tham số id sản phẩm
  const res1 = await fetch(`${process.env.APP_URL}/api/loai/`); // Lấy ds loại
  const loai_arr: ILoai[] = await res1.json() as ILoai[];

  const res2 = await fetch(`${process.env.APP_URL}/api/san_pham/${id}`); // Lấy sp theo id
  if (res2.status === 404) return <p className="text-black">Sản phẩm không tồn tại</p>;
  const sp: ISanPham = await res2.json() as ISanPham;

  return (
    <div className="p-1 border text-black">
    <h1 className="text-xl font-bold mb-4 bg-orange-300 p-2 text-black">Chỉnh sửa Sản Phẩm</h1>
    <form action={`/api/san_pham/${sp.id}`} method="POST">
      <div className="flex justify-between mb-3">
        <div className="w-[48%]">Tên sản phẩm</div>
        <input type="text" name="ten_sp" defaultValue={sp.ten_sp} className="border p-2 w-full" />
      </div>
      <div className="flex justify-between mb-3">
  <div className="w-[48%]">Hình ảnh</div>
  <div className="w-full">
    {/* Component Upload */}
    <UploadImage name="hinh" />

    {/* Input hidden để gửi link ảnh khi submit */}
    <input type="hidden" name="hinh" defaultValue={sp.hinh} />

    {/* Hiển thị ảnh cũ nếu có */}
    {sp.hinh && (
      <img src={sp.hinh} alt="Hình sản phẩm" className="w-20 h-20 mt-2 border" />
    )}
  </div>
</div>
      <div className="flex justify-between mb-3 text-black">
        <div className="w-[48%]">Giá gốc</div>
        <input type="number" name="gia" defaultValue={sp.gia} className="border p-2 w-full" />
      </div>
      <div className="flex justify-between mb-3">
        <div className="w-[48%]">Giá KM</div>
        <input type="number" name="gia_km" defaultValue={sp.gia_km} className="border p-2 w-full" />
      </div>
      <div className="flex justify-between mb-3">
        <div className="w-[48%]">Ngày</div>
        <input type="date" name="ngay" defaultValue={sp.ngay} className="border p-2 w-full" />
      </div>
      <div className="flex justify-between mb-3">
        <div className="w-[48%]">Loại sản phẩm</div>
        <select name="id_loai" className="border p-2 w-full" defaultValue={sp.id_loai}>
          {loai_arr.map((c: any) => (
            <option key={c.id} value={c.id}>{c.ten_loai}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-between mb-3">
        <div className="w-[48%]">Ẩn/Hiện</div>
        <input type="radio" name="an_hien" value="1" defaultChecked={sp.an_hien} className="ml-4" />Hiện
        <input type="radio" name="an_hien" value="0" defaultChecked={!sp.an_hien} className="ml-4" />Ẩn
      </div>
      <div className="flex justify-between mb-3">
        <div className="w-[48%]">Nổi bật</div>
        <input type="radio" name="hot" value="1" defaultChecked={sp.hot} className="mx-4" />Nổi bật
        <input type="radio" name="hot" value="0" defaultChecked={!sp.hot} />Bình thường
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Lưu sản phẩm</button>
    </form>
    </div>
  )
}