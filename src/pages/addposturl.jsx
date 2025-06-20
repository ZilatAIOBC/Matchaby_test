import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../config';

const AddPostUrl = () => {
  const { campaignId } = useParams();
  const { state } = useLocation();
  const campaignTitle = state?.campaignTitle ?? 'Untitled Campaign';
  const [rows, setRows] = useState([{ instagram: '', tiktok: '' }]);
  const [allowReuse, setAllowReuse] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState({ courier: '', tracking_number: '' });
  const [exists, setExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getAuthHeader = () => {
    const token = Cookies.get('token') || localStorage.getItem('token');
    return { Authorization: token || '' };
  };

  useEffect(() => {
    const fetchSubmission = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${config.BACKEND_URL}/user/campaign-submission/${campaignId}`,
          { headers: getAuthHeader() }
        );
        if (res.data.status === 'success') {
          const {
            instagram_urls = [],
            tiktok_urls = [],
            allow_brand_reuse,
            tracking_info = {},
          } = res.data.data;

          const max = Math.max(instagram_urls.length, tiktok_urls.length, 1);
          setRows(
            Array.from({ length: max }, (_, i) => ({
              instagram: instagram_urls[i] || '',
              tiktok: tiktok_urls[i] || '',
            }))
          );

          setAllowReuse(!!allow_brand_reuse);
          setTrackingInfo({
            courier: tracking_info.courier || '',
            tracking_number: tracking_info.tracking_number || '',
          });

          setExists(true);
        } else {
          setRows([{ instagram: '', tiktok: '' }]);
          setAllowReuse(false);
          setExists(false);
        }
      } catch (err) {
        console.error(err);
        setError('Could not load your submission.');
      } finally {
        setLoading(false);
      }
    };
    fetchSubmission();
  }, [campaignId]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setError('');
    setIsModalOpen(false);
  };

  const handleChange = (idx, field, value) => {
    setRows(rows.map((r, i) => (i === idx ? { ...r, [field]: value } : r)));
  };

  const addRow = () => {
    const totalUrls = rows.reduce(
      (count, row) => count + (row.instagram ? 1 : 0) + (row.tiktok ? 1 : 0),
      0
    );
    if (totalUrls >= 11) {
      setError('You can add a maximum of 11 URLs.');
      return;
    }
    setRows([...rows, { instagram: '', tiktok: '' }]);
  };

  const removeRow = (idx) => {
    setRows(rows.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    const instagram_urls = rows.map(r => r.instagram.trim()).filter(Boolean);
    const tiktok_urls = rows.map(r => r.tiktok.trim()).filter(Boolean);

    const totalUrls = instagram_urls.length + tiktok_urls.length;

    if (totalUrls === 0) {
      setError('At least one Instagram or TikTok URL is required.');
      setLoading(false);
      return;
    }

    if (totalUrls > 11) {
      setError('You can only submit up to 11 URLs.');
      setLoading(false);
      return;
    }

    const payload = {
      campaign_id: campaignId,
      instagram_urls,
      tiktok_urls,
      allow_brand_reuse: allowReuse,
    };

    try {
      await axios.post(
        `${config.BACKEND_URL}/user/campaign-submission`,
        payload,
        { headers: getAuthHeader() }
      );
      setExists(true);
      closeModal();
    } catch (err) {
      console.error(err);
      setError('Save failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete your submission?')) return;
    setLoading(true);
    setError('');
    try {
      await axios.delete(
        `${config.BACKEND_URL}/user/campaign-submission/${campaignId}`,
        { headers: getAuthHeader() }
      );
      setRows([{ instagram: '', tiktok: '' }]);
      setAllowReuse(false);
      setTrackingInfo({ courier: '', tracking_number: '' });
      setExists(false);
    } catch (err) {
      console.error(err);
      setError('Delete failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="w-full lg:w-3/4 bg-gray-900 rounded-lg shadow-md p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-white">
            Campaign Name - {campaignTitle}
          </h2>
          <div className="space-x-2">
            {exists ? (
              <button
                onClick={handleDelete}
                disabled={loading}
                className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded"
              >
                {loading ? 'Deleting…' : 'Delete Submission'}
              </button>
            ) : (
              <button
                onClick={openModal}
                disabled={loading}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-full font-bold"
              >
                + Add URLs
              </button>
            )}
          </div>
        </div>

        {error && <p className="text-red-400">{error}</p>}

        {loading && !isModalOpen ? (
          <p className="text-gray-400 text-center">Loading…</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-200">Instagram</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-200">TikTok</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-200">Allow Reuse</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, idx) => (
                    <tr key={idx} className="border-t border-gray-700 hover:bg-gray-700">
                      <td className="px-6 py-4 text-gray-100 break-all">
                        {row.instagram || <span className="text-gray-500 italic">–</span>}
                      </td>
                      <td className="px-6 py-4 text-gray-100 break-all">
                        {row.tiktok || <span className="text-gray-500 italic">–</span>}
                      </td>
                      {idx === 0 && (
                        <td className="px-6 py-4 text-gray-100">
                          {allowReuse ? 'Yes' : 'No'}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {trackingInfo?.tracking_number && (
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mt-4">
                <h4 className="text-lg font-semibold text-white mb-2">📦 Shipment Tracking</h4>
                <div className="text-gray-300 space-y-1">
                  <p>
                    <strong className="text-white">Courier:</strong> {trackingInfo.courier || 'N/A'}
                  </p>
                  <p>
                    <strong className="text-white">Tracking Number:</strong> {trackingInfo.tracking_number}
                  </p>
                  <p>
                    <a
                      href={`https://www.17track.net/en/track?nums=${trackingInfo.tracking_number}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 underline hover:text-blue-300"
                    >
                      View Tracking ↗
                    </a>
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      {/* [Modal remains unchanged, as submitted previously] */}
    </div>
  );
};

export default AddPostUrl;
