import { ROLES } from '../data/roles';

// خلط مصفوفة (Fisher–Yates)
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// يبني قائمة اللاعبين ويوزّع الأدوار عشوائياً حسب الإعداد
export function buildPlayers(names, config) {
  const roleBag = [];
  for (let i = 0; i < config.mafiaCount; i++) roleBag.push('mafia');
  if (config.godfather) roleBag.push('godfather');
  if (config.doctor) roleBag.push('doctor');
  if (config.detective) roleBag.push('detective');
  if (config.sniper) roleBag.push('sniper');
  if (config.jester) roleBag.push('jester');
  while (roleBag.length < names.length) roleBag.push('citizen');

  const shuffledRoles = shuffle(roleBag);
  const shuffledNames = shuffle(names);

  return shuffledNames.map((name, i) => ({
    id: i + 1,
    name: name.trim() || `لاعب ${i + 1}`,
    role: shuffledRoles[i],
    alive: true,
    sniperUsed: false,
    selfHealUsed: false,
  }));
}

export const alive = (players) => players.filter((p) => p.alive);

export const aliveMafia = (players) =>
  players.filter((p) => p.alive && ROLES[p.role].team === 'mafia');

// أعضاء المافيا (لعرضهم لبعض عند توزيع الأدوار)
export const allMafia = (players) =>
  players.filter((p) => ROLES[p.role].team === 'mafia');

// فحص المحقق: الأب الروحي يظهر "مدني"
export function investigate(player) {
  if (!player) return 'town';
  if (player.role === 'godfather') return 'town';
  return ROLES[player.role].team === 'mafia' ? 'mafia' : 'town';
}

// يحلّ أحداث الليل ويرجع نتيجة بدون تعديل الأصل
// actions: { mafiaTarget, doctorTarget, sniperTarget }
export function resolveNight(players, actions) {
  const next = players.map((p) => ({ ...p }));
  const byId = (id) => next.find((p) => p.id === id);
  const deaths = [];

  const protectedId = actions.doctorTarget ?? null;

  // ضحية المافيا
  if (actions.mafiaTarget) {
    const victim = byId(actions.mafiaTarget);
    if (victim && victim.alive) {
      if (victim.id === protectedId) {
        // أنقذه الطبيب
      } else {
        victim.alive = false;
        deaths.push({ id: victim.id, role: victim.role, cause: 'mafia' });
      }
    }
  }

  // طلقة القنّاص
  let sniperBackfire = null;
  if (actions.sniperTarget) {
    const target = byId(actions.sniperTarget);
    const sniper = next.find((p) => p.role === 'sniper');
    if (target && target.alive && target.id !== protectedId) {
      target.alive = false;
      deaths.push({ id: target.id, role: target.role, cause: 'sniper' });
      // لو قتل القنّاص مدنياً بريئاً (ليس مافيا) يموت معه
      const targetIsMafia = ROLES[target.role].team === 'mafia';
      if (!targetIsMafia && sniper && sniper.alive && target.id !== sniper.id) {
        sniper.alive = false;
        sniperBackfire = sniper.id;
        deaths.push({ id: sniper.id, role: sniper.role, cause: 'backfire' });
      }
    }
    if (sniper) sniper.sniperUsed = true;
  }

  return { players: next, deaths, savedSomeone: deaths.length === 0, sniperBackfire };
}

// إعدام بالتصويت نهاراً
export function executePlayer(players, targetId) {
  const next = players.map((p) => ({ ...p }));
  const victim = next.find((p) => p.id === targetId);
  if (victim) victim.alive = false;
  const jesterWin = victim && victim.role === 'jester';
  return { players: next, executed: victim, jesterWin };
}

// يحدد الفائز أو null لو اللعبة مستمرة
export function checkWinner(players) {
  const mafia = aliveMafia(players).length;
  const others = alive(players).filter((p) => ROLES[p.role].team !== 'mafia').length;
  if (mafia === 0) return 'town';
  if (mafia >= others) return 'mafia';
  return null;
}
