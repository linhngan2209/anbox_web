'use client';

import React, { useState } from 'react';
import { Utensils, Facebook, Instagram, Twitter, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Đăng ký email:', email);
    setEmail('');
  };

  const quickLinks = [
    { label: 'Gói Ăn', href: '/plan-detail' },
    { label: 'Cách Thức Hoạt Động', href: '/#how-it-works' },
    { label: 'Công Thức', href: '#recipes' },
    { label: 'Về Chúng Tôi', href: 'about' }
  ];

  const supportLinks = [
    { label: 'Câu Hỏi Thường Gặp', href: '/#faq' },
    { label: 'Liên Hệ', href: '/contact' },
    { label: 'Thông Tin Giao Hàng', href: '/policy' },
    { label: 'Chính sách bán hàng', href: '/policy' }
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/anboxvietnam', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/anbox.vn', label: 'Instagram' },
  ];

  return (
    <footer id="footer" className="bg-gray-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="rounded-lg overflow-hidden w-28 h-10">
                <img src="/logo.png" alt="ĂNBOX Logo" className="w-full h-full object-contain" />
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Mang hương vị Việt đến gian bếp của bạn với nguyên liệu tươi ngon và công thức chuẩn.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-red-600 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-6 h-6" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên Kết Nhanh</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hỗ Trợ</h4>
            <ul className="space-y-2">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Đăng Ký Nhận Tin</h4>
            <p className="text-gray-400 mb-4">
              Nhận công thức hàng tuần và các ưu đãi đặc biệt
            </p>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
                className="flex-1 px-4 py-2 rounded-l-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />

              <button
                type="submit"
                className="bg-red-600 hover:bg-orange-600 px-4 py-2 rounded-r-lg transition-colors"
                aria-label="Đăng ký nhận tin"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} ĂNBOX. Bảo lưu mọi quyền.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
