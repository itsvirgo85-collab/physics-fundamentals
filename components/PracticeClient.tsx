'use client';
import { useState } from 'react';
import { questions } from '@/lib/practice';

export default function PracticeClient() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [show, setShow] = useState(false);
  return (
    <div>
      {questions.map((q, i) => (
        <section className="card question" key={i}>
          <h2>
            {i + 1}. {q.question}
          </h2>
          {q.options.map((o, j) => (
            <label className="option" key={j}>
              <input
                type="radio"
                name={`q${i}`}
                checked={answers[i] === j}
                onChange={() => {
                  setAnswers((a) => ({ ...a, [i]: j }));
                  setShow(false);
                }}
              />
              {o}
            </label>
          ))}
          {show && (
            <p className={answers[i] === q.answer ? 'correct' : 'error'}>
              {answers[i] === q.answer ? 'Correct.' : 'Not quite.'} {q.explanation}
            </p>
          )}
        </section>
      ))}
      <button className="btn" onClick={() => setShow(true)}>
        Check answers
      </button>{' '}
      <button
        className="btn btn-secondary"
        onClick={() => {
          setAnswers({});
          setShow(false);
        }}
      >
        Reset
      </button>
    </div>
  );
}
