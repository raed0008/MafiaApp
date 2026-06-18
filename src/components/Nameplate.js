import React, { useId, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Polygon } from 'react-native-svg';
import Icon from './Icon';
import { colors, font, bodyBold, serif } from '../theme';

// شريط/راية بأطراف مشقوقة — لأسماء الأدوار وألقاب الفرق
export function Ribbon({ label, icon, color = colors.gold, textColor = colors.ink, height = 30, big = false, style }) {
  const uid = useId().replace(/:/g, '');
  const [w, setW] = useState(0);
  const H = height;
  const notch = Math.round(H * 0.36);

  const pts = w > 0 ? `0,0 ${w},0 ${w - notch},${H / 2} ${w},${H} 0,${H} ${notch},${H / 2}` : '';
  const hi = w > 0 ? `0,0 ${w},0 ${w - notch},${H / 2} ${notch},${H / 2}` : '';

  return (
    <View
      onLayout={(e) => setW(e.nativeEvent.layout.width)}
      style={[{ height: H, paddingHorizontal: notch + 14, alignItems: 'center', justifyContent: 'center' }, style]}
    >
      {w > 0 ? (
        <Svg width={w} height={H} style={StyleSheet.absoluteFill}>
          <Defs>
            <LinearGradient id={`hl-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.22" />
              <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <Polygon points={pts} fill={color} stroke="#000000" strokeOpacity="0.4" strokeWidth="1" />
          <Polygon points={hi} fill={`url(#hl-${uid})`} />
        </Svg>
      ) : null}
      <View style={styles.row}>
        {icon ? <Icon name={icon} size={H * 0.5} color={textColor} /> : null}
        <Text style={[styles.label, { color: textColor, fontSize: big ? font.body : font.small }]} numberOfLines={1}>
          {label}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row-reverse', alignItems: 'center', gap: 6 },
  label: { fontFamily: serif, letterSpacing: 0.5 },
});
