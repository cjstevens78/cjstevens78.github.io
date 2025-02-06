import { useState } from "react";
import { config } from '@/config';

const ContractsDisplay = ({ config }) => {
  const [showAll, setShowAll] = useState(false);

  // Ensure config.contracts exists to prevent errors
  const contracts = config?.contracts || [];
  const visibleContracts = showAll ? contracts : contracts.slice(0, 6);
console.log('dd' + config);
  return (
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold mb-12">Recent Contract Work</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleContracts.map((project, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <img
              src={project.image}
              alt={project.jobtitle}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{project.jobtitle}</h3>
              <p className="text-gray-600">{project.summary}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Show 'View More' button only if there are more than 6 contracts */}
      {!showAll && contracts.length > 6 && (
        <div className="text-center mt-6">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
            onClick={() => setShowAll(true)}
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default ContractsDisplay;
