import { useState, useEffect, useRef } from "react";
import ContractLinks from './ListLink';
import { config } from "@/config";

const ContractsDisplay = () => {
  const [showAll, setShowAll] = useState(false);
  const contracts = config?.contracts || [];
  const visibleContracts = showAll ? contracts : contracts.slice(0, 6);

  return (
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold mb-12">Recent Contract Work</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleContracts.map((project, index) => (
          <ContractCard key={index} project={project} />
        ))}
      </div>

      {contracts.length > 6 && (
        <div className="text-center mt-6">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "View Less" : "View More"}
          </button>
        </div>
      )}
    </div>
  );
};

const ContractCard = ({ project }) => {
  const [showFade, setShowFade] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = summaryRef.current;
    if (el) {
      setShowFade(el.scrollHeight > el.clientHeight);
    }
  }, [project.summary]);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <img
        src={`/images/${project.image ?? "default"}-screenshot.jpg`}
        alt={project.jobtitle}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 relative">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold mb-2">{project.company}</h3>
          <span className="text-sm text-gray-500">{project.industry}</span>
        </div>
        <h4 className="mb-2">{project.startdate} - {project.enddate}</h4>
        <div className="relative">
          <div
            ref={summaryRef}
            className="text-gray-600 max-h-[18.75rem] overflow-y-scroll pr-2"
            tabindex="0"
          >
            {project.summary}
          </div>
     
          {showFade && (
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-gray-600 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {project.tags.map((tag, tagIndex) => (
              <span 
                key={tagIndex}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <ContractLinks links={project.listlink} />
        </div>
      </div>
    </div>
  );
};

export default ContractsDisplay;
