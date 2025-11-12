'use client';

import { memo, useCallback } from 'react';
import { BlogCategory } from '@/app/types/blog';

interface CategoryFilterProps {
  categories: Array<{ name: string; count: number }>;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = memo(({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) => {
  const handleCategoryClick = useCallback((category: string) => {
    onCategoryChange(category);
  }, [onCategoryChange]);

  return (
    <div 
      className="flex flex-wrap gap-3"
      role="tablist"
      aria-label="Blog categories"
    >
      {categories.map((category) => {
        const isActive = activeCategory === category.name;
        return (
          <button
            key={category.name}
            onClick={() => handleCategoryClick(category.name)}
            className={`
              px-5 py-2.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-105
              ${isActive 
                ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/30' 
                : 'bg-zinc-900/50 text-zinc-400 border border-zinc-800 hover:border-yellow-500/50 hover:text-white'
              }
            `}
            role="tab"
            aria-selected={isActive}
            aria-controls="blog-posts-grid"
          >
            <span className="flex items-center gap-2">
              {category.name}
              <span className={`
                text-xs px-2 py-0.5 rounded-full
                ${isActive 
                  ? 'bg-black/20 text-black' 
                  : 'bg-zinc-800 text-zinc-500'
                }
              `}>
                {category.count}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
});

CategoryFilter.displayName = 'CategoryFilter';

export default CategoryFilter;

