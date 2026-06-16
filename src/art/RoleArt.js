import React from 'react';
import Svg, {
  Defs,
  RadialGradient,
  LinearGradient,
  Stop,
  ClipPath,
  Circle,
  Ellipse,
  Path,
  Rect,
  G,
  Line,
} from 'react-native-svg';
import { ROLES } from '../data/roles';

// رسوم مخصّصة لكل دور داخل شارة دائرية — مرسومة بالكامل بـ SVG
export default function RoleArt({ role, size = 120 }) {
  const cfg = ROLES[role] || ROLES.citizen;
  const color = cfg.color;
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Defs>
        <RadialGradient id={`ring-${role}`} cx="0.5" cy="0.35" r="0.75">
          <Stop offset="0" stopColor={color} stopOpacity="0.95" />
          <Stop offset="1" stopColor={color} stopOpacity="0.55" />
        </RadialGradient>
        <LinearGradient id={`inner-${role}`} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#231A14" />
          <Stop offset="1" stopColor="#0E0B08" />
        </LinearGradient>
        <ClipPath id={`clip-${role}`}>
          <Circle cx="60" cy="60" r="51" />
        </ClipPath>
      </Defs>

      {/* الإطار */}
      <Circle cx="60" cy="60" r="58" fill={`url(#ring-${role})`} />
      <Circle cx="60" cy="60" r="51" fill={`url(#inner-${role})`} />

      <G clipPath={`url(#clip-${role})`}>{ART[role] ? ART[role](color) : ART.citizen(color)}</G>

      {/* حلقة خارجية رفيعة */}
      <Circle cx="60" cy="60" r="58" fill="none" stroke={color} strokeWidth="2" opacity="0.9" />
    </Svg>
  );
}

// ——— الرسوم لكل دور ———
const ART = {
  mafia: () => (
    <G>
      <Path d="M18,118 C20,90 38,80 60,80 C82,80 100,90 102,118 Z" fill="#15171C" />
      {/* قميص وربطة حمراء */}
      <Path d="M50,82 L60,96 L70,82 L66,80 L60,86 L54,80 Z" fill="#E8EDF3" />
      <Path d="M57,86 L63,86 L66,108 L60,114 L54,108 Z" fill="#E5484D" />
      {/* الوجه في الظل */}
      <Circle cx="60" cy="56" r="18" fill="#23272F" />
      {/* قبعة الفيدورا */}
      <Path d="M40,44 C42,30 50,25 60,25 C70,25 78,30 80,44 Z" fill="#101218" />
      <Ellipse cx="60" cy="44" rx="30" ry="7" fill="#0B0D12" />
      <Rect x="42" y="39" width="36" height="5" rx="2" fill="#E5484D" />
      {/* العيون */}
      <Ellipse cx="53" cy="56" rx="3.4" ry="2.2" fill="#F2F5F9" />
      <Ellipse cx="67" cy="56" rx="3.4" ry="2.2" fill="#F2F5F9" />
    </G>
  ),

  godfather: (color) => (
    <G>
      <Path d="M18,118 C20,90 38,80 60,80 C82,80 100,90 102,118 Z" fill="#15171C" />
      {/* ربطة فراشة ذهبية */}
      <Path d="M50,84 L58,89 L50,94 Z" fill={color} />
      <Path d="M70,84 L62,89 L70,94 Z" fill={color} />
      <Rect x="57" y="86" width="6" height="6" rx="1.5" fill={color} />
      <Path d="M50,82 L60,90 L70,82 L66,80 L60,84 L54,80 Z" fill="#E8EDF3" />
      <Circle cx="60" cy="56" r="18" fill="#262A33" />
      {/* قبعة بشريط ذهبي */}
      <Path d="M40,44 C42,30 50,25 60,25 C70,25 78,30 80,44 Z" fill="#0F1117" />
      <Ellipse cx="60" cy="44" rx="30" ry="7" fill="#0A0C10" />
      <Rect x="42" y="39" width="36" height="5" rx="2" fill={color} />
      {/* تاج صغير ذهبي فوق القبعة */}
      <Path d="M50,24 L54,18 L60,23 L66,18 L70,24 Z" fill={color} />
      <Ellipse cx="53" cy="56" rx="3.2" ry="2.1" fill="#F2F5F9" />
      <Ellipse cx="67" cy="56" rx="3.2" ry="2.1" fill="#F2F5F9" />
    </G>
  ),

  doctor: (color) => (
    <G>
      {/* معطف أبيض */}
      <Path d="M18,118 C20,90 38,80 60,80 C82,80 100,90 102,118 Z" fill="#EAF1F5" />
      <Path d="M52,80 L60,100 L68,80 Z" fill="#D7E2E9" />
      {/* رأس */}
      <Circle cx="60" cy="52" r="19" fill="#E7D2B3" />
      {/* شعر */}
      <Path d="M41,50 C42,34 52,30 60,30 C68,30 78,34 79,50 C72,40 48,40 41,50 Z" fill="#3A3027" />
      {/* صليب طبي */}
      <Rect x="56" y="92" width="8" height="22" rx="2" fill={color} />
      <Rect x="49" y="99" width="22" height="8" rx="2" fill={color} />
      {/* سماعة طبية */}
      <Path d="M50,72 C50,86 60,90 60,96" stroke="#2C3543" strokeWidth="3" fill="none" />
      <Path d="M70,72 C70,84 64,88 62,92" stroke="#2C3543" strokeWidth="3" fill="none" />
      <Circle cx="60" cy="99" r="4.5" fill="#2C3543" />
      {/* عيون */}
      <Circle cx="53" cy="52" r="2.1" fill="#2A2A2A" />
      <Circle cx="67" cy="52" r="2.1" fill="#2A2A2A" />
    </G>
  ),

  detective: (color) => (
    <G>
      <Path d="M18,118 C20,92 38,82 60,82 C82,82 100,92 102,118 Z" fill="#2A2520" />
      <Circle cx="58" cy="50" r="18" fill="#E7D2B3" />
      {/* قبعة المحقق */}
      <Path d="M39,46 C40,33 49,29 58,29 C67,29 76,33 77,46 Z" fill="#5A4632" />
      <Ellipse cx="58" cy="46" rx="22" ry="5" fill="#4A3927" />
      {/* عدسة مكبّرة */}
      <Circle cx="78" cy="74" r="15" fill={color} opacity="0.18" />
      <Circle cx="78" cy="74" r="15" fill="none" stroke={color} strokeWidth="4" />
      <Line x1="89" y1="85" x2="100" y2="98" stroke={color} strokeWidth="6" strokeLinecap="round" />
      {/* عيون */}
      <Circle cx="52" cy="50" r="2.1" fill="#2A2A2A" />
      <Circle cx="63" cy="50" r="2.1" fill="#2A2A2A" />
    </G>
  ),

  sniper: (color) => (
    <G>
      {/* عدسة التصويب */}
      <Circle cx="60" cy="60" r="34" fill="#0B0F16" />
      <Circle cx="60" cy="60" r="34" fill="none" stroke={color} strokeWidth="3" />
      <Circle cx="60" cy="60" r="26" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      {/* خطوط التصويب */}
      <Line x1="60" y1="20" x2="60" y2="48" stroke={color} strokeWidth="2.5" />
      <Line x1="60" y1="72" x2="60" y2="100" stroke={color} strokeWidth="2.5" />
      <Line x1="20" y1="60" x2="48" y2="60" stroke={color} strokeWidth="2.5" />
      <Line x1="72" y1="60" x2="100" y2="60" stroke={color} strokeWidth="2.5" />
      <Circle cx="60" cy="60" r="4" fill={color} />
      {/* علامات صغيرة */}
      <Line x1="60" y1="52" x2="60" y2="56" stroke={color} strokeWidth="2" />
      <Line x1="60" y1="64" x2="60" y2="68" stroke={color} strokeWidth="2" />
    </G>
  ),

  jester: (color) => (
    <G>
      <Path d="M22,118 C24,94 40,84 60,84 C80,84 96,94 98,118 Z" fill="#15171C" />
      {/* الوجه */}
      <Circle cx="60" cy="58" r="20" fill="#E7D2B3" />
      {/* قبعة المهرّج بثلاثة أطراف */}
      <Path d="M38,46 C40,40 50,36 60,36 C70,36 80,40 82,46 L82,50 L38,50 Z" fill={color} />
      <Path d="M40,46 L30,26 L46,42 Z" fill={color} />
      <Path d="M60,40 L60,18 L70,38 Z" fill="#E5484D" />
      <Path d="M80,46 L92,28 L74,42 Z" fill={color} />
      <Circle cx="29" cy="25" r="3.5" fill="#E8B84B" />
      <Circle cx="60" cy="17" r="3.5" fill="#E8B84B" />
      <Circle cx="93" cy="27" r="3.5" fill="#E8B84B" />
      {/* ابتسامة وعينان */}
      <Circle cx="53" cy="56" r="2.4" fill="#2A2A2A" />
      <Circle cx="67" cy="56" r="2.4" fill="#2A2A2A" />
      <Path d="M50,64 C54,72 66,72 70,64" stroke="#B23A48" strokeWidth="3" fill="none" strokeLinecap="round" />
      <Circle cx="48" cy="64" r="3" fill="#E5848D" opacity="0.6" />
      <Circle cx="72" cy="64" r="3" fill="#E5848D" opacity="0.6" />
    </G>
  ),

  citizen: () => (
    <G>
      <Path d="M22,118 C24,94 40,84 60,84 C80,84 96,94 98,118 Z" fill="#2C3543" />
      <Circle cx="60" cy="54" r="20" fill="#9AA7B8" />
      <Path d="M40,52 C41,38 50,33 60,33 C70,33 79,38 80,52 C72,44 48,44 40,52 Z" fill="#5C6878" />
      <Circle cx="53" cy="54" r="2.2" fill="#1C232E" />
      <Circle cx="67" cy="54" r="2.2" fill="#1C232E" />
    </G>
  ),
};
