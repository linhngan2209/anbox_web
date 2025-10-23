'use client';

import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Music2 } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    setForm({ name: '', email: '', message: '' });
    alert('Cảm ơn bạn! ĂNBOX đã nhận được tin nhắn của bạn ❤️');
  };

  return (
    <section className="bg-[#FFF8F1] py-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Liên hệ với ĂNBOX</h2>
          <p className="text-lg text-gray-600">
            Hãy liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi hoặc góp ý nào.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="bg-white shadow-md rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Thông tin cơ bản</h3>

            <ul className="space-y-5 text-gray-700">
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-orange-500 mt-1" />
                <span>
                  <strong>Giờ mở cửa:</strong> Thứ 2 - Thứ 7: 7:00 - 22:00
                </span>
              </li>

              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-orange-500 mt-1" />
                <span>
                  <strong>Hotline:</strong> 039 831 8612
                </span>
              </li>

              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-orange-500 mt-1" />
                <span>
                  <strong>Email:</strong> anbox.team@gmail.com
                </span>
              </li>

              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-500 mt-1" />
                <span>
                  <strong>Địa chỉ:</strong> Số 413, Đường Nguyễn Khang, Cầu Giấy, Hà Nội, Việt Nam
                </span>
              </li>

              <li className="flex items-start space-x-3">
                <span>
                  <strong>Website:</strong>{' '}
                  <Link
                    href="/"
                    className="text-orange-500 hover:underline"
                  >
                    www.anbox.vn
                  </Link>
                </span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="font-semibold text-gray-800 mb-3">Kết nối với chúng tôi</h4>
              <div className="flex space-x-4">
                <Link
                  href="https://www.facebook.com/anboxvietnam"
                  target="_blank"
                  className="p-2 bg-orange-100 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link
                  href="https://www.instagram.com/anbox.vn"
                  target="_blank"
                  className="p-2 bg-orange-100 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="https://www.tiktok.com/"
                  target="_blank"
                  className="p-2 bg-orange-100 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition-colors"
                  aria-label="TikTok"
                >
                  <Music2 className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white shadow-md rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Gửi tin nhắn cho ĂNBOX</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Họ và tên</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                  placeholder="Nhập tên của bạn"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                  placeholder="Nhập email của bạn"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Nội dung</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                  placeholder="Nhập tin nhắn..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors"
              >
                Gửi tin nhắn
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
