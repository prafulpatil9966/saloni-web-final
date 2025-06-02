import React from "react";

const ClientCard = ({
  client,
  editingId,
  formData,
  handleChange,
  handleWorkItemChange,
  addWorkItem,
  removeWorkItem,
  handleUpdate,
  setEditingId,
  handleEdit,
  handleDelete,
  getCreatedAtFromObjectId,
}) => {
  const isEditing = editingId === client._id;

  return (
    <div className="border border-gray-200 p-6 rounded-xl hover:shadow-lg transition bg-white shadow-[0_4px_8px_0_rgba(0,0,0,0.07)]">
      {isEditing ? (
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
                onChange={(e) => handleWorkItemChange(index, "workType", e.target.value)}
                required
                className="flex-1 px-3 py-2 border rounded-md text-black"
              />
              <input
                type="number"
                placeholder="Price (₹)"
                value={item.price}
                onChange={(e) => handleWorkItemChange(index, "price", e.target.value)}
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
          <p className="text-sm text-gray-600">
            <strong>Created At:</strong> {getCreatedAtFromObjectId(client._id)}
          </p>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            <strong>Client Name:</strong> {client.clientName}
          </h2>
          <p className="text-sm text-gray-600">
            <strong>Work Done By:</strong> {client.workDoneBy}
          </p>

          <div className="mb-2">
            <strong className="text-gray-600">Work Done:</strong>
            {client.workItems && client.workItems.length > 0 ? (
              <>
                <ul className="list-disc list-inside">
                  {client.workItems.map((item, idx) => (
                    <li className="text-gray-600" key={idx}>
                      {item.workType} - ₹{item.price}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 font-semibold text-gray-700">
                  Total Amount: ₹
                  {client.workItems.reduce((total, item) => total + Number(item.price), 0)}
                </p>
              </>
            ) : (
              <p>No work items available</p>
            )}
          </div>

          <p className="text-sm text-gray-600">
            <strong>Payment Mode:</strong> {client.paymentMode}
          </p>

          <p className="text-sm text-gray-600">
            <strong>Note:</strong> {client.note || "N/A"}
          </p>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => handleEdit(client)}
              className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(client._id)}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ClientCard;
