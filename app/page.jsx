"use client"
import { useState } from 'react';
import axios from 'axios';
import { useSession } from "next-auth/react";
// import Image from "next/image";

export default function Home() {
 
  const [results, setResults] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error analyzing PDF:', error);
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleUpload} />
      {results && (
        <div>
          <h3>Analysis Results:</h3>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
  // return (
  //  <div className="text-blue-600">
  //   home page
  //  </div>
  // );
}
