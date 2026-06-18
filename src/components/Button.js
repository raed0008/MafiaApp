import React, { useId, useState } from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Path, Circle, G } from 'react-native-svg';
import Icon from './Icon';
import * as feedback from '../feedback';
import { colors, font, display, shadow } from '../theme';

// لوح معدني عتيق مشطوف الزوايا (octagon) بمسامير نحاسية وحوافّ بارزة
const VARIANTS = {
  primary: { grad: ['#A8504A', '#7E2E2A', '#481817'], edge: '#D98A7E', outline: '#1E0A0A', rivet: '#E7B59C', text: '#F4E9D6' },
  danger: { grad: ['#B14B45', '#7A2926', '#3E1413'], edge: '#E07A6E', outline: '#1E0909', rivet: '#E7B59C', text: '#F8EDDB' },
  gold: { grad: ['#E8D4A4', '#C2AA7E', '#8A7142'], edge: '#F6EAC6', outline: '#4A3A1C', rivet: '#7A6233', text: '#2A1E0C' },
  dark: { grad: ['#33291C', '#241A11', '#130C06'], edge: '#6A5638', outline: '#070504', rivet: '#8C7345', text: '#E7DAC0' },
};
VARIANTS.ghost = VARIANTS.dark;
VARIANTS.town = VARIANTS.dark;

const H = 60;
const C = 12; // مقدار شطف الزاوية

export default function Button({ title, onPress, variant = 'primary', disabled, style, icon }) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const uid = useId().replace(/:/g, '');
  const [w, setW] = useState(0);

  const plate = (W) => {
    const out = `M${C},2 L${W - C},2 L${W - 2},${C} L${W - 2},${H - C} L${W - C},${H - 2} L${C},${H - 2} L2,${H - C} L2,${C} Z`;
    const ins = `M${C + 4},7 L${W - C - 4},7 L${W - 7},${C + 2} L${W - 7},${H - C - 2} L${W - C - 4},${H - 7} L${C + 4},${H - 7} L7,${H - C - 2} L7,${C + 2} Z`;
    const top = `M${C + 5},8 L${W - C - 5},8`;
    return { out, ins, top };
  };
  const p = w > 0 ? plate(w) : null;
  const rivetXs = w > 0 ? [C + 4, w - C - 4] : [];

  const handlePress = (e) => {
    feedback.tap();
    onPress?.(e);
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      onLayout={(e) => setW(e.nativeEvent.layout.width)}
      style={({ pressed }) => [
        styles.base,
        !disabled && shadow.soft,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      {p ? (
        <Svg width={w} height={H} style={StyleSheet.absoluteFill}>
          <Defs>
            <LinearGradient id={`g-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={v.grad[0]} />
              <Stop offset="0.5" stopColor={v.grad[1]} />
              <Stop offset="1" stopColor={v.grad[2]} />
            </LinearGradient>
          </Defs>
          <Path d={p.out} fill={`url(#g-${uid})`} stroke={v.outline} strokeWidth="2" />
          <Path d={p.ins} fill="none" stroke={v.edge} strokeWidth="1" opacity="0.5" />
          <Path d={p.top} stroke="#FFFFFF" strokeWidth="1.4" opacity="0.18" strokeLinecap="round" />
          <G>
            {rivetXs.map((rx, i) => (
              <G key={i}>
                <Circle cx={rx} cy={H / 2} r="2.6" fill={v.rivet} opacity="0.85" />
                <Circle cx={rx} cy={H / 2 - 0.8} r="1" fill="#FFFFFF" opacity="0.4" />
              </G>
            ))}
          </G>
        </Svg>
      ) : null}

      <View style={styles.content} pointerEvents="none">
        {icon ? <Icon name={icon} size={22} color={v.text} style={styles.icon} /> : null}
        <Text style={[styles.text, { color: v.text }]} numberOfLines={1}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { height: H, justifyContent: 'center' },
  pressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
  disabled: { opacity: 0.4 },
  content: { ...StyleSheet.absoluteFillObject, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  icon: { position: 'absolute', left: 24 },
  text: {
    fontSize: font.body + 5,
    fontFamily: display,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
