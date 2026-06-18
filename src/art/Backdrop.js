import React, { useId } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Svg, { Defs, RadialGradient, LinearGradient, Stop, Rect } from 'react-native-svg';
import { Corner } from '../components/Ornament';
import { colors } from '../theme';

const BG = require('../../assets/bg.png');

// خلفية اللعبة: صورة النوار في كل الشاشات + تظليل متغيّر حسب الجوّ
//  'room'  — ملهى/ليل: تعتيم دافئ
//  'felt'  — نهار: مسحة خضراء خفيفة
//  'image' — الواجهة: تعتيم أخف لإبراز الصورة
export default function Backdrop({ variant = 'room', frame = true, spotlight = true }) {
  const uid = useId().replace(/:/g, '');
  // تعتيم خفيف فقط حتى تبقى الصورة واضحة كخلفية
  const scrim =
    variant === 'image'
      ? 'rgba(8,7,5,0.12)'
      : variant === 'felt'
      ? 'rgba(10,8,5,0.3)'
      : 'rgba(9,7,5,0.28)'; // room
  const glow = 'rgba(194,170,126,0.10)';

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Image source={BG} style={StyleSheet.absoluteFill} resizeMode="cover" />
      <View style={[StyleSheet.absoluteFill, { backgroundColor: scrim }]} />

      <Svg width="100%" height="100%" style={StyleSheet.absoluteFill} preserveAspectRatio="none">
        <Defs>
          <RadialGradient id={`glow-${uid}`} cx="0.5" cy="0.16" r="0.75">
            <Stop offset="0" stopColor={glow} />
            <Stop offset="1" stopColor={glow.replace(/[\d.]+\)$/, '0)')} />
          </RadialGradient>
          <RadialGradient id={`vig-${uid}`} cx="0.5" cy="0.42" r="0.85">
            <Stop offset="0.62" stopColor="#000000" stopOpacity="0" />
            <Stop offset="1" stopColor="#000000" stopOpacity="0.45" />
          </RadialGradient>
          <LinearGradient id={`floor-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0.68" stopColor="#000000" stopOpacity="0" />
            <Stop offset="1" stopColor="#000000" stopOpacity="0.4" />
          </LinearGradient>
        </Defs>

        {spotlight ? <Rect x="0" y="0" width="100%" height="100%" fill={`url(#glow-${uid})`} /> : null}
        <Rect x="0" y="0" width="100%" height="100%" fill={`url(#floor-${uid})`} />
        <Rect x="0" y="0" width="100%" height="100%" fill={`url(#vig-${uid})`} />
      </Svg>

      {frame ? (
        <>
          <View style={styles.frameOuter} pointerEvents="none">
            <View style={styles.frameInner} pointerEvents="none" />
          </View>
          <View style={[styles.corner, styles.tl]}><Corner position="tl" opacity={0.7} /></View>
          <View style={[styles.corner, styles.tr]}><Corner position="tr" opacity={0.7} /></View>
          <View style={[styles.corner, styles.bl]}><Corner position="bl" opacity={0.7} /></View>
          <View style={[styles.corner, styles.br]}><Corner position="br" opacity={0.7} /></View>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  frameOuter: {
    position: 'absolute',
    top: 7, left: 7, right: 7, bottom: 7,
    borderWidth: 1.5,
    borderColor: colors.frame,
    borderRadius: 20,
    opacity: 0.4,
  },
  frameInner: {
    position: 'absolute',
    top: 3, left: 3, right: 3, bottom: 3,
    borderWidth: 1,
    borderColor: colors.frame,
    borderRadius: 17,
    opacity: 0.5,
  },
  corner: { position: 'absolute' },
  tl: { top: 5, left: 5 },
  tr: { top: 5, right: 5 },
  bl: { bottom: 5, left: 5 },
  br: { bottom: 5, right: 5 },
});
