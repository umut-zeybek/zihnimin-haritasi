/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useState, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { graphData } from '../data/graphData';
import type { NodeData } from '../data/graphData';

interface NetworkGraphProps {
  onNodeClick: (node: NodeData) => void;
  selectedNode: NodeData | null;
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ onNodeClick, selectedNode }) => {
  const fgRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [hoverNode, setHoverNode] = useState<NodeData | null>(null);
  const [mounted, setMounted] = useState(false);

  // Resize handler
  useEffect(() => {
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initial animation
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    if (fgRef.current) {
      // Zoom in animation on load
      fgRef.current.zoom(0.1);
      setTimeout(() => {
        fgRef.current?.zoom(1.2, 2000);
      }, 500);
    }
  }, []);

  // Sync camera when a node is selected from outside (e.g., DetailPanel)
  useEffect(() => {
    if (selectedNode && fgRef.current && typeof (selectedNode as any).x === 'number') {
      fgRef.current.centerAt((selectedNode as any).x, (selectedNode as any).y, 1000);
      fgRef.current.zoom(1.5, 1000);
    }
  }, [selectedNode]);

  const handleNodeHover = useCallback((node: any) => {
    setHoverNode(node || null);
    if (node) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'default';
    }
  }, []);

  const handleNodeClick = useCallback((node: any) => {
    if (node) {
      // Center and zoom slightly on the clicked node
      fgRef.current?.centerAt(node.x, node.y, 1000);
      fgRef.current?.zoom(1.5, 1000);
      onNodeClick(node as NodeData);
    }
  }, [onNodeClick]);

  const paintPointerArea = useCallback((node: any, color: string, ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    // Fiziksel boyutla birebir eşleşmesi için (hover durumundaki genişleme dahil: val * 1.5)
    // Böylece tam gezegenin üzerine gelindiğinde tıklanabilecek.
    ctx.arc(node.x, node.y, node.val * 1.5, 0, 2 * Math.PI, false);
    ctx.fill();
  }, []);

  const paintNode = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const { label, val, color, x, y, icon } = node;
    if (typeof x !== 'number' || typeof y !== 'number' || isNaN(x) || isNaN(y)) return;
    const isHovered = hoverNode?.id === node.id;
    const isConnected = hoverNode && graphData.links.some((l: any) => 
      ((l.source as any).id === hoverNode.id && (l.target as any).id === node.id) ||
      ((l.target as any).id === hoverNode.id && (l.source as any).id === node.id)
    );
    const isCenter = node.id === 'ben';

    const size = isHovered ? val * 1.5 : val;
    const alpha = (hoverNode && !isHovered && !isConnected && !isCenter) ? 0.3 : 1;
    
    ctx.globalAlpha = alpha;

    // Draw glow (Atmosphere)
    ctx.shadowBlur = isHovered ? 25 * globalScale : 15 * globalScale;
    ctx.shadowColor = color;
    
    // Draw Node Body (Planet)
    const gradient = ctx.createRadialGradient(x - size/3, y - size/3, size/10, x, y, size);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(0.3, color);
    gradient.addColorStop(1, '#000000');

    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI, false);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw Icon (Emoji) if present
    if (icon) {
      const iconSize = size * 1.2;
      ctx.font = `${iconSize}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'white';
      ctx.fillText(icon, x, y);
    }

    // Optional ring for the center
    if (isCenter) {
      ctx.beginPath();
      ctx.ellipse(x, y, size * 2.5, size * 0.6, Math.PI / 8, 0, 2 * Math.PI);
      ctx.strokeStyle = `rgba(255, 255, 255, ${isHovered ? 0.5 : 0.2})`;
      ctx.lineWidth = 1.5 / globalScale;
      ctx.stroke();
    }

    // Reset shadow for text
    ctx.shadowBlur = 0;

    // Draw Label
    const fontSize = isHovered ? 14 / globalScale : 12 / globalScale;
    ctx.font = `${isCenter ? 'bold ' : ''}${fontSize}px Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Background for text to make it readable
    const textWidth = ctx.measureText(label).width;
    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); 

    ctx.fillStyle = `rgba(0, 0, 0, ${isHovered ? 0.8 : 0.6})`;
    ctx.fillRect(
      x - bckgDimensions[0] / 2, 
      y + size + fontSize * 0.8 - bckgDimensions[1] / 2, 
      bckgDimensions[0], 
      bckgDimensions[1]
    );

    ctx.fillStyle = 'white';
    ctx.fillText(label, x, y + size + fontSize * 0.8);
    
    ctx.globalAlpha = 1; // Reset alpha
  }, [hoverNode]);

  const paintLink = useCallback((link: any, ctx: CanvasRenderingContext2D) => {
    const start = link.source;
    const end = link.target;
    
    if (!start || !end || start.x === undefined || end.x === undefined) return;

    const isHovered = hoverNode && (start.id === hoverNode.id || end.id === hoverNode.id);
    const isMuted = hoverNode && !isHovered;

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    
    // Link styling
    ctx.lineWidth = isHovered ? 2 : 0.5;
    ctx.strokeStyle = isHovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)';
    
    if (isMuted) {
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    }

    ctx.stroke();
  }, [hoverNode]);

  // BRAVE BROWSER FIX: Brave Shields blocks canvas pixel reading (fingerprinting protection),
  // which breaks react-force-graph's default node click detection.
  // We bypass this by manually calculating the distance between the mouse click and the nodes mathematically.
  const handleWrapperClick = useCallback((e: React.MouseEvent) => {
    if (!fgRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const graphCoords = fgRef.current.screen2GraphCoords(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
    
    let closestNode = null;
    let minDistance = Infinity;
    
    for (const node of graphData.nodes) {
      if (typeof (node as any).x === 'number') {
        const dx = (node as any).x - graphCoords.x;
        const dy = (node as any).y - graphCoords.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Node radius threshold (a bit larger to make it easier to click)
        if (dist <= node.val * 2.5 && dist < minDistance) {
          minDistance = dist;
          closestNode = node;
        }
      }
    }

    if (closestNode) {
      handleNodeClick(closestNode);
    }
  }, [handleNodeClick]);

  // BRAVE BROWSER FIX: Manual Hover detection
  const handleWrapperMouseMove = useCallback((e: React.MouseEvent) => {
    if (!fgRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const graphCoords = fgRef.current.screen2GraphCoords(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
    
    let closestNode = null;
    let minDistance = Infinity;
    
    for (const node of graphData.nodes) {
      if (typeof (node as any).x === 'number') {
        const dx = (node as any).x - graphCoords.x;
        const dy = (node as any).y - graphCoords.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist <= node.val * 2.5 && dist < minDistance) {
          minDistance = dist;
          closestNode = node;
        }
      }
    }
    
    if (closestNode !== hoverNode) {
      setHoverNode(closestNode);
      if (closestNode) {
        document.body.style.cursor = 'pointer';
      } else {
        document.body.style.cursor = 'default';
      }
    }
  }, [hoverNode]);

  if (!mounted) return null;

  return (
    <div 
      className="absolute inset-0 z-10" 
      onClickCapture={handleWrapperClick}
      onMouseMoveCapture={handleWrapperMouseMove}
    >
      <ForceGraph2D
        ref={fgRef as any}
        graphData={graphData}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        nodeRelSize={1}
        onNodeHover={handleNodeHover}
        onNodeClick={handleNodeClick}
        nodeCanvasObject={paintNode}
        nodePointerAreaPaint={paintPointerArea}
        linkCanvasObject={paintLink as any}
        d3AlphaDecay={0.05}
        d3VelocityDecay={0.2}
      />
    </div>
  );
};

export default NetworkGraph;
