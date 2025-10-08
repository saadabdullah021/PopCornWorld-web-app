'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import get1 from '../../public/get1.png';
import get2 from '../../public/get2.png';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, CalendarCheck } from 'lucide-react';
import { checkEmailExists, getOrganizationInfo, registerFundraiser, sendOTP, verifyOTP } from '../services/api';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/slices/appSlice';

import { format, parseISO, isBefore, addHours } from 'date-fns';
import 'react-day-picker/dist/style.css';



// Custom Date Range Picker Component
const CustomDateRangePicker = ({ startDate, endDate, onRangeChange }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday

        const days = [];
        // Add empty cells for days before the 1st
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }
        // Add actual days
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day));
        }
        return days;
    };

    const isSameDay = (a, b) => {
        if (!a || !b) return false;
        return (
            a.getFullYear() === b.getFullYear() &&
            a.getMonth() === b.getMonth() &&
            a.getDate() === b.getDate()
        );
    };

    const isInRange = (day) => {
        if (!startDate || !endDate) return false;
        const d = day.getTime();
        return d > startDate.getTime() && d < endDate.getTime();
    };

    const isDisabled = (day) => {
        return day && day < today;
    };

    const handleDayClick = (day) => {
        if (!day || isDisabled(day)) return;

        if (!startDate || (startDate && endDate)) {
            // Start new range
            onRangeChange({ from: day, to: null });
        } else if (day < startDate) {
            // Clicked before start → reset start
            onRangeChange({ from: day, to: null });
        } else {
            // Set end
            onRangeChange({ from: startDate, to: day });
        }
    };

    const navigateMonth = (direction) => {
        const newMonth = new Date(currentMonth);
        newMonth.setMonth(currentMonth.getMonth() + direction);
        // Don't allow navigating before current month
        if (newMonth.getMonth() <= today.getMonth() && newMonth.getFullYear() <= today.getFullYear()) {
            setCurrentMonth(newMonth);
        } else if (newMonth.getFullYear() > today.getFullYear() || newMonth.getMonth() > today.getMonth()) {
            setCurrentMonth(newMonth);
        }
    };

    const formatMonthYear = (date) => {
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    const days = getDaysInMonth(currentMonth);
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="w-full">
            {/* Calendar Header */}
            <div className="flex justify-between items-center mb-4 px-1">
                <button
                    onClick={() => navigateMonth(-1)}
                    className="p-1 rounded hover:bg-gray-100 text-blue-600"
                    disabled={currentMonth <= today}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
                <h3 className="font-semibold text-gray-800">{formatMonthYear(currentMonth)}</h3>
                <button
                    onClick={() => navigateMonth(1)}
                    className="p-1 rounded hover:bg-gray-100 text-blue-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {weekdays.map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => {
                    if (!day) {
                        return <div key={index} className="h-10"></div>;
                    }

                    const isStart = isSameDay(day, startDate);
                    const isEnd = isSameDay(day, endDate);
                    const isSelected = isStart || isEnd;
                    const isInRangeDay = isInRange(day);
                    const disabled = isDisabled(day);

                    let bgColor = 'bg-transparent';
                    let textColor = 'text-gray-800';
                    let hoverBg = 'hover:bg-blue-100';

                    if (disabled) {
                        bgColor = 'bg-transparent';
                        textColor = 'text-gray-300';
                        hoverBg = '';
                    } else if (isInRangeDay) {
                        bgColor = 'bg-blue-100';
                        textColor = 'text-blue-700';
                    } else if (isSelected) {
                        bgColor = 'bg-blue-600';
                        textColor = 'text-white';
                        hoverBg = 'hover:bg-blue-700';
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => handleDayClick(day)}
                            disabled={disabled}
                            className={`
                  h-10 w-10 rounded-full text-sm font-medium transition-colors
                  ${bgColor} ${textColor} ${hoverBg}
                  ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                  flex items-center justify-center mx-auto
                `}
                        >
                            {day.getDate()}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};






const FundraisingOnboarding = () => {
    // Main state management
    const router = useRouter();
    const dispatch = useDispatch();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        email_address: '',
        team_name: '',
        organization_type_id: '',
        organization_sub_type_id: '',
        organization_name: '',
        zip_code: '',
        fundraising_start_time: '',
        members_count: '',
        fundraiser_name: '',
        phone_no: '',
        otp: '',
        acceptTerms: false,
        status: '1'
    });

    const [formErrors, setFormErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [pickSpecificDate, setPickSpecificDate] = useState(false);
    const [organizationData, setOrganizationData] = useState([]);
    const [organizationLabel, setOrganizationLabel] = useState('Organization Name');

    console.log('Current organizationData:', organizationData);



    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const formatDate = (date) => (date ? format(date, 'PPP p') : '');

    useEffect(() => {
        console.log('Fetching organization data...');
        getOrganizationInfo(
            (response) => {
                console.log('Organization data received:', response);
                setOrganizationData(response.data || []);
            },
            (error) => {
                console.error('Failed to fetch organization data:', error);
            }
        );
    }, []);




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
                if (!formData.email_address) errors.email_address = 'Email is required';
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_address)) {
                    errors.email_address = 'Please enter a valid email';
                }
                break;
            case 1:
                if (!formData.team_name) errors.team_name = 'Team name is required';
                break;
            case 2:
                if (!formData.organization_type_id) errors.organization_type_id = 'Organization type is required';
                if (!formData.organization_sub_type_id) errors.organization_sub_type_id = 'Organization sub-type is required';
                if (!formData.organization_name) errors.organization_name = 'Organization name is required';
                if (!formData.zip_code) errors.zip_code = 'Zip code is required';
                break;
            case 3:
                if (!pickSpecificDate && !formData.fundraising_start_time) errors.fundraising_start_time = 'Start time is required';
                if (pickSpecificDate && (!startDate || !endDate)) errors.dates = 'Both start and end dates are required';
                break;
            case 4:
                if (!formData.members_count) errors.members_count = 'Members count is required';
                break;
            case 6:
                if (!formData.fundraiser_name) errors.fundraiser_name = 'Full name is required';
                if (!formData.phone_no) errors.phone_no = 'Phone number is required';
                else {
                    const cleanPhone = formData.phone_no.replace(/\D/g, '');
                    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
                        errors.phone_no = 'Please enter a valid phone number (10-11 digits)';
                    }
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

    const handleInputChange = (field, value) => {
        if (field === 'phone_no') {
            let input = value.replace(/\D/g, '');
            if (input.length <= 11) {
                if (input.length >= 10) {
                    input = input.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
                } else if (input.length >= 6) {
                    input = input.replace(/(\d{3})(\d{3})/, '$1-$2');
                } else if (input.length >= 3) {
                    input = input.replace(/(\d{3})/, '$1');
                }
            } else {
                input = input.slice(0, 11);
                input = input.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
            }
            value = input;
        }

        if (field === 'organization_type_id') {
            // Reset sub-type when organization type changes
            setFormData(prev => ({
                ...prev,
                [field]: value,
                organization_sub_type_id: '',
                organization_name: ''
            }));
            setOrganizationLabel('Organization Name');
        }

        if (field === 'organization_sub_type_id') {
            // Update organization label based on selected sub-type
            const selectedOrgType = organizationData.find(org => org.id == formData.organization_type_id);
            const selectedSubType = selectedOrgType?.organization_sub_types.find(sub => sub.id == value);
            if (selectedSubType) {
                setOrganizationLabel(selectedSubType.label);
            }
            setFormData(prev => ({ ...prev, [field]: value, organization_name: '' }));
        }

        setFormData(prev => ({ ...prev, [field]: value }));

        // Clear specific error when user starts typing
        if (formErrors[field]) {
            setFormErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    const handleNext = async () => {
        if (!validateStep(currentStep)) return;

        setIsLoading(true);

        if (currentStep === 0) {
            setIsLoading(true);
            checkEmailExists(
                formData.email_address,
                'fundraiser',
                (response) => {
                    setCurrentStep((prev) => prev + 1);
                    setIsLoading(false);
                },
                (errorMessage) => {
                    setFormErrors({ email_address: errorMessage });
                    setIsLoading(false);
                }
            );
            return;
        }

        await new Promise(resolve => setTimeout(resolve, 500));

        if (currentStep === 6 && !showOtpInput) {
            const cleanPhoneNumber = formData.phone_no.replace(/\D/g, '');
            sendOTP(
                cleanPhoneNumber,
                'fundraiser_signup',
                (response) => {
                    console.log('OTP sent successfully:', response);
                    setShowOtpInput(true);
                    setOtpSent(true);
                    setIsLoading(false);
                },
                (error) => {
                    console.error('Failed to send OTP:', error);
                    setFormErrors({ phone_no: 'Failed to send OTP. Please try again.' });
                    setIsLoading(false);
                }
            );
            return;
        }

        if (currentStep === 6 && showOtpInput) {
            const cleanPhoneNumber = formData.phone_no.replace(/\D/g, '');
            verifyOTP(
                cleanPhoneNumber,
                formData.otp,
                'fundraiser_signup',
                (response) => {
                    console.log('OTP verified successfully:', response);

                    if (response.data && response.data.customer_info && response.data.access_token) {
                        // Dispatch login success to Redux
                        dispatch(loginSuccess(response.data));
                    }

                    setCurrentStep(currentStep + 1);
                    setIsLoading(false);
                },
                (error) => {
                    console.error('Failed to verify OTP:', error);
                    setFormErrors({ otp: 'Invalid OTP. Please try again.' });
                    setIsLoading(false);
                }
            );
            return;
        }
        if (currentStep === 7) {
            const payload = {
                fundraiser_name: formData.fundraiser_name,
                email_address: formData.email_address,
                phone_no: formData.phone_no.replace(/\D/g, ''),
                team_name: formData.team_name,
                organization_name: formData.organization_name,
                organization_type_id: formData.organization_type_id,
                organization_sub_type_id: formData.organization_sub_type_id,
                zip_code: formData.zip_code,
                fundraising_start_time: formData.fundraising_start_time,
                members_count: formData.members_count,
                status: formData.status
            };

            registerFundraiser(
                payload,
                (response) => {
                    console.log('Fundraiser registered successfully:', response);
                    router.push('/fundraiser-registered');
                },
                (error) => {
                    console.error('Failed to register fundraiser:', error);
                    setFormErrors({ submit: 'Registration failed. Please try again.' });
                    setIsLoading(false);
                }
            );
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

    const ProgressBar = () => (
        <div className="mb-8">
            <div className="mb-10">
                <div className="relative">
                    <div className="absolute top-4 left-0 right-0 h-2 bg-white/20 backdrop-blur-lg rounded-full -translate-y-1/2 border border-white/30">
                        <div
                            className="h-full bg-[#8BC34A] rounded-full transition-all duration-800 ease-out shadow-lg shadow-blue-500/25"
                            style={{
                                width: `${((currentStep) / (steps.length - 1)) * 100}%`
                            }}
                        />
                    </div>

                    <div className="flex justify-between relative z-10">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center flex-1">
                                <div className={`
                        relative w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ease-out
                        backdrop-blur-lg border shadow-lg
                        ${index < currentStep
                                        ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-400 text-white scale-110'
                                        : index === currentStep
                                            ? 'bg-white/90 border-blue-500 text-blue-600 scale-125 shadow-xl shadow-blue-500/30 ring-1 ring-blue-200'
                                            : 'bg-white/60 border-gray-300 text-gray-700'
                                    }
                    `}>
                                    {index < currentStep ? (
                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <span className="relative z-10">{index + 1}</span>
                                    )}

                                    {/* Active Step Animation */}
                                    {index === currentStep && (
                                        <>
                                            <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-60"></div>
                                            <div className="absolute inset-0 rounded-full bg-blue-300 animate-pulse"></div>
                                        </>
                                    )}
                                </div>


                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* <div className="text-center bg-gray-300 rounded-full px-4 py-2 w-fit mx-auto mt-1">
                <p className="text-sm font-semibold text-black ">{steps[currentStep].description}</p>
            </div> */}
        </div>
    );

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div>
                        <span className="text-sm font-semibold text-white uppercase tracking-wide">GET STARTED</span>
                        <h1 className="text-[26px] lg:text-[30px] font-[900] font-splash text-white mt-2 mb-6">
                            Your <span className="text-yellow-400">fundraising</span> experience begins here
                        </h1>
                        <p className="text-white mb-8 text-[16px]">
                            Popcorn World is always free to use, there are no minimums to meet, and you always keep 50% profit.
                        </p>
                        <div className="space-y-4">
                            <input
                                type="email"
                                placeholder="Email address"
                                value={formData.email_address}
                                onChange={(e) => handleInputChange('email_address', e.target.value)}
                                className="w-full p-4 rounded-xl border  border-gray-300 focus:outline-none text-white  placeholder-white  transition-all duration-200"
                            />
                            {formErrors.email_address && <p className="text-red-400 font-semibold text-sm">{formErrors.email_address}</p>}
                        </div>
                    </div>
                );

            case 1:
                return (
                    <div>

                        <h1 className="text-[26px] lg:text-[30px] font-[900]  font-splash text-white mt-4 mb-6">
                            Type in the name of your team
                        </h1>
                        <p className="text-white/90 mb-8 text-lg">
                            The team name will be displayed on each participant's Pop-Up Store.
                        </p>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Team Name"
                                value={formData.team_name}
                                onChange={(e) => handleInputChange('team_name', e.target.value)}
                                className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none text-white  placeholder-white  transition-all duration-200"
                            />
                            {formErrors.team_name && <p className="text-red-400 font-semibold text-sm">{formErrors.team_name}</p>}
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div>

                        <h1 className="text-[26px] lg:text-[30px] font-[900]  font-splash text-white mt-4 mb-6">
                            Tell us about your team
                        </h1>
                        <p className="text-white/90 mb-8 text-lg">
                            From sports teams to non-profit organizations, Popcorn World has helped raise over $100 million.
                        </p>
                        <div className="space-y-6">
                            <div>
                                <select
                                    value={formData.organization_type_id}
                                    onChange={(e) => handleInputChange('organization_type_id', e.target.value)}
                                    className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none text-white  placeholder-white  transition-all duration-200"
                                >
                                    <option className='text-black' value="">
                                        {organizationData.length === 0 ? 'Loading...' : 'Select Organization Type'}
                                    </option>
                                    {organizationData.map(type => (
                                        <option key={type.id} className='text-black' value={type.id}>{type.name}</option>
                                    ))}
                                </select>
                                {formErrors.organization_type_id && <p className="text-red-400 font-semibold text-sm mt-1">{formErrors.organization_type_id}</p>}
                            </div>

                            {formData.organization_type_id && (
                                <div>
                                    <select
                                        value={formData.organization_sub_type_id}
                                        onChange={(e) => handleInputChange('organization_sub_type_id', e.target.value)}
                                        className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none text-white  placeholder-white  transition-all duration-200"
                                    >
                                        <option className='text-black' value="">Select Sub-Type</option>
                                        {organizationData.find(t => t.id == formData.organization_type_id)?.organization_sub_types.map(subType => (
                                            <option key={subType.id} className='text-black' value={subType.id}>{subType.name}</option>
                                        ))}
                                    </select>
                                    {formErrors.organization_sub_type_id && <p className="text-red-400 font-semibold text-sm mt-1">{formErrors.organization_sub_type_id}</p>}
                                </div>
                            )}

                            <div>
                                <input
                                    type="text"
                                    placeholder={organizationLabel}
                                    value={formData.organization_name}
                                    onChange={(e) => handleInputChange('organization_name', e.target.value)}
                                    className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none text-white  placeholder-white  transition-all duration-200"
                                />
                                {formErrors.organization_name && <p className="text-red-400 font-semibold text-sm mt-1">{formErrors.organization_name}</p>}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Zip Code"
                                    value={formData.zip_code}
                                    onChange={(e) => handleInputChange('zip_code', e.target.value.replace(/\D/g, '').slice(0, 5))}
                                    className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none text-white  placeholder-white  transition-all duration-200"
                                />
                                {formErrors.zip_code && <p className="text-red-400 font-semibold text-sm mt-1">{formErrors.zip_code}</p>}
                            </div>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div>

                        <h1 className="text-[26px] lg:text-[30px] font-[900]  font-splash text-white mt-4 mb-6">
                            When are you looking to start fundraising?
                        </h1>

                        {!pickSpecificDate ? (
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    {['asap', 'next4weeks', 'nextFewMonths', 'notSure'].map(option => (
                                        <button
                                            key={option}
                                            onClick={() => handleInputChange('fundraising_start_time', option)}
                                            className={`p-4 rounded-xl font-semibold transition-all hover:bg-blue-600 hover:text-white duration-200 ${formData.fundraising_start_time === option
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

                                {/* <button
                                    onClick={() => setPickSpecificDate(true)}
                                    className="group flex items-center gap-2.5 px-6 py-3 rounded-full  border border-white/10 
             text-white font-semibold transition-all duration-300 ease-out 
             hover:border-[#8BC34A]/30 hover:text-[#ffc222] 
             backdrop-blur-sm shadow-sm hover:shadow-md"
                                >
                                    <CalendarCheck />
                                    Pick a Specific Date
                                </button> */}

                                {formErrors.startTime && <p className="text-red-400 font-semibold text-sm">{formErrors.startTime}</p>}
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 gap-4">
                                    {/* Display selected dates */}
                                    {/* Display selected dates - Enhanced */}
                                    <div className="backdrop-blur-sm border border-white/10 rounded-2xl p-5 shadow-lg">


                                        <div className="space-y-2.5">
                                            <div className="flex items-center gap-4">


                                                <p className="text-gray-200 font-semibold text-xs ">Start Date :</p>
                                                <p className="text-sm  text-white font-semibold">
                                                    {startDate ? formatDate(startDate) : <span className="text-gray-400 italic">Not selected</span>}
                                                </p>

                                            </div>

                                            <div className="flex items-center gap-5">


                                                <p className="text-gray-200 font-semibold text-xs">End Date : </p>
                                                <p className="text-sm  text-white font-semibold ">
                                                    {endDate ? formatDate(endDate) : <span className="text-gray-400 italic">Not selected</span>}
                                                </p>

                                            </div>
                                        </div>

                                        {startDate && endDate && (
                                            <div className="mt-4 pt-3 border-t border-white/10">
                                                <p className="text-xs text-gray-200 flex items-center font-medium gap-3">
                                                    <span>
                                                        <Calendar />
                                                    </span>
                                                    <span>
                                                        Duration: {Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1} day{Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) >= 1 ? 's' : ''}
                                                    </span>
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Calendar */}
                                    {/* Custom Calendar */}
                                    <div className="bg-white rounded-xl p-4 w-full shadow-md">
                                        <CustomDateRangePicker
                                            startDate={startDate}
                                            endDate={endDate}
                                            onRangeChange={({ from, to }) => {
                                                setStartDate(from);
                                                setEndDate(to);
                                            }}
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={() => setPickSpecificDate(false)}
                                    className="group flex items-center gap-2.5 px-4 py-2 rounded-full  border border-white/10 
             text-white font-medium transition-all duration-300 ease-out 
             hover:border-[#8BC34A]/30 hover:text-[#ffc222] 
             backdrop-blur-sm shadow-sm hover:shadow-md"
                                >
                                    <ArrowLeft
                                        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                                    />
                                    <span>Back to options</span>
                                </button>

                                {formErrors.dates && <p className="text-red-400 font-semibold text-sm">{formErrors.dates}</p>}
                            </div>
                        )}
                    </div>
                );

            case 4:
                return (
                    <div>

                        <h1 className="text-[26px] lg:text-[30px] font-[900]  font-splash text-white mt-4 mb-6">
                            How many members of your team will participate in the fundraiser?
                        </h1>
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            {['justme', '2-10', '11-20', '21-30', '31-40', '41-50', '51+', 'notSure'].map(option => (
                                <button
                                    key={option}
                                    onClick={() => handleInputChange('members_count', option)}
                                    className={`p-4 rounded-xl font-semibold transition-all hover:bg-blue-600 hover:text-white duration-200 ${formData.members_count === option
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
                        {formErrors.membersCount && <p className="text-red-400 font-semibold text-sm mt-4">{formErrors.membersCount}</p>}
                    </div>
                );

            case 5:
                return (
                    <div>

                        <h1 className="text-[26px] lg:text-[30px] font-[900]  font-splash text-white mt-4 mb-6">
                            Your team could earn between ${earnings.min.toLocaleString()}-${earnings.max.toLocaleString()} in just 4 days!
                        </h1>
                        <p className="text-white/90 mb-8 text-lg">
                            Our estimate is based on your team activity type and the number of team members you expect to open a Pop-Up Store during your fundraiser. The average participant sells $400!
                        </p>
                    </div>
                );

            case 6:
                if (showOtpInput) {
                    return (
                        <div>
                            <h2 className="text-3xl font-splash text-white mt-4 mb-6">
                                Enter the 5 digit code
                            </h2>
                            <p className="text-white/90 mb-8 text-lg">
                                We sent a code over SMS to {formData.phone_no}.
                            </p>

                            <div className="flex justify-start gap-3 mb-4">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength={1}
                                        value={formData.otp ? formData.otp[index] || "" : ""}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, "");
                                            let newOtp = (formData.otp || "").split("");
                                            newOtp[index] = value;
                                            handleInputChange("otp", newOtp.join(""));

                                            if (value && e.target.nextSibling) {
                                                e.target.nextSibling.focus();
                                            }
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Backspace" && !(formData.otp && formData.otp[index]) && e.target.previousSibling) {
                                                e.target.previousSibling.focus();
                                            }
                                        }}
                                        className="w-14 h-14 text-center text-2xl font-semibold rounded-xl border bg-transparent border-gray-300  text-white  outline-none"
                                    />
                                ))}
                            </div>

                            {formErrors.otp && (
                                <p className="text-red-400 font-semibold text-sm text-center">{formErrors.otp}</p>
                            )}

                            {otpSent && (
                                <div className="text-center mt-4">
                                    <p className="text-white/70 text-sm mb-2">Didn't receive the code?</p>
                                    <button
                                        onClick={() => {
                                            const cleanPhoneNumber = formData.phone_no.replace(/\D/g, '');
                                            sendOTP(
                                                cleanPhoneNumber,
                                                'fundraiser_signup',
                                                (response) => {
                                                    console.log('OTP resent successfully:', response);
                                                    setFormErrors({});
                                                },
                                                (error) => {
                                                    console.error('Failed to resend OTP:', error);
                                                    setFormErrors({ otp: 'Failed to resend OTP. Please try again.' });
                                                }
                                            );
                                        }}
                                        className="text-[#8ac24a] hover:text-green-400 text-sm font-medium underline"
                                    >
                                        Resend OTP
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <h1 className="text-[26px] lg:text-[30px] font-[900]  font-splash text-white mt-4 mb-6">
                                Set up your Popcorn World account
                            </h1>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            value={formData.fundraiser_name}
                                            onChange={(e) => handleInputChange('fundraiser_name', e.target.value)}
                                            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none text-white  placeholder-white  transition-all duration-200"
                                        />
                                        {formErrors.fundraiser_name && <p className="text-red-400 font-semibold text-sm mt-1">{formErrors.fundraiser_name}</p>}
                                    </div>
                                    <div>
                                        <input
                                            type="tel"
                                            placeholder="Mobile Phone (10-11 digits)"
                                            value={formData.phone_no}
                                            onChange={(e) => handleInputChange('phone_no', e.target.value)}
                                            maxLength={13}
                                            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none text-white  placeholder-white  transition-all duration-200"
                                        />
                                        {formErrors.phone_no && <p className="text-red-400 font-semibold text-sm mt-1">{formErrors.phone_no}</p>}
                                    </div>
                                </div>



                                <div className="flex items-start space-x-3 mt-6">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            checked={formData.acceptTerms}
                                            onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                                            className="sr-only"
                                        />
                                        <label
                                            htmlFor="terms"
                                            className={`
        flex items-center justify-center w-5 h-5 border-1 rounded-lg cursor-pointer transition-all duration-300 transform 
        ${formData.acceptTerms
                                                    ? 'bg-black border-transparent shadow-lg'
                                                    : 'border-gray-300 bg-white'
                                                }
      `}
                                        >
                                            {formData.acceptTerms && (
                                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </label>

                                    </div>
                                    <label htmlFor="terms" className="text-white text-sm leading-relaxed cursor-pointer hover:text-blue-100 transition-colors duration-200">
                                        By creating an account, you agree to Popcorn World{' '}
                                        <span className="text-yellow-400 hover:text-white underline transition-colors duration-200">Terms and Conditions</span>{' '}
                                        and{' '}
                                        <span className="text-yellow-400 hover:text-white underline transition-colors duration-200">Privacy Policy</span>
                                    </label>
                                </div>
                                {formErrors.acceptTerms && <p className="text-red-400 font-semibold text-sm">{formErrors.acceptTerms}</p>}
                            </div>
                        </div>
                    );
                }

            case 7:
                return (
                    <div>
                        <h2 className="text-3xl font-splash text-white mt-4 mb-6">
                            Complete Registration
                        </h2>
                        <p className="text-white/90 mb-8 text-lg">
                            Your account has been verified! Click below to complete your fundraising registration.
                        </p>
                        <div className="text-center">
                            <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-6 mb-6">
                                <div className="flex items-center justify-center mb-4">
                                    <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">Phone Verified!</h3>
                                <p className="text-white/80">Your mobile number has been successfully verified.</p>
                            </div>
                        </div>
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

                    <div className="space-y-8 ">
                        <ProgressBar />

                        <div className="">
                            {renderStepContent()}
                        </div>

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
                                    className="group relative  bg-[#8ac24a] text-white px-6 py-3 rounded-full transition-all duration-300 transform flex items-center font-medium overflow-hidden"
                                >
                                    Back
                                </button>
                            )}

                            <button
                                onClick={handleNext}
                                disabled={isLoading}
                                className={`group relative  bg-[#8ac24a] text-white px-6 py-3 rounded-full transition-all duration-300 transform flex items-center font-medium overflow-hidden  ${currentStep === 0 ? 'ml-auto' : ''
                                    }`}
                            >

                                <span>
                                    {currentStep === 0 && 'Continue'}
                                    {currentStep === 1 && 'Next'}
                                    {currentStep === 2 && 'Next'}
                                    {currentStep === 3 && 'Next'}
                                    {currentStep === 4 && 'Next'}
                                    {currentStep === 5 && 'Next'}
                                    {currentStep === 6 && !showOtpInput && 'Verify Mobile Number'}
                                    {currentStep === 6 && showOtpInput && 'Verify OTP'}
                                    {currentStep === 7 && 'Complete Registration'}

                                </span>
                                {isLoading && (
                                    <svg className="animate-spin -mr-1 ml-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )}
                            </button>
                        </div>

                        {formErrors.submit && (
                            <p className="text-red-400 font-semibold text-sm text-center mt-4">{formErrors.submit}</p>
                        )}
                    </div>

                    <div className="hidden  relative lg:block">
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