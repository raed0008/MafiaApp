import React, { useId } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Circle, G } from 'react-native-svg';
import Icon from './Icon';
import { colors, serif } from '../theme';

// ختم شمعي دائري — للأحكام والحالات المهمّة
export default function Seal({ size = 72, color = colors.blood, icon, label, textColor = '#F3E8D2' }) {
  const uid = useId().replace(/:/g, '');
  const scallops = [];
  const n = 18;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    scallops.push(<Circle key={i} cx={50 + Math.cos(a) * 44} cy={50 + Math.sin(a) * 44} r="6.5" fill={`url(#sd-${uid})`} />);
  }
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} viewBox="0 0 100 100" style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id={`sf-${uid}`} cx="0.42" cy="0.36" r="0.75">
            <Stop offset="0" stopColor={color} stopOpacity="1" />
            <Stop offset="0.7" stopColor={color} stopOpacity="0.92" />
            <Stop offset="1" stopColor="#000000" stopOpacity="0.35" />
          </RadialGradient>
          <RadialGradient id={`sd-${uid}`} cx="0.5" cy="0.5" r="0.5">
            <Stop offset="0" stopColor={color} />
            <Stop offset="1" stopColor="#000000" stopOpacity="0.6" />
          </RadialGradient>
        </Defs>
        <G opacity="0.95">{scallops}</G>
        <Circle cx="50" cy="50" r="42" fill={`url(#sf-${uid})`} />
        <Circle cx="50" cy="50" r="34" fill="none" stroke="#000000" strokeOpacity="0.25" strokeWidth="1.4" />
        <Circle cx="50" cy="50" r="36" fill="none" stroke={colors.goldLight} strokeOpacity="0.35" strokeWidth="1" />
      </Svg>
      <View style={styles.center}>
        {icon ? <Icon name={icon} size={size * 0.34} color={textColor} /> : null}
        {label ? <Text style={[styles.label, { color: textColor, fontSize: size * 0.2 }]}>{label}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  label: { fontFamily: serif, letterSpacing: 1, marginTop: 1, textAlign: 'center' },
});
