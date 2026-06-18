// التوزيع المقترح حسب عدد اللاعبين (مبني على جدول الدليل + قاعدة "المافيا ≈ ربع اللاعبين")
// يرجع إعدادات افتراضية: عدد المافيا والأدوار الخاصة المفعّلة.

export const MIN_PLAYERS = 4;
export const MAX_PLAYERS = 20;

export function suggestConfig(playerCount) {
  const n = playerCount;
  // المافيا ≈ ربع اللاعبين (كحد أدنى 1)
  const mafiaCount = Math.max(1, Math.round(n / 4));
  return {
    mafiaCount,
    godfather: n >= 10, // الأب الروحي يُنصح به للأعداد الكبيرة
    doctor: n >= 5,
    detective: n >= 6,
    sniper: false,
    jester: false,
    discussionMinutes: 2, // مدة مؤقّت النقاش نهاراً (0 = بلا مؤقّت)
  };
}

// يحسب عدد المدنيين العاديين بعد طرح الأدوار الخاصة
export function citizenCount(playerCount, config) {
  const specials =
    config.mafiaCount +
    (config.godfather ? 1 : 0) +
    (config.doctor ? 1 : 0) +
    (config.detective ? 1 : 0) +
    (config.sniper ? 1 : 0) +
    (config.jester ? 1 : 0);
  return playerCount - specials;
}

// يتحقق أن الإعداد صالح (يبقى مدنيون كفاية + المافيا أقل من النصف)
export function validateConfig(playerCount, config) {
  const citizens = citizenCount(playerCount, config);
  const totalMafia = config.mafiaCount + (config.godfather ? 1 : 0);
  if (citizens < 0) {
    return { ok: false, message: 'الادوار اكثر من اللاعبين' };
  }
  if (totalMafia >= playerCount - totalMafia) {
    return { ok: false, message: 'المافيا لازم اقل من نصف اللاعبين' };
  }
  const townTotal = playerCount - totalMafia - (config.jester ? 1 : 0);
  if (townTotal < 1) {
    return { ok: false, message: 'لازم فريق مدنيين' };
  }
  return { ok: true, message: '' };
}
