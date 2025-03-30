import React from 'react';

type ContextMenuProps = {
  x: number;
  y: number;
  onClose: () => void;
  onAddNode: (position: { x: number; y: number }) => void;
};

export const ContextMenu = ({ x, y, onClose, onAddNode }: ContextMenuProps) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        background: 'white',
        padding: '10px',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        zIndex: 1000,
      }}
    >
      <div
        style={{ cursor: 'pointer', padding: '5px' }}
        onClick={() => {
          onAddNode({ x, y });
          onClose();
        }}
      >
        Add Node
      </div>
      <div
        style={{ cursor: 'pointer', padding: '5px' }}
        onClick={onClose}
      >
        Close
      </div>
    </div>
  );
};
