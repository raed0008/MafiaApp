import { Platform } from 'react-native';

// باليتة نوار كلاسيكية باهتة: أسود دافئ، أحمر خافت، بيج ورقي عتيق
export const colors = {
  bg: '#0C0B09',        // أسود دافئ
  bgSoft: '#13110D',
  card: '#1A1610',      // لوح خشبي/ورقي غامق
  cardSoft: '#221C14',
  border: '#3A2F22',    // بنّي غامق
  frame: '#C2AA7E',     // بيج ورقي عتيق (الإطار)

  text: '#E9E0CE',      // أبيض ورقي دافئ
  textDim: '#9C9079',   // بيج باهت
  textFaint: '#5E5647', // بنّي خافت

  gold: '#C2AA7E',      // الأكسنت العتيق (نحاسي باهت)
  blood: '#9A3B3B',     // أحمر دموي باهت
  bloodDeep: '#5E2424',
  town: '#6F8A63',      // أخضر زيتوني باهت
  info: '#5E7C95',      // أزرق رمادي باهت
  heal: '#5E8F85',      // فيروزي باهت
  jester: '#8C6E9C',    // بنفسجي باهت
  sniper: '#B07A45',    // نحاسي محروق

  overlay: 'rgba(0,0,0,0.6)',
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

// خط كلاسيكي (Serif) يعطي طابع لعبة عتيقة
export const serif = Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' });

export const font = {
  title: 34,
  h1: 26,
  h2: 20,
  body: 16,
  small: 13,
};
