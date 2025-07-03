"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const OperatorDashboard = () => {
  const uod = typeof window !== "undefined" ? localStorage.getItem("uod") : null;
  if (!uod) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">
            
          👤  
          Operator Dashboard
        </h1>
        <p className="text-red-500">Please log in to view your dashboard.</p>
      </div>
    );
  }
  const router = useRouter();
  const [data, setData] = useState(null);
  const [farms, setFarms] = useState([]);
  const [regions, setRegions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [farmData, setFarmData] = useState({
    farmer_name: "",
    gender: "",
    phone: "",
    crop: "",
    date_of_sowing: "",
    area: "",
    last_visited: "",
    state: "",
    village: "",
    UOD: uod,
    UFD: "",
  });

  useEffect(() => {
    const fetchOperator = async () => {
      const res = await fetch(`http://localhost:3000/operator/${uod}`);
      const operator = await res.json();
      setData(operator);
    };

    const fetchFarms = async () => {
      const res = await fetch(`http://localhost:3000/farms/${uod}`);
      const farms = await res.json();
      setFarms(farms);
      const uniqueStates = [...new Set(farms.map((farm) => farm.state))];
      setRegions(uniqueStates);
    };

    fetchOperator();
    fetchFarms();
  }, [uod]);

  const handleRegionChange = (e) => {
    const selected = e.target.value;
    if (selected) {
      router.push(`/currentregion/${selected}`);
    }
  };

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

      // Reset form except UOD
      setFarmData((prev) => ({
        ...prev,
        farmer_name: "",
        gender: "",
        phone: "",
        crop: "",
        date_of_sowing: "",
        area: "",
        last_visited: "",
        state: "",
        village: "",
        UFD: "",
      }));

      const updatedFarms = await (await fetch(`http://localhost:3000/farms/${uod}`)).json();
      setFarms(updatedFarms);
      const uniqueStates = [...new Set(updatedFarms.map((farm) => farm.state))];
      setRegions(uniqueStates);
    } catch (err) {
      console.error(err);
      alert("Error adding farm");
    }
  };

  if (!data) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Operator Dashboard</h1>

      {/* Region Dropdown */}
      <div className="mb-4">
        <label className="mr-2 text-lg font-semibold">Region:</label>
        <select onChange={handleRegionChange} className="p-2 border text-black">
          <option value="">Select Region</option>
          {regions.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* Add Farm Toggle */}
      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-6"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel Add Farm" : "Add Farm"}
      </button>

      {/* Add Farm Form */}
      {showForm && (
        <form onSubmit={handleFarmSubmit} className="border p-4 mb-6 space-y-4 bg-gray-50 rounded text-black">
          <h2 className="text-lg font-semibold mb-2">Enter Farm Details</h2>

          <input name="farmer_name" value={farmData.farmer_name} onChange={handleChange} placeholder="Farmer Name" className="border p-2 w-full" required />
          <input name="gender" value={farmData.gender} onChange={handleChange} placeholder="Gender" className="border p-2 w-full" required />
          <input name="phone" value={farmData.phone} onChange={handleChange} placeholder="Phone Number" className="border p-2 w-full" required />
          <input name="crop" value={farmData.crop} onChange={handleChange} placeholder="Crop" className="border p-2 w-full" required />
          <input type="date" name="date_of_sowing" value={farmData.date_of_sowing} onChange={handleChange} className="border p-2 w-full" required />
          <input name="area" value={farmData.area} onChange={handleChange} placeholder="Area" className="border p-2 w-full" required />
          <input type="date" name="last_visited" value={farmData.last_visited} onChange={handleChange} className="border p-2 w-full" required />
          <input name="state" value={farmData.state} onChange={handleChange} placeholder="State" className="border p-2 w-full" required />
          <input name="village" value={farmData.village} onChange={handleChange} placeholder="Village" className="border p-2 w-full" required />
          <input name="UFD" value={farmData.UFD} onChange={handleChange} placeholder="Unique Farm ID" className="border p-2 w-full" required />

          <button type="submit" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-white">
            Submit
          </button>
        </form>
      )}

      {/* Operator Info */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Operator Details</h2>
        <div className="border p-4 my-2">
          <p><strong>Name:</strong> {data.operator_name}</p>
          <p><strong>Phone:</strong> {data.phone}</p>
          <p><strong>Place:</strong> {data.place}</p>
          <p><strong>Joining Date:</strong> {data.joining_date}</p>
          <p><strong>UOD:</strong> {data.uod}</p>
          <p><strong>DID:</strong> {data.did}</p>
        </div>
      </div>

      {/* Farms List */}
      <div>
        <h2 className="text-lg font-semibold mt-6 mb-2">Farms Under This Operator</h2>
        {farms.length > 0 ? (
          farms.map((farm) => (
            <div key={farm.ufd} className="border p-4 mb-4">
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
              <button className="bg-gray-500 text-white p-2 rounded-md m-2">View History</button>
              <button
        onClick={() => router.push(`/farm-details/${farm.ufd}`)}
        className="mt-2 bg-purple-400 text-white px-5 pt-2 pb-2 py-1 rounded hover:bg-blue-700"
      >
        View Details
      </button>
            </div>
          ))
        ) : (
          <p>No farms found for this operator.</p>
        )}
      </div>
    </div>
  );
};

export default OperatorDashboard;
