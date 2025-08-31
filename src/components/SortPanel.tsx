import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type SortField = "name" | "createdAt" | "updatedAt" | "id";

export type SortCriterion = {
  id: string;
  field: SortField;
  direction: "asc" | "desc";
};

const sortOptions: { field: SortField; label: string }[] = [
  { field: "name", label: "Client Name" },
  { field: "createdAt", label: "Created At" },
  { field: "updatedAt", label: "Updated At" },
  { field: "id", label: "Client ID" },
];

function SortableItem({ criterion, onChangeDirection, onRemove }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: criterion.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Disable dragging on interactive buttons
  const dragHandleProps = {
    ...listeners,
    // exclude buttons from drag
    onPointerDown: (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "BUTTON") {
        e.stopPropagation();
      }
    },
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...dragHandleProps}
      className="flex items-center justify-between p-2 bg-gray-100 rounded-md mb-2 cursor-move"
    >
      <span>{criterion.field}</span>
      <div className="flex gap-2">
        <button
          className="px-2 py-1 text-sm border rounded"
          onClick={() => onChangeDirection(criterion.id)}
        >
          {criterion.direction === "asc" ? "A→Z" : "Z→A"}
        </button>
        <button
          className="px-2 py-1 text-sm border rounded text-red-500"
          onClick={() => onRemove(criterion.id)}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default function SortPanel({
  criteria,
  setCriteria,
  onApply,
}: {
  criteria: SortCriterion[];
  setCriteria: (c: SortCriterion[]) => void;
  onApply: () => void;
}) {
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = criteria.findIndex((c) => c.id === active.id);
      const newIndex = criteria.findIndex((c) => c.id === over.id);
      setCriteria(arrayMove(criteria, oldIndex, newIndex));
    }
  };

  const toggleDirection = (id: string) => {
    setCriteria(
      criteria.map((c) =>
        c.id === id
          ? { ...c, direction: c.direction === "asc" ? "desc" : "asc" }
          : c
      )
    );
  };

  const removeCriterion = (id: string) => {
    setCriteria(criteria.filter((c) => c.id !== id));
  };

  const addCriterion = (field: SortField) => {
    if (!criteria.find((c) => c.field === field)) {
      setCriteria([...criteria, { id: field, field, direction: "asc" }]);
    }
  };

  return (
    <div className="p-4 border rounded-md bg-white shadow-md w-80">
      <h2 className="font-semibold mb-3">Sort By</h2>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={criteria}
          strategy={verticalListSortingStrategy}
        >
          {criteria.map((criterion) => (
            <SortableItem
              key={criterion.id}
              criterion={criterion}
              onChangeDirection={toggleDirection}
              onRemove={removeCriterion}
            />
          ))}
        </SortableContext>
      </DndContext>

      <div className="flex gap-2 mt-2 flex-wrap">
        {sortOptions.map((o) => (
          <button
            key={o.field}
            className="px-2 py-1 border rounded text-sm"
            onClick={() => addCriterion(o.field)}
          >
            + {o.label}
          </button>
        ))}
      </div>

      <button
        className="mt-4 w-full bg-black text-white py-2 rounded"
        onClick={onApply}
      >
        Apply Sort
      </button>
    </div>
  );
}
