'use client';

import React, { useState } from 'react';
import AuthService from '@/service/authService';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth';
import toast from 'react-hot-toast';
import { Phone } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Gọi API đăng nhập qua số điện thoại
      const res = await AuthService.login({ phoneNumber, password });
      login(res.data);
      toast.success('Đăng nhập thành công!');
      router.push('/');
    } catch (err: any) {
      const message =
        err.response?.data?.message || 'Có lỗi xảy ra trong quá trình đăng nhập.';
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF2E1] px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-xs text-gray-500 font-semibold uppercase mb-1">
          Chào mừng trở lại
        </h2>
        <h1 className="text-2xl font-bold mb-6 text-black">
          Đăng nhập vào tài khoản của bạn
        </h1>

        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Ô nhập số điện thoại */}
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-black">
            <Phone className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="tel"
              placeholder="Nhập số điện thoại"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full outline-none text-black"
            />
          </div>

          {/* Ô nhập mật khẩu */}
          <input
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black"
          />

          {/* Ghi nhớ & Quên mật khẩu */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Ghi nhớ đăng nhập
              </label>
            </div>
            <a
              href="/forgot-password"
              className="text-sm font-medium text-black hover:underline"
            >
              Quên mật khẩu?
            </a>
          </div>

          {/* Nút đăng nhập */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition"
          >
            ĐĂNG NHẬP
          </button>
        </form>

        {/* Chuyển hướng đăng ký */}
        <p className="text-sm text-center mt-6 text-gray-700">
          Chưa có tài khoản?{' '}
          <a href="/signup" className="font-semibold text-black hover:underline">
            Đăng ký ngay
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
