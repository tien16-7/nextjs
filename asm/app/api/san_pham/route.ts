import { SanPhamModel } from "@/app/lib/models";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const loai = url.searchParams.get("loai");

  let where = {};
  if (loai) {
    where = { id_loai: Number(loai) };
  }

  const sp_arr = await SanPhamModel.findAll({
    where,
    order: [["id", "desc"]],
    limit: 20,
  });

  return NextResponse.json(sp_arr);
}

export async function POST(req: Request) {
  const formData = await req.formData();
  // Lấy dữ liệu từ form
  const ten_sp = formData.get("ten_sp") as string;
  const gia = Number(formData.get("gia"));
  const gia_km = Number(formData.get("gia_km"));
  const hinh = formData.get("hinh") as string;
  const ngay = formData.get("ngay") as string;
  const id_loai = Number(formData.get("id_loai"));
  const an_hien = formData.get("an_hien") === "1";
  const hot = formData.get("hot") === "1";

  await SanPhamModel.create({ ten_sp, gia, gia_km, hinh, ngay, id_loai, an_hien, hot });

  return NextResponse.redirect(new URL("/san_pham", req.url));
}
