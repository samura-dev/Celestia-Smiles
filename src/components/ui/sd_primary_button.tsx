
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface SdPrimaryButtonProps {
  text: string;
  link?: string;
  icon?: LucideIcon;
  onClick?: () => void;
  className?: string;
}

export const SdPrimaryButton = ({ text, link, icon: Icon, onClick, className = "" }: SdPrimaryButtonProps) => {
  const content = (
    <span className={`group relative mx-auto px-5 py-3 md:px-10 md:py-5 rounded-full border-2 border-[#002f6c] overflow-hidden transition-all duration-500 hover:border-[#0055ff] flex items-center justify-center gap-2 md:gap-3 cursor-pointer text-[#002f6c] ${className}`}>
      {/* Fill Overlay */}
      <span className="absolute inset-0 bg-gradient-to-r from-[#002f6c] to-[#0055ff] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
      
      {/* Text & Icon Layer */}
      <span className="relative z-10 text-[9px] md:text-[11px] font-black uppercase tracking-[0.18em] md:tracking-[0.25em] text-current group-hover:text-white transition-colors duration-300">
        {text}
      </span>
      {Icon && (
        <Icon className="relative z-10 w-3.5 h-3.5 md:w-4 md:h-4 text-current group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
      )}
    </span>
  );

  if (link) {
    return <Link to={link} className="inline-flex w-full justify-center md:justify-start">{content}</Link>;
  }

  return (
    <button type="button" onClick={onClick} className="inline-flex w-full justify-center md:justify-start bg-transparent border-0 p-0 text-left">
      {content}
    </button>
  );
};
