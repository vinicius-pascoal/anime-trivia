'use client';

import { useEffect, useState } from 'react';
import { TriviaCard } from '../components/TriviaCard';
import { Loader } from '../components/Loader';

export default function HomePage() {
  const [questionData, setQuestionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchQuestion = async () => {
    setLoading(true);
    const res = await fetch("https://opentdb.com/api.php?amount=1&category=31&difficulty=medium&type=multiple");
    const data = await res.json();
    setQuestionData(data.results[0]);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-300 to-indigo-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-6">🎌 Anime Trivia</h1>
      {loading ? <Loader /> : <TriviaCard data={questionData} onNext={fetchQuestion} />}
    </main>
  );
}
