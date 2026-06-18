// مخزن إعدادات مشترك + حفظ دائم.
// - يعمل في كامل التطبيق عبر useSettings() ويبقى محفوظاً بين الجلسات.
// - لو لم يتوفر AsyncStorage (مثلاً بيئة غير مدعومة) يعمل في الذاكرة فقط بدون أعطال.
import { useState, useEffect } from 'react';

let Storage = null;
try {
  Storage = require('@react-native-async-storage/async-storage').default;
} catch (e) {
  Storage = null; // يعمل في الذاكرة فقط
}

const KEY = 'mafia.settings.v1';

export const DEFAULTS = {
  vibration: true, // يتحكم بالاهتزاز اللمسي في كل اللعبة
  sound: 0.8,
  music: 0.6,
  notifications: true,
  quality: 'متوسطة',
};

let state = { ...DEFAULTS };
let loaded = false;
const listeners = new Set();

const emit = () => listeners.forEach((l) => l(state));

// يحمّل الإعدادات المحفوظة مرة واحدة عند الإقلاع
export async function loadSettings() {
  if (loaded) return state;
  loaded = true;
  if (Storage) {
    try {
      const raw = await Storage.getItem(KEY);
      if (raw) {
        state = { ...DEFAULTS, ...JSON.parse(raw) };
        emit();
      }
    } catch (e) {}
  }
  return state;
}

export const getSettings = () => state;

function persist() {
  if (Storage) Storage.setItem(KEY, JSON.stringify(state)).catch(() => {});
}

export function setSetting(key, value) {
  state = { ...state, [key]: value };
  emit();
  persist();
}

export function resetSettings() {
  state = { ...DEFAULTS };
  emit();
  persist();
}

// هوك تفاعلي: يعيد الإعدادات الحالية ويُحدّث المكوّن عند أي تغيير
export function useSettings() {
  const [s, setS] = useState(state);
  useEffect(() => {
    const l = (next) => setS(next);
    listeners.add(l);
    if (!loaded) loadSettings();
    else setS(state);
    return () => listeners.delete(l);
  }, []);
  return s;
}
