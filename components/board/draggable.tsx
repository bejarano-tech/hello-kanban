import {useDraggable} from '@dnd-kit/core';

interface DraggableProps {
  children: React.ReactNode
  id: string
}

export const Draggable = ({ children, id}: DraggableProps) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  
  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  );
}