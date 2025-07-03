"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function RegionPage() {
  const { region } = useParams();
  const [farms, setFarms] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [farmData, setFarmData] = useState({
    farmer_name: "",
    gender: "",
    phone: "",
    crop: "",
    date_of_sowing: "",
    area: "",
    last_visited: "",
    state: region || "",
    village: "",
    UOD: "",
    UFD: "",
  });

  useEffect(() => {
    const fetchFarmsByRegion = async () => {
      const res = await fetch(`http://localhost:3000/farms-by-region/${region}`);
      const json = await res.json();
      setFarms(json);

      if (json.length > 0 && !farmData.UOD) {
        setFarmData((prev) => ({ ...prev, UOD: json[0].uod }));
      }
    };

    fetchFarmsByRegion();
  }, [region]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFarmData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFarmSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/farm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(farmData),
      });

      if (!res.ok) throw new Error("Failed to add farm");

      alert("Farm added successfully!");
      setShowForm(false);

      // Reset form except state and UOD
      setFarmData((prev) => ({
        ...prev,
        farmer_name: "",
        gender: "",
        phone: "",
        crop: "",
        date_of_sowing: "",
        area: "",
        last_visited: "",
        village: "",
        UFD: "",
      }));

      const farmsRes = await fetch(`http://localhost:3000/farms-by-region/${region}`);
      const updatedFarms = await farmsRes.json();
      setFarms(updatedFarms);
    } catch (err) {
      console.error(err);
      alert("Error adding farm");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Farms in {region}</h1>

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-6"
        >
          Add Farm
        </button>
      ) : (
        <form onSubmit={handleFarmSubmit} className="border p-4 mb-6 space-y-4 bg-gray-50 text-black rounded">
          <h2 className="text-lg font-semibold mb-2">Enter New Farm in {region}</h2>

          <input name="farmer_name" value={farmData.farmer_name} onChange={handleChange} placeholder="Farmer Name" className="border p-2 w-full" required />
          <input name="gender" value={farmData.gender} onChange={handleChange} placeholder="Gender" className="border p-2 w-full" required />
          <input name="phone" value={farmData.phone} onChange={handleChange} placeholder="Phone Number" className="border p-2 w-full" required />
          <input name="crop" value={farmData.crop} onChange={handleChange} placeholder="Crop" className="border p-2 w-full" required />
          <input type="date" name="date_of_sowing" value={farmData.date_of_sowing} onChange={handleChange} className="border p-2 w-full" required />
          <input name="area" value={farmData.area} onChange={handleChange} placeholder="Area" className="border p-2 w-full" required />
          <input type="date" name="last_visited" value={farmData.last_visited} onChange={handleChange} className="border p-2 w-full" required />
          <input name="village" value={farmData.village} onChange={handleChange} placeholder="Village" className="border p-2 w-full" required />
          <input name="UFD" value={farmData.UFD} onChange={handleChange} placeholder="Unique Farm ID" className="border p-2 w-full" required />

          <div className="flex gap-4">
            <button type="submit" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-white">
              Submit
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600 text-white"
            >
              Close
            </button>
          </div>
        </form>
      )}

      {farms.length > 0 ? (
        farms.map((farm) => (
          <div key={farm.ufd} className="border p-4 mb-4 rounded text-black bg-white">
            <p><strong>Farmer Name:</strong> {farm.farmer_name}</p>
            <p><strong>Gender:</strong> {farm.gender}</p>
            <p><strong>Phone:</strong> {farm.phone}</p>
            <p><strong>Crop:</strong> {farm.crop}</p>
            <p><strong>Area:</strong> {farm.area}</p>
            <p><strong>Date of Sowing:</strong> {farm.date_of_sowing}</p>
            <p><strong>Last Visited:</strong> {farm.last_visited}</p>
            <p><strong>State:</strong> {farm.state}</p>
            <p><strong>Village:</strong> {farm.village}</p>
            <p><strong>UFD:</strong> {farm.ufd}</p>
          </div>
        ))
      ) : (
        <p>No farms found in this region.</p>
      )}
    </div>
  );
}
