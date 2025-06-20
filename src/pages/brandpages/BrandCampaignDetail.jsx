import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { 
  FaArrowLeft, 
  FaExternalLinkAlt, 
  FaEdit, 
  FaTimes, 
  FaCheck, 
  FaBan, 
  FaEye,
  FaInstagram,
  FaTiktok,
  FaTrash
} from 'react-icons/fa';
import axios from 'axios';
import config from '../../config';

export default function BrandCampaignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Core state
  const [campaign, setCampaign] = useState(null);
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  
  // Tracking management
  const [editingTracking, setEditingTracking] = useState(null);
  const [trackingInput, setTrackingInput] = useState('');
  
  // Modals
  const [showContentModal, setShowContentModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  // Content status management
  const [contentStatus, setContentStatus] = useState('Pending');

  useEffect(() => {
    fetchCampaignData();
  }, [id]);

  const fetchCampaignData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('BRAND_TOKEN');

      // Fetch campaign details from mock API
      const campaignResponse = await axios.get(`${config.BACKEND_URL}/api/brand/campaigns/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (campaignResponse.data.status === 'success') {
        setCampaign(campaignResponse.data.campaign);

        // Fetch creators for this campaign from mock API
        const creatorsResponse = await axios.get(`${config.BACKEND_URL}/api/brand/creators/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (creatorsResponse.data.status === 'success') {
          // Transform creator data according to specifications
          const transformedCreators = creatorsResponse.data.data.map(creator => ({
            id: creator.id,
            name: creator.name,
            email: creator.email,
            socialId: creator.socialId,
            platform: creator.platform,
            profileUrl: creator.profileUrl,
            performanceScore: creator.performanceScore,
            tracking: creator.tracking || '',
            courier: creator.courier || '',
            deliveryStatus: creator.deliveryStatus || '❌ Not Found',
            deliveredAt: creator.deliveredAt,
            contentStatus: creator.contentStatus || '— Not Submitted',
            extensionStatus: creator.extensionStatus || null,
            participationStatus: creator.participationStatus || 'Applied',
            appliedAt: creator.appliedAt,
            approvedAt: creator.approvedAt,
            shippingInfo: creator.shippingInfo,
            contentUrls: creator.contentUrls || { instagram: null, tiktok: null }
          }));

          setCreators(transformedCreators);
        } else {
          setCreators([]);
        }
      } else {
        setCampaign(null);
        setCreators([]);
      }
    } catch (error) {
      console.error('Error fetching campaign data:', error);
      setCampaign(null);
      setCreators([]);
    } finally {
      setLoading(false);
    }
  };

  // Helper functions for UI
  const getPerformanceDisplay = (score) => {
    if (score === null || score === undefined) return '—';
    return score.toFixed(1);
  };

  const getPerformanceColor = (score) => {
    if (score === null || score === undefined) return 'text-gray-400';
    if (score >= 4.5) return 'text-green-400';
    if (score >= 3.5) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getPlatformIcon = (platform) => {
    return platform === 'Instagram' ? <FaInstagram className="text-pink-400" /> : <FaTiktok className="text-white" />;
  };

  const getDeliveryStatusColor = (status) => {
    if (status.includes('Not Found')) return 'text-red-400';
    if (status.includes('Pending')) return 'text-yellow-400';
    if (status.includes('In Transit')) return 'text-blue-400';
    if (status.includes('Delivered')) return 'text-green-400';
    if (status.includes('Exception')) return 'text-red-400';
    return 'text-gray-400';
  };

  const getContentStatusColor = (status) => {
    if (status === '✅ Submitted') return 'text-green-400';
    return 'text-gray-400';
  };

  const getExtensionStatusColor = (status) => {
    if (!status) return 'text-gray-400';
    if (status.includes('Pending')) return 'text-yellow-400';
    if (status.includes('Approved')) return 'text-green-400';
    if (status.includes('Rejected')) return 'text-red-400';
    return 'text-gray-400';
  };

  const getParticipationStatusColor = (status) => {
    switch (status) {
      case 'Applied': return 'text-yellow-400 bg-yellow-400/10';
      case 'Approved': return 'text-green-400 bg-green-400/10';
      case 'Rejected': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  // Event handlers
  const handleSocialClick = (url) => {
    window.open(url, '_blank');
  };

  const handleTrackingClick = (tracking) => {
    if (tracking) {
      window.open(`https://www.17track.net/en/track?nums=${tracking}`, '_blank');
    }
  };

  const handleTrackingEdit = (creatorId, currentTracking) => {
    setEditingTracking(creatorId);
    setTrackingInput(currentTracking);
  };

  const handleTrackingSave = async (creatorId) => {
    if (!trackingInput.trim()) {
      alert('Please enter a tracking number');
      return;
    }

    if (trackingInput.length > 50) {
      alert('Tracking number must be less than 50 characters');
      return;
    }

    setUpdating(true);
    try {
      const token = localStorage.getItem('BRAND_TOKEN');
      const response = await axios.put(`${config.BACKEND_URL}/api/brand/creators/${creatorId}/tracking`, {
        trackingNumber: trackingInput,
        courier: 'UPS' // Default courier
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.status === 'success') {
        // Update local state
        setCreators(creators.map(creator =>
          creator.id === creatorId
            ? { ...creator, tracking: trackingInput }
            : creator
        ));

        setEditingTracking(null);
        setTrackingInput('');
        alert('Tracking information updated and email sent to creator!');
      } else {
        alert(response.data.message || 'Failed to update tracking information');
      }
    } catch (error) {
      console.error('Error updating tracking:', error);
      alert('Failed to update tracking information');
    } finally {
      setUpdating(false);
    }
  };

  const handleTrackingCancel = () => {
    setEditingTracking(null);
    setTrackingInput('');
  };

  // Extension request handlers
  const handleExtensionAction = async (creatorId, action) => {
    setUpdating(true);
    try {
      const token = localStorage.getItem('BRAND_TOKEN');
      const response = await axios.put(`${config.BACKEND_URL}/api/brand/creators/${creatorId}/extension`, {
        action: action
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.status === 'success') {
        setCreators(creators.map(creator =>
          creator.id === creatorId
            ? {
                ...creator,
                extensionStatus: action === 'approve' 
                  ? creator.extensionStatus.replace('Pending', 'Approved')
                  : creator.extensionStatus.replace('Pending', 'Rejected')
              }
            : creator
        ));

        alert(`Extension ${action === 'approve' ? 'approved' : 'rejected'} successfully`);
      } else {
        alert(response.data.message || 'Failed to update extension status');
      }
    } catch (error) {
      console.error('Error handling extension:', error);
      alert('Failed to update extension status');
    } finally {
      setUpdating(false);
    }
  };

  // Participation approval handlers
  const handleParticipationAction = async (creatorId, action) => {
    setUpdating(true);
    try {
      const token = localStorage.getItem('BRAND_TOKEN');
      const response = await axios.put(`${config.BACKEND_URL}/api/brand/creators/${creatorId}/participation`, {
        action: action
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.status === 'success') {
        setCreators(creators.map(creator =>
          creator.id === creatorId
            ? {
                ...creator,
                participationStatus: action === 'approve' ? 'Approved' : 'Rejected',
                approvedAt: action === 'approve' ? new Date().toISOString().split('T')[0] : null
              }
            : creator
        ));

        alert(`Participation ${action === 'approve' ? 'approved' : 'rejected'} successfully`);
      } else {
        alert(response.data.message || 'Failed to update participation status');
      }
    } catch (error) {
      console.error('Error handling participation:', error);
      alert('Failed to update participation status');
    } finally {
      setUpdating(false);
    }
  };

  // Content modal handlers
  const handleViewContent = (creator) => {
    setSelectedContent(creator);
    setContentStatus(creator.contentStatus || 'Pending');
    setShowContentModal(true);
  };

  const handleContentStatusUpdate = async () => {
    if (!selectedContent) return;

    setUpdating(true);
    try {
      const token = localStorage.getItem('BRAND_TOKEN');
      const response = await axios.put(`${config.BACKEND_URL}/api/brand/creators/${selectedContent.id}/content-status`, {
        status: contentStatus
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.status === 'success') {
        setCreators(creators.map(creator =>
          creator.id === selectedContent.id
            ? { ...creator, contentStatus: contentStatus }
            : creator
        ));

        setShowContentModal(false);
        alert('Content status updated successfully');
      } else {
        alert(response.data.message || 'Failed to update content status');
      }
    } catch (error) {
      console.error('Error updating content status:', error);
      alert('Failed to update content status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] text-gray-100 p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-500"></div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-[#121212] text-gray-100 p-6">
        <div className="text-center py-20">
          <p className="text-xl text-gray-400 FontNoto">Campaign not found</p>
          <button
            onClick={() => navigate('/brand/campaigns')}
            className="mt-4 bg-lime-500 hover:bg-lime-600 text-black px-6 py-2 rounded-lg FontNoto font-medium"
          >
            Back to Campaigns
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-gray-100">
      <Helmet>
        <title>{campaign.title} - Campaign Details | Matchably</title>
      </Helmet>

      {/* Header */}
      <div className="bg-[#1a1a1a] border-b border-gray-800 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/brand/campaigns')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold FontNoto text-white">{campaign.title}</h1>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    campaign.status === 'active' ? 'bg-green-400/10 text-green-400' :
                    campaign.status === 'draft' ? 'bg-yellow-400/10 text-yellow-400' :
                    'bg-gray-400/10 text-gray-400'
                  }`}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </span>
                  <span>Created: {new Date(campaign.createdAt).toLocaleDateString()}</span>
                  {campaign.deadline && (
                    <span>Deadline: {new Date(campaign.deadline).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
            </div>

            {campaign.status === 'draft' && (
              <button
                onClick={() => setShowDeleteModal(true)}
                className="text-red-400 hover:text-red-300 transition-colors"
                title="Delete Campaign"
              >
                <FaTrash className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Campaign Info */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-[#1a1a1a] rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Description</h3>
              <p className="text-white FontNoto">{campaign.description || 'No description provided'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Budget</h3>
              <p className="text-white FontNoto">${campaign.budget?.toLocaleString() || 'Not specified'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Target Audience</h3>
              <p className="text-white FontNoto">{campaign.targetAudience || 'Not specified'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Requirements</h3>
              <p className="text-white FontNoto">{campaign.requirements || 'No specific requirements'}</p>
            </div>
          </div>
        </div>

        {/* Creators Table */}
        <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-xl font-bold FontNoto text-white">Campaign Creators ({creators.length})</h2>
          </div>

          {creators.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-400 FontNoto">No creators have applied to this campaign yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#2a2a2a]">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Name & Social ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Platform
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Performance Score
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Tracking
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Delivery Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Content Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Extension Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Content
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Participation
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {creators.map((creator) => (
                    <tr key={creator.id} className="hover:bg-[#2a2a2a] transition-colors">
                      {/* Name & Social ID */}
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-white font-medium FontNoto">{creator.name}</div>
                          <button
                            onClick={() => handleSocialClick(creator.profileUrl)}
                            className="text-lime-400 hover:text-lime-300 text-sm transition-colors"
                          >
                            {creator.socialId} <FaExternalLinkAlt className="inline w-3 h-3 ml-1" />
                          </button>
                        </div>
                      </td>

                      {/* Platform */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {getPlatformIcon(creator.platform)}
                          <span className="text-white FontNoto">{creator.platform}</span>
                        </div>
                      </td>

                      {/* Performance Score */}
                      <td className="px-6 py-4">
                        <span className={`font-medium FontNoto ${getPerformanceColor(creator.performanceScore)}`}>
                          {getPerformanceDisplay(creator.performanceScore)}
                        </span>
                      </td>

                      {/* Tracking */}
                      <td className="px-6 py-4">
                        {editingTracking === creator.id ? (
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={trackingInput}
                              onChange={(e) => setTrackingInput(e.target.value)}
                              className="bg-[#2a2a2a] border border-gray-600 rounded px-2 py-1 text-white text-sm w-32"
                              placeholder="Enter tracking #"
                              maxLength={50}
                            />
                            <button
                              onClick={() => handleTrackingSave(creator.id)}
                              disabled={updating}
                              className="text-green-400 hover:text-green-300 disabled:opacity-50"
                            >
                              <FaCheck className="w-4 h-4" />
                            </button>
                            <button
                              onClick={handleTrackingCancel}
                              disabled={updating}
                              className="text-red-400 hover:text-red-300 disabled:opacity-50"
                            >
                              <FaTimes className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            {creator.tracking ? (
                              <button
                                onClick={() => handleTrackingClick(creator.tracking)}
                                className="text-lime-400 hover:text-lime-300 text-sm transition-colors"
                              >
                                🔗 Track Shipment
                              </button>
                            ) : (
                              <button
                                onClick={() => handleTrackingEdit(creator.id, creator.tracking)}
                                className="text-gray-400 hover:text-white text-sm transition-colors"
                              >
                                ✏️ Enter Tracking
                              </button>
                            )}
                            {creator.tracking && (
                              <button
                                onClick={() => handleTrackingEdit(creator.id, creator.tracking)}
                                className="text-gray-400 hover:text-white ml-2"
                              >
                                <FaEdit className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        )}

                        {/* Shipping Info - Only show if approved */}
                        {creator.participationStatus === 'Approved' && creator.shippingInfo && (
                          <div className="mt-2 text-xs text-gray-400 bg-[#2a2a2a] p-2 rounded">
                            <div><strong>Name:</strong> {creator.shippingInfo.name}</div>
                            <div><strong>Phone:</strong> {creator.shippingInfo.phone}</div>
                            <div><strong>Address:</strong> {creator.shippingInfo.address}</div>
                          </div>
                        )}
                      </td>

                      {/* Delivery Status */}
                      <td className="px-6 py-4">
                        <span className={`text-sm FontNoto ${getDeliveryStatusColor(creator.deliveryStatus)}`}>
                          {creator.deliveryStatus}
                        </span>
                      </td>

                      {/* Content Status */}
                      <td className="px-6 py-4">
                        <span className={`text-sm FontNoto ${getContentStatusColor(creator.contentStatus)}`}>
                          {creator.contentStatus}
                        </span>
                      </td>

                      {/* Extension Status */}
                      <td className="px-6 py-4">
                        {creator.extensionStatus ? (
                          <div className="space-y-2">
                            <span className={`text-sm FontNoto ${getExtensionStatusColor(creator.extensionStatus)}`}>
                              {creator.extensionStatus}
                            </span>
                            {creator.extensionStatus.includes('Pending') && (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleExtensionAction(creator.id, 'approve')}
                                  disabled={updating}
                                  className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs disabled:opacity-50"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleExtensionAction(creator.id, 'reject')}
                                  disabled={updating}
                                  className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs disabled:opacity-50"
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">—</span>
                        )}
                      </td>

                      {/* Content */}
                      <td className="px-6 py-4">
                        {creator.contentUrls && (creator.contentUrls.instagram || creator.contentUrls.tiktok) ? (
                          <button
                            onClick={() => handleViewContent(creator)}
                            className="bg-lime-600 hover:bg-lime-700 text-black px-3 py-1 rounded text-sm font-medium transition-colors"
                          >
                            <FaEye className="inline w-3 h-3 mr-1" />
                            View Content
                          </button>
                        ) : (
                          <span className="text-gray-400 text-sm">No content</span>
                        )}
                      </td>

                      {/* Participation */}
                      <td className="px-6 py-4">
                        {creator.participationStatus === 'Applied' ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleParticipationAction(creator.id, 'approve')}
                              disabled={updating}
                              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium disabled:opacity-50"
                            >
                              ✅ Approve
                            </button>
                            <button
                              onClick={() => handleParticipationAction(creator.id, 'reject')}
                              disabled={updating}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium disabled:opacity-50"
                            >
                              ❌ Reject
                            </button>
                          </div>
                        ) : (
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getParticipationStatusColor(creator.participationStatus)}`}>
                            {creator.participationStatus === 'Approved' ? '✅ Participation Approved' :
                             creator.participationStatus === 'Rejected' ? '❌ Participation Rejected' :
                             creator.participationStatus}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Content View Modal */}
      {showContentModal && selectedContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white FontNoto">Content Submission</h3>
                <button
                  onClick={() => setShowContentModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* User Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Creator Info</h4>
                  <div className="space-y-1 text-white FontNoto">
                    <div><strong>Name:</strong> {selectedContent.name}</div>
                    <div><strong>Email:</strong> {selectedContent.email}</div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Social Profiles</h4>
                  <div className="space-y-1">
                    <button
                      onClick={() => handleSocialClick(selectedContent.profileUrl)}
                      className="text-lime-400 hover:text-lime-300 text-sm transition-colors block"
                    >
                      {selectedContent.socialId} <FaExternalLinkAlt className="inline w-3 h-3 ml-1" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content URLs */}
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Content URLs</h4>
                <div className="space-y-2">
                  {selectedContent.contentUrls?.instagram && (
                    <div className="flex items-center space-x-2">
                      <FaInstagram className="text-pink-400" />
                      <a
                        href={selectedContent.contentUrls.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lime-400 hover:text-lime-300 transition-colors"
                      >
                        Instagram Post <FaExternalLinkAlt className="inline w-3 h-3 ml-1" />
                      </a>
                    </div>
                  )}
                  {selectedContent.contentUrls?.tiktok && (
                    <div className="flex items-center space-x-2">
                      <FaTiktok className="text-white" />
                      <a
                        href={selectedContent.contentUrls.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lime-400 hover:text-lime-300 transition-colors"
                      >
                        TikTok Video <FaExternalLinkAlt className="inline w-3 h-3 ml-1" />
                      </a>
                    </div>
                  )}
                  {!selectedContent.contentUrls?.instagram && !selectedContent.contentUrls?.tiktok && (
                    <p className="text-gray-400">No content URLs provided</p>
                  )}
                </div>
              </div>

              {/* Content Status */}
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Content Status</h4>
                <select
                  value={contentStatus}
                  onChange={(e) => setContentStatus(e.target.value)}
                  className="bg-[#2a2a2a] border border-gray-600 rounded px-3 py-2 text-white FontNoto w-full"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              {/* Submitted At */}
              {selectedContent.submittedAt && (
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Submitted At</h4>
                  <p className="text-white FontNoto">
                    {new Date(selectedContent.submittedAt).toLocaleString()}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-800">
                <button
                  onClick={() => setShowContentModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors FontNoto"
                >
                  Cancel
                </button>
                <button
                  onClick={handleContentStatusUpdate}
                  disabled={updating}
                  className="bg-lime-500 hover:bg-lime-600 text-black px-6 py-2 rounded-lg FontNoto font-medium disabled:opacity-50"
                >
                  {updating ? 'Updating...' : 'Save & Update Status'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Campaign Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-xl font-bold text-white FontNoto mb-4">Delete Campaign</h3>
              <p className="text-gray-300 FontNoto mb-6">
                Are you sure you want to delete "{campaign.title}"? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  disabled={deleting}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors FontNoto disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    setDeleting(true);
                    try {
                      const token = localStorage.getItem('BRAND_TOKEN');
                      const response = await axios.delete(`${config.BACKEND_URL}/api/brand/campaigns/${campaign.id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                      });

                      if (response.data.status === 'success') {
                        alert('Campaign deleted successfully');
                        navigate('/brand/campaigns');
                      } else {
                        alert(response.data.message || 'Failed to delete campaign');
                      }
                    } catch (error) {
                      console.error('Error deleting campaign:', error);
                      alert('Failed to delete campaign');
                    } finally {
                      setDeleting(false);
                      setShowDeleteModal(false);
                    }
                  }}
                  disabled={deleting}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg FontNoto font-medium disabled:opacity-50"
                >
                  {deleting ? 'Deleting...' : 'Delete Campaign'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
