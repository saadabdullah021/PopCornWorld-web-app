'use client'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '../store/slices/appSlice';
import {
  User,
  Mail,
  Phone,
  Edit3,
  Save,
  X,
  Camera,
  Upload,
  Check,
  AlertCircle,
  Loader2,
  LogOut,
  ArrowLeft
} from 'lucide-react';

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, customerInfo } = useSelector(state => state.app);

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [state, setState] = useState({
    name: '',
    email: '',
    phone_number: '',
    profile_img: null,
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Get user data from localStorage (stored during sign in)
    const storedUserData = localStorage.getItem('user_data');

    if (storedUserData) {
      try {
        const userData = JSON.parse(storedUserData);

        const formattedPhoneNumber = userData.phone_no
          ? userData.phone_no.replace(/^\+1/, '').replace(/^(\d{3})(\d{3})(\d{4})$/, '$1-$2-$3')
          : '';

        const profileData = {
          name: userData.name || 'User',
          email: userData.email || '',
          phone_no: userData.phone_no || '',
          profile_img: userData.profile_img || null,
          customer_id: userData.customer_id || userData.id || null,
          created_at: userData.created_at || userData.createdAt || null
        };

        setProfileData(profileData);
        setState({
          name: profileData.name,
          email: profileData.email,
          phone_number: formattedPhoneNumber,
          simple_number: profileData.phone_no,
          profile_img: profileData.profile_img,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error parsing user data:', error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const validatePhoneNumber = (number) => {
    const phoneNumberPattern = /^\d{3}-\d{3}-\d{4}$/;
    return phoneNumberPattern.test(number);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone_number') {
      // Auto-format phone number
      let formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 6) {
        formattedValue = formattedValue.replace(/^(\d{3})(\d{3})(\d{0,4})/, '$1-$2-$3');
      } else if (formattedValue.length >= 3) {
        formattedValue = formattedValue.replace(/^(\d{3})(\d{0,3})/, '$1-$2');
      }

      if (formattedValue.length <= 12) {
        setState(prev => ({ ...prev, [name]: formattedValue }));

        if (!validatePhoneNumber(formattedValue) && formattedValue.length > 0) {
          setErrors(prev => ({ ...prev, [name]: 'Invalid phone number format (XXX-XXX-XXXX)' }));
        } else {
          setErrors(prev => ({ ...prev, [name]: '' }));
        }
      }
    } else if (name === 'email') {
      setState(prev => ({ ...prev, [name]: value }));

      if (value && !validateEmail(value)) {
        setErrors(prev => ({ ...prev, [name]: 'Please enter a valid email address' }));
      } else {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    } else {
      setState(prev => ({ ...prev, [name]: value }));
      if (name === 'name' && !value.trim()) {
        setErrors(prev => ({ ...prev, [name]: 'Name is required' }));
      } else {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    }

    // Clear success message when editing
    setSuccessMessage('');
    setErrors(prev => ({ ...prev, same: '' }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size should be less than 5MB' }));
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, image: 'Please select a valid image file' }));
        return;
      }

      setSelectedImage(file);
      setImageUrl(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, image: '', same: '' }));
      setSuccessMessage('');
    }
  };

  const updateProfile = async () => {
    // Validate all fields
    const newErrors = {};

    if (!state.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (state.email && !validateEmail(state.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!validatePhoneNumber(state.phone_number)) {
      newErrors.phone_number = 'Please enter a valid phone number';
    }

    // Check if anything changed
    const newNum = state.phone_number.replace(/\D/g, '');
    const hasChanges = selectedImage ||
      state.name !== profileData.name ||
      state.email !== profileData.email ||
      `+1${newNum}` !== state.simple_number;

    if (!hasChanges) {
      newErrors.same = 'Please make at least one change to update your profile';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setUpdateLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Here you would make your actual API call
      const updatedData = {
        ...profileData,
        name: state.name,
        email: state.email,
        phone_no: `+1${newNum}`,
        profile_img: selectedImage ? 'updated_image_path' : profileData.profile_img
      };

      setProfileData(updatedData);
      setState(prev => ({ ...prev, simple_number: `+1${newNum}` }));
      setCanEdit(false);
      setUpdateLoading(false);
      setSuccessMessage('Profile updated successfully!');

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 2000);
  };

  const cancelEdit = () => {
    // Reset to original values
    const formattedPhoneNumber = profileData.phone_no
      .replace(/^\+1/, '')
      .replace(/^(\d{3})(\d{3})(\d{4})$/, '$1-$2-$3');

    setState({
      name: profileData.name,
      email: profileData.email,
      phone_number: formattedPhoneNumber,
      simple_number: profileData.phone_no,
      profile_img: profileData.profile_img,
    });

    setSelectedImage(null);
    setImageUrl(null);
    setErrors({});
    setCanEdit(false);
    setSuccessMessage('');
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#ffc222] mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16 lg:pt-40 xl:pt-52 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Back</span>
            </button>
          </div>
          <div className="text-center">
            <h1 className="main_heading font-bold text-black mb-2">My Profile</h1>
            <p className="text-balck main_description">Manage your personal information and preferences</p>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
            <Check className="h-5 w-5 text-green-600 mr-3" />
            <span className="text-green-800 font-medium">{successMessage}</span>
          </div>
        )}

        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with Edit Button */}
          <div className="bg-[#3333cb] px-6 py-20 lg:py-8 relative">
            <div className="absolute top-6 right-6">
              {!canEdit ? (
                <button
                  onClick={() => setCanEdit(true)}
                  className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all duration-200 backdrop-blur-sm"
                >
                  <Edit3 className="h-4 w-4" />
                  <span className="font-medium">Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={cancelEdit}
                    className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm"
                  >
                    <X className="h-4 w-4" />
                    <span className="font-medium">Cancel</span>
                  </button>
                  <button
                    onClick={updateProfile}
                    disabled={updateLoading}
                    className="flex items-center space-x-2 bg-white text-indigo-600 hover:bg-gray-50 px-4 py-2 rounded-lg transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updateLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    <span>{updateLoading ? 'Updating...' : 'Save Changes'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Profile Picture Section */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={
                      selectedImage ? imageUrl :
                        state.profile_img ? `/api/uploads/${state.profile_img}` :
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(state.name || 'User')}&size=128&background=6366f1&color=ffffff`
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {canEdit && (
                  <label
                    htmlFor="profile-image"
                    className="absolute bottom-0 right-0 w-10 h-10 bg-indigo-600 hover:bg-indigo-700 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200 shadow-lg"
                  >
                    <Camera className="h-5 w-5 text-white" />
                  </label>
                )}

                <input
                  type="file"
                  id="profile-image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden "
                  disabled={!canEdit}
                />
              </div>

              <h2 className="mt-4 text-2xl font-bold text-white ">{state.name || 'User'}</h2>
              <p className="text-indigo-100 ">{state.email || 'No email provided'}</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            {errors.image && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                <span className="text-red-800">{errors.image}</span>
              </div>
            )}

            {errors.same && (
              <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center">
                <AlertCircle className="h-5 w-5 text-amber-600 mr-3" />
                <span className="text-amber-800">{errors.same}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    name="name"
                    value={state.name}
                    onChange={handleChange}
                    disabled={!canEdit}
                    className={`w-full pl-11 pr-4 py-3 border rounded-xl transition-all duration-200 ${canEdit
                        ? 'border-gray-300 outline-0'
                        : 'border-gray-200 bg-gray-50'
                      } ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    disabled={!canEdit}
                    className={`w-full pl-11 pr-4 py-3 border rounded-xl transition-all duration-200 ${canEdit
                        ? 'border-gray-300 outline-0'
                        : 'border-gray-200 bg-gray-50'
                      } ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="Enter your email address"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    name="phone_number"
                    value={state.phone_number}
                    onChange={handleChange}
                    disabled={!canEdit}
                    className={`w-full pl-11 pr-4 py-3 border rounded-xl transition-all duration-200 ${canEdit
                        ? 'border-gray-300 outline-0'
                        : 'border-gray-200 bg-gray-50'
                      } ${errors.phone_number ? 'border-red-500' : ''}`}
                    placeholder="XXX-XXX-XXXX"
                  />
                </div>
                {errors.phone_number && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.phone_number}
                  </p>
                )}
              </div>
            </div>

            {/* Account Overview */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-black mb-4">Your Account Details</h3>
              <div className="space-y-4">

                {/* Account Status */}
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium text-green-800">Active & Healthy</p>
                      <p className="text-sm text-green-600">Everything is running smoothly with your account</p>
                    </div>
                  </div>
                  <Check className="h-5 w-5 text-green-600" />
                </div>

                {/* Customer ID */}
                {profileData?.customer_id && (
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Customer ID</p>
                        <p className="text-sm text-gray-600">Your unique Popcorn World identifier</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-sm font-semibold text-gray-800">#{profileData.customer_id}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Account Creation Date */}
                {profileData?.created_at && (
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Member Since</p>
                        <p className="text-sm text-gray-600">Celebrating your journey with us</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-800">
                          {new Date(profileData.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Logout Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-center">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-6 py-3 bg-red-50 hover:bg-red-100 text-red-700 hover:text-red-800 rounded-lg transition-all duration-200 border border-red-200 hover:border-red-300"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </div>

            {/* Save Button for Mobile */}
            {canEdit && (
              <div className="mt-8 md:hidden">
                <button
                  onClick={updateProfile}
                  disabled={updateLoading}
                  className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updateLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Save className="h-5 w-5" />
                  )}
                  <span>{updateLoading ? 'Updating Profile...' : 'Save Changes'}</span>
                </button>
              </div>
            )}
          </div>
        </div>


      </div>
    </div>
  );
};

export default Profile;