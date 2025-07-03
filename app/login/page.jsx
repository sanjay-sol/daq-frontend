"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/check-operator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      if (!res.ok) {
        console.log("Response not ok");
        console.log(res);
        throw new Error("Operator not found");
      }

      const data = await res.json();
      localStorage.setItem("uod", data.uod); 
router.push(`/dashboard/`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Operator Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
        <input
          type="text"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 text-black"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Check Operator
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
