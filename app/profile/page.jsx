"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OperatorProfilePage() {
  const uod = typeof window !== "undefined" ? localStorage.getItem("uod") : null;
  const router = useRouter();

  const [operator, setOperator] = useState(null);
  const [farms, setFarms] = useState([]);
  const [acresCovered, setAcresCovered] = useState(0);
  const [imagesCaptured, setImagesCaptured] = useState(0); // You can update with real data

  useEffect(() => {
    if (!uod) return;

    const fetchOperator = async () => {
      const res = await fetch(`http://localhost:3000/operator/${uod}`);
      const json = await res.json();
      setOperator(json);
    };

    const fetchFarms = async () => {
      const res = await fetch(`http://localhost:3000/farms/${uod}`);
      const data = await res.json();
      setFarms(data);

      // Sum up area
      const totalAcres = data.reduce((sum, farm) => sum + parseFloat(farm.area || 0), 0);
      setAcresCovered(totalAcres);

      // Placeholder: Assume each farm has 10 images captured (replace with real logic)
      setImagesCaptured(data.length * 10);
    };

    fetchOperator();
    fetchFarms();
  }, [uod]);

  if (!uod) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">👤 Operator Profile</h1>
        <p className="text-red-500">Please log in to view your profile.</p>
      </div>
    );
  }

  if (!operator) return <div className="p-8">Loading profile...</div>;

  return (
    <div className="p-8 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">👤 Operator Profile</h1>

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 gap-4 text-white">
        <div className="bg-green-600 p-4 rounded text-center">
          <p className="text-xl font-semibold">{acresCovered}</p>
          <p className="text-sm">🌾 Acres Covered</p>
        </div>
        <div className="bg-blue-600 p-4 rounded text-center">
          <p className="text-xl font-semibold">{imagesCaptured}</p>
          <p className="text-sm">📷 Images Captured</p>
        </div>
      </div>

      {/* Harddisk Tracker Button */}
      <button
        className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded"
        onClick={() => router.push("/daq-details")}
      >
        🖴 Harddisk Tracker
      </button>

      {/* Operator Info */}
      <div className="border p-4 bg-gray-100 text-black rounded space-y-2">
        <p><strong>Name:</strong> {operator.operator_name}</p>
        <p><strong>Phone:</strong> {operator.phone}</p>
        <p><strong>Place:</strong> {operator.place}</p>
        <p><strong>Joining Date:</strong> {operator.joining_date}</p>
        <p><strong>UOD:</strong> {operator.uod}</p>
        <p><strong>DID:</strong> {operator.did}</p>
      </div>
        {/* Harddisk Tracker Button */}
        <button
        className="bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded"
        onClick={() => router.push("/notifications")}
      >
        🔔 View Notifications
      </button>
      <br />
      <button
        className="bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded"
        onClick={() => router.push("/logs")}
      >
        🔔 View All logs
      </button>
    </div>
  );
}
