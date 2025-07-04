import fs from "fs/promises";
import path from "path";

const IMAGE_DIR = "/Users/sanjaysirangi/Desktop/mimic/images/";

export async function GET() {
  try {
    const files = await fs.readdir(IMAGE_DIR);

    const images = await Promise.all(
      files.map(async (file) => {
        const fullPath = path.join(IMAGE_DIR, file);
        const stat = await fs.stat(fullPath);
        return { file, mtime: stat.mtime };
      })
    );

    const sorted = images
      .sort((a, b) => b.mtime - a.mtime)
      .slice(0, 20)
      .map(({ file }) => `/api/image-proxy/${file}`);

    return new Response(JSON.stringify(sorted), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
