import React from "react";
import { Users } from "lucide-react";

export const teamMembers = [
  { id: "4221124", name: "Ahmed Saad" },
  { id: "4221290", name: "Noor Hossam" },
  { id: "4221143", name: "Abdullah Mohamed" },
  { id: "4221147", name: "Osama Elkassaby" },
  { id: "4221183", name: "Mahmoud Gomaa" },
  { id: "4221258", name: "Abas Ashraf" },
  { id: "4221326", name: "Adham Ahmed" },
  { id: "4221356", name: "Mohamed Sherif" },
  { id: "4221386", name: "Moaaz Awad" },
  { id: " ", name: " " },
  { id: "4221264", name: "Abdulrahman moahmed" },
  { id: " ", name: " " },
];

export function TeamMembersSection() {
  return (
    <footer className="bg-white shadow-lg mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center mb-6">
          <Users className="w-8 h-8 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Our Team</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-gray-50 rounded-lg p-4 text-center"
            >
              <h3 className="font-semibold text-gray-800">{member.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{member.id}</p>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
