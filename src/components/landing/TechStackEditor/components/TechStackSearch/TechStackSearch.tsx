import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';

interface TechStackSearchProps {
  suggestions: string[];
  onAdd: (value: string) => void;
}

const LISTBOX_ID = 'tech-stack-listbox';

function TechStackSearch({ suggestions, onAdd }: TechStackSearchProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered =
    query.trim().length > 0
      ? suggestions.filter((s) => s.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
      : [];

  const isOpen = open && filtered.length > 0;

  const handleSelect = (value: string) => {
    onAdd(value);
    setQuery('');
    setOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && filtered[activeIndex]) {
        handleSelect(filtered[activeIndex]);
      } else if (filtered.length > 0) {
        handleSelect(filtered[0]);
      } else if (query.trim()) {
        handleSelect(query);
      }
      return;
    }
    if (e.key === 'Escape') {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={styles.wrapper}>
      <input
        type="text"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? LISTBOX_ID : undefined}
        aria-autocomplete="list"
        aria-activedescendant={
          isOpen && activeIndex >= 0 ? `${LISTBOX_ID}-option-${activeIndex}` : undefined
        }
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setActiveIndex(-1);
        }}
        onFocus={() => query.trim() && setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Add technology..."
        className={styles.input}
        autoComplete="off"
      />
      {isOpen && (
        <ul id={LISTBOX_ID} role="listbox" className={styles.dropdown}>
          {filtered.map((suggestion, i) => (
            <li
              key={suggestion}
              id={`${LISTBOX_ID}-option-${i}`}
              role="option"
              aria-selected={i === activeIndex}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(suggestion);
              }}
              onMouseEnter={() => setActiveIndex(i)}
              className={cn(styles.option, i === activeIndex && styles.optionActive)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  wrapper: cn('relative'),
  input: cn(
    'w-full rounded-lg border px-4 py-2',
    'border-gd-surface-2 bg-gd-surface',
    'text-gd-text placeholder:text-gd-muted text-sm',
    'focus:border-gd-accent focus:ring-gd-accent transition outline-none focus:ring-1',
  ),
  dropdown: cn(
    'absolute z-10 mt-1 w-full overflow-hidden rounded-lg',
    'border-gd-surface-2 bg-gd-surface border shadow-xl',
  ),
  option: cn('text-gd-muted cursor-pointer px-4 py-2 text-sm transition-colors'),
  optionActive: cn('bg-gd-surface-2 text-gd-text'),
};

export default TechStackSearch;
