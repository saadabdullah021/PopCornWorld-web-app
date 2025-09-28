'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import get1 from '../../public/get1.png';
import get2 from '../../public/get2.png';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CalendarCheck } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { format, parseISO, isBefore, addHours } from 'date-fns';
import 'react-day-picker/dist/style.css';
const FundraisingOnboarding = () => {
    // Main state management
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        email: '',
        teamName: '',
        organizationType: '',
        organizationSubType: '',
        organizationName: '',
        zipCode: '',
        startTime: '',
        membersCount: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        otp: '',
        acceptTerms: false,
    });

    const [formErrors, setFormErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [pickSpecificDate, setPickSpecificDate] = useState(false);


    // ... inside your component

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // Optional: Format for display
    const formatDate = (date) => (date ? format(date, 'PPP p') : '');

    // Handle selection
    const handleDayClick = (day) => {
        if (!startDate || (startDate && endDate)) {
            // Start new range
            setStartDate(day);
            setEndDate(null);
        } else if (isBefore(day, startDate)) {
            // If clicked before start, reset start
            setStartDate(day);
            setEndDate(null);
        } else {
            // Set end date
            setEndDate(day);
        }
    };

    // Mock organization data
    const organizationTypes = [
        {
            id: 1, name: 'Sports & Athletics', subTypes: [
                { id: 1, name: 'Football Team' },
                { id: 2, name: 'Basketball Team' },
                { id: 3, name: 'Track & Field' }
            ]
        },
        {
            id: 2, name: 'Education & Academics', subTypes: [
                { id: 4, name: 'High School' },
                { id: 5, name: 'College' },
                { id: 6, name: 'Elementary School' }
            ]
        },
        {
            id: 3, name: 'Non-Profit', subTypes: [
                { id: 7, name: 'Community Service' },
                { id: 8, name: 'Religious Organization' },
                { id: 9, name: 'Health & Wellness' }
            ]
        }
    ];

    // Steps configuration
    const steps = [
        { title: 'Get Started', description: 'Enter your email' },
        { title: 'Team Name', description: 'Name your team' },
        { title: 'Team Details', description: 'Tell us about your organization' },
        { title: 'Fundraiser Timing', description: 'When to start fundraising' },
        { title: 'Participants', description: 'How many members' },
        { title: 'Earnings Estimate', description: 'See potential earnings' },
        { title: 'Account Setup', description: 'Create your account' },
        { title: 'Verification', description: 'Verify phone number' }
    ];

    // Form validation
    const validateStep = (step) => {
        const errors = {};

        switch (step) {
            case 0:
                if (!formData.email) errors.email = 'Email is required';
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                    errors.email = 'Please enter a valid email';
                }
                break;
            case 1:
                if (!formData.teamName) errors.teamName = 'Team name is required';
                break;
            case 2:
                if (!formData.organizationType) errors.organizationType = 'Organization type is required';
                if (!formData.organizationSubType) errors.organizationSubType = 'Organization sub-type is required';
                if (!formData.organizationName) errors.organizationName = 'Organization name is required';
                if (!formData.zipCode) errors.zipCode = 'Zip code is required';
                break;
            case 3:
                if (!pickSpecificDate && !formData.startTime) errors.startTime = 'Start time is required';
                if (pickSpecificDate && (!startDate || !endDate)) errors.dates = 'Both start and end dates are required';
                break;
            case 4:
                if (!formData.membersCount) errors.membersCount = 'Members count is required';
                break;
            case 6:
                if (!formData.firstName) errors.firstName = 'First name is required';
                if (!formData.lastName) errors.lastName = 'Last name is required';
                if (!formData.phoneNumber) errors.phoneNumber = 'Phone number is required';
                else if (!/^\d{3}-\d{3}-\d{4}$/.test(formData.phoneNumber)) {
                    errors.phoneNumber = 'Please enter a valid phone number (XXX-XXX-XXXX)';
                }
                if (!formData.acceptTerms) errors.acceptTerms = 'You must accept the terms and conditions';
                break;
            case 7:
                if (!formData.otp) errors.otp = 'OTP is required';
                else if (formData.otp.length !== 5) errors.otp = 'OTP must be 5 digits';
                break;
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle form input changes
    const handleInputChange = (field, value) => {
        if (field === 'phoneNumber') {
            // Format phone number as user types
            let input = value.replace(/\D/g, '');
            if (input.length <= 10) {
                input = input.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
                if (input.length < 12) {
                    const parts = input.split('-');
                    if (parts[0] && parts[0].length === 3 && parts[1] && parts[1].length < 3) {
                        input = parts[0] + '-' + parts[1];
                    } else if (parts[0] && parts[0].length < 3) {
                        input = parts[0];
                    }
                }
            }
            value = input;
        }

        setFormData(prev => ({ ...prev, [field]: value }));

        // Clear specific error when user starts typing
        if (formErrors[field]) {
            setFormErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    // Handle next step
    const handleNext = async () => {
        if (!validateStep(currentStep)) return;

        setIsLoading(true);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        if (currentStep === 6 && !showOtpInput) {
            // Send OTP
            setShowOtpInput(true);
            setIsLoading(false);
            return;
        }
        if (currentStep === 7) {
            router.push('/fundraiser-registered');
            return;
        }

        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }

        setIsLoading(false);
    };

    // Calculate estimated earnings
    const calculateEarnings = () => {
        const memberCounts = {
            'justme': 1,
            '2-10': 6,
            '11-20': 15,
            '21-30': 25,
            '31-40': 35,
            '41-50': 45,
            '51+': 60
        };

        const members = memberCounts[formData.membersCount] || 1;
        const minEarning = members * 400;
        const maxEarning = members * 2200;

        return { min: minEarning, max: maxEarning };
    };

    const earnings = calculateEarnings();

    // Progress bar component
    const ProgressBar = () => (
        <div className="mb-8">
            <div className="flex items-center space-y-4 lg:justify-between flex-wrap sm:flex-nowrap ">
                {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center last:mb-[16px]">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${index < currentStep ? 'bg-green-500 text-white' :
                            index === currentStep ? 'bg-blue-600 text-white' :
                                'bg-gray-200 text-gray-700'
                            }`}>
                            {index < currentStep ? '✓' : index + 1}
                        </div>
                        {/* {index < steps.length && (
                            <div className={`h-0.5 w-16 lg:w-12 mt-2 transition-colors duration-300 ${index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                                }`} />
                        )} */}
                    </div>
                ))}
            </div>
            {/* <div className="text-center bg-gray-300 rounded-full px-4 py-2 w-fit mx-auto mt-1">
                <p className="text-sm font-semibold text-black ">{steps[currentStep].description}</p>
            </div> */}
        </div>
    );

    // Render current step content
    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div>
                        <span className="text-sm font-semibold text-white uppercase tracking-wide">GET STARTED</span>
                        <h1 className="text-4xl font-splash text-white mt-2 mb-6">
                            Your <span className="text-yellow-400">fundraising</span> experience begins here
                        </h1>
                        <p className="text-white mb-8 text-[16px]">
                            Popcorn World is always free to use, there are no minimums to meet, and you always keep 50% profit.
                        </p>
                        <div className="space-y-4">
                            <input
                                type="email"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none text-white transition-all duration-200"
                            />
                            {formErrors.email && <p className="text-red-400 text-sm">{formErrors.email}</p>}
                        </div>
                    </div>
                );

            case 1:
                return (
                    <div>

                        <h1 className="text-4xl  font-splash text-white mt-4 mb-6">
                            Type in the name of your team
                        </h1>
                        <p className="text-white/90 mb-8 text-lg">
                            The team name will be displayed on each participant's Pop-Up Store.
                        </p>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Team Name"
                                value={formData.teamName}
                                onChange={(e) => handleInputChange('teamName', e.target.value)}
                                className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none text-white transition-all duration-200"
                            />
                            {formErrors.teamName && <p className="text-red-400 text-sm">{formErrors.teamName}</p>}
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div>

                        <h1 className="text-4xl  font-splash text-white mt-4 mb-6">
                            Tell us about your team
                        </h1>
                        <p className="text-white/90 mb-8 text-lg">
                            From sports teams to non-profit organizations, Popcorn World has helped raise over $100 million.
                        </p>
                        <div className="space-y-6">
                            <div>
                                <select
                                    value={formData.organizationType}
                                    onChange={(e) => handleInputChange('organizationType', e.target.value)}
                                    className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none text-white transition-all duration-200"
                                >
                                    <option className='text-black' value="">Select Organization Type</option>
                                    {organizationTypes.map(type => (
                                        <option key={type.id} className='text-black' value={type.id}>{type.name}</option>
                                    ))}
                                </select>
                                {formErrors.organizationType && <p className="text-red-400 text-sm mt-1">{formErrors.organizationType}</p>}
                            </div>

                            {formData.organizationType && (
                                <div>
                                    <select
                                        value={formData.organizationSubType}
                                        onChange={(e) => handleInputChange('organizationSubType', e.target.value)}
                                        className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none text-white transition-all duration-200"
                                    >
                                        <option className='text-black' value="">Select Sub-Type</option>
                                        {organizationTypes.find(t => t.id == formData.organizationType)?.subTypes.map(subType => (
                                            <option key={subType.id} className='text-black' value={subType.id}>{subType.name}</option>
                                        ))}
                                    </select>
                                    {formErrors.organizationSubType && <p className="text-red-400 text-sm mt-1">{formErrors.organizationSubType}</p>}
                                </div>
                            )}

                            <div>
                                <input
                                    type="text"
                                    placeholder="Organization Name"
                                    value={formData.organizationName}
                                    onChange={(e) => handleInputChange('organizationName', e.target.value)}
                                    className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none text-white transition-all duration-200"
                                />
                                {formErrors.organizationName && <p className="text-red-400 text-sm mt-1">{formErrors.organizationName}</p>}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Zip Code"
                                    value={formData.zipCode}
                                    onChange={(e) => handleInputChange('zipCode', e.target.value.replace(/\D/g, '').slice(0, 5))}
                                    className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none text-white transition-all duration-200"
                                />
                                {formErrors.zipCode && <p className="text-red-400 text-sm mt-1">{formErrors.zipCode}</p>}
                            </div>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div>

                        <h1 className="text-4xl  font-splash text-white mt-4 mb-6">
                            When are you looking to start fundraising?
                        </h1>

                        {!pickSpecificDate ? (
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    {['asap', 'next4weeks', 'nextFewMonths', 'notSure'].map(option => (
                                        <button
                                            key={option}
                                            onClick={() => handleInputChange('startTime', option)}
                                            className={`p-4 rounded-xl font-semibold transition-all hover:bg-blue-600 hover:text-white duration-200 ${formData.startTime === option
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-white text-gray-700 hover:bg-blue-50'
                                                }`}
                                        >
                                            {option === 'asap' && 'ASAP'}
                                            {option === 'next4weeks' && 'In the next 4 weeks'}
                                            {option === 'nextFewMonths' && 'In the next few months'}
                                            {option === 'notSure' && "I'm not sure"}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setPickSpecificDate(true)}
                                    className="flex items-center gap-3 text-white font-semibold hover:text-[#8BC34A] transition-colors duration-200"
                                >
                                    <CalendarCheck />
                                    Pick a Specific Date
                                </button>

                                {formErrors.startTime && <p className="text-red-400 text-sm">{formErrors.startTime}</p>}
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 gap-4">
                                    {/* Display selected dates */}
                                    <div className="p-4 bg-white/10 rounded-xl text-white">
                                        <p className="text-sm text-white font-medium ">Start: {formatDate(startDate)}</p>
                                        <p className="text-sm text-white font-medium ">End: {formatDate(endDate)}</p>
                                    </div>

                                    {/* Calendar */}
                                    <div className="bg-white rounded-xl p-4 w-full shadow-md">
                                        <DayPicker
                                            mode="range"
                                            selected={{ from: startDate, to: endDate }}
                                            onSelect={(range) => {
                                                setStartDate(range?.from || null);
                                                setEndDate(range?.to || null);
                                            }}
                                            // Optional: disable past dates
                                            disabled={{ before: new Date() }}
                                            // Custom class names to match your Tailwind theme
                                            classNames={{
                                                caption: 'flex justify-between items-center mb-4 ',
                                                nav_button: 'text-blue-600 hover:text-blue-800',
                                                table: 'w-full',
                                                head_cell: 'text-gray-500 font-medium text-sm',
                                                cell: 'w-10 h-10 text-center gap-4 ',
                                                day: 'w-10 h-10 rounded-full hover:bg-blue-100 transition-colors',
                                                day_selected: 'bg-blue-600 text-white hover:bg-blue-700',
                                                day_outside: 'text-gray-300',
                                                day_disabled: 'text-gray-200 cursor-not-allowed',
                                            }}
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={() => setPickSpecificDate(false)}
                                    className="text-white hover:text-[#8BC34A] font-semibold transition-colors duration-200"
                                >
                                    <ArrowLeft className="inline-block mr-2" />
                                    Back to options
                                </button>

                                {formErrors.dates && <p className="text-red-400 text-sm">{formErrors.dates}</p>}
                            </div>
                        )}
                    </div>
                );

            case 4:
                return (
                    <div>

                        <h1 className="text-4xl  font-splash text-white mt-4 mb-6">
                            How many members of your team will participate in the fundraiser?
                        </h1>
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            {['justme', '2-10', '11-20', '21-30', '31-40', '41-50', '51+', 'notSure'].map(option => (
                                <button
                                    key={option}
                                    onClick={() => handleInputChange('membersCount', option)}
                                    className={`p-4 rounded-xl font-semibold transition-all hover:bg-blue-600 hover:text-white duration-200 ${formData.membersCount === option
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-blue-50'
                                        }`}
                                >
                                    {option === 'justme' && 'Just me'}
                                    {option === 'notSure' && "I'm not sure"}
                                    {option !== 'justme' && option !== 'notSure' && option}
                                </button>
                            ))}
                        </div>
                        {formErrors.membersCount && <p className="text-red-400 text-sm mt-4">{formErrors.membersCount}</p>}
                    </div>
                );

            case 5:
                return (
                    <div>

                        <h1 className="text-4xl  font-splash text-white mt-4 mb-6">
                            Your team could earn between ${earnings.min.toLocaleString()}-${earnings.max.toLocaleString()} in just 4 days!
                        </h1>
                        <p className="text-white/90 mb-8 text-lg">
                            Our estimate is based on your team activity type and the number of team members you expect to open a Pop-Up Store during your fundraiser. The average participant sells $400!
                        </p>
                    </div>
                );

            case 6:
                return (
                    <div>

                        <h1 className="text-4xl  font-splash text-white mt-4 mb-6">
                            Set up your Popcorn World account
                        </h1>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                                        className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none text-white transition-all duration-200"
                                    />
                                    {formErrors.firstName && <p className="text-red-400 text-sm mt-1">{formErrors.firstName}</p>}
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                                        className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none text-white transition-all duration-200"
                                    />
                                    {formErrors.lastName && <p className="text-red-400 text-sm mt-1">{formErrors.lastName}</p>}
                                </div>
                            </div>

                            <div>
                                <input
                                    type="tel"
                                    placeholder="Mobile Phone (XXX-XXX-XXXX)"
                                    value={formData.phoneNumber}
                                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                    className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none text-white transition-all duration-200"
                                />
                                {formErrors.phoneNumber && <p className="text-red-400 text-sm mt-1">{formErrors.phoneNumber}</p>}
                            </div>

                            <div className="flex items-start space-x-3 mt-6">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={formData.acceptTerms}
                                    onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                                    className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="terms" className="text-white text-sm">
                                    By creating an account, you agree to Popcorn World Terms and Conditions and Privacy Policy
                                </label>
                            </div>
                            {formErrors.acceptTerms && <p className="text-red-400 text-sm">{formErrors.acceptTerms}</p>}
                        </div>
                    </div>
                );

      case 7:
  return (
    <div>
      <h2 className="text-3xl font-splash text-white mt-4 mb-6">
        Enter the 5 digit code
      </h2>
      <p className="text-white/90 mb-8 text-lg">
        We sent a code over SMS to {formData.phoneNumber}.
      </p>

      <div className="flex justify-start gap-3 mb-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={formData.otp[index] || ""}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ""); // only numbers
              let newOtp = formData.otp.split("");
              newOtp[index] = value;
              handleInputChange("otp", newOtp.join(""));

              // auto move to next box
              if (value && e.target.nextSibling) {
                e.target.nextSibling.focus();
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !formData.otp[index] && e.target.previousSibling) {
                e.target.previousSibling.focus();
              }
            }}
            className="w-14 h-14 text-center text-2xl font-semibold rounded-xl border bg-transparent border-gray-300  text-white  outline-none"
          />
        ))}
      </div>

      {formErrors.otp && (
        <p className="text-red-400 text-sm text-center">{formErrors.otp}</p>
      )}
    </div>
  );

            default:
                return null;
        }
    };

    return (
        <section className=" py-32 lg:py-62 bg-[#3333cb]">
            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-2 gap-36 items-start ">

                    {/* Left Side - Form Content */}
                    <div className="space-y-8 ">
                        <ProgressBar />

                        <div className="">
                            {renderStepContent()}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between ">
                            {currentStep > 0 && !showOtpInput && (
                                <button
                                    onClick={() => {
                                        if (currentStep === 6 && showOtpInput) {
                                            setShowOtpInput(false);
                                        } else {
                                            setCurrentStep(currentStep - 1);
                                        }
                                    }}
                                    className="group relative  bg-black text-white px-6 py-3 rounded-full transition-all duration-300 transform flex items-center font-medium overflow-hidden"
                                >
                                    Back
                                </button>
                            )}

                            <button
                                onClick={handleNext}
                                disabled={isLoading}
                                className={`group relative  bg-black text-white px-6 py-3 rounded-full transition-all duration-300 transform flex items-center font-medium overflow-hidden  ${currentStep === 0 ? 'ml-auto' : ''
                                    }`}
                            >
                                {isLoading && (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )}
                                <span>
                                    {currentStep === 0 && 'Continue'}
                                    {currentStep === 1 && 'Next: Team Details'}
                                    {currentStep === 2 && 'Next: Fundraiser Details'}
                                    {currentStep === 3 && 'Next: Participants'}
                                    {currentStep === 4 && 'Next: View Earnings'}
                                    {currentStep === 5 && 'Next: Create Account'}
                                    {currentStep === 6 && !showOtpInput && 'Verify Mobile Number'}
                                    {currentStep === 6 && showOtpInput && 'Send OTP'}
                                    {currentStep === 7 && 'Complete Registration'}

                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Right Side - Images */}
                    <div className="hidden  relative lg:block">
                        {/* First Image (Background/Main) */}
                        <Image
                            src={get1}
                            alt="Fundraising team member 1"
                            width={260}
                            height={240}
                            className="rounded-2xl shadow-2xl  z-0"
                        />

                        {/* Second Image (Overlapping Bottom Right) */}
                        <Image
                            src={get2}
                            alt="Fundraising team member 2"
                            width={260}
                            height={240}
                            className="rounded-2xl shadow-2xl absolute top-50 left-40 z-10"
                        />
                    </div>


                </div>
            </div>
        </section>
    );
};

export default FundraisingOnboarding;