# Circuit Background Configuration Guide

This guide explains how to configure and switch between the 2D (Canvas) and 3D (Three.js) versions of the Circuit Background component.

## Quick Switch

### Method 1: Environment Variable (Recommended)

Add to your `.env` file:

```bash
# Use 3D version (Three.js) - set to 'true' or 'false'
# Default is 'true' (3D version enabled)
REACT_APP_CIRCUIT_BG_3D=true

# Optional: Customize appearance
REACT_APP_CIRCUIT_BG_OPACITY=0.2
REACT_APP_CIRCUIT_BG_SPEED=0.5
REACT_APP_CIRCUIT_BG_DENSITY=1.2
REACT_APP_CIRCUIT_BG_FLOATING=true
REACT_APP_CIRCUIT_BG_VERTICAL_SCROLL=true
REACT_APP_CIRCUIT_BG_DEPTH=1000
```

### Method 2: Code Configuration

Edit `src/config/env.js`:

```javascript
circuitBackground: {
  use3D: true,   // Default: true (3D version). Set to false for 2D version
  opacity: 0.2,
  speed: 0.5,
  density: 1.2,
  floating: true,
  verticalScroll: true,
  depth: 1000,   // Only used in 3D version
}
```

**Note:** Component default parameters match these config values, so behavior is consistent whether used through `App.js` or directly.

## Configuration Options

### Common Options (Both 2D and 3D)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `opacity` | number | `0.2` | Overall opacity of the animation (0-1). Lower values = more subtle background |
| `speed` | number | `0.5` | Animation speed multiplier. `1.0` = normal speed, `0.5` = half speed, `2.0` = double speed |
| `density` | number | `1.2` | Node density multiplier. `0.5` = sparse, `1.0` = normal, `2.0` = dense |
| `floating` | boolean | `true` | Enable floating/breathing animation for nodes |
| `verticalScroll` | boolean | `true` | Enable continuous vertical scrolling animation |

### 3D-Specific Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `depth` | number | `1000` | 3D depth of the scene. Higher values = more depth, lower = flatter |

## Examples

### Subtle Background (Low Performance Impact)
```javascript
opacity={0.1}
speed={0.3}
density={0.8}
floating={true}
verticalScroll={false}
```

### Dynamic Background (High Visual Impact)
```javascript
opacity={0.4}
speed={1.0}
density={1.5}
floating={true}
verticalScroll={true}
```

### Static Background (No Animation)
```javascript
opacity={0.2}
speed={0}
density={1.0}
floating={false}
verticalScroll={false}
```

### 3D Deep Scene
```javascript
// In 3D mode
depth={2000}  // Very deep 3D scene
opacity={0.25}
density={1.0}
```

### 3D Shallow Scene
```javascript
// In 3D mode
depth={500}  // Flatter 3D scene
opacity={0.2}
density={1.2}
```

## Differences Between 2D and 3D

### 2D Version (Canvas)
- ✅ Lower performance overhead
- ✅ Better browser compatibility
- ✅ Simpler rendering
- ✅ Uses HTML5 Canvas API
- ❌ No depth perception
- ❌ Limited 3D effects

### 3D Version (Three.js)
- ✅ True 3D depth and perspective
- ✅ More immersive visual effects
- ✅ Better parallax with scrolling
- ✅ Modern WebGL rendering
- ❌ Higher performance overhead
- ❌ Requires WebGL support

## Performance Considerations

### For Better Performance:
- Lower `opacity` (less rendering)
- Lower `speed` (fewer updates)
- Lower `density` (fewer nodes/edges)
- Disable `floating` if not needed
- Use 2D version on low-end devices

### For Maximum Visual Impact:
- Higher `opacity` (more visible)
- Higher `speed` (more dynamic)
- Higher `density` (more complex)
- Enable all animations
- Use 3D version for modern devices

## Theme Integration

Both versions read CSS variables for colors:

- `--circuit-node-color` - Node color (default: `rgba(26, 54, 93, 0.6)`)
- `--circuit-edge-color` - Edge/line color (default: `rgba(26, 54, 93, 0.5)`)
- `--circuit-signal-color` - Signal/pulse color (default: `rgba(14, 165, 233, 0.9)`)

These can be customized in your CSS/SCSS files to match your theme.

## Troubleshooting

### 3D Version Not Showing
- Check browser WebGL support
- Verify `REACT_APP_CIRCUIT_BG_3D=true` in `.env` (or `use3D: true` in `config.env.js`)
- Check browser console for errors
- 3D is the default, so if you see 2D, check your config settings

### Performance Issues
- Reduce `density` value
- Lower `opacity`
- Disable `floating` or `verticalScroll`
- Switch to 2D version

### Colors Not Matching Theme
- Verify CSS variables are defined
- Check that CSS variables are accessible to the component
- Use browser DevTools to inspect computed styles

