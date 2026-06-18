import React from 'react';
import Svg, { G, Path, Circle, Line, Polygon } from 'react-native-svg';
import { colors } from '../theme';

// ════════ زخارف آرت-ديكو مرسومة بالـ SVG ════════

// زاوية مزخرفة (للأطر) — position: 'tl' | 'tr' | 'br' | 'bl'
export function Corner({ size = 34, color = colors.gold, position = 'tl', opacity = 1, strokeWidth = 1.6 }) {
  const rot = { tl: 0, tr: 90, br: 180, bl: 270 }[position] || 0;
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40" style={{ transform: [{ rotate: `${rot}deg` }] }}>
      <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" opacity={opacity}>
        <Path d="M3,39 L3,13 Q3,3 13,3 L39,3" />
        <Path d="M8,39 L8,15 Q8,8 15,8 L39,8" opacity={0.55} />
        <Path d="M3,3 Q14,6 18,17" opacity={0.7} />
      </G>
      <Polygon points="3,3 10,3 3,10" fill={color} opacity={opacity} />
      <Circle cx="17" cy="17" r="1.9" fill={color} opacity={opacity} />
    </Svg>
  );
}

// فاصل/زهرة أفقية بمركز معيّن
export function Flourish({ width = 150, color = colors.gold, opacity = 0.9 }) {
  return (
    <Svg width={width} height={22} viewBox="0 0 150 22">
      <G stroke={color} strokeWidth={1.4} fill="none" strokeLinecap="round" opacity={opacity}>
        <Path d="M4,11 L54,11" />
        <Path d="M54,11 Q60,11 63,6" />
        <Path d="M96,11 L146,11" />
        <Path d="M96,11 Q90,11 87,6" />
        <Circle cx="63" cy="6" r="1.4" fill={color} />
        <Circle cx="87" cy="6" r="1.4" fill={color} />
      </G>
      {/* معيّن مركزي */}
      <Polygon points="75,3 82,11 75,19 68,11" fill={color} opacity={opacity} />
      <Polygon points="75,7 79,11 75,15 71,11" fill={colors.bg} opacity={opacity} />
    </Svg>
  );
}

// رمز ورق اللعب: 'spade' | 'heart' | 'diamond' | 'club'
export function Suit({ type = 'spade', size = 18, color = colors.gold, opacity = 1 }) {
  const paths = {
    spade: 'M12,2 C12,7 3,9 3,14.5 C3,17.5 6,19 8.5,17.7 C8.2,19.6 7.3,20.6 6,21.5 L18,21.5 C16.7,20.6 15.8,19.6 15.5,17.7 C18,19 21,17.5 21,14.5 C21,9 12,7 12,2 Z',
    heart: 'M12,21 C4,15.5 3,11 3,8 C3,5 5,3 7.5,3 C9.5,3 11,4.3 12,6 C13,4.3 14.5,3 16.5,3 C19,3 21,5 21,8 C21,11 20,15.5 12,21 Z',
    diamond: 'M12,2 L21,12 L12,22 L3,12 Z',
    club: 'M12,2 C14.5,2 16.5,4 16.5,6.5 C16.5,7.4 16.2,8.2 15.8,8.9 C17,8.2 18.6,8.2 19.8,9.2 C21.6,10.7 21.6,13.3 19.8,14.8 C18.3,16 16.2,15.8 15,14.5 C15.3,16.8 16,18.8 17.5,20.5 L6.5,20.5 C8,18.8 8.7,16.8 9,14.5 C7.8,15.8 5.7,16 4.2,14.8 C2.4,13.3 2.4,10.7 4.2,9.2 C5.4,8.2 7,8.2 8.2,8.9 C7.8,8.2 7.5,7.4 7.5,6.5 C7.5,4 9.5,2 12,2 Z',
  };
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d={paths[type] || paths.spade} fill={color} opacity={opacity} />
    </Svg>
  );
}

// أشعّة شمسية ديكو (خلفية للأبطال)
export function Sunburst({ size = 260, color = colors.gold, rays = 28, opacity = 0.12 }) {
  const c = size / 2;
  const items = [];
  for (let i = 0; i < rays; i++) {
    const a = (i / rays) * Math.PI * 2;
    items.push(
      <Line
        key={i}
        x1={c}
        y1={c}
        x2={c + Math.cos(a) * c}
        y2={c + Math.sin(a) * c}
        stroke={color}
        strokeWidth={i % 2 === 0 ? 6 : 2}
        opacity={i % 2 === 0 ? 1 : 0.5}
      />
    );
  }
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} opacity={opacity}>
      {items}
    </Svg>
  );
}
