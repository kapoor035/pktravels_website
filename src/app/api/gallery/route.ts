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
    
    const categories = ["all/44 seater", "all/50 seater", "all/61 seater", "all/66 seater"];
    const allImages: string[] = [];
    const validExtensions = [".jpg", ".jpeg", ".png", ".webp", ".PNG", ".mp4", ".mov", ".webm"];
    
    for (const cat of categories) {
      const catDir = path.join(baseGalleryDir, cat);
      if (fs.existsSync(catDir)) {
        const files = fs.readdirSync(catDir);
        
        // Filter valid media files
        const mediaFiles = files.filter((file) => 
          validExtensions.includes(path.extname(file).toLowerCase()) && !file.startsWith(".")
        );
        
        // Separate images and videos
        const images = mediaFiles.filter((file) => {
          const ext = path.extname(file).toLowerCase();
          return ![".mp4", ".mov", ".webm"].includes(ext);
        });
        
        const videos = mediaFiles.filter((file) => {
          const ext = path.extname(file).toLowerCase();
          return [".mp4", ".mov", ".webm"].includes(ext);
        });
        
        // Sort images numerically by trailing index
        images.sort((a, b) => {
          const numA = parseInt(a.match(/-(\d+)\./)?.[1] || "0", 10);
          const numB = parseInt(b.match(/-(\d+)\./)?.[1] || "0", 10);
          return numA - numB;
        });
        
        // Sort videos numerically by trailing index
        videos.sort((a, b) => {
          const numA = parseInt(a.match(/-video-(\d+)\./)?.[1] || "0", 10);
          const numB = parseInt(b.match(/-video-(\d+)\./)?.[1] || "0", 10);
          return numA - numB;
        });
        
        // Combine sorted media list
        const sortedCategoryFiles = [...images, ...videos];
        const mapped = sortedCategoryFiles.map((file) => `/gallery/${cat}/${file}`);
        allImages.push(...mapped);
      }
    }
    
    return NextResponse.json({ images: allImages });
  } catch (error) {
    console.error("Failed to scan gallery capacity subfolders:", error);
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
