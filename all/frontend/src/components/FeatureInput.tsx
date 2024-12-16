import React from "react";

interface FeatureInputProps {
  feature: string;
  value: string;
  onChange: (feature: string, value: string) => void;
}

export const FeatureInput: React.FC<FeatureInputProps> = ({
  feature,
  value,
  onChange,
}) => {
  const formattedLabel = feature.replace(/([A-Z])/g, " $1").toLowerCase();

  // Add input validation
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers, decimal point, and minus sign
    if (value === "" || value.match(/^-?\d*\.?\d*$/)) {
      onChange(feature, value);
    }
  };

  return (
    <div>
      <label
        htmlFor={feature}
        className="block text-sm font-medium text-gray-700 capitalize"
      >
        {formattedLabel}
      </label>
      <input
        type="text"
        id={feature}
        value={value}
        onChange={handleInputChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        placeholder="Enter a number"
        required
      />
    </div>
  );
};
