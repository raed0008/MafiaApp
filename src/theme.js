// ════════════════════════════════════════════════════════════════
//  لوحة "السبيك إيزي نوار" — لعبة ورق في ملهى العشرينات
//  ألوان: جوخ طاولة، ورق عتيق، خشب الجوز، نحاس/ذهب باهت، أحمر دموي
// ════════════════════════════════════════════════════════════════
export const colors = {
  // الخلفيات
  bg: '#0B0A08',        // أسود دافئ
  bgSoft: '#13110D',
  card: '#1A1610',      // لوح خشبي/ورقي غامق
  cardSoft: '#221C14',

  // جوخ الطاولة (شاشات اللعب)
  felt: '#15281E',
  feltDeep: '#0B1610',
  feltLight: '#1E3A2B',

  // خشب الجوز (الإطارات)
  wood: '#2A1D11',
  woodLight: '#4A3420',
  woodDeep: '#180F08',

  // ورق عتيق (الألواح الفاتحة) — نصّها داكن
  parchment: '#E7D7B0',
  parchmentShade: '#D8C39A',
  parchmentDark: '#C4AC82',
  ink: '#241A0E',       // حبر بنّي داكن (نص على الورق)
  inkSoft: '#4A3A24',

  border: '#3A2C1B',    // بنّي غامق
  borderSoft: '#2A2014',
  frame: '#C2AA7E',     // بيج ورقي عتيق (الإطار)

  // النصوص (على الداكن)
  text: '#ECE2CC',      // أبيض ورقي دافئ
  textDim: '#A0937A',   // بيج باهت
  textFaint: '#665B48', // بنّي خافت

  // النحاس/الذهب
  gold: '#C2AA7E',
  goldLight: '#E8D6AC',
  goldDeep: '#8C7345',
  goldShadow: '#5A4828',

  // ألوان الفرق/الأدوار
  blood: '#A23B3B',     // أحمر دموي
  bloodLight: '#C45A52',
  bloodDeep: '#5E2222',
  town: '#6F8A5B',      // أخضر زيتوني
  townLight: '#92AC78',
  info: '#5E7C95',      // أزرق رمادي
  heal: '#5E9185',      // فيروزي باهت
  jester: '#8C6E9C',    // بنفسجي
  sniper: '#B07A45',    // نحاسي محروق

  overlay: 'rgba(0,0,0,0.6)',
};

// تدرّجات جاهزة لإعادة الاستخدام في SVG
export const grad = {
  brass: ['#E8D6AC', '#C2AA7E', '#8C7345'],   // نحاس لامع
  brassDeep: ['#C2AA7E', '#8C7345', '#5A4828'],
  wood: ['#3A2A18', '#241810', '#140C06'],     // خشب الجوز
  parchment: ['#EFE0BC', '#E0CDA1', '#CBB585'], // ورق عتيق
  felt: ['#1E3A2B', '#15281E', '#0B1610'],     // جوخ الطاولة
  bloodEnamel: ['#B14B45', '#7E2A28', '#4A1817'],
  ink: ['#231A10', '#16100A'],
};

// ظلال ناعمة (iOS/Android)
export const shadow = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 8,
  },
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },
  glow: (c) => ({
    shadowColor: c,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 14,
    elevation: 10,
  }),
};

export const space = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 36,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  pill: 999,
};

// خطوط اللعبة: استعراضي مزخرف للعناوين، ونظيف للنصوص
export const display = 'Rakkas_400Regular'; // مزخرف بطابع المافيا العتيق
export const body = 'Cairo_400Regular';
export const bodyBold = 'Cairo_700Bold';
// alias متوافق مع الاستخدامات السابقة (العناوين)
export const serif = display;

export const font = {
  title: 34,
  h1: 26,
  h2: 20,
  body: 16,
  small: 13,
};
