import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';

interface TechStackSearchProps {
  suggestions: string[];
  onAdd: (value: string) => void;
}

function TechStackSearch({ suggestions, onAdd }: TechStackSearchProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered =
    query.trim().length > 0
      ? suggestions.filter((s) => s.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
      : [];

  const handleSelect = (value: string) => {
    onAdd(value);
    setQuery('');
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered.length > 0) {
        handleSelect(filtered[0]);
      } else if (query.trim()) {
        handleSelect(query);
      }
    }
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={styles.wrapper}>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => query.trim() && setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Add technology..."
        className={styles.input}
        autoComplete="off"
      />
      {open && filtered.length > 0 && (
        <ul className={styles.dropdown}>
          {filtered.map((suggestion) => (
            <li key={suggestion}>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect(suggestion);
                }}
                className={styles.dropdownItem}>
                {suggestion}
              </button>
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
  dropdownItem: cn(
    'text-gd-muted w-full px-4 py-2 text-left text-sm',
    'hover:bg-gd-surface-2 hover:text-gd-text transition-colors',
  ),
};

export default TechStackSearch;
