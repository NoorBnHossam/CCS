import React from "react";
import { Brain, LineChart, Database } from "lucide-react";
import { Link } from "react-router-dom";
import { TeamMembersSection } from "../components/TeamMembers";

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            Computational Cognitive Science
          </h1>
          <p className="mt-2 text-center text-gray-600 text-lg">
            Exploring the intersection of computation and human cognition
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            About Our Research
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Our research focuses on understanding cognitive processes through
            computational modeling. We employ various mathematical and
            statistical approaches to model human learning, decision-making, and
            reasoning.
          </p>
          <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
            <br />
            <p className="text-gray-800 font-mono text-lg text-center tracking-wider">
              P(A│B) ={" "}
              <span className="border-b border-gray-400">P(B│A)P(A)</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;P(B)
            </p>
            <p className="text-sm text-center text-gray-600 mt-2">
              <br />
              Bayes' theorem: The foundation of probabilistic cognitive modeling
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <ModelCard
            icon={<Brain className="w-12 h-12 text-blue-600 mb-4" />}
            title="Gaussian Model"
            description="Explore probabilistic modeling using Gaussian distributions for cognitive processes."
            to="/gaussian"
            color="blue"
          />

          <ModelCard
            icon={<LineChart className="w-12 h-12 text-green-600 mb-4" />}
            title="Linear Regression"
            description="Analyze relationships between cognitive variables using linear regression."
            to="/regression"
            color="green"
          />

          <ModelCard
            icon={<Database className="w-12 h-12 mb-10" />}
            title="Text Classification"
            description="Train and use a text classification model"
            to="http://localhost:5174/"
            color="purple"
          />
        </div>
      </main>

      <TeamMembersSection />
    </div>
  );
}

interface ModelCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
  color: "blue" | "green" | "purple";
}

function ModelCard({ icon, title, description, to, color }: ModelCardProps) {
  const colorClasses = {
    blue: "bg-blue-600 hover:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700",
    purple: "bg-purple-600 hover:bg-purple-700",
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
      <div className="p-6">
        {icon}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link
          to={to}
          className={`block w-full text-white text-center py-2 rounded-lg transition-colors ${colorClasses[color]}`}
        >
          Open Model
        </Link>
      </div>
    </div>
  );
}
