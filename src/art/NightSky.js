import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Rect,
  Circle,
  Path,
  G,
} from 'react-native-svg';
import { colors } from '../theme';

// نجوم خافتة قليلة
const STARS = [
  [40, 70, 1.3, 0.5], [110, 50, 1.0, 0.4], [180, 95, 1.4, 0.45], [250, 60, 1.1, 0.4],
  [320, 110, 1.2, 0.45], [70, 150, 0.9, 0.3], [300, 175, 1.0, 0.35], [150, 40, 1.0, 0.4],
];

// بقع ملمس (حبيبات فيلم قديم) خافتة
const GRAIN = [
  [50, 300, 1.2], [200, 360, 1.0], [330, 320, 1.3], [90, 480, 1.1], [260, 520, 1.2],
  [150, 600, 1.0], [310, 640, 1.3], [40, 700, 1.1], [220, 730, 1.0], [120, 250, 0.9],
];

// خلفية نوار باهتة: تدرّج دافئ + قمر أحمر غامق + أفق مدينة + تظليل حواف + إطار عتيق
export default function NightSky({ skyline = true, frame = true, moon = true }) {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width="100%" height="100%" viewBox="0 0 390 800" preserveAspectRatio="xMidYMid slice">
        <Defs>
          <LinearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#2A1414" />
            <Stop offset="0.35" stopColor="#180F0D" />
            <Stop offset="1" stopColor={colors.bg} />
          </LinearGradient>
          <RadialGradient id="redGlow" cx="0.5" cy="0.5" r="0.5">
            <Stop offset="0" stopColor="#7C2A28" stopOpacity="0.55" />
            <Stop offset="0.5" stopColor="#5E2020" stopOpacity="0.2" />
            <Stop offset="1" stopColor="#5E2020" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="moon" cx="0.42" cy="0.4" r="0.7">
            <Stop offset="0" stopColor="#C8B68C" />
            <Stop offset="1" stopColor="#7E6E48" />
          </RadialGradient>
          <RadialGradient id="vig" cx="0.5" cy="0.42" r="0.75">
            <Stop offset="0.55" stopColor="#000000" stopOpacity="0" />
            <Stop offset="1" stopColor="#000000" stopOpacity="0.7" />
          </RadialGradient>
        </Defs>

        <Rect x="0" y="0" width="390" height="800" fill="url(#sky)" />

        {/* هالة حمراء غامقة */}
        <Circle cx="285" cy="115" r="175" fill="url(#redGlow)" />
        {/* قمر باهت + ظل هلالي */}
        {moon ? (
          <G>
            <Circle cx="300" cy="105" r="40" fill="url(#moon)" opacity="0.9" />
            <Circle cx="285" cy="92" r="38" fill="#180F0D" opacity="0.55" />
          </G>
        ) : null}

        {/* نجوم */}
        <G fill="#D8C9A6">
          {STARS.map(([x, y, r, o], i) => (
            <Circle key={i} cx={x} cy={y} r={r} opacity={o} />
          ))}
        </G>

        {/* أفق مدينة معتم */}
        {skyline ? (
          <G fill="#070605" opacity="0.97">
            <Path d="M0,800 L0,540 L30,540 L30,495 L64,495 L64,555 L96,555 L96,470 L112,470 L112,430 L142,430 L142,475 L142,800 Z" />
            <Path d="M142,800 L142,520 L178,520 L178,485 L202,485 L202,520 L238,520 L238,560 L268,560 L268,480 L292,480 L292,540 L322,540 L322,800 Z" />
            <Path d="M300,800 L300,560 L332,560 L332,515 L356,515 L356,478 L374,478 L374,525 L390,525 L390,800 Z" />
            <G fill={colors.blood} opacity="0.4">
              <Rect x="40" y="512" width="5" height="7" />
              <Rect x="104" y="446" width="5" height="7" />
              <Rect x="188" y="500" width="5" height="7" />
              <Rect x="276" y="498" width="5" height="7" />
              <Rect x="342" y="532" width="5" height="7" />
            </G>
          </G>
        ) : null}

        {/* حبيبات الملمس القديم */}
        <G fill="#000000" opacity="0.22">
          {GRAIN.map(([x, y, r], i) => (
            <Circle key={`g${i}`} cx={x} cy={y} r={r} />
          ))}
        </G>

        {/* تظليل الحواف (vignette) */}
        <Rect x="0" y="0" width="390" height="800" fill="url(#vig)" />
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
    opacity: 0.55,
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
    opacity: 0.6,
  },
});
