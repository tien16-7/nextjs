import { SanPhamModel, LoaiModel } from "@/app/lib/models";
import { ISanPham, ILoai } from "@/app/lib/cautrucdata";
import UploadImage from "@/app/san_pham/UploadImage";

export default async function SuaSP({ params }: { params: { id: string } }) {
  const id = Number(params.id); // Tiếp nhận tham số id sản phẩm
  const res1 = await fetch(`${process.env.APP_URL}/api/loai/`); // Lấy ds loại
  const loai_arr: ILoai[] = await res1.json() as ILoai[];

  const res2 = await fetch(`${process.env.APP_URL}/api/san_pham/${id}`); // Lấy sp theo id
  if (res2.status === 404) return <p className="text-red-500">Sản phẩm không tồn tại</p>;
  const sp: ISanPham = await res2.json() as ISanPham;

  return (
    <div className="p-1 border">
    {/* <h1 className="text-xl font-bold mb-4 bg-orange-300 p-2 text-black">Chỉnh sửa Sản Phẩm</h1> */}
    <form action={`/api/san_pham/${sp.id}`} method="POST" className="bg-white  space-y-6 text-black  p-6 rounded shadow-md">
  <h1 className="text-2xl font-bold mb-6 text-center bg-pink-600 p-3 rounded">Sửa Sản Phẩm</h1>

  {/* Hàng 1: Tên sản phẩm + Hình ảnh */}
  <div className="flex flex-col sm:flex-row sm:space-x-6">
    <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4 sm:mb-0">
      <label htmlFor="ten_sp" className="sm:w-[40%] font-semibold">Tên sản phẩm</label>
      <input
        id="ten_sp"
        type="text"
        name="ten_sp"
        defaultValue={sp.ten_sp}
        className="border border-gray-300 rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
    </div>

    <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
      <label className="sm:w-[40%] font-semibold">Hình ảnh</label>
      <div className="flex flex-col flex-1">
        <UploadImage name="hinh" />
        <input type="hidden" name="hinh" defaultValue={sp.hinh} />
        {sp.hinh && (
          <img src={sp.hinh} alt="Hình sản phẩm" className="w-20 h-20 mt-2 border rounded" />
        )}
      </div>
    </div>
  </div>

  {/* Hàng 2: Giá gốc + Giá KM */}
  <div className="flex flex-col sm:flex-row sm:space-x-6">
    <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4 sm:mb-0">
      <label htmlFor="gia" className="sm:w-[40%] font-semibold">Giá gốc</label>
      <input
        id="gia"
        type="number"
        name="gia"
        defaultValue={sp.gia}
        className="border border-gray-300 rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
    </div>

    <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
      <label htmlFor="gia_km" className="sm:w-[40%] font-semibold">Giá KM</label>
      <input
        id="gia_km"
        type="number"
        name="gia_km"
        defaultValue={sp.gia_km}
        className="border border-gray-300 rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
    </div>
  </div>

  {/* Hàng 3: Ngày + Loại sản phẩm */}
  <div className="flex flex-col sm:flex-row sm:space-x-6">
    <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4 sm:mb-0">
      <label htmlFor="ngay" className="sm:w-[40%] font-semibold">Ngày</label>
      <input
        id="ngay"
        type="date"
        name="ngay"
        defaultValue={sp.ngay}
        className="border border-gray-300 rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
    </div>

    <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
      <label htmlFor="id_loai" className="sm:w-[40%] font-semibold">Loại sản phẩm</label>
      <select
        id="id_loai"
        name="id_loai"
        defaultValue={sp.id_loai}
        className="border border-gray-300 rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        {loai_arr.map((c: any) => (
          <option key={c.id} value={c.id}>
            {c.ten_loai}
          </option>
        ))}
      </select>
    </div>
  </div>

  {/* Hàng 4: Ẩn/Hiện + Nổi bật */}
  <div className="flex flex-col sm:flex-row sm:space-x-6">
    <fieldset className="flex-1 flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4 sm:mb-0">
      <legend className="sm:w-[40%] font-semibold">Ẩn/Hiện</legend>
      <label className="inline-flex items-center space-x-2">
        <input
          type="radio"
          name="an_hien"
          value="1"
          defaultChecked={Boolean(sp.an_hien)}
          className="form-radio"
        />
        <span>Hiện</span>
      </label>
      <label className="inline-flex items-center space-x-2 ml-6">
        <input
          type="radio"
          name="an_hien"
          value="0"
          defaultChecked={!Boolean(sp.an_hien)}
          className="form-radio"
        />
        <span>Ẩn</span>
      </label>
    </fieldset>

    <fieldset className="flex-1 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
      <legend className="sm:w-[40%] font-semibold">Nổi bật</legend>
      <label className="inline-flex items-center space-x-2">
        <input
          type="radio"
          name="hot"
          value="1"
          defaultChecked={Boolean(sp.hot)}
          className="form-radio"
        />
        <span>Nổi bật</span>
      </label>
      <label className="inline-flex items-center space-x-2 ml-6">
        <input
          type="radio"
          name="hot"
          value="0"
          defaultChecked={!Boolean(sp.hot)}
          className="form-radio"
        />
        <span>Bình thường</span>
      </label>
    </fieldset>
  </div>

  <div className="text-center">
    <button
      type="submit"
      className="bg-pink-600 hover:bg-pink-900 text-white font-semibold py-2 px-6 rounded shadow transition"
    >
      Lưu sản phẩm
    </button>
  </div>
</form>

    </div>
  )
}