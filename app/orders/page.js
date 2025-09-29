'use client'
import React, { useEffect, useState } from 'react';
import { ChevronLeft, Package, MapPin, Calendar, Clock, DollarSign, User, Phone, Mail, Search, Filter } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Sample data - replace with your API integration
  const sampleOrders = [
    {
      order_id: 'ORD-2024-001',
      order_status: 'delivered',
      created_at: '2024-01-15T10:30:00Z',
      total_amount: 89.99,
      shipping_charges: 5.99,
      tax: 8.99,
      is_billing_address_same: "1",
      shipping_address: {
        shipping_address: '123 Main Street',
        shipping_apartment: 'Apt 4B',
        shipping_city: 'Lahore',
        shipping_state: 'Punjab',
        shipping_zipcode: '54000'
      },
      orderitems: [
        {
          id: 1,
          total_quantity: 2,
          product: { title: 'Premium T-Shirt', price: 25.00 }
        },
        {
          id: 2,
          total_quantity: 1,
          product: { title: 'Jeans', price: 45.00 }
        }
      ]
    },
    {
      order_id: 'ORD-2024-002',
      order_status: 'processing',
      created_at: '2024-01-20T14:45:00Z',
      total_amount: 156.99,
      shipping_charges: 7.99,
      tax: 14.00,
      is_billing_address_same: "0",
      shipping_address: {
        shipping_address: '456 Oak Avenue',
        shipping_apartment: 'House 12',
        shipping_city: 'Karachi',
        shipping_state: 'Sindh',
        shipping_zipcode: '75000'
      },
      billing_address: {
        billing_address: '789 Pine Street',
        billing_apartment: 'Suite 200',
        billing_city: 'Islamabad',
        billing_state: 'ICT',
        billing_zipcode: '44000'
      },
      orderitems: [
        {
          id: 3,
          total_quantity: 3,
          product: { title: 'Sneakers', price: 45.00 }
        }
      ]
    },
    {
      order_id: 'ORD-2024-003',
      order_status: 'pending',
      created_at: '2024-01-25T09:15:00Z',
      total_amount: 234.50,
      shipping_charges: 9.99,
      tax: 21.45,
      is_billing_address_same: "1",
      shipping_address: {
        shipping_address: '321 Cedar Lane',
        shipping_apartment: 'Floor 3',
        shipping_city: 'Faisalabad',
        shipping_state: 'Punjab',
        shipping_zipcode: '38000'
      },
      orderitems: [
        {
          id: 4,
          total_quantity: 1,
          relation_from: 'donation'
        },
        {
          id: 5,
          total_quantity: 2,
          product: { title: 'Laptop Bag', price: 89.99 }
        }
      ]
    }
  ];

  const base_currency = 'PKR ';
  const donation_amount = 50.00;

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(sampleOrders);
      setSelectedOrder(sampleOrders[0]);
      setLoading(false);
    }, 1000);
  }, []);

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

  const getStatusColor = (status) => {
    const colors = {
      delivered: 'bg-green-100 text-green-800',
      processing: 'bg-blue-100 text-blue-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800'
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
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-800 font-semibold">Loading your orders...</p>
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
                        className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                          selectedOrder?.order_id === order.order_id
                            ? 'bg-indigo-50 border-r-4 border-indigo-500'
                            : ''
                        }`}
                        onClick={() => setSelectedOrder(order)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-black">
                              #{truncateOrderId(order.order_id)}
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
                        Order #{selectedOrder.order_id}
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
                      <p><span className="font-medium">Address:</span> {selectedOrder.shipping_address.shipping_address}</p>
                      <p><span className="font-medium">Apartment:</span> {selectedOrder.shipping_address.shipping_apartment}</p>
                      <p><span className="font-medium">City:</span> {selectedOrder.shipping_address.shipping_city}</p>
                      <p><span className="font-medium">State:</span> {selectedOrder.shipping_address.shipping_state}</p>
                      <p><span className="font-medium">Zipcode:</span> {selectedOrder.shipping_address.shipping_zipcode}</p>
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
                <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-6">
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
                </div>
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