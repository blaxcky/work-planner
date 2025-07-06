import React from 'react';

const Calendar: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Kalender</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(day => (
            <div key={day} className="p-2 text-center font-semibold text-gray-600">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 35 }, (_, i) => (
            <div key={i} className="aspect-square border border-gray-200 p-2">
              <div className="text-sm text-gray-500">
                {i + 1 <= 30 ? i + 1 : ''}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;