import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from './Link';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-700 to-purple-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          <Link href="/" className="flex items-center text-white hover:text-purple-200 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Back to Home</span>
          </Link>
        </div>
        <div className="py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-100 to-white">
            Naive Bayes Classifier
          </h1>
          <p className="mt-4 text-purple-200 text-lg">
            A powerful tool for text classification using machine learning
          </p>
        </div>
      </div>
    </header>
  );
}