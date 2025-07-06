import React from 'react';

const Projects: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Projekte</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Neues Projekt
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Beispiel Projekt</h3>
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          </div>
          <p className="text-gray-600 mb-4">Ein Beispiel-Projekt zur Demonstration</p>
          <div className="flex justify-between text-sm text-gray-500">
            <span>0 Aufgaben</span>
            <span>Erstellt heute</span>
          </div>
        </div>
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 mb-2">Noch keine Projekte</p>
            <button className="text-blue-600 hover:text-blue-800">
              Erstes Projekt erstellen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;