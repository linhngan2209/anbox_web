'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BackgroundDecorations } from '@/components/BackgroundDecorations';
import questionService from '@/service/questionService';
import purchaseService from '@/service/purchaseService';

const QuizPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const soundEffectsRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const res = await questionService.getQuestionById(id as string);
      if (!res || res.length === 0) throw new Error('No questions found');

      const mapped = res.map((q: any) => ({
        id: q.questionId,
        question: q.question,
        type: q.type,
        correctAnswer: q.correctAnswer,
        answers: q.options.map((opt: any) => ({
          id: opt.label,
          text: opt.text,
        })),
      }));

      setQuestions(mapped);
    } catch (err) {
      setQuestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [id]);

  useEffect(() => {
    if (showResult || isAnswered || isProcessing) {
      clearInterval(timerRef.current!);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return 20;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current!);
  }, [currentQuestionIndex, showResult, isAnswered, isProcessing]);

  const playSoundEffect = (type: 'correct' | 'wrong') => {
    if (soundEffectsRef.current) {
      soundEffectsRef.current.src = `/${type}.wav`;
      soundEffectsRef.current.currentTime = 0;
      soundEffectsRef.current.play().catch(() => { });
    }
  };

  const handleTimeUp = () => {
    if (isAnswered || isProcessing) return;
    setIsAnswered(true);
    setIsProcessing(true);
    playSoundEffect('wrong');

    setTimeout(goToNextQuestion, 1000);
  };
  const handleAnswerSelect = (id: string) => {
    if (isAnswered || isProcessing) return;
    setSelectedAnswer(id);
  };

  const handleNext = () => {
    if (!selectedAnswer || isAnswered || isProcessing) return;

    setIsAnswered(true);
    setIsProcessing(true);

    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore((prev) => prev + 1);
      playSoundEffect('correct');
    } else {
      playSoundEffect('wrong');
    }

    setTimeout(goToNextQuestion, 1000);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer('');
      setTimeLeft(20);
      setIsAnswered(false);
      setIsProcessing(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    clearInterval(timerRef.current!);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer('');
    setTimeLeft(20);
    setIsAnswered(false);
    setIsProcessing(false);
    setShowResult(false);
  };

  const getTimerColor = () => {
    if (timeLeft > 15) return 'bg-green-500';
    if (timeLeft > 7) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const currentQuestion = questions[currentQuestionIndex];
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error: No questions found</h2>
          <button
            onClick={() => router.push('/quizzes')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center relative overflow-hidden">
        <BackgroundDecorations />
        <div className="bg-white rounded-3xl p-8 shadow-lg z-10 text-center">
          <h2 className="text-3xl font-bold mb-4">🎉 Quiz Complete!</h2>
          <p className="text-xl text-gray-700 mb-6">
            Your Score: <span className="font-bold text-blue-600">{score}/{questions.length}</span>
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleRestart}
              className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600"
            >
              Try Again
            </button>
            <button
              onClick={() => router.push('/quizzes')}
              className="bg-gray-300 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-400"
            >
              Back
            </button>
          </div>
        </div>
        <audio ref={soundEffectsRef} preload="auto" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-blue-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <BackgroundDecorations />
      <audio ref={soundEffectsRef} preload="auto" />

      <div className="w-full max-w-xl px-4 z-20 mb-8">
        <div className="bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          <div
            className={`h-full transition-all duration-1000 ease-linear ${getTimerColor()} ${timeLeft <= 5 ? 'animate-pulse' : ''}`}
            style={{ width: `${(timeLeft / 20) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full mx-4 relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Question {currentQuestionIndex + 1}/{questions.length}
          </h1>
        </div>

        <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">
          {currentQuestion.question}
        </h2>

        <div className="space-y-4 mb-6">
          {currentQuestion.answers.map((answer: any) => (
            <button
              key={answer.id}
              onClick={() => handleAnswerSelect(answer.id)}
              disabled={isAnswered || isProcessing}
              className={`w-full p-4 rounded-2xl border-2 text-left transition-all duration-200 ${selectedAnswer === answer.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                } ${isAnswered && answer.id === currentQuestion.correctAnswer
                  ? 'border-green-500 bg-green-50'
                  : ''
                } ${isAnswered && selectedAnswer === answer.id && answer.id !== currentQuestion.correctAnswer
                  ? 'border-red-500 bg-red-50'
                  : ''
                }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${selectedAnswer === answer.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                  }`}>
                  {answer.id}
                </div>
                <span className="text-lg text-gray-800">{answer.text}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleNext}
            disabled={!selectedAnswer || isAnswered || isProcessing}
            className={`py-3 px-8 rounded-2xl font-bold text-lg transition-all duration-200 ${selectedAnswer && !isAnswered && !isProcessing
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
