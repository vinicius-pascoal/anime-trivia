'use client';

import { useEffect, useState } from 'react';
import { TriviaCard } from '../components/TriviaCard';
import { Loader } from '../components/Loader';
import Background from '../components/Background';

export default function HomePage() {
  const [questionData, setQuestionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  const fetchQuestion = async () => {
    setLoading(true);
    const res = await fetch(`https://opentdb.com/api.php?amount=1&category=31&difficulty=${difficulty}&type=multiple`);
    const data = await res.json();
    setQuestionData(data.results[0]);
    setLoading(false);
  };

  const handleAnswer = (isCorrect: boolean, diff: string) => {
    if (isCorrect) {
      const points = diff === 'easy' ? 10 : diff === 'medium' ? 20 : 30;
      setScore((prev) => prev + points);
    }
    fetchQuestion();
  };

  useEffect(() => {
    fetchQuestion();
  }, [difficulty]);

  return (
    <Background>
    <main className="text-center text-white p-4">
      <h1 className="text-4xl font-bold mb-2">🎌 Anime Trivia</h1>
      <div className="mb-4 flex items-center gap-4">
        <span className="text-lg">Pontuação: <strong>{score}</strong></span>
        <select
          className="text-black rounded-lg px-2 py-1"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {loading || !questionData ? (
        <Loader />
      ) : (
        <TriviaCard data={questionData} onAnswer={handleAnswer} />
      )}
    </main>
    </Background>
  );
}
