'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BackgroundDecorations } from '@/components/BackgroundDecorations';
import LanguageLearningComponent from '@/components/FAQ/QuizzLevel';

const TopicSelectionPage = () => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const router = useRouter();
  const handleTopicToggle = (topicId: string) => {
    setSelectedTopics(prev => {
      if (prev.includes(topicId)) {
        return prev.filter(id => id !== topicId);
      } else {
        return [...prev, topicId];
      }
    });
  };

  const handleStartQuiz = () => {
       router.push(`/quizzes/1`);
  };

  const isStartEnabled = selectedTopics.length >= 3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-blue-100 flex items-center justify-center p-4 relative ">
      <BackgroundDecorations />
      <LanguageLearningComponent />
    </div>
  );
};

export default TopicSelectionPage;