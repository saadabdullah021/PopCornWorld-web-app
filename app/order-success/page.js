// app/order-success/page.js
'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function OrderSuccess() {
  const search = useSearchParams();
  const orderNumber = search.get('order') || 'N/A';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 pt-32 lg:pt-40">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-black mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">Your order has been placed and a confirmation email has been sent.</p>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-green-800 font-semibold">Order Number</p>
            <p className="text-xl font-bold text-green-900">{orderNumber}</p>
          </div>

          <div className="flex gap-4 justify-center">
            <Link href="/shop" className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition">
              Continue Shopping
            </Link>
            <Link href="/" className="bg-[#8ac24a] text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}