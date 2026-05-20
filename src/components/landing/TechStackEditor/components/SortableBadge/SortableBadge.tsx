import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils/cn';

interface SortableBadgeProps {
  value: string;
  onRemove: () => void;
}

function SortableBadge({ value, onRemove }: SortableBadgeProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: value,
  });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(styles.badge, isDragging && styles.badgeDragging)}>
      <span
        {...attributes}
        {...listeners}
        className={styles.dragHandle}
        aria-label="Drag to reorder">
        ⠿
      </span>
      <span>{value}</span>
      <button
        type="button"
        onClick={onRemove}
        className={styles.removeBtn}
        aria-label={`Remove ${value}`}>
        ×
      </button>
    </div>
  );
}

const styles = {
  badge: cn(
    'flex items-center gap-1.5 rounded-full px-3 py-1',
    'bg-gd-surface-2 text-gd-muted text-xs font-medium',
    'border border-transparent select-none',
  ),
  badgeDragging: cn('border-gd-accent opacity-75 shadow-lg'),
  dragHandle: cn('text-gd-muted cursor-grab active:cursor-grabbing'),
  removeBtn: cn('text-gd-muted hover:text-gd-error ml-0.5 text-sm leading-none transition-colors'),
};

export default SortableBadge;
