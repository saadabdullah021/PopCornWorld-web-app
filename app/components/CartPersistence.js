'use client'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeCart } from '../store/slices/appSlice';

const CartPersistence = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load cart from localStorage when component mounts
    dispatch(initializeCart());
  }, [dispatch]);

  return null; // This component doesn't render anything
};

export default CartPersistence;
