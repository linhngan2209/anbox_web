'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Clock, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatPrice } from '@/utils/formatMoney';
import { QuestionSet } from '@/types/question';
import questionService from '@/service/questionService';
import purchaseService from '@/service/purchaseService';

const QuestionSetPaymentPage = () => {
    const params = useParams();
    const router = useRouter();
    const questionSetId = params.id as string;
    const [timeLeft, setTimeLeft] = useState(15 * 60);
    const [copiedText, setCopiedText] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [questionSet, setQuestionSet] = useState<QuestionSet | null>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await questionService.getTopicById(questionSetId);
                setQuestionSet(data);
            } catch (err) {
                toast.error('Error loading question set.');
            }
        };
        if (questionSetId) fetchData();
    }, [questionSetId]);

    useEffect(() => {
        if (showModal) {
            const timeout = setTimeout(() => setShowModal(false), 5000);
            return () => clearTimeout(timeout);
        }
    }, [showModal]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedText(text);
            setTimeout(() => setCopiedText(null), 2000);
        } catch (err) { }
    };

    const confirmPayment = async () => {
        const type = 'quiz';
        try {
            await purchaseService.createPurchase(questionSetId, type);
            setShowModal(true);

            setTimeout(() => {
                router.push('/quizzes');
            }, 2000);
        } catch (error) {
            toast.error('There was a problem confirming your payment.');
        }
    };

    return (
        <div className="min-h-screen bg-[#FFF2E1] flex items-center justify-center px-4 py-10 relative">
            {showModal && (
                <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-xl">
                        <div className="text-4xl mb-4 text-orange-500">✅</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Payment Received</h3>
                        <p className="text-gray-600 text-sm">
                            Thank you! We have received your payment. You will get access shortly.
                        </p>
                    </div>
                </div>
            )}

            <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl p-6 md:p-10 grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                        {questionSet?.title || 'Question Set'}
                    </h1>
                    <p className="text-gray-700 text-sm sm:text-base">
                        {questionSet?.subtitle || ''}
                    </p>

                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                        <li>Total Questions: {questionSet?.totalQuestions || 0}</li>
                        <li>Estimated Time: {questionSet?.estimatedTime || '--'} minutes</li>
                        <li>Difficulty: {questionSet?.difficulty}</li>
                        <li>Instant unlock upon payment</li>
                        <li>Permanent access to this question set</li>
                    </ul>

                    <div className="bg-orange-50 border border-orange-300 p-4 rounded-xl w-fit">
                        <div className="text-gray-400 line-through text-sm">
                            Original: {questionSet?.price ? `${formatPrice(questionSet.price + 20000)}₫` : ''}
                        </div>
                        <div className="text-2xl font-bold text-orange-600">
                            {questionSet?.price ? `${formatPrice(questionSet.price)}₫` : ''}
                        </div>
                    </div>
                </div>

                <div className="space-y-6 text-center">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Scan QR to Pay</h2>

                    <div className="flex items-center justify-center gap-2 bg-orange-100 text-orange-700 py-2 px-4 rounded-xl text-sm font-medium shadow-sm w-fit mx-auto">
                        <Clock className="w-4 h-4" />
                        Expires in: {formatTime(timeLeft)}
                    </div>

                    <div className="w-100 h-100 mx-auto bg-white border border-gray-300 rounded-xl overflow-hidden">
                        <img src="/QR.jpg" alt="QR Code" className="w-full h-full object-cover" />
                    </div>

                    <div className="flex items-center justify-between bg-orange-50 px-4 py-3 rounded-xl text-sm border border-orange-200">
                        <span className="text-gray-700 font-medium">Reference:</span>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-800">
                                QUIZ-{questionSetId?.slice(-5) ?? ''}
                            </span>
                            <button
                                onClick={() => copyToClipboard(`QUIZ-${questionSetId?.slice(-5) ?? '00000'}`)}
                                className="bg-orange-500 text-white p-1.5 rounded hover:bg-orange-600"
                            >
                                {copiedText === `QUIZ-${questionSetId?.slice(-5) ?? '00000'}` ? (
                                    <Check className="w-4 h-4" />
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* ✅ Payment Instructions */}
                    <div className="bg-orange-50 border border-orange-300 p-4 rounded-xl text-sm text-left space-y-2">
                        <h3 className="font-semibold text-orange-700">Payment Instructions</h3>
                        <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                            <li>Please scan the QR code and transfer the exact amount shown above.</li>
                            <li>Use <strong>QUIZ-{questionSetId?.slice(-5)}</strong> as the payment reference.</li>
                            <li>Ensure your full name is correct when making the payment.</li>
                            <li>Do not use third-party apps that may alter the payment details.</li>
                            <li>Payments are typically verified within 5–15 minutes during working hours.</li>
                        </ul>
                    </div>

                    <button
                        onClick={confirmPayment}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
                    >
                        I have completed the payment
                    </button>

                    <p className="text-xs text-gray-500">
                        Need help? Call <span className="text-orange-600 font-medium">0866 981 232</span> or email{' '}
                        <span className="text-orange-600 font-medium">email@gmail.com</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default QuestionSetPaymentPage;
