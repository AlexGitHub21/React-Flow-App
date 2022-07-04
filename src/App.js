import './App.css';
import React,{ useCallback, useEffect, useState } from 'react';
import ReactFlow, { updateEdge, Handle, Position, useEdgesState, useNodesState, addEdge, useUpdateNodeInternals } from 'react-flow-renderer';


import './text-updater-nodes.css';

const elements=[
  {
    id: '1',
    type: 'input',
    data: {label: 'Number: ' },
    position: {x:50, y:0},
  
  },
  {
    id: '2',
    data: {label: 'MultiplicationBy2: '},
    position: {x:-50, y:100}
  },
  {
    id: '3',
    data: {label: 'ShiftBy1Bit: '},
    position: {x:50, y:200}
  },
  {
    id: '4',
    type: 'output',
    data: {label: 'Results: '},
    position: {x: -50, y: 300}
  }
];
const initEdges=[];

const UpdateNode = () => {

  const [nodes, setNodes, onNodesChange] = useNodesState(elements);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const [nodeName, setNodeName] = useState('');

  useEffect(() => {
    setNodes((nds) => 
      nds.map((node) => {
        if (node.id==='1') {
          node.data ={
          ...node.data,
          label: 'Number: ' +nodeName,
          
        };
        localStorage.setItem('res', nodeName)
      }      
      return node;
    })
    );
  }, [nodeName, setNodes]); 

    useEffect(()=>{
        setEdges((eds) =>
          eds.map((edge) => {
            if (edge.id==='reactflow__edge-1-2'){

              setNodes((nds)=>
                nds.map((node) => {
                    if (node.id==='2'){
                      
                    node.data ={
                      ...node.data,
                      label: 'MultiplicationBy2: '+nodeName*2,
                      }
                    }
                    return node;
                }))
            }
            if (edge.id==='reactflow__edge-1-3'){

              setNodes((nds)=>
                nds.map((node) => {
                    if (node.id==='3'){
                    node.data ={
                      ...node.data,
                      label: 'ShiftBy1Bit: '+(nodeName>>1),
                      }
                    }
                    return node;
                }))
            }
            if (edge.id==='reactflow__edge-1-4'){

              setNodes((nds)=>
                nds.map((node) => {
                    if (node.id==='4'){
                    node.data ={
                      ...node.data,
                      label: 'Results: '+(nodeName),
                      }
                    }
                    return node;
                }))
            }
            if (edge.id==='reactflow__edge-2-3'){

              setNodes((nds)=>
                nds.map((node) => {
                    if (node.id==='3'){
                    node.data ={
                      ...node.data,
                      label: 'ShiftBy1Bit: '+(nodeName*2>>1),
                      }
                    }
                    return node;
                }))
            }
            if (edge.id==='reactflow__edge-2-4'){

              setNodes((nds)=>
                nds.map((node) => {
                    if (node.id==='4'){
                    node.data ={
                      ...node.data,
                      label: 'Results: '+(nodeName*2),
                      }
                    }
                    return node;
                }))
            }
            if (edge.id==='reactflow__edge-3-4'){

              setNodes((nds)=>
                nds.map((node) => {
                    if (node.id==='4'){
                    node.data ={
                      ...node.data,
                      label: 'Results: '+(nodeName*2),
                      }
                    }
                    return node;
                }))
            }
            if (edge.id==='reactflow__edge-3-2'){

              setNodes((nds)=>
                nds.map((node) => {
                    if (node.id==='2'){
                    node.data ={
                      ...node.data,
                      label: 'Results: '+(nodeName>>1)*2,
                      }
                    }
                    return node;
                }))
                
            }
            return edge;
          })
        );
      }, [nodeName, setEdges, setNodes]);

  // const onNodesChange = useCallback(
  // (change) => setNodes((nds) => applyNodeChanges(change, nds)),
  // [setNodes]
  // );
  // const onEdgesChange = useCallback(
  // (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
  // [setEdges]
  // );
  const onEdgeUpdate = (oldEdge, newConnection) => setEdges((els) => 
    updateEdge(oldEdge, newConnection, els));
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges]);
    let toJson=JSON.stringify(edges, null, 4) + JSON.stringify(nodes, null, 4);
  return (
  <ReactFlow
    nodes={nodes}
    edges={edges}
    onNodesChange={onNodesChange}
    onEdgesChange={onEdgesChange}
    onConnect={onConnect}
    fitView
    attributionPosition="bottom-left"
  >

  <div className="text-updater-node">
    <div>
    <label>Number:</label>
    <input value={nodeName} onChange={(evt) => setNodeName(evt.target.value)} type="number"/>
    </div>
  </div>

  <div className='aaaaa'>
      <textarea rows="60" cols="30" value={toJson}></textarea> 
  

  </div>
  </ReactFlow>
  );
};

export default UpdateNode;
