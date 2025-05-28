'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClientDataDisplay = () => {
  const [clients, setClients] = useState([]);
  const [editingId, setEditingId] = useState(null);
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
      const res = await axios.get('http://localhost:5000/api/clients');
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
      await axios.put(`http://localhost:5000/api/clients/${editingId}`, formData);
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
      await axios.delete(`http://localhost:5000/api/clients/${id}`);
      fetchClients();
    } catch (error) {
      console.error("Error deleting client:", error);
      alert("Failed to delete client. Please try again.");
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {clients.map((client) => (
        <div key={client._id} className="border border-gray-200 p-6 rounded-xl shadow hover:shadow-lg transition bg-white">
          {editingId === client._id ? (
            <>
              <input
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                className="mb-3 w-full border px-3 py-2 rounded text-gray-600 focus:ring focus:ring-blue-200"
                placeholder="Client Name"
              />
              <input
                name="workDoneBy"
                value={formData.workDoneBy}
                onChange={handleChange}
                className="mb-3 w-full border px-3 py-2 rounded text-gray-600 focus:ring focus:ring-blue-200"
                placeholder="Work Done By"
              />

              <label className="font-semibold mb-1 text-gray-600">Work Done:</label>
              {formData.workItems.map((item, index) => (
                <div key={index} className="flex gap-2 mb-2 text-gray-600">
                  <input
                    type="text"
                    placeholder="Work Type"
                    value={item.workType}
                    onChange={(e) => handleWorkItemChange(index, 'workType', e.target.value)}
                    required
                    className="flex-1 px-3 py-2 border rounded-md text-black"
                  />
                  <input
                    type="number"
                    placeholder="Price (₹)"
                    value={item.price}
                    onChange={(e) => handleWorkItemChange(index, 'price', e.target.value)}
                    required
                    className="w-28 px-3 py-2 border rounded-md text-black"
                  />
                  {formData.workItems.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeWorkItem(index)}
                      className="text-red-500 font-bold px-2"
                      title="Remove Work Item"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addWorkItem}
                className="text-blue-600 hover:text-blue-800 text-sm mb-4"
              >
                + Add another work item
              </button>

              <select
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handleChange}
                className="mb-3 w-full border px-3 py-2 rounded text-gray-600 focus:ring focus:ring-blue-200"
              >
                <option value="">Select Payment Mode</option>
                <option value="cash">Cash</option>
                <option value="upi">UPI</option>
                <option value="bankTransfer">Bank Transfer</option>
                <option value="card">Card</option>
                <option value="other">Other</option>
              </select>

              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                rows={3}
                placeholder="Additional notes"
                className="mb-4 w-full border px-3 py-2 rounded text-gray-600 focus:ring focus:ring-blue-200"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={handleUpdate}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                <strong>Client Name:</strong> {client.clientName}
              </h2>
              <p className="text-sm text-gray-600">
                <strong>Work Done By:</strong> {client.workDoneBy}
              </p>

              <div className="mb-2">
                <strong className='text-gray-600'>Work Done:</strong>
                {client.workItems && client.workItems.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {client.workItems.map((item, idx) => (
                      <li className='text-gray-600' key={idx}>
                        {item.workType} - ₹{item.price}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No work items available</p>
                )}
              </div>

              <p className="text-sm text-gray-600">
                <strong>Payment Mode:</strong> {client.paymentMode}
              </p>

              <p className="text-sm text-gray-600">
                <strong>Note:</strong> {client.note || 'N/A'}
              </p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(client)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(client._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ClientDataDisplay;
