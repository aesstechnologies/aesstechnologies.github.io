import React, { useEffect, useRef } from 'react';

/**
 * Circuit Background Animation Component
 * Creates an animated network/circuit board pattern with nodes, edges, and electric signals
 * 
 * @param {string} className - Additional CSS classes
 * @param {number} opacity - Opacity of the animation (0-1)
 * @param {number} speed - Animation speed multiplier
 * @param {number} density - Node density multiplier (0.5 = sparse, 1 = normal, 2 = dense)
 * @param {boolean} floating - Enable floating node movement
 * @param {boolean} verticalScroll - Enable vertical scrolling animation
 */
const CircuitBackground = ({ 
  className = '', 
  opacity = 0.3, 
  speed = 1,
  density = 1,
  floating = true,
  verticalScroll = true
}) => {
  const canvasRef = useRef(null);
  const nodesRef = useRef([]);
  const edgesRef = useRef([]);
  const signalsRef = useRef([]);
  const scrollOffsetRef = useRef(0);
  const nodeFloatOffsetsRef = useRef([]);
  const globalPulsePhaseRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    // Get theme-aware colors from CSS variables
    const getThemeColors = () => {
      const computedStyle = getComputedStyle(document.body);
      return {
        nodeColor: computedStyle.getPropertyValue('--circuit-node-color').trim() || 'rgba(26, 54, 93, 0.6)',
        edgeColor: computedStyle.getPropertyValue('--circuit-edge-color').trim() || 'rgba(26, 54, 93, 0.5)',
        signalColor: computedStyle.getPropertyValue('--circuit-signal-color').trim() || 'rgba(14, 165, 233, 0.9)',
      };
    };

    // Set canvas size - use clientWidth/clientHeight to avoid scrollbar overflow
    const resizeCanvas = () => {
      // Use document.documentElement.clientWidth/Height to exclude scrollbars
      // This prevents horizontal overflow
      canvas.width = document.documentElement.clientWidth || window.innerWidth;
      canvas.height = document.documentElement.clientHeight || window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Node class
    class Node {
      constructor(x, y, floatOffset) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 3 + 2;
        this.isHollow = Math.random() > 0.6;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.floatPhase = Math.random() * Math.PI * 2;
        this.floatSpeed = 0.001 + Math.random() * 0.002;
        this.floatAmplitude = 5 + Math.random() * 10;
        this.floatOffset = floatOffset;
      }

      update(floatingEnabled, globalPhase) {
        // Harmonized pulse with global phase
        this.pulsePhase = globalPhase + this.floatOffset;
        
        // Update floating movement - full sine wave cycle for continuous motion
        if (floatingEnabled) {
          this.floatPhase += this.floatSpeed * speed;
          // Keep phase in range [0, 2π] for continuous loop
          if (this.floatPhase >= Math.PI * 2) {
            this.floatPhase -= Math.PI * 2;
          }
          // Full back-and-forth displacement
          const floatY = Math.sin(this.floatPhase) * this.floatAmplitude;
          const floatX = Math.cos(this.floatPhase * 0.7) * (this.floatAmplitude * 0.5);
          this.y = this.baseY + floatY;
          this.x = this.baseX + floatX;
        } else {
          this.y = this.baseY;
          this.x = this.baseX;
        }
      }

      getPosition(scrollOffset) {
        return {
          x: this.x,
          y: this.y + scrollOffset
        };
      }

      draw(ctx, opacity, globalPhase, scrollOffset, nodeColor) {
        const pos = this.getPosition(scrollOffset);
        ctx.beginPath();
        // Harmonized pulsation
        const pulse = Math.sin(globalPhase + this.floatOffset);
        const nodeOpacity = opacity * (0.5 + pulse * 0.3);
        const nodeRadius = this.radius * (1 + pulse * 0.2);
        
        // Parse RGBA color and apply opacity
        const rgbaMatch = nodeColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (rgbaMatch) {
          const r = rgbaMatch[1];
          const g = rgbaMatch[2];
          const b = rgbaMatch[3];
          const baseOpacity = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1;
          const finalOpacity = baseOpacity * nodeOpacity;
          
          if (this.isHollow) {
            ctx.arc(pos.x, pos.y, nodeRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${finalOpacity})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          } else {
            ctx.arc(pos.x, pos.y, nodeRadius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalOpacity})`;
            ctx.fill();
          }
        } else {
          // Fallback to original color if parsing fails
          if (this.isHollow) {
            ctx.arc(pos.x, pos.y, nodeRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(26, 54, 93, ${nodeOpacity})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          } else {
            ctx.arc(pos.x, pos.y, nodeRadius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(26, 54, 93, ${nodeOpacity})`;
            ctx.fill();
          }
        }
      }
    }

    // Edge class - PCB-like routing
    class Edge {
      constructor(node1, node2) {
        this.node1 = node1;
        this.node2 = node2;
        this.length = Math.sqrt(
          Math.pow(node2.baseX - node1.baseX, 2) + Math.pow(node2.baseY - node1.baseY, 2)
        );
        this.active = Math.random() > 0.7; // Some edges are active (show signals)
        
        // Calculate PCB-like path (Manhattan routing with some curves)
        this.pathPoints = this.calculatePCBRoute();
      }

      calculatePCBRoute() {
        const points = [];
        const dx = this.node2.baseX - this.node1.baseX;
        const dy = this.node2.baseY - this.node1.baseY;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);
        
        // Determine routing style: horizontal-first or vertical-first (PCB-like)
        const horizontalFirst = absDx > absDy;
        
        points.push({ x: this.node1.baseX, y: this.node1.baseY });
        
        if (horizontalFirst) {
          // Horizontal then vertical (L-shaped PCB routing)
          const midX = this.node1.baseX + dx * 0.5;
          
          // Add intermediate point for longer routes (more realistic PCB routing)
          if (this.length > 150) {
            const intermediateY = this.node1.baseY + dy * 0.3;
            points.push({ x: midX, y: this.node1.baseY });
            points.push({ x: midX, y: intermediateY });
            points.push({ x: midX, y: this.node2.baseY });
          } else {
            points.push({ x: midX, y: this.node1.baseY });
            points.push({ x: midX, y: this.node2.baseY });
          }
          
          points.push({ x: this.node2.baseX, y: this.node2.baseY });
        } else {
          // Vertical then horizontal
          const midY = this.node1.baseY + dy * 0.5;
          
          if (this.length > 150) {
            const intermediateX = this.node1.baseX + dx * 0.3;
            points.push({ x: this.node1.baseX, y: midY });
            points.push({ x: intermediateX, y: midY });
            points.push({ x: this.node2.baseX, y: midY });
          } else {
            points.push({ x: this.node1.baseX, y: midY });
            points.push({ x: this.node2.baseX, y: midY });
          }
          
          points.push({ x: this.node2.baseX, y: this.node2.baseY });
        }
        
        return points;
      }

      draw(ctx, opacity, globalPhase, scrollOffset, edgeColor) {
        ctx.beginPath();
        
        // Harmonized pulsation for edges
        const pulse = Math.sin(globalPhase);
        const edgeOpacity = opacity * (0.4 + pulse * 0.2);
        const lineWidth = 1 + pulse * 0.3;
        
        const node1Pos = this.node1.getPosition(scrollOffset);
        const node2Pos = this.node2.getPosition(scrollOffset);
        
        if (this.pathPoints.length === 0) {
          // Fallback to straight line
          ctx.moveTo(node1Pos.x, node1Pos.y);
          ctx.lineTo(node2Pos.x, node2Pos.y);
        } else {
          // Draw PCB-like path
          ctx.moveTo(node1Pos.x, node1Pos.y);
          
          for (let i = 1; i < this.pathPoints.length; i++) {
            const point = this.pathPoints[i];
            // Adjust path points for current node positions (accounting for floating)
            const adjustedX = point.x + (this.node1.x - this.node1.baseX);
            const adjustedY = point.y + scrollOffset;
            ctx.lineTo(adjustedX, adjustedY);
          }
          
          ctx.lineTo(node2Pos.x, node2Pos.y);
        }
        
        // Parse RGBA color and apply opacity
        const rgbaMatch = edgeColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (rgbaMatch) {
          const r = rgbaMatch[1];
          const g = rgbaMatch[2];
          const b = rgbaMatch[3];
          const baseOpacity = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1;
          const finalOpacity = baseOpacity * edgeOpacity;
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${finalOpacity})`;
        } else {
          ctx.strokeStyle = `rgba(26, 54, 93, ${edgeOpacity})`;
        }
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }
    }

    // Signal class (electric pulse traveling along edge)
    class Signal {
      constructor(edge, startTime = 0) {
        this.edge = edge;
        this.progress = 0;
        this.speed = 0.005 * speed;
        this.size = 4;
        this.startTime = startTime;
        this.direction = 1; // 1 for forward, -1 for backward (ping-pong)
      }

      update() {
        this.progress += this.speed * this.direction;
        
        // Ping-pong: reverse direction at ends
        if (this.progress >= 1) {
          this.progress = 1;
          this.direction = -1;
        } else if (this.progress <= 0) {
          this.progress = 0;
          this.direction = 1;
        }
      }

      draw(ctx, opacity, globalPhase, scrollOffset, signalColor) {
        if (!this.edge.active) return;
        
        // Harmonized pulsation for signals
        const pulse = Math.sin(globalPhase);
        const signalOpacity = opacity * (1 + pulse * 0.3);
        const signalSize = this.size * (1 + pulse * 0.2);

        // Calculate position along the PCB path
        const pathPoints = this.edge.pathPoints;
        if (!pathPoints || pathPoints.length === 0) return;

        // Calculate total path length
        let totalLength = 0;
        const segmentLengths = [];
        for (let i = 0; i < pathPoints.length - 1; i++) {
          const dx = pathPoints[i + 1].x - pathPoints[i].x;
          const dy = pathPoints[i + 1].y - pathPoints[i].y;
          const length = Math.sqrt(dx * dx + dy * dy);
          segmentLengths.push(length);
          totalLength += length;
        }

        // Find position along path based on progress
        const targetDistance = this.progress * totalLength;
        let currentDistance = 0;
        let segmentIndex = 0;
        let segmentProgress = 0;

        for (let i = 0; i < segmentLengths.length; i++) {
          if (currentDistance + segmentLengths[i] >= targetDistance) {
            segmentIndex = i;
            segmentProgress = (targetDistance - currentDistance) / segmentLengths[i];
            break;
          }
          currentDistance += segmentLengths[i];
        }

        // Get current and next point in the segment
        const p1 = pathPoints[segmentIndex];
        const p2 = pathPoints[segmentIndex + 1];
        
        // Account for node floating/scroll offset
        const node1OffsetX = this.edge.node1.x - this.edge.node1.baseX;
        
        const x1 = p1.x + node1OffsetX;
        const y1 = p1.y + scrollOffset;
        const x2 = p2.x + node1OffsetX;
        const y2 = p2.y + scrollOffset;

        // Calculate signal position
        const x = x1 + (x2 - x1) * segmentProgress;
        const y = y1 + (y2 - y1) * segmentProgress;

        // Parse signal color from CSS variable
        const rgbaMatch = signalColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        let r = 14, g = 165, b = 233, baseOpacity = 0.9;
        if (rgbaMatch) {
          r = parseInt(rgbaMatch[1]);
          g = parseInt(rgbaMatch[2]);
          b = parseInt(rgbaMatch[3]);
          baseOpacity = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 0.9;
        }

        // Draw glowing signal with pulsation
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, signalSize * 2);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${Math.min(baseOpacity * signalOpacity * 2, 1)})`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${baseOpacity * signalOpacity})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.beginPath();
        ctx.arc(x, y, signalSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw trail along the path
        const trailLength = 0.15;
        const trailStartProgress = Math.max(0, this.progress - trailLength);
        const trailStartDistance = trailStartProgress * totalLength;
        
        // Find trail start position
        let trailDistance = 0;
        let trailSegmentIndex = 0;
        let trailSegmentProgress = 0;

        for (let i = 0; i < segmentLengths.length; i++) {
          if (trailDistance + segmentLengths[i] >= trailStartDistance) {
            trailSegmentIndex = i;
            trailSegmentProgress = (trailStartDistance - trailDistance) / segmentLengths[i];
            break;
          }
          trailDistance += segmentLengths[i];
        }

        const trailP1 = pathPoints[trailSegmentIndex];
        const trailP2 = pathPoints[trailSegmentIndex + 1];
        const trailX1 = trailP1.x + node1OffsetX;
        const trailY1 = trailP1.y + scrollOffset;
        const trailX2 = trailP2.x + node1OffsetX;
        const trailY2 = trailP2.y + scrollOffset;

        const trailX = trailX1 + (trailX2 - trailX1) * trailSegmentProgress;
        const trailY = trailY1 + (trailY2 - trailY1) * trailSegmentProgress;

        const trailGradient = ctx.createLinearGradient(trailX, trailY, x, y);
        trailGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
        trailGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${baseOpacity * signalOpacity * 0.5})`);

        ctx.beginPath();
        ctx.moveTo(trailX, trailY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = trailGradient;
        ctx.lineWidth = 2 + pulse * 0.5;
        ctx.stroke();
      }
    }

    // Initialize nodes with organic, PCB-like distribution
    const initNodes = () => {
      const nodes = [];
      // Base density calculation with multiplier
      const baseDensity = 40000;
      const adjustedDensity = baseDensity / density;
      const nodeCount = Math.floor((canvas.width * canvas.height) / adjustedDensity);
      
      // Initialize float offsets array
      const floatOffsets = [];
      
      // Create clusters of nodes (more organic, PCB-like distribution)
      const clusterCount = Math.floor(nodeCount / 8); // ~8 nodes per cluster
      const nodesPerCluster = Math.ceil(nodeCount / clusterCount);
      
      for (let cluster = 0; cluster < clusterCount; cluster++) {
        // Random cluster center
        const clusterX = Math.random() * canvas.width;
        const clusterY = Math.random() * canvas.height;
        const clusterRadius = 80 + Math.random() * 120; // Variable cluster size
        
        // Distribute nodes within cluster
        const nodesInCluster = cluster === clusterCount - 1 
          ? nodeCount - (cluster * nodesPerCluster) 
          : nodesPerCluster;
        
        for (let i = 0; i < nodesInCluster; i++) {
          // Use polar coordinates for more organic distribution
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * clusterRadius;
          const x = clusterX + Math.cos(angle) * radius;
          const y = clusterY + Math.sin(angle) * radius;
          
          // Ensure nodes stay within canvas bounds
          const finalX = Math.max(20, Math.min(canvas.width - 20, x));
          const finalY = Math.max(20, Math.min(canvas.height - 20, y));
          
          const floatOffset = Math.random() * Math.PI * 2;
          floatOffsets.push(floatOffset);
          nodes.push(new Node(finalX, finalY, floatOffset));
        }
      }
      
      // Add some scattered nodes for more randomness
      const scatteredCount = Math.floor(nodeCount * 0.2);
      for (let i = 0; i < scatteredCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const floatOffset = Math.random() * Math.PI * 2;
        floatOffsets.push(floatOffset);
        nodes.push(new Node(x, y, floatOffset));
      }
      
      nodeFloatOffsetsRef.current = floatOffsets;
      return nodes;
    };

    // Initialize edges (connect 2-5 nodes randomly, PCB-like)
    const initEdges = (nodes) => {
      const edges = [];
      const maxDistance = 250;
      const minDistance = 40;

      // Connect nodes randomly (2-5 connections per node)
      for (let i = 0; i < nodes.length; i++) {
        const node1 = nodes[i];
        const candidates = [];
        
        // Find nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const node2 = nodes[j];
          const dx = Math.abs(node2.baseX - node1.baseX);
          const dy = Math.abs(node2.baseY - node1.baseY);
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance >= minDistance && distance < maxDistance) {
            // Prefer connections that are more horizontal or vertical (PCB-like)
            const alignment = Math.min(dx, dy) / Math.max(dx, dy);
            const score = (1 - alignment) * (1 - distance / maxDistance);
            
            candidates.push({
              node: node2,
              distance,
              score,
              dx,
              dy
            });
          }
        }
        
        // Sort by score and connect 2-5 random candidates
        candidates.sort((a, b) => b.score - a.score);
        const minConnections = 2;
        const maxConnections = Math.min(5, candidates.length);
        const connectionsToMake = Math.floor(Math.random() * (maxConnections - minConnections + 1)) + minConnections;
        
        // Shuffle candidates to add randomness
        const shuffledCandidates = [...candidates].sort(() => Math.random() - 0.5);
        
        let connectionsMade = 0;
        for (let k = 0; k < shuffledCandidates.length && connectionsMade < connectionsToMake; k++) {
          if (shuffledCandidates[k] && Math.random() > 0.3) {
            edges.push(new Edge(node1, shuffledCandidates[k].node));
            connectionsMade++;
          }
        }
      }

      return edges;
    };

    // Initialize signals on active edges
    const initSignals = (edges) => {
      const signals = [];
      edges.forEach((edge, index) => {
        if (edge.active) {
          signals.push(new Signal(edge, index * 0.1));
        }
      });
      return signals;
    };

    // Initialize
    nodesRef.current = initNodes();
    edgesRef.current = initEdges(nodesRef.current);
    signalsRef.current = initSignals(edgesRef.current);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update global pulse phase (harmonized pulsation)
      globalPulsePhaseRef.current += 0.015 * speed;
      if (globalPulsePhaseRef.current >= Math.PI * 2) {
        globalPulsePhaseRef.current -= Math.PI * 2;
      }

      // Update vertical scroll offset (infinite continuous scrolling)
      if (verticalScroll) {
        const scrollSpeed = 0.2 * speed;
        scrollOffsetRef.current += scrollSpeed;
        
        // Reset when scrolled past canvas height (seamless loop)
        if (scrollOffsetRef.current > canvas.height) {
          scrollOffsetRef.current = scrollOffsetRef.current - canvas.height;
        }
      }

      // Update nodes once (for floating movement - no scroll offset here)
      nodesRef.current.forEach(node => {
        node.update(floating, globalPulsePhaseRef.current);
      });

      // Update signals once
      signalsRef.current.forEach(signal => {
        signal.update();
      });

      // Get theme colors
      const themeColors = getThemeColors();
      
      // Helper function to draw the pattern at a specific scroll offset
      const drawPattern = (patternScrollOffset) => {
        // Draw edges (with pulsation)
        edgesRef.current.forEach(edge => edge.draw(ctx, opacity, globalPulsePhaseRef.current, patternScrollOffset, themeColors.edgeColor));

        // Draw signals
        signalsRef.current.forEach(signal => {
          signal.draw(ctx, opacity, globalPulsePhaseRef.current, patternScrollOffset, themeColors.signalColor);
        });

        // Draw nodes (with harmonized pulsation)
        nodesRef.current.forEach(node => node.draw(ctx, opacity, globalPulsePhaseRef.current, patternScrollOffset, themeColors.nodeColor));
      };

      // For infinite scroll: draw pattern above current view
      if (verticalScroll && scrollOffsetRef.current > 0) {
        const aboveOffset = scrollOffsetRef.current - canvas.height;
        drawPattern(aboveOffset);
      }

      // Draw main pattern at current scroll position
      drawPattern(scrollOffsetRef.current);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [opacity, speed, density, floating, verticalScroll]);

  return (
    <canvas
      ref={canvasRef}
      className={`circuit-background ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
  );
};

export default CircuitBackground;


