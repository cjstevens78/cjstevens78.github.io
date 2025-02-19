import { useState, useEffect, useRef } from "react";
import ContractLinks from "./ListLink"; // Assuming this is still needed for other link types
import { config } from "@/config";

// Interface definitions (same as ContractsDisplay, but adjusted for project data)
interface ListLink {
  link: string;
  name: string;
  source: "external" | "internal";
}

interface Project {
  title: string; // Title is now required
  description: string; // Description is now required
  image: string; // Image is now required
  tags: string[];
  listlink?: ListLink[]; // listlink is now optional
}

interface ProjectCardProps {
  project: Project;
}

const ProjectsDisplay = () => {
  const projects: Project[] = config?.projects || []; // Directly use config.projects

  return (
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold mb-12">Recent Projects</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [showFade, setShowFade] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = summaryRef.current;
    if (el) {
      setShowFade(el.scrollHeight > el.clientHeight);
    }
  }, [project.description]); // Use project.description for the dependency

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <img
        src={project.image} // Directly use the image path
        alt={project.title} // Use title for alt text
        className="w-full h-48 object-cover"
      />
      <div className="p-6 relative">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3> {/* Use title */}
        <div className="relative">
          <div
            ref={summaryRef}
            className="text-gray-600 max-h-[18.75rem] overflow-y-scroll pr-2 pb-8"
            tabIndex={0}
          >
            {project.description} {/* Use description */}
          </div>
          {showFade && (
            <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          )}
        </div>
        <div>
          <div className="flex flex-wrap gap-2 mb-2 mt-4">
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
           {/* Conditionally render ContractLinks if listlink exists */}
          {project.listlink && <ContractLinks links={project.listlink} />}
        </div>
      </div>
    </div>
  );
};

export default ProjectsDisplay;
