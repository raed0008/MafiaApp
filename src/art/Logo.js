import React from 'react';
import Svg, { Defs, RadialGradient, LinearGradient, Stop, Circle, Ellipse, Path, Rect, G, ClipPath } from 'react-native-svg';
import { colors } from '../theme';

// شعار اللعبة بطابع نوار عتيق باهت: شخصية بقبعة وقناع أمام قمر أحمر، داخل إطار بيج
export default function Logo({ size = 170 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 170 170">
      <Defs>
        <LinearGradient id="lring" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#D4BE92" />
          <Stop offset="1" stopColor="#8C7850" />
        </LinearGradient>
        <RadialGradient id="lred" cx="0.5" cy="0.5" r="0.5">
          <Stop offset="0" stopColor="#7C2A28" stopOpacity="0.9" />
          <Stop offset="1" stopColor="#3A1414" stopOpacity="0.2" />
        </RadialGradient>
        <RadialGradient id="lmoon" cx="0.42" cy="0.4" r="0.7">
          <Stop offset="0" stopColor="#C8B68C" />
          <Stop offset="1" stopColor="#7E6E48" />
        </RadialGradient>
        <LinearGradient id="lbg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#241312" />
          <Stop offset="1" stopColor="#0B0A08" />
        </LinearGradient>
        <ClipPath id="lclip">
          <Circle cx="85" cy="85" r="74" />
        </ClipPath>
      </Defs>

      <Circle cx="85" cy="85" r="82" fill="url(#lring)" />
      <Circle cx="85" cy="85" r="74" fill="url(#lbg)" />

      <G clipPath="url(#lclip)">
        {/* هالة حمراء + قمر */}
        <Circle cx="100" cy="58" r="60" fill="url(#lred)" />
        <Circle cx="116" cy="52" r="26" fill="url(#lmoon)" opacity="0.9" />
        <Circle cx="104" cy="43" r="24" fill="#241312" opacity="0.55" />

        {/* أفق مدينة */}
        <G fill="#080605" opacity="0.95">
          <Path d="M10,170 L10,108 L26,108 L26,90 L40,90 L40,112 L54,112 L54,96 L66,96 L66,170 Z" />
          <Path d="M104,170 L104,100 L120,100 L120,86 L132,86 L132,104 L150,104 L150,170 Z" />
        </G>

        {/* الشخصية */}
        <Path d="M22,170 C24,128 50,112 85,112 C120,112 146,128 148,170 Z" fill="#0C0B09" />
        <Path d="M70,114 L85,134 L100,114 L94,111 L85,120 L76,111 Z" fill="#CFC4AC" />
        <Path d="M81,118 L89,118 L94,150 L85,158 L76,150 Z" fill={colors.blood} />
        <Circle cx="85" cy="80" r="26" fill="#171410" />
        {/* قبعة */}
        <Path d="M55,62 C58,40 70,33 85,33 C100,33 112,40 115,62 Z" fill="#0A0907" />
        <Ellipse cx="85" cy="62" rx="44" ry="10" fill="#070605" />
        <Rect x="59" y="55" width="52" height="6" rx="2" fill={colors.frame} opacity="0.85" />
        {/* عيون باهتة */}
        <Ellipse cx="75" cy="80" rx="4.5" ry="2.8" fill={colors.frame} opacity="0.85" />
        <Ellipse cx="95" cy="80" rx="4.5" ry="2.8" fill={colors.frame} opacity="0.85" />
      </G>

      <Circle cx="85" cy="85" r="82" fill="none" stroke="#E5D6B0" strokeWidth="1" opacity="0.4" />
    </Svg>
  );
}
