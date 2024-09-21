import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import { useLoginUserMutation } from '../store/api/authApi';
import { useNavigate } from 'react-router';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils'; // Utility for combining classNames
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [LoginUser, { isSuccess, isLoading, isError, error }] = useLoginUserMutation();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await LoginUser({ email, password });
    }
  };

  const { toast } = useToast();

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Login Successful",
      });
      navigate('/');
    }
    if (isError) {
      toast({
        title: "Error",
        description: error?.data?.message,
      });
    }
  }, [isSuccess, isError, error, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-3xl text-blue-600 font-[400]">SuperSales<span className='text-blue-400'>Mind</span></CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
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
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <FaLock className="absolute inset-y-0 left-0 pl-3 top-1  text-gray-400 pointer-events-none" size={26} />
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
            <Button
              type="submit"
              className={cn("w-full", isLoading ? "cursor-not-allowed opacity-50" : "")}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <Link to='/signup' className="text-sm flex gap-2 text-gray-500">Don't have account<p className="text-blue-600">Signup</p></Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
