'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const UnitToggle = ({ unit }: { unit: 'C' | 'F' }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const city = searchParams.get('city') || 'Nairobi';

  const toggleUnit = () => {
    const newUnit = unit === 'C' ? 'F' : 'C';
    router.push(`/?city=${city}&unit=${newUnit}`);
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`text-sm font-medium ${unit === 'C' ? 'text-blue-600' : 'text-gray-500'}`}>°C</span>
      
      <button
        type="button"
        onClick={toggleUnit}
        className="relative w-16 h-8 bg-gray-100 rounded-full px-1 focus:outline-none"
      >
        <span 
          className={`absolute top-1/2 -translate-y-1/2 bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
            unit === 'C' ? 'left-1' : 'right-1'
          }`}
        />
      </button>
      
      <span className={`text-sm font-medium ${unit === 'F' ? 'text-blue-600' : 'text-gray-500'}`}>°F</span>
    </div>
  );
};

export default UnitToggle;