'use client';
import { useRouter } from "next/navigation";
import React from "react";
import AuthService from '@/service/authService';
import toast from 'react-hot-toast';
import { Phone } from "lucide-react";

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [name, setName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await AuthService.register({
        name,
        phoneNumber,
        password,
        email,
      });
      toast.success(res.data.message || 'Đăng ký thành công! Vui lòng đăng nhập.');
      router.push('/login');
    } catch (err: any) {
      const message =
        err.response?.data?.message || 'Có lỗi xảy ra trong quá trình đăng ký.';
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF2E1] px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-xs text-gray-500 font-semibold uppercase mb-1">
          Bắt đầu hành trình cùng ĂNBOX
        </h2>
        <h1 className="text-2xl text-black font-bold mb-6">
          Tạo tài khoản mới
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Họ và tên */}
          <input
            type="text"
            placeholder="Họ và tên"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />

          {/* Số điện thoại */}
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-black">
            <Phone className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="tel"
              placeholder="Số điện thoại"
              className="w-full outline-none text-black"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          {/* Mật khẩu */}
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          {/* Email (tùy chọn) */}
          <input
            type="email"
            placeholder="Email (không bắt buộc)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          {/* Nút đăng ký */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition"
          >
            ĐĂNG KÝ
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-700">
          Đã có tài khoản?{' '}
          <a href="/login" className="font-semibold text-black hover:underline">
            Đăng nhập ngay
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
