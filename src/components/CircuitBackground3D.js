import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Circuit Background 3D Animation Component (Three.js)
 * Creates an animated 3D network/circuit board pattern with nodes, edges, and electric signals
 * 
 * @param {string} className - Additional CSS classes
 * @param {number} opacity - Opacity of the animation (0-1)
 * @param {number} speed - Animation speed multiplier
 * @param {number} density - Node density multiplier (0.5 = sparse, 1 = normal, 2 = dense)
 * @param {boolean} floating - Enable floating node movement
 * @param {boolean} verticalScroll - Enable vertical scrolling animation
 * @param {number} depth - 3D depth of the scene (default: 1000)
 */
const CircuitBackground3D = ({ 
  className = '', 
  opacity = 0.2,  // Default matches config.env.js
  speed = 0.5,     // Default matches config.env.js
  density = 1.2,   // Default matches config.env.js
  floating = true,
  verticalScroll = true,
  depth = 1000     // Default matches config.env.js
}) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const nodesRef = useRef([]);
  const edgesRef = useRef([]);
  const signalsRef = useRef([]);
  const scrollOffsetRef = useRef(0);
  const pageScrollOffsetRef = useRef(0);
  const globalPulsePhaseRef = useRef(0);
  const animationIdRef = useRef(null);
  const scrollListenerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Use orthographic camera for 2D-like view but with 3D depth
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.OrthographicCamera(
      -width / 2, width / 2,
      height / 2, -height / 2,
      0.1, depth * 2
    );
    camera.position.z = depth;
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Get theme-aware colors from CSS variables
    const getThemeColors = () => {
      const computedStyle = getComputedStyle(document.body);
      return {
        nodeColor: computedStyle.getPropertyValue('--circuit-node-color').trim() || 'rgba(26, 54, 93, 0.6)',
        edgeColor: computedStyle.getPropertyValue('--circuit-edge-color').trim() || 'rgba(26, 54, 93, 0.5)',
        signalColor: computedStyle.getPropertyValue('--circuit-signal-color').trim() || 'rgba(14, 165, 233, 0.9)',
      };
    };

    // Parse RGBA color string to THREE.Color
    const parseColor = (rgbaString) => {
      if (!rgbaString || typeof rgbaString !== 'string') {
        return new THREE.Color(0.1, 0.21, 0.36); // Default dark blue
      }
      const match = rgbaString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      if (match) {
        const r = parseInt(match[1]) / 255;
        const g = parseInt(match[2]) / 255;
        const b = parseInt(match[3]) / 255;
        return new THREE.Color(r, g, b);
      }
      return new THREE.Color(0.1, 0.21, 0.36); // Default dark blue
    };

    // Node class - 3D sphere
    class Node3D {
      constructor(x, y, z, floatOffset) {
        this.baseX = x;
        this.baseY = y;
        this.baseZ = z;
        this.x = x;
        this.y = y;
        this.z = z;
        this.radius = Math.random() * 3 + 2;
        this.isHollow = Math.random() > 0.6;
        this.floatPhase = Math.random() * Math.PI * 2;
        this.floatSpeed = 0.001 + Math.random() * 0.002;
        this.floatAmplitude = 5 + Math.random() * 10;
        this.floatOffset = floatOffset;
        
        // Create 3D geometry and material
        const geometry = new THREE.SphereGeometry(this.radius, 8, 8);
        const nodeColorParsed = parseColor(getThemeColors().nodeColor);
        const material = new THREE.MeshBasicMaterial({
          color: nodeColorParsed || new THREE.Color(0.1, 0.21, 0.36),
          transparent: true,
          opacity: opacity * 0.6,
          side: THREE.DoubleSide
        });
        
        if (this.isHollow) {
          // For hollow nodes, use wireframe
          material.wireframe = true;
          material.opacity = opacity * 0.4;
        }
        
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(x, y, z);
        scene.add(this.mesh);
      }

      update(floatingEnabled, globalPhase, nodeColor) {
        // Harmonized pulse with global phase
        this.pulsePhase = globalPhase + this.floatOffset;
        
        // Update floating movement
        if (floatingEnabled) {
          this.floatPhase += this.floatSpeed * speed;
          if (this.floatPhase >= Math.PI * 2) {
            this.floatPhase -= Math.PI * 2;
          }
          
          const floatY = Math.sin(this.floatPhase) * this.floatAmplitude;
          const floatX = Math.cos(this.floatPhase * 0.7) * (this.floatAmplitude * 0.5);
          const floatZ = Math.sin(this.floatPhase * 0.5) * (this.floatAmplitude * 0.3);
          
          this.y = this.baseY + floatY;
          this.x = this.baseX + floatX;
          this.z = this.baseZ + floatZ;
        } else {
          this.y = this.baseY;
          this.x = this.baseX;
          this.z = this.baseZ;
        }
        
        // Update position (combine continuous scroll with page scroll)
        const totalScrollOffset = scrollOffsetRef.current + pageScrollOffsetRef.current;
        this.mesh.position.set(this.x, this.y + totalScrollOffset, this.z);
        
        // Update pulsation
        const pulse = Math.sin(this.pulsePhase);
        const scale = 1 + pulse * 0.2;
        this.mesh.scale.set(scale, scale, scale);
        
        // Update opacity and color
        const nodeOpacity = opacity * (0.5 + pulse * 0.3);
        if (this.mesh && this.mesh.material) {
          this.mesh.material.opacity = this.isHollow ? nodeOpacity * 0.6 : nodeOpacity;
          const newColor = parseColor(nodeColor);
          if (newColor && this.mesh.material.color) {
            this.mesh.material.color.copy(newColor);
          }
        }
      }

      getPosition() {
        const totalScrollOffset = scrollOffsetRef.current + pageScrollOffsetRef.current;
        return {
          x: this.x,
          y: this.y + totalScrollOffset,
          z: this.z
        };
      }

      dispose() {
        this.mesh.geometry.dispose();
        this.mesh.material.dispose();
        scene.remove(this.mesh);
      }
    }

    // Edge class - 3D line with PCB-like routing
    class Edge3D {
      constructor(node1, node2) {
        this.node1 = node1;
        this.node2 = node2;
        this.length = Math.sqrt(
          Math.pow(node2.baseX - node1.baseX, 2) + 
          Math.pow(node2.baseY - node1.baseY, 2) +
          Math.pow(node2.baseZ - node1.baseZ, 2)
        );
        this.active = Math.random() > 0.7;
        
        // Calculate PCB-like path points
        this.pathPoints = this.calculatePCBRoute();
        
        // Create 3D line geometry
        this.geometry = new THREE.BufferGeometry();
        const edgeColorParsed = parseColor(getThemeColors().edgeColor);
        this.material = new THREE.LineBasicMaterial({
          color: edgeColorParsed || new THREE.Color(0.1, 0.21, 0.36),
          transparent: true,
          opacity: opacity * 0.4
        });
        
        this.updateGeometry();
        this.line = new THREE.Line(this.geometry, this.material);
        scene.add(this.line);
      }

      calculatePCBRoute() {
        const points = [];
        const dx = this.node2.baseX - this.node1.baseX;
        const dy = this.node2.baseY - this.node1.baseY;
        const dz = this.node2.baseZ - this.node1.baseZ;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);
        
        const horizontalFirst = absDx > absDy;
        
        points.push({ 
          x: this.node1.baseX, 
          y: this.node1.baseY, 
          z: this.node1.baseZ 
        });
        
        if (horizontalFirst) {
          const midX = this.node1.baseX + dx * 0.5;
          if (this.length > 150) {
            const intermediateY = this.node1.baseY + dy * 0.3;
            points.push({ x: midX, y: this.node1.baseY, z: this.node1.baseZ });
            points.push({ x: midX, y: intermediateY, z: this.node1.baseZ + dz * 0.3 });
            points.push({ x: midX, y: this.node2.baseY, z: this.node1.baseZ + dz * 0.5 });
          } else {
            points.push({ x: midX, y: this.node1.baseY, z: this.node1.baseZ });
            points.push({ x: midX, y: this.node2.baseY, z: this.node1.baseZ + dz * 0.5 });
          }
        } else {
          const midY = this.node1.baseY + dy * 0.5;
          if (this.length > 150) {
            const intermediateX = this.node1.baseX + dx * 0.3;
            points.push({ x: this.node1.baseX, y: midY, z: this.node1.baseZ });
            points.push({ x: intermediateX, y: midY, z: this.node1.baseZ + dz * 0.3 });
            points.push({ x: this.node2.baseX, y: midY, z: this.node1.baseZ + dz * 0.5 });
          } else {
            points.push({ x: this.node1.baseX, y: midY, z: this.node1.baseZ });
            points.push({ x: this.node2.baseX, y: midY, z: this.node1.baseZ + dz * 0.5 });
          }
        }
        
        points.push({ 
          x: this.node2.baseX, 
          y: this.node2.baseY, 
          z: this.node2.baseZ 
        });
        
        return points;
      }

      updateGeometry() {
        const positions = [];
        const node1Pos = this.node1.getPosition();
        const node2Pos = this.node2.getPosition();
        
        // Account for node floating offsets
        const node1OffsetX = this.node1.x - this.node1.baseX;
        const node1OffsetY = this.node1.y - this.node1.baseY;
        const node1OffsetZ = this.node1.z - this.node1.baseZ;
        const totalScrollOffset = scrollOffsetRef.current + pageScrollOffsetRef.current;
        
        positions.push(node1Pos.x, node1Pos.y, node1Pos.z);
        
        for (let i = 1; i < this.pathPoints.length - 1; i++) {
          const point = this.pathPoints[i];
          positions.push(
            point.x + node1OffsetX,
            point.y + totalScrollOffset,
            point.z + node1OffsetZ
          );
        }
        
        positions.push(node2Pos.x, node2Pos.y, node2Pos.z);
        
        this.geometry.setAttribute(
          'position',
          new THREE.Float32BufferAttribute(positions, 3)
        );
      }

      update(globalPhase, edgeColor) {
        this.updateGeometry();
        
        // Harmonized pulsation
        const pulse = Math.sin(globalPhase);
        const edgeOpacity = opacity * (0.4 + pulse * 0.2);
        if (this.material) {
          this.material.opacity = edgeOpacity;
          const newColor = parseColor(edgeColor);
          if (newColor && this.material.color) {
            this.material.color.copy(newColor);
          }
        }
      }

      dispose() {
        this.geometry.dispose();
        this.material.dispose();
        scene.remove(this.line);
      }
    }

    // Signal class - 3D glowing particle
    class Signal3D {
      constructor(edge, startTime = 0) {
        this.edge = edge;
        this.progress = Math.random();
        this.speed = 0.005 * speed;
        this.size = 4;
        this.startTime = startTime;
        this.direction = 1;
        
        // Create glowing sphere for signal
        const geometry = new THREE.SphereGeometry(this.size, 8, 8);
        const signalColorParsed = parseColor(getThemeColors().signalColor);
        const material = new THREE.MeshBasicMaterial({
          color: signalColorParsed || new THREE.Color(0.05, 0.65, 0.91),
          transparent: true,
          opacity: opacity
        });
        
        this.mesh = new THREE.Mesh(geometry, material);
        scene.add(this.mesh);
      }

      update() {
        this.progress += this.speed * this.direction;
        
        if (this.progress >= 1) {
          this.progress = 1;
          this.direction = -1;
        } else if (this.progress <= 0) {
          this.progress = 0;
          this.direction = 1;
        }
      }

      draw(globalPhase, signalColor) {
        if (!this.edge.active) {
          this.mesh.visible = false;
          return;
        }
        
        this.mesh.visible = true;
        
        // Harmonized pulsation
        const pulse = Math.sin(globalPhase);
        const signalOpacity = opacity * (1 + pulse * 0.3);
        const signalScale = 1 + pulse * 0.2;
        
        // Calculate position along path
        const pathPoints = this.edge.pathPoints;
        if (!pathPoints || pathPoints.length === 0) return;
        
        // Calculate total path length
        let totalLength = 0;
        const segmentLengths = [];
        for (let i = 0; i < pathPoints.length - 1; i++) {
          const dx = pathPoints[i + 1].x - pathPoints[i].x;
          const dy = pathPoints[i + 1].y - pathPoints[i].y;
          const dz = pathPoints[i + 1].z - pathPoints[i].z;
          const length = Math.sqrt(dx * dx + dy * dy + dz * dz);
          segmentLengths.push(length);
          totalLength += length;
        }
        
        // Find position along path
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
        
        // Get current and next point
        const p1 = pathPoints[segmentIndex];
        const p2 = pathPoints[segmentIndex + 1];
        
        const node1OffsetX = this.edge.node1.x - this.edge.node1.baseX;
        const node1OffsetY = this.edge.node1.y - this.edge.node1.baseY;
        const node1OffsetZ = this.edge.node1.z - this.edge.node1.baseZ;
        const totalScrollOffset = scrollOffsetRef.current + pageScrollOffsetRef.current;
        
        const x1 = p1.x + node1OffsetX;
        const y1 = p1.y + totalScrollOffset;
        const z1 = p1.z + node1OffsetZ;
        const x2 = p2.x + node1OffsetX;
        const y2 = p2.y + totalScrollOffset;
        const z2 = p2.z + node1OffsetZ;
        
        // Calculate signal position
        const x = x1 + (x2 - x1) * segmentProgress;
        const y = y1 + (y2 - y1) * segmentProgress;
        const z = z1 + (z2 - z1) * segmentProgress;
        
        if (this.mesh && this.mesh.material) {
          this.mesh.position.set(x, y, z);
          this.mesh.scale.set(signalScale, signalScale, signalScale);
          this.mesh.material.opacity = signalOpacity;
          const newColor = parseColor(signalColor);
          if (newColor && this.mesh.material.color) {
            this.mesh.material.color.copy(newColor);
          }
        }
      }

      dispose() {
        this.mesh.geometry.dispose();
        this.mesh.material.dispose();
        scene.remove(this.mesh);
      }
    }

    // Initialize nodes with 3D distribution
    const initNodes = () => {
      const nodes = [];
      const baseDensity = 40000;
      const adjustedDensity = baseDensity / density;
      const nodeCount = Math.floor((width * height) / adjustedDensity);
      
      const clusterCount = Math.floor(nodeCount / 8);
      const nodesPerCluster = Math.ceil(nodeCount / clusterCount);
      
      for (let cluster = 0; cluster < clusterCount; cluster++) {
        const clusterX = (Math.random() - 0.5) * width;
        const clusterY = (Math.random() - 0.5) * height;
        const clusterZ = (Math.random() - 0.5) * depth;
        const clusterRadius = 80 + Math.random() * 120;
        
        const nodesInCluster = cluster === clusterCount - 1 
          ? nodeCount - (cluster * nodesPerCluster) 
          : nodesPerCluster;
        
        for (let i = 0; i < nodesInCluster; i++) {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * clusterRadius;
          const phi = Math.random() * Math.PI;
          
          const x = clusterX + Math.sin(phi) * Math.cos(angle) * radius;
          const y = clusterY + Math.sin(phi) * Math.sin(angle) * radius;
          const z = clusterZ + Math.cos(phi) * radius;
          
          const finalX = Math.max(-width / 2 + 20, Math.min(width / 2 - 20, x));
          const finalY = Math.max(-height / 2 + 20, Math.min(height / 2 - 20, y));
          const finalZ = Math.max(-depth / 2, Math.min(depth / 2, z));
          
          const floatOffset = Math.random() * Math.PI * 2;
          nodes.push(new Node3D(finalX, finalY, finalZ, floatOffset));
        }
      }
      
      // Add scattered nodes
      const scatteredCount = Math.floor(nodeCount * 0.2);
      for (let i = 0; i < scatteredCount; i++) {
        const x = (Math.random() - 0.5) * width;
        const y = (Math.random() - 0.5) * height;
        const z = (Math.random() - 0.5) * depth;
        const floatOffset = Math.random() * Math.PI * 2;
        nodes.push(new Node3D(x, y, z, floatOffset));
      }
      
      return nodes;
    };

    // Initialize edges
    const initEdges = (nodes) => {
      const edges = [];
      const maxDistance = 250;
      const minDistance = 40;

      for (let i = 0; i < nodes.length; i++) {
        const node1 = nodes[i];
        const candidates = [];
        
        for (let j = i + 1; j < nodes.length; j++) {
          const node2 = nodes[j];
          const dx = Math.abs(node2.baseX - node1.baseX);
          const dy = Math.abs(node2.baseY - node1.baseY);
          const dz = Math.abs(node2.baseZ - node1.baseZ);
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance >= minDistance && distance < maxDistance) {
            const alignment = Math.min(dx, dy) / Math.max(dx, dy);
            const score = (1 - alignment) * (1 - distance / maxDistance);
            
            candidates.push({
              node: node2,
              distance,
              score,
              dx,
              dy,
              dz
            });
          }
        }
        
        candidates.sort((a, b) => b.score - a.score);
        const minConnections = 2;
        const maxConnections = Math.min(5, candidates.length);
        const connectionsToMake = Math.floor(Math.random() * (maxConnections - minConnections + 1)) + minConnections;
        
        const shuffledCandidates = [...candidates].sort(() => Math.random() - 0.5);
        
        let connectionsMade = 0;
        for (let k = 0; k < shuffledCandidates.length && connectionsMade < connectionsToMake; k++) {
          if (shuffledCandidates[k] && Math.random() > 0.3) {
            edges.push(new Edge3D(node1, shuffledCandidates[k].node));
            connectionsMade++;
          }
        }
      }

      return edges;
    };

    // Initialize signals
    const initSignals = (edges) => {
      const signals = [];
      edges.forEach((edge, index) => {
        if (edge.active) {
          signals.push(new Signal3D(edge, index * 0.1));
        }
      });
      return signals;
    };

    // Handle window scroll for scroll interaction
    const handleScroll = () => {
      if (verticalScroll) {
        const scrollY = window.scrollY || window.pageYOffset;
        pageScrollOffsetRef.current = scrollY * 0.1; // Scale scroll effect
      }
    };

    // Initialize
    nodesRef.current = initNodes();
    edgesRef.current = initEdges(nodesRef.current);
    signalsRef.current = initSignals(edgesRef.current);

    // Add scroll listener
    scrollListenerRef.current = handleScroll;
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle resize
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      
      camera.left = -newWidth / 2;
      camera.right = newWidth / 2;
      camera.top = newHeight / 2;
      camera.bottom = -newHeight / 2;
      camera.updateProjectionMatrix();
      
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      // Safety check - ensure renderer and scene are valid
      if (!renderer || !scene || !camera) {
        return;
      }

      try {
        // Update global pulse phase
        globalPulsePhaseRef.current += 0.015 * speed;
        if (globalPulsePhaseRef.current >= Math.PI * 2) {
          globalPulsePhaseRef.current -= Math.PI * 2;
        }

        // Update vertical scroll offset (continuous scrolling)
        if (verticalScroll) {
          const scrollSpeed = 0.2 * speed;
          scrollOffsetRef.current += scrollSpeed;
          
          // Reset when scrolled past height (seamless loop)
          if (scrollOffsetRef.current > height) {
            scrollOffsetRef.current = scrollOffsetRef.current - height;
          }
        }

        // Get theme colors
        const themeColors = getThemeColors();
        
        // Update nodes
        nodesRef.current.forEach(node => {
          if (node && node.update) {
            node.update(floating, globalPulsePhaseRef.current, themeColors.nodeColor);
          }
        });

        // Update edges
        edgesRef.current.forEach(edge => {
          if (edge && edge.update) {
            edge.update(globalPulsePhaseRef.current, themeColors.edgeColor);
          }
        });

        // Update signals
        signalsRef.current.forEach(signal => {
          if (signal) {
            if (signal.update) signal.update();
            if (signal.draw) signal.draw(globalPulsePhaseRef.current, themeColors.signalColor);
          }
        });

        // Render
        renderer.render(scene, camera);
      } catch (error) {
        console.error('Error in animation loop:', error);
      }
      
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', scrollListenerRef.current);
      
      // Dispose of all Three.js objects
      nodesRef.current.forEach(node => node.dispose());
      edgesRef.current.forEach(edge => edge.dispose());
      signalsRef.current.forEach(signal => signal.dispose());
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (rendererRef.current && container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement);
      }
      
      rendererRef.current?.dispose();
    };
  }, [opacity, speed, density, floating, verticalScroll, depth]);

  return (
    <div
      ref={containerRef}
      className={`circuit-background-3d ${className}`}
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

export default CircuitBackground3D;

