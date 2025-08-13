import { ISanPham } from "../lib/cautrucdata";
import Link from "next/link";
import NutXoaSP from "./NutXoaSP";

export default async function ProductList() {
  const data = await fetch(`${process.env.APP_URL}/api/san_pham`);
  const sp_arr: ISanPham[] = (await data.json()) as ISanPham[];
  return (
    <div className="p-4 max-w-full overflow-x-auto bg-pink-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl  uppercase text-amber-200">
          Danh sách sản phẩm
        </h1>
        <Link
          href="/san_pham/them"
          className="btn bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded shadow transition"
        >
          Thêm sản phẩm
        </Link>
      </div>
      <table className="min-w-[800px] bg-white w-full border-collapse border border-gray-300 shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-black   uppercase text-sm font-semibold select-none">
          <tr>
            <th className="p-3 border border-gray-300 text-center">ID</th>
            <th className="p-3 border border-gray-300 text-left">Tên</th>
            <th className="p-3 border border-gray-300 text-right">Giá</th>
            <th className="p-3 border border-gray-300 text-center">Hình</th>
            <th className="p-3 border border-gray-300 text-center">Ngày</th>
            <th className="p-3 border border-gray-300 text-center w-[80px]">Ẩn</th>
            <th className="p-3 border border-gray-300 text-center w-[80px]">Hot</th>
            <th className="p-3 border border-gray-300 text-center w-[150px]">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {sp_arr.map((sp: ISanPham) => (
            <tr
              key={sp.id}
              className="border-b border-gray-300 hover:bg-pink-600 transition-colors text-black"
            >
              <td className="p-3 border border-gray-300 text-center">{sp.id}</td>
              <td className="p-3 border border-gray-300">{sp.ten_sp}</td>
              <td className="p-3 border border-gray-300 text-right">
                {Number(sp.gia).toLocaleString("vi")} VNĐ
              </td>
              <td className="p-3 border border-gray-300 text-center">
                {sp.hinh ? (
                  <img
                    src={sp.hinh}
                    alt={sp.ten_sp}
                    width={50}
                    height={50}
                    className="object-contain mx-auto rounded"
                  />
                ) : (
                  <span className="text-gray-400 italic">Không có</span>
                )}
              </td>
              <td className="p-3 border border-gray-300 text-center">
                {new Date(sp.ngay).toLocaleDateString("vi", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td className="p-3 border border-gray-300 text-center">
                {sp.an_hien ? "✅" : "❌"}
              </td>
              <td className="p-3 border border-gray-300 text-center">
                {sp.hot ? "🔥" : "❌"}
              </td>
              <td className="p-3 border border-gray-300 text-right space-x-2">
                <Link
                  href={`/san_pham/${sp.id}`}
                  className="text-black-600  font-semibold"
                >
                  Sửa
                </Link>
                |
                <NutXoaSP id={sp.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
