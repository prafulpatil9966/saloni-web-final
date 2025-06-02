'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import ClientCard from '../component/ClientCard/ClientCard';

const ClientDataDisplay = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [clients, setClients] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    clientName: '',
    workDoneBy: '',
    workItems: [{ workType: '', price: '' }],
    paymentMode: '',
    note: '',
  });


  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await axios.get('https://saloni-web-backend.onrender.com/api/clients');
      setClients(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const handleEdit = (client) => {
    // Defensive copy of client data
    setEditingId(client._id);
    setFormData({
      clientName: client.clientName || '',
      workDoneBy: client.workDoneBy || '',
      workItems: client.workItems?.length ? client.workItems : [{ workType: '', price: '' }],
      paymentMode: client.paymentMode || '',
      note: client.note || '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWorkItemChange = (index, field, value) => {
    const updatedItems = [...formData.workItems];
    updatedItems[index][field] = value;
    setFormData(prev => ({ ...prev, workItems: updatedItems }));
  };

  const addWorkItem = () => {
    setFormData(prev => ({
      ...prev,
      workItems: [...prev.workItems, { workType: '', price: '' }],
    }));
  };

  const removeWorkItem = (index) => {
    const updatedItems = [...formData.workItems];
    updatedItems.splice(index, 1);
    setFormData(prev => ({ ...prev, workItems: updatedItems }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://saloni-web-backend.onrender.com/api/clients/${editingId}`, formData);
      setEditingId(null);
      fetchClients();
    } catch (error) {
      console.error("Error updating client:", error);
      alert("Failed to update client data.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this client?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://saloni-web-backend.onrender.com/api/clients/${id}`);
      fetchClients();
    } catch (error) {
      console.error("Error deleting client:", error);
      alert("Failed to delete client. Please try again.");
    }
  };

  const filteredClients = clients.filter((client) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      client.clientName.toLowerCase().includes(query) ||
      client.workDoneBy.toLowerCase().includes(query);

    if (!selectedDate) return matchesSearch;

    const clientDate = new Date(parseInt(client._id.substring(0, 8), 16) * 1000);
    const sameDay =
      clientDate.getDate() === selectedDate.getDate() &&
      clientDate.getMonth() === selectedDate.getMonth() &&
      clientDate.getFullYear() === selectedDate.getFullYear();

    return matchesSearch && sameDay;
  });


  const getCreatedAtFromObjectId = (objectId) => {
    const timestamp = parseInt(objectId.substring(0, 8), 16) * 1000;
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' }); // "May"
    const year = date.getFullYear();

    return `${day} ${month} ${year}`; // e.g., "29 May 2024"
  };

  return (
    <>
      <div className="p-6 flex flex-col md:flex-row justify-center items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-gray-600 font-medium">Filter by Date:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd MMM yyyy"
            isClearable
            placeholderText="Select a date"
            className="px-4 py-3 rounded-2xl shadow-md border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder:text-gray-400 transition duration-200"
          />
        </div>

        <input
          type="text"
          placeholder="Search by client or staff..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-xl px-5 py-3 rounded-2xl shadow-md border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder:text-gray-400 transition duration-200"
        />
        {selectedDate && (
          <button
            onClick={() => setSelectedDate(null)}
            className="text-blue-500 underline text-sm mt-1"
          >
            Clear Date Filter
          </button>
        )}

      </div>


      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <ClientCard
            key={client._id}
            client={client}
            editingId={editingId}
            formData={formData}
            handleChange={handleChange}
            handleWorkItemChange={handleWorkItemChange}
            addWorkItem={addWorkItem}
            removeWorkItem={removeWorkItem}
            handleUpdate={handleUpdate}
            setEditingId={setEditingId}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            getCreatedAtFromObjectId={getCreatedAtFromObjectId}
          />
        ))}
      </div>
    </>
  );
};

export default ClientDataDisplay;
