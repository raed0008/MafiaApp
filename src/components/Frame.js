import React, { useId, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { Corner } from './Ornament';
import { colors, grad, radius as R, shadow } from '../theme';

// لوح مزخرف بإطار نحاسي — يُقاس حسب محتواه (مثل الزر)
// variant: 'plaque' (خشب داكن) | 'parchment' (ورق عتيق) | 'card' | 'plain'
export default function Frame({
  children,
  variant = 'plaque',
  accent,
  rad = R.md,
  padding = 16,
  corners = false,
  glow = false,
  style,
}) {
  const uid = useId().replace(/:/g, '');
  const [size, setSize] = useState({ w: 0, h: 0 });
  const { w, h } = size;

  const fill =
    variant === 'parchment' ? grad.parchment : variant === 'plain' ? null : grad.wood;
  const border = accent || (variant === 'parchment' ? colors.goldDeep : colors.gold);

  return (
    <View
      onLayout={(e) => setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })}
      style={[{ padding }, glow && shadow.card, style]}
    >
      {w > 0 ? (
        <Svg width={w} height={h} style={StyleSheet.absoluteFill}>
          {fill ? (
            <Defs>
              <LinearGradient id={`f-${uid}`} x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={fill[0]} />
                <Stop offset="0.5" stopColor={fill[1]} />
                <Stop offset="1" stopColor={fill[2]} />
              </LinearGradient>
            </Defs>
          ) : null}
          {fill ? <Rect x="2" y="2" width={w - 4} height={h - 4} rx={rad} fill={`url(#f-${uid})`} /> : null}
          <Rect x="2" y="2" width={w - 4} height={h - 4} rx={rad} fill="none" stroke={border} strokeWidth="1.6" />
          <Rect
            x="6"
            y="6"
            width={w - 12}
            height={h - 12}
            rx={Math.max(2, rad - 4)}
            fill="none"
            stroke={border}
            strokeWidth="0.8"
            opacity="0.4"
          />
        </Svg>
      ) : null}

      {corners && w > 0 ? (
        <>
          <View style={[styles.c, { top: -1, left: -1 }]}>
            <Corner position="tl" size={24} color={border} opacity={0.95} />
          </View>
          <View style={[styles.c, { top: -1, right: -1 }]}>
            <Corner position="tr" size={24} color={border} opacity={0.95} />
          </View>
          <View style={[styles.c, { bottom: -1, left: -1 }]}>
            <Corner position="bl" size={24} color={border} opacity={0.95} />
          </View>
          <View style={[styles.c, { bottom: -1, right: -1 }]}>
            <Corner position="br" size={24} color={border} opacity={0.95} />
          </View>
        </>
      ) : null}

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  c: { position: 'absolute' },
});
