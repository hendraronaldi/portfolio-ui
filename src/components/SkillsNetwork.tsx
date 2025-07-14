import React, { useState, useRef, useEffect } from 'react';
import { Filter, Info, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import skillsVizConfig from '../data/skills-viz.json';

interface Node {
  id: string;
  name: string;
  category: string;
  level: number;
  color: string;
  size: string;
  position: { x: number; y: number };
}

interface Connection {
  source: string;
  target: string;
  type: string;
  strength: number;
  description: string;
  style: {
    color: string;
    thickness: number;
    pattern: string;
    animation: string;
  };
}

interface Filter {
  id: string;
  label: string;
  color: string;
  active: boolean;
}

const SkillsNetwork: React.FC = () => {
  const { skillRelationships } = skillsVizConfig;
  const [nodes] = useState<Node[]>(skillRelationships.nodes);
  const [connections] = useState<Connection[]>(skillRelationships.connections);
  const [filters, setFilters] = useState<Filter[]>(skillRelationships.filters);
  const [hoveredConnection, setHoveredConnection] = useState<string | null>(null);
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);
  const [highlightedNodes, setHighlightedNodes] = useState<Set<string>>(new Set());
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get active connection types
  const activeFilters = filters.filter(f => f.active).map(f => f.id);
  const visibleConnections = connections.filter(conn => activeFilters.includes(conn.type));

  // Get node size based on configuration
  const getNodeSize = (size: string) => {
    return skillRelationships.layout.nodeSize[size as keyof typeof skillRelationships.layout.nodeSize] || 40;
  };

  // Handle filter toggle
  const toggleFilter = (filterId: string) => {
    setFilters(prev => prev.map(filter => 
      filter.id === filterId ? { ...filter, active: !filter.active } : filter
    ));
  };

  // Handle connection hover
  const handleConnectionHover = (connectionId: string | null) => {
    setHoveredConnection(connectionId);
    
    if (connectionId) {
      const connection = connections.find(c => `${c.source}-${c.target}` === connectionId);
      if (connection) {
        setHighlightedNodes(new Set([connection.source, connection.target]));
      }
    } else {
      setHighlightedNodes(new Set());
    }
  };

  // Handle connection click
  const handleConnectionClick = (connection: Connection) => {
    setSelectedConnection(connection);
  };

  // Handle zoom
  const handleZoom = (direction: 'in' | 'out') => {
    const factor = direction === 'in' ? 1.2 : 0.8;
    setScale(prev => Math.max(0.5, Math.min(2, prev * factor)));
  };

  // Reset view
  const resetView = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  };

  // Handle mouse events for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Get connection path
  const getConnectionPath = (source: Node, target: Node) => {
    const dx = target.position.x - source.position.x;
    const dy = target.position.y - source.position.y;
    const dr = Math.sqrt(dx * dx + dy * dy) * 0.3;
    
    return `M${source.position.x},${source.position.y}A${dr},${dr} 0 0,1 ${target.position.x},${target.position.y}`;
  };

  // Get stroke dash array based on pattern
  const getStrokeDashArray = (pattern: string) => {
    switch (pattern) {
      case 'dashed': return '8,4';
      case 'dotted': return '2,3';
      default: return 'none';
    }
  };

  // Get connection style
  const getConnectionStyle = (connection: Connection, isHovered: boolean) => {
    const baseStyle = skillRelationships.layout.connectionStyles.default;
    const hoverStyle = skillRelationships.layout.connectionStyles.hover;
    
    let thickness = connection.style.thickness;
    let opacity = baseStyle.opacity;
    
    if (isHovered) {
      thickness += parseInt(hoverStyle.thickness.replace('+', ''));
      opacity = hoverStyle.opacity;
    }
    
    return {
      stroke: connection.style.color,
      strokeWidth: thickness,
      strokeDasharray: getStrokeDashArray(connection.style.pattern),
      opacity,
      filter: isHovered && hoverStyle.glow ? `drop-shadow(0 0 6px ${connection.style.color})` : 'none'
    };
  };

  return (
    <div className="w-full bg-gray-900 rounded-xl p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">Skills Network</h3>
        
        {/* Controls */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleZoom('in')}
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              title="Zoom In"
            >
              <ZoomIn size={16} className="text-white" />
            </button>
            <button
              onClick={() => handleZoom('out')}
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              title="Zoom Out"
            >
              <ZoomOut size={16} className="text-white" />
            </button>
            <button
              onClick={resetView}
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              title="Reset View"
            >
              <RotateCcw size={16} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <Filter size={16} className="text-gray-400 mr-2" />
          <span className="text-sm text-gray-400">Connection Types:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => toggleFilter(filter.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                filter.active
                  ? 'text-white shadow-lg'
                  : 'text-gray-400 bg-gray-800 hover:bg-gray-700'
              }`}
              style={filter.active ? { backgroundColor: filter.color } : {}}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Network Visualization */}
      <div 
        ref={containerRef}
        className="relative w-full h-96 bg-gray-800 rounded-lg overflow-hidden cursor-grab"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox={`0 0 ${skillRelationships.layout.width} ${skillRelationships.layout.height}`}
          className="absolute inset-0"
          style={{
            transform: `scale(${scale}) translate(${pan.x}px, ${pan.y}px)`,
            transformOrigin: 'center center'
          }}
        >
          {/* Definitions for animations */}
          <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {/* Connections */}
          <g className="connections">
            {visibleConnections.map(connection => {
              const sourceNode = nodes.find(n => n.id === connection.source);
              const targetNode = nodes.find(n => n.id === connection.target);
              const connectionId = `${connection.source}-${connection.target}`;
              const isHovered = hoveredConnection === connectionId;
              
              if (!sourceNode || !targetNode) return null;

              return (
                <g key={connectionId}>
                  <path
                    d={getConnectionPath(sourceNode, targetNode)}
                    fill="none"
                    style={getConnectionStyle(connection, isHovered)}
                    className="transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => handleConnectionHover(connectionId)}
                    onMouseLeave={() => handleConnectionHover(null)}
                    onClick={() => handleConnectionClick(connection)}
                  />
                  
                  {/* Animation overlay for flow effect */}
                  {connection.style.animation === 'flow' && (
                    <path
                      d={getConnectionPath(sourceNode, targetNode)}
                      fill="none"
                      stroke="url(#flowGradient)"
                      strokeWidth={connection.style.thickness}
                      strokeDasharray="20,10"
                      opacity={0.6}
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="0;30"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </path>
                  )}
                  
                  {/* Pulse animation */}
                  {connection.style.animation === 'pulse' && (
                    <path
                      d={getConnectionPath(sourceNode, targetNode)}
                      fill="none"
                      stroke={connection.style.color}
                      strokeWidth={connection.style.thickness + 2}
                      opacity={0.3}
                    >
                      <animate
                        attributeName="opacity"
                        values="0.3;0.8;0.3"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </path>
                  )}
                </g>
              );
            })}
          </g>

          {/* Nodes */}
          <g className="nodes">
            {nodes.map(node => {
              const isHighlighted = highlightedNodes.has(node.id);
              const nodeSize = getNodeSize(node.size);
              
              return (
                <g key={node.id}>
                  {/* Node glow effect when highlighted */}
                  {isHighlighted && (
                    <circle
                      cx={node.position.x}
                      cy={node.position.y}
                      r={nodeSize + 8}
                      fill={node.color}
                      opacity={0.3}
                      className="animate-pulse"
                    />
                  )}
                  
                  {/* Main node */}
                  <circle
                    cx={node.position.x}
                    cy={node.position.y}
                    r={nodeSize}
                    fill={node.color}
                    stroke={isHighlighted ? '#ffffff' : node.color}
                    strokeWidth={isHighlighted ? 3 : 1}
                    className="transition-all duration-300 cursor-pointer hover:stroke-white hover:stroke-2"
                    style={{
                      filter: isHighlighted ? `drop-shadow(0 0 10px ${node.color})` : 'none'
                    }}
                  />
                  
                  {/* Node label */}
                  <text
                    x={node.position.x}
                    y={node.position.y + nodeSize + 20}
                    textAnchor="middle"
                    className="text-xs fill-white font-medium"
                    style={{ pointerEvents: 'none' }}
                  >
                    {node.name}
                  </text>
                  
                  {/* Level indicator */}
                  <text
                    x={node.position.x}
                    y={node.position.y + 4}
                    textAnchor="middle"
                    className="text-xs fill-white font-bold"
                    style={{ pointerEvents: 'none' }}
                  >
                    {node.level}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Connection Details Modal */}
      {selectedConnection && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedConnection(null)}>
          <div className="bg-gray-800 rounded-lg p-6 max-w-md mx-4 border border-gray-700" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">Connection Details</h4>
              <button
                onClick={() => setSelectedConnection(null)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-400">From:</span>
                <span className="ml-2 text-white font-medium">
                  {nodes.find(n => n.id === selectedConnection.source)?.name}
                </span>
              </div>
              
              <div>
                <span className="text-sm text-gray-400">To:</span>
                <span className="ml-2 text-white font-medium">
                  {nodes.find(n => n.id === selectedConnection.target)?.name}
                </span>
              </div>
              
              <div>
                <span className="text-sm text-gray-400">Type:</span>
                <span 
                  className="ml-2 px-2 py-1 rounded text-xs font-medium"
                  style={{ 
                    backgroundColor: filters.find(f => f.id === selectedConnection.type)?.color + '20',
                    color: filters.find(f => f.id === selectedConnection.type)?.color
                  }}
                >
                  {filters.find(f => f.id === selectedConnection.type)?.label}
                </span>
              </div>
              
              <div>
                <span className="text-sm text-gray-400">Strength:</span>
                <span className="ml-2 text-white">{selectedConnection.strength}/10</span>
              </div>
              
              <div>
                <span className="text-sm text-gray-400">Description:</span>
                <p className="mt-1 text-white text-sm">{selectedConnection.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 text-xs text-gray-400">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Info size={12} className="mr-1" />
            <span>Hover connections to highlight • Click for details • Drag to pan • Use zoom controls</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsNetwork;