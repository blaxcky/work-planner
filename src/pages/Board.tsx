import React from 'react';

const Board: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Kanban Board</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">To Do</h3>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3 shadow">
              <p className="text-sm text-gray-500">Keine Aufgaben</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-100 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">In Progress</h3>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3 shadow">
              <p className="text-sm text-gray-500">Keine Aufgaben</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-100 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Review</h3>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3 shadow">
              <p className="text-sm text-gray-500">Keine Aufgaben</p>
            </div>
          </div>
        </div>
        <div className="bg-green-100 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Done</h3>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3 shadow">
              <p className="text-sm text-gray-500">Keine Aufgaben</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;