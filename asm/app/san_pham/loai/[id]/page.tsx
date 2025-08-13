import { ISanPham, ILoai } from "@/app/lib/cautrucdata";
import Link from "next/link";

interface Props {
  params: { id: string };
}

async function fetchLoai(): Promise<ILoai[]> {
  const res = await fetch(`${process.env.APP_URL}/api/loai`);
  return await res.json();
}

export default async function SanPhamTheoLoai({ params }: Props) {
  const idLoai = params.id;

  // Lấy danh sách sản phẩm theo loại
  const resSP = await fetch(`${process.env.APP_URL}/api/san_pham?loai=${idLoai}`);
  const sp_arr: ISanPham[] = await resSP.json();

  // Lấy danh sách loại
  const loai_arr: ILoai[] = await fetchLoai();
  const tenLoai = loai_arr.find((loai) => loai.id.toString() === idLoai)?.ten_loai ?? idLoai;
  return (
    <div className="p-4 flex gap-8">
      {/* Sidebar danh mục loại */}
      <aside className="w-1/4 border rounded p-4 bg-white text-black">
        <h2 className="text-xl font-bold mb-4">Danh mục loại</h2>
        <ul className="space-y-2 text-pink" >
          {loai_arr.map((loai) => (
            <li key={loai.id}>
              <Link
                href={`/san_pham/loai/${loai.id}`}
                className={`text-blue-600 hover:underline ${
                  loai.id.toString() === idLoai ? "font-bold underline" : ""
                }`}
              >
                {loai.ten_loai}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Danh sách sản phẩm */}
      <section className="w-3/4">
        <h1 className="text-2xl font-bold mb-6  uppercase">
          Sản phẩm loại {tenLoai}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sp_arr.map((sp) => (
            <div
              key={sp.id}
              className="border rounded-lg shadow-sm p-4 bg-white hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="flex-grow flex justify-center items-center mb-4">
                {sp.hinh ? (
                  <img
                    src={sp.hinh}
                    alt={sp.ten_sp}
                    className="max-h-40 object-contain"
                  />
                ) : (
                  <div className="text-gray-400 italic">Không có hình</div>
                )}
              </div>
              <h2 className="text-lg font-semibold mb-2 text-gray-800">{sp.ten_sp}</h2>
              <p className="text-amber-600 font-bold mb-4 text-right">
                {Number(sp.gia).toLocaleString("vi")} VNĐ
              </p>
              <div className="flex justify-between mt-auto pt-2 border-t border-gray-200">
                <Link
                  href={`/san_pham/${sp.id}`}
                  className="text-pink-600 hover:text-blue-800 font-semibold"
                >
                  Mua
                </Link>
                <Link
                  href={`/san_pham/${sp.id}`}
                  className="text-pink-600 hover:text-gray-900 font-medium"
                >
                  Chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
