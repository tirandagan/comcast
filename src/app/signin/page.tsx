'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Mail, Lock, Loader2, CheckCircle, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';

// Dynamic schema based on email
const createSigninSchema = (isAdmin: boolean) => {
  return z.object({
    email: z.string().email('Invalid email address'),
    password: isAdmin 
      ? z.string().min(1, 'Password is required for admin login')
      : z.string().optional(),
  });
};

type SigninForm = {
  email: string;
  password?: string;
};

export default function SignInPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Handle error messages from URL parameters
  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      let errorMessage = 'An error occurred. Please try again.';
      
      switch (error) {
        case 'token-expired':
          errorMessage = 'Your sign-in link has expired. Please request a new one.';
          break;
        case 'malformed-token':
          errorMessage = 'Invalid sign-in link. Please request a new one.';
          break;
        case 'invalid-token':
          errorMessage = 'Invalid or expired sign-in link. Please request a new one.';
          break;
        case 'missing-token':
          errorMessage = 'No sign-in link provided. Please enter your email below.';
          break;
        case 'verification-failed':
          errorMessage = 'Verification failed. Please try signing in again.';
          break;
      }
      
      toast.error(errorMessage);
      
      // Remove error from URL
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('error');
      window.history.replaceState({}, '', newUrl.toString());
    }
  }, [searchParams]);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    clearErrors,
    setError,
  } = useForm<SigninForm>();

  const emailValue = watch('email');
  const isAdminEmail = emailValue === 'tiran@tirandagan.com';

  const onSubmit = async (data: SigninForm) => {
    // Validate password for admin
    if (isAdminEmail && !data.password) {
      setError('password', { message: 'Password is required for admin login' });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          toast.error('No account found with this email. Please register first.');
        } else if (response.status === 403) {
          toast.error('Your registration is pending approval. Please check back later.');
        } else if (response.status === 401) {
          toast.error('Invalid password');
        } else {
          throw new Error(result.error || 'Sign in failed');
        }
        return;
      }

      // Handle password-based auth (admin)
      if (result.token) {
        localStorage.setItem('auth-token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        toast.success('Login successful!');
        
        // Check if there's a redirect URL
        const searchParams = new URLSearchParams(window.location.search);
        const redirectTo = searchParams.get('from');
        
        if (redirectTo) {
          router.push(redirectTo);
        } else if (result.user.role === 'ADMIN') {
          // For admin, go to dashboard by default
          router.push('/admin/dashboard');
        } else {
          // For regular users, go to report
          router.push('/report');
        }
        return;
      }

      // Handle magic link (regular users)
      setIsSuccess(true);
      toast.success('Magic link sent! Check your email.');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Check Your Email!</h2>
          <p className="text-gray-300 mb-2">
            We've sent a magic link to:
          </p>
          <p className="text-blue-400 font-semibold mb-6">
            {getValues('email')}
          </p>
          <p className="text-gray-300 text-sm">
            Click the link in your email to sign in. The link will expire in 15 minutes.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="p-6">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </header>

      {/* Sign In Form */}
      <div className="flex items-center justify-center px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
            <p className="text-gray-300">
              Sign in to access the AI Innovation Roadmap
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10 pointer-events-none" />
                <input
                  {...register('email')}
                  type="email"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 rounded-lg border border-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
                  placeholder="john@company.com"
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </motion.div>

            {isAdminEmail && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10 pointer-events-none" />
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 rounded-lg border border-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
                )}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {isAdminEmail ? 'Signing In...' : 'Sending Magic Link...'}
                  </>
                ) : (
                  isAdminEmail ? 'Sign In' : 'Send Magic Link'
                )}
              </button>
            </motion.div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">Don't have an account?</p>
            <Link href="/register">
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <UserPlus className="w-5 h-5" />
                Register for Access
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}