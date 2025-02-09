import { ExternalLink, Link } from 'lucide-react';

export default function ContractLinks({ links }) {
  return (
    <ul className="list-none space-y-2 mt-4">
      {links.map((item, index) => (
        <li key={index} className="flex items-center">
          {/* Render the appropriate icon based on the link's source */}
          {item.source === 'external' ? (
            <ExternalLink className="w-5 h-5 text-gray-500 mr-2" />
          ) : (
            <Link className="w-5 h-5 text-gray-500 mr-2" />
          )}
          <a 
            href={item.link} 
            className="text-blue-600 hover:underline"
            // Optionally, add target and rel for external links
            target={item.source === 'external' ? '_blank' : '_self'}
            rel={item.source === 'external' ? 'noopener noreferrer' : undefined}
          >
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
