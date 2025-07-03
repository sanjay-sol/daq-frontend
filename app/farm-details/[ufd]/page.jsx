"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function FarmDetailsPage() {
  const { ufd } = useParams();
  const router = useRouter();

  const [farm, setFarm] = useState(null);

  // Dummy images array
  const dummyImages = [
    { url: "https://source.unsplash.com/400x300/?farm,field" },
    { url: "https://source.unsplash.com/400x300/?agriculture" },
    { url: "https://source.unsplash.com/400x300/?crop" },
    { url: "https://source.unsplash.com/400x300/?farmer" },
    { url: "https://source.unsplash.com/400x300/?plantation" },
  ];

  useEffect(() => {
    const fetchFarm = async () => {
      const res = await fetch(`http://localhost:3000/farm/${ufd}`);
      const json = await res.json();
      setFarm(json);
    };

    fetchFarm();
  }, [ufd]);

  if (!farm) return <div className="p-8 text-white">Loading farm details...</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto bg-black text-white rounded">
         {/* Images Captured Count */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          📸 Total Images Captured: {dummyImages.length}
        </h2>
      </div>
      <h1 className="text-2xl font-bold mb-6">🌾 Farm Details</h1>

      <div className="space-y-2 mb-8">
        <p><strong>Farmer Name:</strong> {farm.farmer_name}</p>
        <p><strong>Gender:</strong> {farm.gender}</p>
        <p><strong>Phone:</strong> {farm.phone}</p>
        <p><strong>Crop:</strong> {farm.crop}</p>
        <p><strong>Date of Sowing:</strong> {farm.date_of_sowing}</p>
        <p><strong>Area:</strong> {farm.area}</p>
        <p><strong>Last Visited:</strong> {farm.last_visited}</p>
        <p><strong>State:</strong> {farm.state}</p>
        <p><strong>Village:</strong> {farm.village}</p>
        <p><strong>UOD:</strong> {farm.uod}</p>
        <p><strong>UFD:</strong> {farm.ufd}</p>
      </div>

     

      {/* Images Preview + View All */}
      <div className="relative">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold">Images Captured</h3>
          <button
            className="underline text-cyan-400 hover:text-cyan-600"
            onClick={() => router.push("/images")}
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {dummyImages.slice(0, 5).map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt={`Dummy ${index + 1}`}
              className="w-full h-32 object-cover rounded border border-white"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
