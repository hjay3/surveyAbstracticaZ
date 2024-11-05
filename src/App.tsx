import React, { useState, useCallback } from 'react';
import { StarField } from './components/StarField';
import { AbstractCanvas } from './components/AbstractCanvas';
import { JournalEditor } from './components/JournalEditor';
import { EntryList } from './components/EntryList';
import { Header } from './components/Header';
import { QuoteDisplay } from './components/QuoteDisplay';

const quotes = [
  "What mysteries lie in the spaces between thoughts?",
  "How does consciousness emerge from complexity?",
  "Where do ideas go when they're forgotten?",
  "Can beauty be measured in mathematical terms?",
  "What shapes the rhythm of our universe?",
];

function App() {
  const [entries, setEntries] = useState<{ text: string; date: string }[]>([]);
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  const handleAnimationChange = useCallback(() => {
    const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(newQuote);
  }, []);

  const handleSaveEntry = useCallback((text: string) => {
    if (text.trim()) {
      setEntries(prev => [...prev, { text, date: new Date().toISOString() }]);
      return true;
    }
    return false;
  }, []);

  const handleDeleteEntry = useCallback((index: number) => {
    setEntries(prev => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <StarField />
      <AbstractCanvas onAnimationChange={handleAnimationChange} />
      <QuoteDisplay quote={currentQuote} />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <Header />
        <JournalEditor onSave={handleSaveEntry} />
        <EntryList entries={entries} onDelete={handleDeleteEntry} />
      </div>
    </div>
  );
}

export default App;