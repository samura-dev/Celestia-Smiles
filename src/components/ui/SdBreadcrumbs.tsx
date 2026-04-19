
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface SdBreadcrumbsProps {
  items: { label: string; path?: string }[];
}

export const SdBreadcrumbs = ({ items }: SdBreadcrumbsProps) => {
  return (
    <nav className="sd_breadcrumbs flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-12 overflow-x-auto whitespace-nowrap pb-2 no-scrollbar">
      <Link to="/" className="hover:text-[#0055ff] transition-colors flex items-center gap-1 shrink-0">
        <Home className="w-3.5 h-3.5" />
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-3 shrink-0">
          <ChevronRight className="w-3 h-3 text-slate-300" />
          {item.path ? (
            <Link 
              to={item.path} 
              className="hover:text-[#0055ff] transition-colors group flex items-center gap-1"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[#002f6c]">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};
