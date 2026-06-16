import React, { useState } from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import Icon from './Icon';
import { colors, font } from '../theme';

// لوح معدني عتيق مشطوف الزوايا (octagon) بحوافّ بارزة — بنفس ستايل اللعبة
const VARIANTS = {
  primary: {
    grad: ['#9A4340', '#6E2A28', '#46191A'],
    edge: '#C56B62',
    outline: '#240C0C',
    text: '#F2E7D2',
    icon: '#F2E7D2',
  },
  danger: {
    grad: ['#A6423F', '#7A2926', '#4A1817'],
    edge: '#CF6A60',
    outline: '#240B0B',
    text: '#F7ECDA',
    icon: '#F7ECDA',
  },
  dark: {
    grad: ['#2E2922', '#231E17', '#15110C'],
    edge: '#5A4C39',
    outline: '#0A0807',
    text: '#E4DAC6',
    icon: colors.frame,
  },
};
VARIANTS.ghost = VARIANTS.dark;
VARIANTS.town = VARIANTS.dark;

const H = 58;
const C = 11; // مقدار شطف الزاوية

export default function Button({ title, onPress, variant = 'primary', disabled, style, icon }) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const [w, setW] = useState(0);

  const plate = (width) => {
    const W = width;
    const out = `M${C},1 L${W - C},1 L${W - 1},${C} L${W - 1},${H - C} L${W - C},${H - 1} L${C},${H - 1} L1,${H - C} L1,${C} Z`;
    const ins = `M${C + 4},6 L${W - C - 4},6 L${W - 6},${C + 2} L${W - 6},${H - C - 2} L${W - C - 4},${H - 6} L${C + 4},${H - 6} L6,${H - C - 2} L6,${C + 2} Z`;
    return { out, ins };
  };

  const p = w > 0 ? plate(w) : null;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      onLayout={(e) => setW(e.nativeEvent.layout.width)}
      style={({ pressed }) => [
        styles.base,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      {p ? (
        <Svg width={w} height={H} style={StyleSheet.absoluteFill}>
          <Defs>
            <LinearGradient id={`g-${variant}`} x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={v.grad[0]} />
              <Stop offset="0.5" stopColor={v.grad[1]} />
              <Stop offset="1" stopColor={v.grad[2]} />
            </LinearGradient>
          </Defs>
          <Path d={p.out} fill={`url(#g-${variant})`} stroke={v.outline} strokeWidth="2" />
          <Path d={p.ins} fill="none" stroke={v.edge} strokeWidth="1" opacity="0.45" />
        </Svg>
      ) : null}

      <View style={styles.content} pointerEvents="none">
        {icon ? <Icon name={icon} size={22} color={v.icon} style={styles.icon} /> : null}
        <Text style={[styles.text, { color: v.text }]} numberOfLines={1}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { height: H, justifyContent: 'center' },
  pressed: { opacity: 0.82, transform: [{ scale: 0.985 }] },
  disabled: { opacity: 0.4 },
  content: { ...StyleSheet.absoluteFillObject, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  icon: { position: 'absolute', left: 22 },
  text: { fontSize: font.body + 1, fontWeight: '900', letterSpacing: 0.3 },
});
