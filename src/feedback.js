// طبقة اهتزاز لمسي (Haptics) خفيفة، مرتبطة بإعداد "الاهتزاز".
// - لو لم يتوفر expo-haptics تتحوّل لعمليات صامتة بدون أعطال.
import { getSettings } from './settings';

let Haptics = null;
try {
  Haptics = require('expo-haptics');
} catch (e) {
  Haptics = null;
}

const on = () => Haptics && getSettings().vibration;

// نقرة خفيفة لأزرار الواجهة
export function tap() {
  if (!on()) return;
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
}

// لحظة كشف (دور / نتيجة المحقق)
export function reveal() {
  if (!on()) return;
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
}

// حدث ثقيل (قتل / إعدام / انتهاء الوقت)
export function impact() {
  if (!on()) return;
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {});
}

// نجاح (فوز / ليلة آمنة)
export function success() {
  if (!on()) return;
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
}

// تحذير (اقتراب نهاية الوقت / موت)
export function warn() {
  if (!on()) return;
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
}
