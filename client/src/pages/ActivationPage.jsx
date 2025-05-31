import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const ActivationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      toast.error("No activation token found");
      return;
    }

    const activateAccount = async () => {
      try {
        const response = await axios.post('/service/user/activation', { activation_token: token });
        toast.success(response.data.message);
        navigate('/signin');
      } catch (error) {
        toast.error(error.response?.data?.message || "Activation failed");
      }
    };

    activateAccount();
  }, [searchParams, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Activating your account, please wait...</p>
    </div>
  );
};

export default ActivationPage;
