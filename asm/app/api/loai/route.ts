import { LoaiModel } from "@/app/lib/models";
import { NextResponse } from "next/server";
export async function GET() {  // api trả về ds loại
    const loai_arr = await LoaiModel.findAll({ order:[ ['id', 'desc'] ] });
    return NextResponse.json(loai_arr);
  }
  
export async function POST(req: Request) { // api thêm loại mới
  const formData = await req.formData();

  // Lấy dữ liệu từ form
  const ten_loai = formData.get("ten_loai") as string;
  const thu_tu = Number(formData.get("thu_tu"));
  const an_hien = formData.get("an_hien") === "1";

  await LoaiModel.create({ ten_loai, thu_tu, an_hien }); // lưu database

  return NextResponse.redirect(new URL("/loai", req.url)); // chuyển về ds loại
}
