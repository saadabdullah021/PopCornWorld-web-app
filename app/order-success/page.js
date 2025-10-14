// app/order-success/page.js
'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, Truck, Mail } from 'lucide-react';

// Inner component that uses the client-side hook
const OrderSuccessInner = () => {
  const search = useSearchParams();
  const orderNumber = search.get('order') || 'N/A';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 flex items-center justify-center pt-20 lg:pt-0 px-4 mt-8 md:mt-32">
      <div className="max-w-2xl w-full mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-8 text-center">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4 animate-pulse" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Thank You for Your Order!</h1>
            <p className="text-lg text-gray-700">We're thrilled to confirm your purchase. Your order is now being processed with care.</p>
          </div>

          {/* Order Details */}
          <div className="p-8 space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <p className="text-sm text-green-800 font-semibold uppercase tracking-wide">Order Number</p>
              <p className="text-2xl font-bold text-green-900 mt-1">#{orderNumber}</p>
            </div>

            <p className="text-gray-600 text-center leading-relaxed">
              Thank you for shopping with us! Your order #{orderNumber} has been successfully placed. We've sent a confirmation email to your inbox with all the details, including tracking information once it's shipped. If you have any questions, feel free to reach out to our support team.
            </p>

            {/* Status Timeline */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-blue-100 rounded-full p-3 mb-2">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-sm font-semibold text-gray-800">Confirmation Sent</p>
                <p className="text-xs text-gray-500">Email delivered</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-yellow-100 rounded-full p-3 mb-2">
                  <Package className="w-6 h-6 text-yellow-600" />
                </div>
                <p className="text-sm font-semibold text-gray-800">Processing</p>
                <p className="text-xs text-gray-500">In progress</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 rounded-full p-3 mb-2">
                  <Truck className="w-6 h-6 text-gray-600" />
                </div>
                <p className="text-sm font-semibold text-gray-800">Shipping Soon</p>
                <p className="text-xs text-gray-500">Get ready!</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/shop" className="bg-gray-200 text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-300 transition duration-200 text-center">
                Continue Shopping
              </Link>
              <Link href="/" className="bg-[#8ac24a] text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition duration-200 text-center">
                Back to Home
              </Link>
            </div>

            {/* Footer Note */}
            <p className="text-sm text-gray-500 text-center mt-6">
              Need help? <a href="/support" className="text-[#8ac24a] hover:underline">Contact Support</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export with Suspense boundary
export default function OrderSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 flex items-center justify-center pt-20 lg:pt-0 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#8ac24a] border-b-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading order details...</p>
        </div>
      </div>
    }>
      <OrderSuccessInner />
    </Suspense>
  );
}