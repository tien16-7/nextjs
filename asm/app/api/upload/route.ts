//api/upload/route.ts
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) return NextResponse.json({ error: "Không có file" }, { status: 400 });

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = join(process.cwd(), "public/upload", fileName);
console.log(filePath);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);

  return NextResponse.json({ filePath: `/upload/${fileName}` });
}
