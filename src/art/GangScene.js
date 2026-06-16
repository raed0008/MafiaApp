import React from 'react';
import Svg, { Defs, RadialGradient, LinearGradient, Stop, Circle, Ellipse, Path, G } from 'react-native-svg';
import { colors } from '../theme';

const W = 360;
const Hh = 250;
const BASE = 250; // أرضية المشهد

// رجل عصابة بقبعة (إحداثيات محلية: صندوق 100×130، القاعدة عند 130)
function Gangster({ cx, scale, fill, leader }) {
  const s = scale;
  const x = cx - 50 * s;
  const y = BASE - 130 * s;
  return (
    <G transform={`translate(${x}, ${y}) scale(${s})`}>
      <Path d="M3,130 C6,90 30,78 50,78 C70,78 94,90 97,130 Z" fill={fill} />
      <Circle cx="50" cy="56" r="20" fill={fill} />
      <Path d="M28,44 C30,23 40,17 50,17 C60,17 70,23 72,44 Z" fill={fill} />
      <Ellipse cx="50" cy="44" rx="33" ry="7.5" fill={fill} />
      {leader ? (
        <G>
          <Path d="M40,80 L50,98 L60,80 L55,77 L50,85 L45,77 Z" fill="#CFC4AC" />
          <Path d="M47,84 L53,84 L57,120 L50,128 L43,120 Z" fill={colors.blood} />
          <Ellipse cx="43" cy="56" rx="3.4" ry="2.2" fill="#2A2622" />
          <Ellipse cx="57" cy="56" rx="3.4" ry="2.2" fill="#2A2622" />
        </G>
      ) : null}
    </G>
  );
}

// مشهد العصابة: قمر + صفّ من الرجال بقبعات، الزعيم في المنتصف
export default function GangScene({ width = 340 }) {
  const height = (Hh / W) * width;
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${W} ${Hh}`}>
      <Defs>
        <RadialGradient id="gmoon" cx="0.42" cy="0.4" r="0.7">
          <Stop offset="0" stopColor="#D8CBA6" />
          <Stop offset="1" stopColor="#8A7A52" />
        </RadialGradient>
        <RadialGradient id="gred" cx="0.5" cy="0.5" r="0.5">
          <Stop offset="0" stopColor="#7C2A28" stopOpacity="0.5" />
          <Stop offset="1" stopColor="#5E2020" stopOpacity="0" />
        </RadialGradient>
        <LinearGradient id="gfade" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0.7" stopColor="#0C0B09" stopOpacity="0" />
          <Stop offset="1" stopColor="#0C0B09" stopOpacity="0.9" />
        </LinearGradient>
      </Defs>

      {/* هالة + قمر */}
      <Circle cx="95" cy="78" r="120" fill="url(#gred)" />
      <Circle cx="92" cy="70" r="38" fill="url(#gmoon)" opacity="0.92" />
      <Circle cx="78" cy="58" r="36" fill="#100C0A" opacity="0.5" />

      {/* الصف الخلفي (أصغر وأغمق) */}
      <Gangster cx={55} scale={0.62} fill="#0A0907" />
      <Gangster cx={120} scale={0.66} fill="#0C0B08" />
      <Gangster cx={245} scale={0.66} fill="#0C0B08" />
      <Gangster cx={305} scale={0.6} fill="#0A0907" />
      {/* الصف الأوسط */}
      <Gangster cx={160} scale={0.78} fill="#121009" />
      <Gangster cx={215} scale={0.78} fill="#121009" />
      {/* الزعيم */}
      <Gangster cx={185} scale={1.05} fill="#17130D" leader />

      {/* تلاشي سفلي ناعم */}
      <Path d={`M0,0 H${W} V${Hh} H0 Z`} fill="url(#gfade)" />
    </Svg>
  );
}
