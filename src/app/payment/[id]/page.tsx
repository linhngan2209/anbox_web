'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Clock, Copy, Check } from 'lucide-react';
import courseService from '@/service/menuService';
import toast from 'react-hot-toast';
import { ListCourse } from '@/types/course';
import { formatPrice } from '@/utils/formatMoney';
import purchaseService from '@/service/purchaseService';

const PaymentPage = () => {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [courseDetail, setCourseDetail] = useState<ListCourse | null>(null);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch course detail
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const fetchedCourse = await courseService.getListCourseById(courseId);
        if (fetchedCourse) setCourseDetail(fetchedCourse);
      } catch (err) {
        toast.error('Error fetching course data.');
      }
    };
    if (courseId) fetchCourseData();
  }, [courseId]);

  // Auto close modal
  useEffect(() => {
    if (showModal) {
      const timeout = setTimeout(() => {
        setShowModal(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [showModal]);

  // Format countdown time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Copy reference text
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const confirmPayment = async () => {
    try {
      const type = 'course';
      await purchaseService.createPurchase(courseId, type);
      setShowModal(true);
      setTimeout(() => {
        router.push('/courses');
      }, 2000);
    } catch (error) {
      toast.error('There was a problem confirming your payment.');
    }
  };

  // Format USD price
  const formatPriceUSD = (vndAmount: number) => {
    const usdAmount = Math.round(vndAmount / 24000);
    return usdAmount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    });
  };

  const referenceCode = `KHOAHOC-${courseId?.slice(-5) ?? 'XXXXX'}`;

  return (
    <div className="min-h-screen bg-[#FFF2E1] flex items-center justify-center px-4 py-10 relative">
      {/* Payment success modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-xl">
            <div className="text-4xl mb-4 text-orange-500">✅</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Payment Received</h3>
            <p className="text-gray-600 text-sm">
              Thank you! We have received your payment. You will get confirmation shortly.
            </p>
          </div>
        </div>
      )}

      {/* Payment card */}
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl p-6 md:p-10 grid md:grid-cols-2 gap-8">
        {/* Left: course info */}
        <div className="space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
            {courseDetail?.courseName || 'Course Title'}
          </h1>
          <p className="text-gray-700 text-sm sm:text-base">
            {courseDetail?.description || ''}
          </p>

          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            {[
              'Extensive library of online video lessons',
              'Plenty of exercises and practice quizzes',
              '1-on-1 mentor support',
              'Certificate of course completion',
              'Lifetime access to the course',
            ].map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <div className="bg-orange-50 border border-orange-300 p-4 rounded-xl w-fit">
            <div className="text-gray-400 line-through text-sm space-y-1">
              <div>Original price: {courseDetail?.price ? `${formatPrice(courseDetail.price + 100000)}₫` : ''}</div>
              <div className="text-xs">{courseDetail?.price ? `≈ ${formatPriceUSD(courseDetail.price + 100000)}` : ''}</div>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-orange-600">
                {courseDetail?.price ? `${formatPrice(courseDetail.price)}₫` : ''}
              </div>
              <div className="text-base font-medium text-green-600 mt-1 flex items-center">
                <span>≈ {courseDetail?.price ? formatPriceUSD(courseDetail.price) : ''}</span>
                <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">USD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: QR & payment actions */}
        <div className="space-y-6 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Scan QR to Pay</h2>

          <div className="flex items-center justify-center gap-2 bg-orange-100 text-orange-700 py-2 px-4 rounded-xl text-sm font-medium shadow-sm w-fit mx-auto">
            <Clock className="w-4 h-4" />
            Expires in: {formatTime(timeLeft)}
          </div>

          <div className="w-100 h-100 mx-auto bg-white border border-gray-300 rounded-xl overflow-hidden">
            <img
              src="/QR.jpg"
              alt="QR Code"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center justify-between bg-orange-50 px-4 py-3 rounded-xl text-sm border border-orange-200">
            <span className="text-gray-700 font-medium">Reference:</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-800">{referenceCode}</span>
              <button
                onClick={() => copyToClipboard(referenceCode)}
                className="bg-orange-500 text-white p-1.5 rounded hover:bg-orange-600"
              >
                {copiedText === referenceCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* 🔸 Transfer Instructions */}
          <div className="bg-orange-50 border border-orange-300 p-4 rounded-xl text-sm text-left space-y-2">
            <h3 className="font-semibold text-orange-700">Payment Instructions</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>Transfer to the correct bank account linked to the QR code.</li>
              <li>
                In the reference/message field, write exactly: <strong>{referenceCode}</strong>.
              </li>
              <li>Use your real full name when making the transfer.</li>
              <li>
                Do <strong>not</strong> use third-party payment apps that modify content.
              </li>
              <li>Payments are verified within 5–15 minutes during working hours.</li>
            </ul>
          </div>

          <button
            onClick={confirmPayment}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
          >
            I have completed the payment
          </button>

          <p className="text-xs text-gray-500">
            Need help? Call{' '}
            <span className="text-orange-600 font-medium">0866 981 232</span> or email{' '}
            <span className="text-orange-600 font-medium">email@gmail.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;