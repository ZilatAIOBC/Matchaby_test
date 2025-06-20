import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import AddCampaign from "../../components/brand/addCampaign/addCampaign";
import EditCampaign from "../../components/brand/addCampaign/editCampaign";
import config from "../../config";
import axios from "axios";
import Cookie from "js-cookie";
import { toast } from "react-toastify";

const BrandCampaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(new Map());
  const [subscription, setSubscription] = useState(null);
  const [loadingSub, setLoadingSub] = useState(true);

  // New filters/search/sort/pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("createdAt");
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 6;

  const approvalStatusMap = {
  approved: {
    label: "✅ Approved",
    color: "bg-green-600 text-white",
  },
  pending: {
    label: "⏳ Pending Review",
    color: "bg-purple-600 text-white",
  },
  draft: {
    label: "📝 Draft",
    color: "bg-yellow-600 text-white",
  },
};



  const getCampaigns = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("BRAND_TOKEN");
      const res = await axios.get(`${config.BACKEND_URL}/brand/campaign-request/my-requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = Array.isArray(res.data.requests) ? res.data.requests : [];
      if (res.data.status === "success") {
        setCampaigns(data);
      } else {
        toast.info("No campaigns found", {
          position: "bottom-right",
          autoClose: 2000,
          theme: "dark",
        });
      }
    } catch (err) {
      console.error("Campaign fetch error:", err);
      toast.error("Failed to fetch campaigns", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscription = async () => {
    try {
      setLoadingSub(true);
      const token = localStorage.getItem("BRAND_TOKEN");
      const res = await axios.get(`${config.BACKEND_URL}/brand/package/subscription`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.subscription) setSubscription(res.data.subscription);
    } catch (err) {
      console.error("Subscription fetch error:", err);
    } finally {
      setLoadingSub(false);
    }
  };

  useEffect(() => {
    getCampaigns();
    fetchSubscription();
  }, []);

  const handleEdit = (id) => {
    const index = campaigns.findIndex((c) => c._id === id);
    setEditingId(id);
    setEditModal(true);
  };

  const handleDelete = async (id) => {
    const index = campaigns.findIndex((c) => c._id === id);
    const newMap = new Map(deleteLoading);
    newMap.set(id, true);
    setDeleteLoading(newMap);

    try {
      const token = localStorage.getItem("BRAND_TOKEN");
      const res = await axios.delete(`${config.BACKEND_URL}/brand/campaign-request/request/${id}`, {
        headers: { authorization:  `Bearer ${token}`},
      });

      if (res.data.status === "success") {
        const updatedList = [...campaigns];
        updatedList.splice(index, 1);
        setCampaigns(updatedList);

        toast.success("Campaign deleted successfully", {
          position: "bottom-right",
          autoClose: 2000,
          theme: "dark",
        });
      } else throw new Error("Delete failed");
    } catch (err) {
      toast.error("Failed to delete campaign", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "dark",
      });
    } finally {
      const newMap = new Map(deleteLoading);
      newMap.delete(id);
      setDeleteLoading(newMap);
    }
  };

  // ─── Count base + add-ons ─────────────────────────────────
const totalCampaignsAllowed =
  (subscription?.plan?.campaignsAllowed || 0) +
  (subscription?.extraCampaignsAllowed || 0);
const isLimitReached = (subscription?.campaignsUsed || 0) >= totalCampaignsAllowed;

// ─── Centralized “Add Campaign” click logic ────────────────
const handleAddClick = () => {
  if (isLimitReached) {
    toast.warn(
      `You’ve reached your campaign limit of ${totalCampaignsAllowed}. Consider purchasing an add-on.`,
      { position: "bottom-right", autoClose: 3000 }
    );
  } else {
    setShowModal(true);
    setEditIndex(null);
  }
};


  // Filter, search, sort, and paginate
const filteredCampaigns = campaigns
  .filter((camp) => {
    const now = new Date();
    const deadline = camp.deadline ? new Date(camp.deadline) : null;
    const status = camp.approvalStatus?.toLowerCase();

    switch (filterStatus) {
      case "Active":
        return status === "approved" && deadline && deadline >= now;
      case "Completed":
        return status === "approved" && deadline && deadline < now;
      case "Draft":
        return status === "draft";
      case "Pending Review":
        return status === "pending";
      case "All":
      default:
        return true;
    }
  })
  .filter((camp) =>
    camp.campaignTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .sort((a, b) => {
    if (sortBy === "deadline") return new Date(a.deadline) - new Date(b.deadline);
    if (sortBy === "submissionRate") return (b.submissionRate || 0) - (a.submissionRate || 0);
    return new Date(b.createdAt) - new Date(a.createdAt);
  });



  const indexOfLast = currentPage * campaignsPerPage;
  const indexOfFirst = indexOfLast - campaignsPerPage;
  const currentCampaigns = filteredCampaigns.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCampaigns.length / campaignsPerPage);

  return (
    <div className="min-h-screen p-4 md:p-8 bg-[#121212] text-gray-100 overflow-x-hidden">
      <Helmet>
        <title>My Campaigns</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-8xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-semibold mb-4 md:mb-0">Your Campaigns</h1>
          <div className="flex flex-col items-start md:items-end">
            <button
  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
    isLimitReached
      ? "bg-gray-600 text-gray-400"
      : "bg-[#3f3f3f] hover:bg-[#4f4f4f] text-white"
  }`}
  onClick={handleAddClick}
>
  <FaPlus className="mr-2" />
  {isLimitReached ? "Limit Reached" : "Add Campaign"}
</button>

            {isLimitReached && (
  <div className="w-full mt-4 p-4 bg-yellow-900 text-yellow-300 border border-yellow-700 rounded-lg shadow">
    <p className="text-sm font-medium flex items-center gap-2">
      ⚠️ <span>You’ve reached the campaign limit for your current plan.</span>
    </p>
    <p className="mt-1 text-sm">
      To launch more campaigns, please upgrade your plan.
    </p>
    <Link
      to="/brand/pricing"
      className="mt-2 inline-block px-4 py-1 bg-yellow-600 text-black font-semibold rounded hover:bg-yellow-500 transition"
    >
      Upgrade Plan
    </Link>
  </div>
)}

          </div>
        </div>

        {/* Filter, Search, Sort */}  
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex gap-2">
{["All", "Active", "Draft", "Completed", "Pending Review"].map((status) => (
  <button
    key={status}
    className={`px-3 py-1 rounded-full text-sm ${
      filterStatus === status
        ? "bg-indigo-600 text-white"
        : "bg-[#2a2a2a] text-gray-300"
    }`}
    onClick={() => {
      setFilterStatus(status);
      setCurrentPage(1);
    }}
  >
    {status}
  </button>
))}


          </div>

          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-1 rounded bg-[#1a1a1a] text-white border border-[#333] focus:outline-none"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 rounded bg-[#1a1a1a] text-white border border-[#333]"
          >
            <option value="createdAt">Sort by Created</option>
            <option value="deadline">Sort by Deadline</option>
            <option value="submissionRate">Sort by Submission Rate</option>
          </select>
        </div>

        <div className="bg-[#1e1e1e] rounded-lg shadow border border-[#2c2c2c]">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-[#2c2c2c] text-gray-300">
                <tr>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Deadline</th>
                  <th className="px-4 py-3 text-left">Submission Rate</th>
                  <th className="px-4 py-3 text-left">View</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#333]">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-400">Loading campaigns...</td>
                  </tr>
                ) : currentCampaigns.length === 0 ? (
  <tr>
    <td colSpan="6" className="text-center py-12 text-gray-300">
      <p className="text-lg font-semibold mb-2">
        {filterStatus === "All" && "You haven’t created any campaigns yet."}
        {filterStatus === "Active" && "No active campaigns at the moment."}
        {filterStatus === "Completed" && "No campaigns have been completed yet."}
        {filterStatus === "Draft" && "You haven’t saved any drafts yet."}
        {filterStatus === "Pending Review" && "No campaigns are under review."}
      </p>

      <p className="mb-4">
        {(filterStatus === "All" || filterStatus === "Draft") &&
          "Click Create Campaign to get started and connect with creators."}
      </p>

      {(filterStatus === "All" || filterStatus === "Draft") && (
        <button
          className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            isLimitReached
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
          onClick={handleAddClick}
          disabled={isLimitReached}
        >
          <FaPlus className="mr-2" />
          {isLimitReached ? "Limit Reached" : "Create Campaign"}
        </button>
      )}
    </td>
  </tr>
) : (
                  currentCampaigns.map((camp, index) => (
                    <tr key={index} className="hover:bg-[#292929] transition">
                      <td className="px-4 py-3 font-medium">{camp.campaignTitle}</td>
                     <td className="px-4 py-3">
 <span
  className={`text-xs font-medium px-2 py-1 rounded-full ${
    approvalStatusMap[camp.approvalStatus]?.color || "bg-gray-500 text-white"
  }`}
>
  {approvalStatusMap[camp.approvalStatus]?.label || camp.approvalStatus}
</span>

</td>

                      <td className="px-4 py-3">
                        <span className={new Date(camp.deadline) < new Date() ? "text-red-400" : "text-green-400"}>
                          {camp.deadline?.split("T")[0]}
                        </span>
                      </td>
                      <td className="px-4 py-3">{camp.submissionRate || 0}%</td>
                      <td className="px-4 py-3">
                        <Link to={`/brand/brand-applications/${camp._id}`}
                          className="inline-flex items-center px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
                        >
                          <AiOutlineEye className="mr-2" />
                          View
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleEdit(camp._id)}
                            disabled={deleteLoading.get(camp._id)}
                            className="p-2 text-yellow-400 bg-[#3a3a3a] hover:bg-[#4a4a4a] rounded-lg"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(camp._id)}
                            disabled={deleteLoading.get(camp._id)}
                            className="p-2 text-red-400 bg-[#3a3a3a] hover:bg-[#4a4a4a] rounded-lg"
                            title="Delete"
                          >
                            {deleteLoading.get(camp._id) ? (
                              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                            ) : (
                              <FaTrashAlt />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center mt-6">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 mx-1 rounded ${
                  currentPage === index + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-[#2c2c2c] text-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {showModal && <AddCampaign setShowModal={setShowModal} />}
      {editModal && editingId && (
      <EditCampaign
        setShowModal={setEditModal}
        campaignId={editingId}
      />
    )}
    </div>
  );
};

export default BrandCampaign;
