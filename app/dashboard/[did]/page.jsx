"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const OperatorDashboard = () => {
  const { did } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetch(`http://localhost:3000/details/${did}`);
      const json = await res.json();
      setData(json);
    };
    fetchDetails();
  }, [did]);

  if (!data) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Operator & DAQ Details</h1>

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

      <div>
        <h2 className="text-lg font-semibold">DAQ Details</h2>
        <div className="border p-4">
          <p><strong>DID:</strong> {data.daq.did}</p>
          <p><strong>Hardware Requirements:</strong> {data.daq.hardware_requirements}</p>
        </div>
      </div>
    </div>
  );
};

export default OperatorDashboard;
