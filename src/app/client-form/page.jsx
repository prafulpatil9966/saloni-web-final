'use client';

import { useState } from "react";
import axios from "axios";

const ClientBusinessForm = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    workDoneBy: '',
    workItems: [{ workType: '', price: '' }],
    paymentMode: '',
    note: '',
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data: Convert price to number
    const dataToSend = {
      ...formData,
      workItems: formData.workItems.map(item => ({
        workType: item.workType,
        price: Number(item.price),  // convert price to number here
      })),
    };

    console.log("Submitting:", dataToSend);

    try {
      const response = await axios.post('http://localhost:5000/api/clients', dataToSend);
      alert("Data submitted successfully!");
      setFormData({
        clientName: '',
        workDoneBy: '',
        workItems: [{ workType: '', price: '' }],
        paymentMode: '',
        note: '',
      });
    } catch (err) {
      alert("Error submitting data");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <form className="space-y-3" onSubmit={handleSubmit}>
        {/* Client Name */}
        <div>
          <label className="block text-sm font-medium text-black">Client Name</label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md text-black"
          />
        </div>

        {/* Work Done By */}
        <div>
          <label className="block text-sm font-medium text-black">Work Done By</label>
          <input
            type="text"
            name="workDoneBy"
            value={formData.workDoneBy}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md text-black"
          />
        </div>

        {/* Work Items */}
        <div>
          <label className="block text-sm font-medium text-black mb-1">Work Details</label>
          {formData.workItems.map((item, index) => (
            <div key={index} className="flex gap-2 items-center mb-2">
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
                  title="Remove"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addWorkItem}
            className="text-blue-600 hover:text-blue-800 text-sm mt-1"
          >
            + Add another
          </button>
        </div>

        {/* Payment Mode */}
        <div>
          <label className="block text-sm font-medium text-black">Mode of Payment</label>
          <select
            name="paymentMode"
            value={formData.paymentMode}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md text-black"
          >
            <option value="">Select</option>
            <option value="cash">Cash</option>
            <option value="upi">UPI</option>
            <option value="bankTransfer">Bank Transfer</option>
            <option value="card">Card</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-black">Note</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            rows={3}
            placeholder="Add any additional information here..."
            className="mt-1 block w-full px-4 py-2 border rounded-md text-black"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ClientBusinessForm;
