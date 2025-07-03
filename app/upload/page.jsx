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
      const res = await fetch("http://104.211.115.181:3000/ping");

      if (!res.ok) {
        console.log("Response not ok");
        console.log(res);
        throw new Error("Operator not found");
      }
      const text = await res.text();
      console.log("Ping response:", text);
      // console.log(res.)

    
      // console.log("Operator data:", res);
    //  const did = data.did; // ✅ since you're returning the operator object directly
router.push(`/dashboard/${did}`);
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
