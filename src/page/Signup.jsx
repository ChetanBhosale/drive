import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useSignupUserMutation } from '../store/api/authApi'; // Assuming you have a signup API
import { useNavigate } from 'react-router';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  
  const [signupUser, { isSuccess, isLoading, isError, error }] = useSignupUserMutation();
  const navigate = useNavigate();
  
  const { toast } = useToast();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const validateForm = () => {
    let isValid = true;

    if (!email.includes('@') || !email.includes('.')) {
      setEmailError('Invalid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await signupUser({ email, password, confirmPassword });
      setIsOtpSent(true); // Set OTP sent flag
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Signup Successful",
        description: "Please enter the OTP sent to your email.",
      });
    }
    if (isError) {
      toast({
        title: "Error",
        description: error?.data?.message,
      });
    }
  }, [isSuccess, isError, error, toast]);

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // Add OTP validation logic here
    toast({
      title: "Account Created",
      description: "Your account has been created successfully!",
    });
    navigate('/dashboard/workflow'); // Redirect after successful signup
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-3xl text-blue-600 font-[400]">SuperSales<span className='text-blue-400'>Mind</span></CardTitle>
        </CardHeader>
        <CardContent>
          {!isOtpSent ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <div className="relative">
                  <FaEnvelope className="absolute inset-y-0 top-1 left-0 pl-3 text-gray-400 pointer-events-none" size={28} />
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    className="pl-10"
                    placeholder="Enter your email"
                  />
                </div>
                {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
              </div>
              <div className="mb-4">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <FaLock className="absolute inset-y-0 left-0 pl-3 top-1 text-gray-400 pointer-events-none" size={26} />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    className="pl-10 pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 focus:outline-none"
                  >
                    {showPassword ? <FaEyeSlash className="text-gray-400" size={18} /> : <FaEye className="text-gray-400" size={18} />}
                  </button>
                </div>
                {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
              </div>
              <div className="mb-4">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                <div className="relative">
                  <FaLock className="absolute inset-y-0 left-0 pl-3 top-1 text-gray-400 pointer-events-none" size={26} />
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                    className="pl-10 pr-12"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 focus:outline-none"
                  >
                    {showConfirmPassword ? <FaEyeSlash className="text-gray-400" size={18} /> : <FaEye className="text-gray-400" size={18} />}
                  </button>
                </div>
                {confirmPasswordError && <p className="text-red-500 text-xs mt-1">{confirmPasswordError}</p>}
              </div>
              <Button
                type="submit"
                className={cn("w-full", isLoading ? "cursor-not-allowed opacity-50" : "")}
                disabled={isLoading}
              >
                {isLoading ? "Signing up..." : "Sign Up"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit}>
              <div className="mb-4">
                <Label htmlFor="otp" className="text-sm font-medium">OTP</Label>
                <Input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={handleOtpChange}
                  required
                  placeholder="Enter the OTP sent to your email"
                />
              </div>
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-gray-500">Already have an account? <Link to="/login" className="text-blue-600">Login here</Link></p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
