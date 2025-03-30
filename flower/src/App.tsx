import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import { ContextMenu } from './ui/ContextMenu';

import '@xyflow/react/dist/style.css';

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState();
  const [edges, setEdges, onEdgesChange] = useEdgesState();
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onSave = useCallback(() => {
    const flow = {
      nodes: nodes,
      edges: edges,
    };
    const json = JSON.stringify(flow);
    localStorage.setItem('flow', json);
  }, [nodes, edges]);

  const onRestore = useCallback(() => {
    const flow = JSON.parse(localStorage.getItem('flow') || '');
    if (flow) {
      setNodes(flow.nodes);
      setEdges(flow.edges);
    }
  }, [setNodes, setEdges]);

  const onContextMenu = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      const bounds = event.currentTarget.getBoundingClientRect();
      setMenu({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });
    },
    []
  );

  const onPaneClick = useCallback(() => {
    setMenu(null);
  }, []);

  const onAddNode = useCallback(
    (position: { x: number; y: number }) => {
      const newNode: Node = {
        id: `node-${nodes.length + 1}`,
        position,
        data: { label: `Node ${nodes.length + 1}` },
      };
      setNodes((nds) => [...nds, newNode]);
    },
    [nodes, setNodes]
  );


  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <button
        onClick={onSave}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 4
        }}
      >
        Save Flow
      </button>
      <button
        onClick={onRestore}
        style={{
          position: 'absolute',
          top: '40px',
          right: '10px',
          zIndex: 4
        }}
      >
        Restore Flow
      </button>
      <ReactFlow
        colorMode="dark"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onContextMenu={onContextMenu}
        onPaneClick={onPaneClick}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
        {menu && (
          <ContextMenu
            x={menu.x}
            y={menu.y}
            onClose={() => setMenu(null)}
            onAddNode={onAddNode}
          />
        )}

      </ReactFlow>
    </div>
  );
}
