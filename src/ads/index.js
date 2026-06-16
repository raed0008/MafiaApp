// طبقة إعلانات آمنة:
// - في بناء حقيقي (EAS/متجر) تستخدم AdMob فعلياً.
// - داخل Expo Go (لا يوجد الموديول الأصلي) تتحوّل تلقائياً لمساحة محجوزة بدون أعطال.
//
// ⚠️ قبل النشر: استبدل معرّفات الاختبار بمعرّفاتك الحقيقية من لوحة AdMob،
//    وبدّل app.json (androidAppId / iosAppId) بمعرّف تطبيقك.

// داخل Expo Go (storeClient) لا يوجد الموديول الأصلي — نعطّل الإعلانات الحقيقية
let inExpoGo = false;
try {
  const Constants = require('expo-constants').default;
  inExpoGo = Constants.executionEnvironment === 'storeClient';
} catch (e) {}

let lib = null;
if (!inExpoGo) {
  try {
    lib = require('react-native-google-mobile-ads');
  } catch (e) {
    lib = null; // الموديول غير متوفر
  }
}

export const adsReady = !!lib;

// مكوّن البانر وحجمه (للاستخدام في AdBanner)
export const Banner = lib ? lib.BannerAd : null;
export const BannerSize = lib ? lib.BannerAdSize : null;

// معرّفات الإعلانات — حالياً معرّفات اختبار رسمية من Google
export const BANNER_UNIT_ID = lib ? lib.TestIds.BANNER : '';
export const INTERSTITIAL_UNIT_ID = lib ? lib.TestIds.INTERSTITIAL : '';

let initialized = false;
export async function initAds() {
  if (!lib || initialized) return;
  initialized = true;
  try {
    await lib.default().initialize();
    preloadInterstitial();
  } catch (e) {}
}

// ——— الإعلان البيني (يُحمّل مسبقاً) ———
let interstitial = null;
let loaded = false;

export function preloadInterstitial() {
  if (!lib) return;
  try {
    interstitial = lib.InterstitialAd.createForAdRequest(INTERSTITIAL_UNIT_ID, {
      requestNonPersonalizedAdsOnly: true,
    });
    loaded = false;
    interstitial.addAdEventListener(lib.AdEventType.LOADED, () => {
      loaded = true;
    });
    interstitial.addAdEventListener(lib.AdEventType.CLOSED, () => {
      loaded = false;
      preloadInterstitial(); // حضّر التالي
    });
    interstitial.load();
  } catch (e) {}
}

// يعرض الإعلان البيني إن كان جاهزاً. يرجع true لو ظهر فعلاً.
export function showInterstitial() {
  if (!lib || !interstitial || !loaded) return false;
  try {
    interstitial.show();
    return true;
  } catch (e) {
    return false;
  }
}
