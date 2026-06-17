import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import { colors } from '../theme';

const BG = require('../../assets/bg.png');

// خلفية اللعبة: صورة شارع النوار + تظليل حواف لتوضيح النص + إطار عتيق
// (props محفوظة للتوافق مع بقية الشاشات)
export default function NightSky({ skyline = true, frame = true, moon = true, scrim = 0.35 }) {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Image source={BG} style={StyleSheet.absoluteFill} resizeMode="contain" />

      {/* طبقة تعتيم خفيفة لتحسين قراءة النص */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: `rgba(10,9,7,${scrim})` }]} />

      {/* تظليل الحواف */}
      <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="vig" cx="0.5" cy="0.42" r="0.75">
            <Stop offset="0.55" stopColor="#000000" stopOpacity="0" />
            <Stop offset="1" stopColor="#000000" stopOpacity="0.6" />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#vig)" />
      </Svg>

      {/* إطار عتيق مزدوج */}
      {frame ? (
        <View style={styles.frameOuter} pointerEvents="none">
          <View style={styles.frameInner} pointerEvents="none" />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  frameOuter: {
    position: 'absolute',
    top: 6,
    left: 6,
    right: 6,
    bottom: 6,
    borderWidth: 2,
    borderColor: colors.frame,
    borderRadius: 22,
    opacity: 0.5,
  },
  frameInner: {
    position: 'absolute',
    top: 3,
    left: 3,
    right: 3,
    bottom: 3,
    borderWidth: 1,
    borderColor: colors.frame,
    borderRadius: 19,
    opacity: 0.55,
  },
});
