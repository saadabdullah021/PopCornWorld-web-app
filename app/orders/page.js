'use client'
import React, { useEffect, useState } from 'react';
import { ChevronLeft, Package, MapPin, Calendar, Clock, DollarSign, User, Phone, Mail, Search, Filter } from 'lucide-react';
import { useSelector } from 'react-redux';
import { getUserOrders } from '../services/api';

const Orders = () => {
  const { customerInfo } = useSelector(state => state.app);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPhoneInput, setShowPhoneInput] = useState(false);

  // Sample data removed - using real API data

  const base_currency = '$';
  const donation_amount = 50.00;

  useEffect(() => {
    // Get phone number from customerInfo or use input
    const userPhoneNumber = customerInfo?.phone_no || phoneNumber;

    if (!userPhoneNumber) {
      setShowPhoneInput(true);
      setLoading(false);
      return;
    }

    // Fetch user orders from API
    getUserOrders(
      userPhoneNumber,
      (response) => {
        // Success callback
        console.log('Orders fetched successfully:', response);
        setError(null);
        if (response?.data && Array.isArray(response.data)) {
          setOrders(response.data);
          if (response.data.length > 0) {
            setSelectedOrder(response.data[0]);
          }
        } else {
          setOrders([]);
        }
        setLoading(false);
      },
      (error) => {
        // Error callback
        console.error('Error fetching orders:', error);
        setError(error || 'Failed to fetch orders');
        setOrders([]);
        setLoading(false);
      }
    );
  }, [customerInfo?.phone_no, phoneNumber]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  const handlePhoneNumberSubmit = () => {
    if (!phoneNumber.trim()) {
      setError('Please enter a phone number');
      return;
    }
    setLoading(true);
    setError(null);
    // The useEffect will trigger when phoneNumber changes
  };

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    if (phoneNumberLength < 10) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
    if (error) setError('');
  };

  const getStatusColor = (status) => {
    const colors = {
      delivered: 'bg-green-100 text-green-800',
      processing: 'bg-blue-100 text-blue-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
      awaiting_shipment: 'bg-orange-100 text-orange-800',
      shipped: 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const truncateOrderId = (orderId) => {
    if (orderId.length > 16) {
      return orderId.substring(0, 7) + '...' + orderId.substring(orderId.length - 7);
    }
    return orderId;
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.order_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.order_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#ffc222] mx-auto"></div>
          <p className="mt-4 text-gray-800 font-semibold">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Orders</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show phone number input if user is not authenticated or no phone number available
  if (showPhoneInput) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-6">
            <Phone className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Your Phone Number</h2>
            <p className="text-gray-600">Enter your phone number to view your orders</p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="(123) 456-7890"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                maxLength={14}
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}

            <button
              onClick={handlePhoneNumberSubmit}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : 'View Orders'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 lg:pt-40">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6">
              <h1 className="main_heading font-bold text-black">My Orders</h1>
              <p className="mt-2 main_description text-black">Track and manage your order history</p>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Package className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-medium text-gray-900 mb-4">No Orders Yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven't placed any orders yet. Start shopping to see your order history here.
            </p>
            <button
              onClick={() => window.location.href = '/shop'}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 lg:pt-40">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="main_heading font-bold text-black">My Orders</h1>
            <p className="mt-2 main_description text-black">Track and manage your order history</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-300">
              <div className="p-6 border-b border-gray-400">
                <h2 className="text-lg font-semibold text-black mb-4">Orders</h2>

                {/* Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg  outline-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <select
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg  outline-0 appearance-none bg-white"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="delivered">Delivered</option>
                    <option value="processing">Processing</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {filteredOrders.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {filteredOrders.map((order) => (
                      <li
                        key={order.order_id}
                        className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${selectedOrder?.order_id === order.order_id
                          ? 'bg-indigo-50 border-r-4 border-indigo-500'
                          : ''
                          }`}
                        onClick={() => setSelectedOrder(order)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-black">
                              {truncateOrderId(order.order_id)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {formatDate(order.created_at)}
                            </p>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.order_status)}`}>
                            {order.order_status.toUpperCase()}
                          </span>
                        </div>
                        <p className="mt-2 text-sm font-medium text-black">
                          {base_currency}{order.total_amount}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No orders found
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 xl:col-span-9">
            {selectedOrder ? (
              <div className="space-y-6">
                {/* Order Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-black">
                        Order {selectedOrder.order_id}
                      </h2>
                      <p className="text-gray-600 mt-1">
                        Placed on {formatDate(selectedOrder.created_at)} at {formatTime(selectedOrder.created_at)}
                      </p>
                    </div>
                    <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(selectedOrder.order_status)}`}>
                      {selectedOrder.order_status.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Items Summary */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-300">
                  <div className="p-6 border-b border-gray-400">
                    <h3 className="text-lg font-semibold text-black flex items-center">
                      <Package className="h-5 w-5 mr-2" />
                      Items Summary
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedOrder.orderitems.map((item) => (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium text-black">
                                {item.product?.title || (item.relation_from === 'donation' && 'Donation Box')}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-black">
                              {item.total_quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-black">
                              {base_currency}
                              {item.product?.price
                                ? parseFloat(item.product.price).toFixed(2)
                                : parseFloat(donation_amount).toFixed(2)
                              }
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap font-medium text-black">
                              {base_currency}
                              {item.product?.price
                                ? (item.total_quantity * item.product.price).toFixed(2)
                                : (item.total_quantity * donation_amount).toFixed(2)
                              }
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Shipping Address */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-6">
                    <h3 className="text-lg font-semibold text-black flex items-center mb-4">
                      <MapPin className="h-5 w-5 mr-2" />
                      Shipping Address
                    </h3>
                    <div className="space-y-2 text-gray-600">
                      {selectedOrder.shipping_address ? (
                        <>
                          <p><span className="font-medium">Address:</span> {selectedOrder.shipping_address.shipping_address}</p>
                          <p><span className="font-medium">Apartment:</span> {selectedOrder.shipping_address.shipping_apartment}</p>
                          <p><span className="font-medium">City:</span> {selectedOrder.shipping_address.shipping_city}</p>
                          <p><span className="font-medium">State:</span> {selectedOrder.shipping_address.shipping_state}</p>
                          <p><span className="font-medium">Zipcode:</span> {selectedOrder.shipping_address.shipping_zipcode}</p>
                        </>
                      ) : (
                        <p className="text-gray-500 italic">Shipping address information not available</p>
                      )}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-6">
                    <h3 className="text-lg font-semibold text-black flex items-center mb-4">
                      <DollarSign className="h-5 w-5 mr-2" />
                      Order Summary
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">
                          {base_currency}{(selectedOrder.total_amount - selectedOrder.shipping_charges - selectedOrder.tax).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span className="font-medium">{base_currency}{selectedOrder.tax}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery Fee</span>
                        <span className="font-medium">{base_currency}{selectedOrder.shipping_charges}</span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between">
                          <span className="text-lg font-semibold text-black">Total Amount</span>
                          <span className="text-lg font-bold text-indigo-600">
                            {base_currency}{selectedOrder.total_amount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Billing Address */}
                {/* <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-6">
                  <h3 className="text-lg font-semibold text-black flex items-center mb-4">
                    <User className="h-5 w-5 mr-2" />
                    Billing Address
                  </h3>
                  {selectedOrder.is_billing_address_same === "1" ? (
                    <p className="text-gray-600">Billing address is same as shipping address</p>
                  ) : (
                    <div className="space-y-2 text-gray-600">
                      <p><span className="font-medium">Address:</span> {selectedOrder.billing_address?.billing_address}</p>
                      <p><span className="font-medium">Apartment:</span> {selectedOrder.billing_address?.billing_apartment}</p>
                      <p><span className="font-medium">City:</span> {selectedOrder.billing_address?.billing_city}</p>
                      <p><span className="font-medium">State:</span> {selectedOrder.billing_address?.billing_state}</p>
                      <p><span className="font-medium">Zipcode:</span> {selectedOrder.billing_address?.billing_zipcode}</p>
                    </div>
                  )}
                </div> */}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-black mb-2">No Order Selected</h3>
                <p className="text-gray-600">Select an order from the sidebar to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;