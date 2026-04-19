import { useState, useRef } from 'react';
import { motion, useAnimation, type PanInfo } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export const SdSwipeButton = () => {
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    // Assume the draggable circle is 48px wide plus some margin
    const thumbWidth = 48 + 8; 
    const threshHold = (containerWidth - thumbWidth) * 0.6; // 60% of track length
    
    if (info.offset.x > threshHold) {
      setIsDone(true);
      controls.start({ x: containerWidth - thumbWidth, transition: { type: 'spring', stiffness: 200 } });
      console.log('Action Triggered!');
    } else {
      controls.start({ x: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } });
    }
  };

  const handleClick = () => {
    if (!containerRef.current) return;
    if (!isDone) {
      const thumbWidth = 48 + 8;
      setIsDone(true);
      controls.start({ x: containerRef.current.offsetWidth - thumbWidth, transition: { type: 'spring', stiffness: 200 } });
      console.log('Action Triggered by click!');
    }
  };

  return (
    <div 
      ref={containerRef}
      className={twMerge(
        'relative h-14 w-full max-w-xs rounded-full flex items-center overflow-hidden cursor-pointer transition-colors duration-500',
        isDone ? 'bg-[#122036]' : 'bg-[#1a2d4c]'
      )}
      onClick={handleClick}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 pl-8">
        <span className="text-[13px] uppercase tracking-widest font-bold text-white/90">
          {isDone ? 'Запись...' : 'Записаться'}
        </span>
      </div>
      <motion.div
        drag={isDone ? false : "x"}
        dragConstraints={containerRef}
        dragElastic={0.05}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        animate={controls}
        className="absolute left-1 h-12 w-12 rounded-full bg-white flex items-center justify-center cursor-grab active:cursor-grabbing z-10"
      >
        <ArrowRight className="text-zinc-900 w-5 h-5" />
      </motion.div>
    </div>
  );
};

