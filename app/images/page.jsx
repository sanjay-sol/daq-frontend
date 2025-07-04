"use client";
import { useEffect, useState } from "react";

export default function ImagesPage() {
    const [images, setImages] = useState([]);

    const fetchImages = async () => {
        try {
            const res = await fetch("/api/images");
            const data = await res.json();
            setImages(data);
        } catch (err) {
            console.error("Failed to fetch images:", err);
        }
    };

    useEffect(() => {
        fetchImages(); // initial load
        const interval = setInterval(fetchImages, 10000); // every 10 sec
        return () => clearInterval(interval); // cleanup
    }, []);

    return (
        <main style={styles.container}>
            <h1 style={styles.title}>🖼️ Latest Captured Images</h1>
            <div style={styles.grid}>
                {images.map((src, idx) => (
                    <img key={idx} src={src} alt={`Image ${idx}`} style={styles.image} />
                ))}
            </div>
        </main>
    );
}

const styles = {
    container: {
        padding: "2rem",
        backgroundColor: "#000",
        minHeight: "100vh",
        color: "white",
    },
    title: {
        textAlign: "center",
        fontSize: "2rem",
        marginBottom: "2rem",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "1rem",
    },
    image: {
        width: "100%",
        borderRadius: "8px",
        border: "2px solid #333",
        objectFit: "cover",
    },
};
