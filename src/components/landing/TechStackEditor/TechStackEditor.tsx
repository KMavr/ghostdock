'use client';

import { useState } from 'react';
import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import SortableBadge from '@/components/landing/TechStackEditor/components/SortableBadge/SortableBadge';
import TechStackSearch from '@/components/landing/TechStackEditor/components/TechStackSearch/TechStackSearch';
import { KNOWN_PACKAGES } from '@/lib/parse/known-packages';
import { cn } from '@/lib/utils/cn';

const SUGGESTIONS = [...new Set(Object.values(KNOWN_PACKAGES))].sort();

interface TechStackEditorProps {
  initialValue: string[];
}

function TechStackEditor({ initialValue }: TechStackEditorProps) {
  const [items, setItems] = useState<string[]>(initialValue);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((prev) => {
        const from = prev.indexOf(active.id as string);
        const to = prev.indexOf(over.id as string);
        return arrayMove(prev, from, to);
      });
    }
  };

  const addItem = (value: string) => {
    const trimmed = value.trim();
    if (trimmed && !items.includes(trimmed)) {
      setItems((prev) => [...prev, trimmed]);
    }
  };

  const removeItem = (value: string) => {
    setItems((prev) => prev.filter((i) => i !== value));
  };

  return (
    <div className={styles.root}>
      <input type="hidden" name="techStack" value={JSON.stringify(items)} />
      <DndContext id="tech-stack-dnd" sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <div className={styles.badges}>
            {items.map((item) => (
              <SortableBadge key={item} value={item} onRemove={() => removeItem(item)} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <TechStackSearch suggestions={SUGGESTIONS} onAdd={addItem} />
      {items.length > 12 && (
        <p className={styles.hint}>
          More than 12 technologies can feel cluttered — consider trimming.
        </p>
      )}
    </div>
  );
}

const styles = {
  root: cn('flex flex-col gap-3'),
  badges: cn('flex min-h-8 flex-wrap gap-2'),
  hint: cn('text-gd-amber text-xs'),
};

export default TechStackEditor;
