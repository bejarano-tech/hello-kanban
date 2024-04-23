"use client"
import {useDroppable} from '@dnd-kit/core';

interface DroppableProps {
  children: React.ReactNode
  id: string
}

export const Droppable = ({ children, id }: DroppableProps) => {
  const {isOver, setNodeRef} = useDroppable({
    id,
  });

  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  
  return (
    <div ref={setNodeRef} style={style}>
      <p>{id}</p>
      {children}
    </div>
  );
}