"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const OperatorDashboard = () => {
  const { did } = useParams();
  const [data, setData] = useState(null);
  const [farmFormVisible, setFarmFormVisible] = useState(false);
  const [farms, setFarms] = useState([]);
  const [farmData, setFarmData] = useState({
    farm_name: "",
    crop: "",
    date_of_sowing: "",
    area: "",
    last_visited: "",
    UOD: "",
    UFD: "",
  });

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetch(`http://localhost:3000/details/${did}`);
      const json = await res.json();
      setData(json);

      if (json.operator.length > 0) {
        const uod = json.operator[0].uod;
        setFarmData((prev) => ({ ...prev, UOD: uod }));
        fetchFarms(uod);
      }
    };

    const fetchFarms = async (uod) => {
      const res = await fetch(`http://localhost:3000/farms/${uod}`);
      const farms = await res.json();
      setFarms(farms);
    };

    fetchDetails();
  }, [did]);

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

      const result = await res.json();
      alert("Farm added successfully!");

      // Reset form
      setFarmData((prev) => ({
        ...prev,
        farm_name: "",
        crop: "",
        date_of_sowing: "",
        area: "",
        last_visited: "",
        UFD: "",
      }));

      // Hide form
      setFarmFormVisible(false);

      // Refresh farm list
      fetch(`http://localhost:3000/farms/${farmData.UOD}`)
        .then((res) => res.json())
        .then((farms) => setFarms(farms));
    } catch (err) {
      console.error(err);
      alert("Error adding farm");
    }
  };

  if (!data) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Operator & DAQ Details</h1>

      {/* Add Farm Button */}
      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-6"
        onClick={() => setFarmFormVisible(!farmFormVisible)}
      >
        {farmFormVisible ? "Cancel Add Farm" : "Add Farm"}
      </button>

      {/* Operator Details */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Operator Details</h2>
        {data.operator.map((op) => (
          <div key={op.uod} className="border p-4 my-2">
            <p><strong>Name:</strong> {op.operator_name}</p>
            <p><strong>Phone:</strong> {op.phone}</p>
            <p><strong>Place:</strong> {op.place}</p>
            <p><strong>Joining Date:</strong> {op.joining_date}</p>
            <p><strong>DID:</strong> {op.did}</p>
          </div>
        ))}
      </div>

      {/* DAQ Details */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">DAQ Details</h2>
        <div className="border p-4">
          <p><strong>DID:</strong> {data.daq.did}</p>
          <p><strong>Hardware Requirements:</strong> {data.daq.hardware_requirements}</p>
        </div>
      </div>

      {/* Farm Form */}
      {farmFormVisible && (
        <form onSubmit={handleFarmSubmit} className="border p-4 mb-6 space-y-4 bg-gray-50">
          <h2 className="text-lg font-semibold mb-2">Enter Farm Details</h2>
          <input
            type="text"
            name="farm_name"
            value={farmData.farm_name}
            onChange={handleChange}
            placeholder="Farm Name"
            className="border p-2 w-full text-black"
            required
          />
          <input
            type="text"
            name="crop"
            value={farmData.crop}
            onChange={handleChange}
            placeholder="Crop"
            className="border p-2 w-full text-black"
            required
          />
          <input
            type="date"
            name="date_of_sowing"
            value={farmData.date_of_sowing}
            onChange={handleChange}
            className="border p-2 w-full text-black"
            required
          />
          <input
            type="text"
            name="area"
            value={farmData.area}
            onChange={handleChange}
            placeholder="Area (e.g., 2 acres)"
            className="border p-2 w-full text-black"
            required
          />
          <input
            type="date"
            name="last_visited"
            value={farmData.last_visited}
            onChange={handleChange}
            className="border p-2 w-full text-black"
            required
          />
          <input
            type="text"
            name="UFD"
            value={farmData.UFD}
            onChange={handleChange}
            placeholder="Unique Farm ID (UFD)"
            className="border p-2 w-full text-black"
            required
          />
          <button
            type="submit"
            className="bg-blue-600  px-4 py-2 rounded hover:bg-blue-700 text-black"
          >
            Submit Farm Details
          </button>
        </form>
      )}

      {/* Display Farms */}
      <div>
        <h2 className="text-lg font-semibold mt-6 mb-2">Farms Under This Operator</h2>
        {farms.length > 0 ? (
          farms.map((farm) => (
            <div key={farm.ufd} className="border p-4 mb-4">
              <p><strong>Farm Name:</strong> {farm.farm_name}</p>
              <p><strong>Crop:</strong> {farm.crop}</p>
              <p><strong>Area:</strong> {farm.area}</p>
              <p><strong>Date of Sowing:</strong> {farm.date_of_sowing}</p>
              <p><strong>Last Visited:</strong> {farm.last_visited}</p>
              <p><strong>UFD:</strong> {farm.ufd}</p>
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
