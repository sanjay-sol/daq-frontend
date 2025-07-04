import fs from "fs/promises";
import path from "path";

export async function GET(request, contextPromise) {
  const context = await contextPromise; // 👈 Await context
  const { filename } = context.params;

  const imagePath = path.join(
    "/Users/sanjaysirangi/Desktop/mimic/images",
    filename
  );

  try {
    const fileBuffer = await fs.readFile(imagePath);
    const ext = path.extname(filename).toLowerCase();
    const contentType = ext === ".png" ? "image/png" : "image/jpeg";

    return new Response(fileBuffer, {
      headers: { "Content-Type": contentType },
    });
  } catch (err) {
    return new Response("Image not found", { status: 404 });
  }
}
