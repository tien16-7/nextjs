import { SanPhamModel } from "@/app/lib/models";
import { NextResponse } from "next/server";

// Lấy thông tin sản phẩm theo id, method GET
export async function GET(req: Request, { params }: { params: { id: string } }) {
    const sp = await SanPhamModel.findByPk(params.id); // lấy dữ liệu từ table
    if (!sp) {
      return NextResponse.json(
        { thong_bao: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }
    return NextResponse.json(sp); // trả về kết quả
  }
  export async function POST(req: Request, { params }: { params: { id: string } }) {
    const formData = await req.formData(); // Lấy dữ liệu từ form
    const ten_sp = formData.get("ten_sp") as string;
    const gia = Number(formData.get("gia"));
    const gia_km = Number(formData.get("gia_km"));
    const hinh = formData.get("hinh") as string;
    const ngay = formData.get("ngay") as string;
    const id_loai = Number(formData.get("id_loai"));
    const an_hien = formData.get("an_hien") === "1";
    const hot = formData.get("hot") === "1";
  
    const sp = await SanPhamModel.findByPk(params.id);
    if (!sp) {
      return NextResponse.json(
        { message: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }
    await sp.update({ ten_sp, gia, gia_km, hinh, ngay, id_loai, an_hien, hot });
    return NextResponse.redirect(new URL("/san_pham", req.url)); // Chuyển về ds sp
  }
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const sp = await SanPhamModel.findByPk(params.id);
  if (!sp) {
    return NextResponse.json(
      { thong_bao: "Không tìm thấy sản phẩm" },
      { status: 404 }
    );
  }
  await sp.destroy();
  return NextResponse.redirect(new URL("/san_pham", req.url));
  //return NextResponse.json({ thong_bao: "Xóa thành công" });
}