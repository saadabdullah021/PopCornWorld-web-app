// app/success/page.jsx  (Next.js 13+ App Router)
// Agar aap Pages Router use kar rahe ho to pages/success.js me likh do

import { CheckCircle2Icon } from 'lucide-react';

export default function SuccessPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#3333cb] pt-4 lg:pt-32 px-6">
      <div className="w-full p-6 md:p-8 text-center">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
            <CheckCircle2Icon className="h-10 w-10 text-green-400" />
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Congratulations!
        </h1>

        {/* Message */}
        <p className="mt-4 text-white/90 text-base md:text-lg leading-relaxed">
          Your Fundraiser registration is completed successfully. <br />
          Kindly check your email for further instructions.
        </p>

        {/* Button */}
        <div className="mt-8">
          <a
            href="/"
            className="inline-block px-6 py-3 bg-black  text-white rounded-full shadow  capitalize cursor-pointer transform transition"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    </section>
  );
}
