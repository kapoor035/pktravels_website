import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const baseGalleryDir = path.join(process.cwd(), "public", "gallery");
    
    // Fallback if the base directory doesn't exist
    if (!fs.existsSync(baseGalleryDir)) {
      return NextResponse.json({ images: [] });
    }
    
    const categories = ["all", "45-seater", "50-seater", "60-seater", "65-seater"];
    const allImages: string[] = [];
    const validExtensions = [".jpg", ".jpeg", ".png", ".webp", ".PNG", ".mp4", ".mov", ".webm"];
    
    for (const cat of categories) {
      const catDir = path.join(baseGalleryDir, cat);
      if (fs.existsSync(catDir)) {
        const files = fs.readdirSync(catDir);
        const filtered = files
          .filter((file) => validExtensions.includes(path.extname(file).toLowerCase()) && !file.startsWith("."))
          .map((file) => `/gallery/${cat}/${file}`);
        allImages.push(...filtered);
      }
    }
    
    return NextResponse.json({ images: allImages });
  } catch (error) {
    console.error("Failed to scan gallery capacity subfolders:", error);
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
