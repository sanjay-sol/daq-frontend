"use client";
import { useState } from "react";

export default function AddOperatorPage() {
  const [formData, setFormData] = useState({
    operator_name: "",
    phone: "",
    place: "",
    joining_date: "",
    UOD: "",
    DID: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/operator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to register operator");

      const result = await res.json();
      setMessage("✅ Operator registered successfully");
      console.log(result);

      // Reset form
      setFormData({
        operator_name: "",
        phone: "",
        place: "",
        joining_date: "",
        UOD: "",
        DID: "",
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Error: " + err.message);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Operator</h1>

      {message && <p className="mb-4 text-red-600">{message}</p>}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-100 p-6 rounded shadow-md text-black"
      >
        <input
          name="operator_name"
          value={formData.operator_name}
          onChange={handleChange}
          placeholder="Operator Name"
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="place"
          value={formData.place}
          onChange={handleChange}
          placeholder="Place"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="joining_date"
          value={formData.joining_date}
          onChange={handleChange}
          placeholder="Joining Date"
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="UOD"
          value={formData.UOD}
          onChange={handleChange}
          placeholder="UOD (Operator ID)"
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="DID"
          value={formData.DID}
          onChange={handleChange}
          placeholder="DID (DAQ ID)"
          required
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Register Operator
        </button>
      </form>
    </div>
  );
}
