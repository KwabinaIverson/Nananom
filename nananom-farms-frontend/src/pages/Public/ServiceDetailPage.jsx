// src/pages/Public/ServiceDetailPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const ServiceDetailPage = () => {
  const { id } = useParams(); // Get the service ID from the URL

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold text-green-700 mb-4">Service Detail Page</h1>
      <p className="text-lg text-gray-700">Details for Service ID: <span className="font-semibold">{id}</span></p>
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md border border-green-200">
        <p className="text-gray-600">
          This page will display comprehensive information about a specific service.
        </p>
      </div>
    </div>
  );
};

export default ServiceDetailPage;