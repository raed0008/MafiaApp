import { colors } from '../theme';

// تعريف كل الأدوار في اللعبة.
// team: 'mafia' | 'town' | 'neutral'
export const ROLES = {
  mafia: {
    key: 'mafia',
    name: 'مافيا',
    team: 'mafia',
    color: colors.blood,
    icon: 'incognito',
    wakesAtNight: true,
    short: 'يقتل ليلا ويعرف بقية المافيا.',
    desc: 'تقتل لاعب كل ليلة مع فريقك. لا تنكشف نهارا.',
  },
  godfather: {
    key: 'godfather',
    name: 'الاب الروحي',
    team: 'mafia',
    color: colors.bloodDeep,
    icon: 'account-tie',
    wakesAtNight: true,
    short: 'زعيم المافيا. يظهر بريء للمحقق.',
    desc: 'زعيم المافيا. يظهر بريء عند فحص المحقق.',
  },
  doctor: {
    key: 'doctor',
    name: 'الطبيب',
    team: 'town',
    color: colors.heal,
    icon: 'medical-bag',
    wakesAtNight: true,
    short: 'يحمي لاعب كل ليلة. يحمي نفسه مرة واحدة.',
    desc: 'يحمي لاعب من القتل كل ليلة. يستطيع حماية نفسه مرة واحدة فقط طوال اللعبة.',
  },
  detective: {
    key: 'detective',
    name: 'المحقق',
    team: 'town',
    color: colors.info,
    icon: 'magnify',
    wakesAtNight: true,
    short: 'يفحص لاعب كل ليلة: مافيا أو مدني.',
    desc: 'يفحص لاعب كل ليلة فيعرف: مافيا أو مدني.',
  },
  sniper: {
    key: 'sniper',
    name: 'القناص',
    team: 'town',
    color: colors.sniper,
    icon: 'target',
    wakesAtNight: true,
    short: 'رصاصة واحدة لكل اللعبة.',
    desc: 'رصاصة واحدة. لو قتل بريء يموت معه.',
  },
  jester: {
    key: 'jester',
    name: 'المهرج',
    team: 'neutral',
    color: colors.jester,
    icon: 'drama-masks',
    wakesAtNight: false,
    short: 'يفوز لو اعدم بالتصويت.',
    desc: 'يفوز وحده لو اعدمه اللاعبون بالتصويت.',
  },
  citizen: {
    key: 'citizen',
    name: 'مدني',
    team: 'town',
    color: colors.town,
    icon: 'account',
    wakesAtNight: false,
    short: 'بلا قدرة. سلاحه النقاش والتصويت.',
    desc: 'بلا قدرة. سلاحه النقاش والتصويت.',
  },
};

export const TEAM_LABEL = {
  mafia: 'فريق المافيا',
  town: 'فريق المدنيين',
  neutral: 'مستقل',
};

// ترتيب استيقاظ الأدوار في الليل
export const NIGHT_ORDER = ['mafia', 'godfather', 'doctor', 'detective', 'sniper'];
