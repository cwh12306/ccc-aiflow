'use client';

import '@xyflow/react/dist/style.css';

import { Background, MiniMap, ReactFlow, ReactFlowProvider } from '@xyflow/react';

export const Flow = () => {
    return (
        <div className="h-full">
            <ReactFlowProvider>
                <ReactFlow
                    nodes={[
                        { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
                        { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
                    ]}
                    edges={[{ id: 'n1-n2', source: 'n1', target: 'n2' }]}
                >
                    <MiniMap />
                    <Background />
                </ReactFlow>
            </ReactFlowProvider>
        </div>
    );
};
