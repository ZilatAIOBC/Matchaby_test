import React, { useEffect, useState } from "react";
import axios from "axios";
import config from '../../config';
import Cookies from 'js-cookie';

const PlanManagement = () => {
  const [plans, setPlans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    campaignsAllowed: "",
    creatorsAllowed: "",
    validityMonths: "",
    campaignAddonPrice: "",
    creatorAddonPrice: "",
  });
  const token = Cookies.get('AdminToken') || localStorage.getItem('token');

  // Fetch all plans
  const fetchPlans = async () => {
    try {
      const res = await axios.get(`${config.BACKEND_URL}/brand/package/plans`, {
        headers: { Authorization: token },
      });
      setPlans(res.data.plans || []);
    } catch (err) {
      console.error("Error fetching plans", err);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name.trim(),
        price: Number(formData.price),
        campaignsAllowed: Number(formData.campaignsAllowed),
        creatorsAllowed: Number(formData.creatorsAllowed),
        validityMonths: Number(formData.validityMonths),
        campaignAddonPrice: Number(formData.campaignAddonPrice),
        creatorAddonPrice: Number(formData.creatorAddonPrice),
      };

      const endpoint = editingPlan
        ? `${config.BACKEND_URL}/brand/package/plans/${editingPlan._id}`
        : `${config.BACKEND_URL}/brand/package/plans`;

      const method = editingPlan ? axios.patch : axios.post;

      await method(endpoint, payload, {
        headers: { Authorization: token },
      });

      setFormData({ name: "", price: "", campaignsAllowed: "", creatorsAllowed: "", validityMonths: "", campaignAddonPrice: "", creatorAddonPrice: "" });
      setEditingPlan(null);
      setShowModal(false);
      fetchPlans();
    } catch (err) {
      console.error("Error saving plan", err?.response?.data || err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;
    try {
      await axios.delete(`${config.BACKEND_URL}/brand/package/plans/${id}`, {
        headers: { Authorization: token },
      });
      fetchPlans();
    } catch (err) {
      console.error("Error deleting plan", err);
    }
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price,
      campaignsAllowed: plan.campaignsAllowed,
      creatorsAllowed: plan.creatorsAllowed,
      validityMonths: plan.validityMonths,
      campaignAddonPrice: plan.campaignAddonPrice || "",
      creatorAddonPrice: plan.creatorAddonPrice || "",
    });
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Plan Management</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => {
            setEditingPlan(null);
            setFormData({ name: "", price: "", campaignsAllowed: "", creatorsAllowed: "", validityMonths: "", campaignAddonPrice: "", creatorAddonPrice: "" });
            setShowModal(true);
          }}
        >
          + Create Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan._id} className="bg-zinc-900 text-white border border-zinc-700 rounded-lg p-4 shadow">
            <h3 className="text-xl font-semibold mb-3">{plan.name}</h3>
            <p>💰 Price: ${plan.price}</p>
            <p>📦 Campaigns: {plan.campaignsAllowed}</p>
            <p>👥 Creators: {plan.creatorsAllowed}</p>
            <p>🕒 Validity: {plan.validityMonths} months</p>
            <p>➕ Add-on Campaign Price: ${plan.campaignAddonPrice}</p>
            <p>➕ Add-on Creator Price: ${plan.creatorAddonPrice}</p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEdit(plan)}
                className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(plan._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-zinc-900 text-white p-6 rounded-lg w-full max-w-md shadow-lg border border-zinc-700">
            <h2 className="text-xl font-semibold mb-4">
              {editingPlan ? "Edit Plan" : "Create New Plan"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { field: 'name', label: 'Name', type: 'text' },
                { field: 'price', label: 'Price', type: 'number' },
                { field: 'campaignsAllowed', label: 'Campaigns Allowed', type: 'number' },
                { field: 'creatorsAllowed', label: 'Creators Allowed', type: 'number' },
                { field: 'validityMonths', label: 'Validity (Months)', type: 'number' },
                { field: 'campaignAddonPrice', label: 'Campaign Add-on Price', type: 'number' },
                { field: 'creatorAddonPrice', label: 'Creator Add-on Price', type: 'number' }
              ].map(({ field, label, type }) => (
                <div key={field}>
                  <label className="block text-sm mb-1">{label}</label>
                  <input
                    type={type}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded outline-none"
                    required
                  />
                </div>
              ))}
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded border border-zinc-500 hover:bg-zinc-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
                >
                  {editingPlan ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanManagement;
