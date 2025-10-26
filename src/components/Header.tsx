'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Utensils, Menu, X, ChevronDown, ShoppingCart, User } from 'lucide-react';
import { useAuth } from '@/contexts/auth';
import { useCart } from '@/contexts/cartContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { user, logout } = useAuth();
  const { items } = useCart();
  const pathname = usePathname();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const linkClass = (href: string) =>
    `font-medium transition-colors ${pathname === href ? 'text-orange-600 font-semibold' : 'text-gray-700 hover:text-orange-500'}`;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center">
              <div className="rounded-lg overflow-hidden w-26 h-10">
                <img
                  src="/logo.png"
                  alt="ĂNBOX Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
          </div>


          <nav className="hidden lg:flex items-center space-x-8 relative">
            <Link href="/" className={linkClass('/')}>Trang chủ</Link>
            <Link href="/about" className={linkClass('/about')}>Về chúng tôi</Link>
            <Link href="/howitwork" className={linkClass('/howitwork')}>Quy trình đặt hàng</Link>
            <div
              className="relative group"
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              <button
                className={`flex items-center ${pathname.startsWith('/menu') ? 'text-orange-600 font-semibold' : 'text-gray-700 hover:text-orange-500'} transition-colors font-medium`}
              >
                Thực đơn
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>

              <div
                className={`absolute top-full left-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-200 ${isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  }`}
              >
                <Link href="/menu" className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors">Thực đơn cố định</Link>
                <Link href="/menu-upcoming" className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors">Thực đơn sắp tới</Link>
                <Link href="/product" className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors">Sản phẩm bán thêm</Link>
              </div>
            </div>

            <Link href="/contact" className={linkClass('/contact')}>Liên hệ</Link>
          </nav>

          <div className="hidden lg:flex items-center space-x-6 relative">
            <Link href="/cart" className="relative text-gray-700 hover:text-orange-500 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {!user ? (
              <Link href="/login" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">Đăng nhập</Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors font-medium"
                >
                  <User className="w-6 h-6" />
                  {user.name}
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                    <Link href="/account" className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-500">Chỉnh sửa tài khoản</Link>
                    <Link href="/history" className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-500">Lịch sử mua hàng</Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gray-700 hover:text-orange-500 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4 mt-4">
              <Link href="/" className={linkClass('/')}>Trang chủ</Link>
              <Link href="/about" className={linkClass('/about')}>Về chúng tôi</Link>
              <Link href="/howitwork" className={linkClass('/howitwork')}>Quy trình đặt hàng</Link>

              <Link href="/menu" className={linkClass('/menu')}>Thực đơn</Link>
              <Link href="/menu-upcoming" className={linkClass('/menu-upcoming')}>Thực đơn sắp tới</Link>
              <Link href="/contact" className={linkClass('/contact')}>Liên hệ</Link>
            </nav>

            <div className="flex flex-col space-y-3 mt-6">
              <Link href="/cart" className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors font-medium">
                <ShoppingCart className="w-5 h-5" />
                Giỏ hàng
                {totalItems > 0 && (
                  <span className="ml-2 bg-orange-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>

              {!user ? (
                <Link href="/login" className="text-gray-700 hover:text-orange-500 transition-colors font-medium text-left">
                  Đăng nhập
                </Link>
              ) : (
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-orange-500 transition-colors font-medium text-left"
                >
                  Đăng xuất
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
