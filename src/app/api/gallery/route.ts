import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const galleryDir = path.join(process.cwd(), "public", "assets", "gallery");
    
    // Fallback if directory doesn't exist
    if (!fs.existsSync(galleryDir)) {
      return NextResponse.json({ images: [] });
    }
    
    const files = fs.readdirSync(galleryDir);
    
    // Scan for valid image and video files (ignoring hidden OS files)
    const validExtensions = [".jpg", ".jpeg", ".png", ".webp", ".PNG", ".mp4", ".mov", ".webm"];
    const images = files
      .filter((file) => validExtensions.includes(path.extname(file).toLowerCase()) && !file.startsWith("."))
      .map((file) => `/assets/gallery/${file}`);
      
    return NextResponse.json({ images });
  } catch (error) {
    console.error("Failed to scan gallery assets:", error);
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}
export const dynamic = "force-dynamic";
