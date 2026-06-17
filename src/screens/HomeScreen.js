import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import Icon from '../components/Icon';
import NightSky from '../art/NightSky';
import RoleArt from '../art/RoleArt';
import { colors, space, font, serif, body, bodyBold } from '../theme';

const soon = () => Alert.alert('قريباً', 'هذه الميزة تحت التطوير.');

// أيقونة علوية (مهام / إعدادات)
function TopIcon({ icon, label, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.topIcon} hitSlop={8}>
      <View style={styles.topIconCircle}>
        <Icon name={icon} size={20} color={colors.frame} />
      </View>
      <Text style={styles.topIconLabel}>{label}</Text>
    </Pressable>
  );
}

// عنصر شريط التبويب السفلي
function Tab({ icon, label, active, onPress }) {
  const color = active ? colors.blood : colors.textDim;
  return (
    <Pressable onPress={onPress} style={styles.tab} hitSlop={6}>
      <Icon name={icon} size={23} color={active ? '#C7423F' : colors.textDim} />
      <Text style={[styles.tabLabel, { color }]}>{label}</Text>
    </Pressable>
  );
}

export default function HomeScreen({ onNewGame, onRules, onSettings }) {
  return (
    <View style={styles.root}>
      <NightSky scrim={0.25} />
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        {/* الشريط العلوي */}
        <View style={styles.topBar}>
          <View style={styles.profile}>
            <View style={styles.avatarFrame}>
              <RoleArt role="mafia" size={42} />
            </View>
            <View style={styles.profileText}>
              <Text style={styles.playerName}>اللاعب</Text>
              <Text style={styles.level}>Lv. 1</Text>
              <View style={styles.xpTrack}>
                <View style={[styles.xpFill, { width: '35%' }]} />
              </View>
            </View>
          </View>
          <View style={styles.topRight}>
            <TopIcon icon="crown" label="المهام" onPress={soon} />
            <TopIcon icon="cog" label="الإعدادات" onPress={onSettings} />
          </View>
        </View>

        {/* مساحة المشهد (الصورة تظهر خلفها) + العنوان */}
        <View style={styles.hero}>
          <Text style={styles.title}>مافيا</Text>
          <Text style={styles.subtitle}>الزعيم</Text>
          <Text style={styles.tagline}>— اكتشف الخائن بينكم —</Text>
        </View>

        {/* القائمة */}
        <View style={styles.menu}>
          <Button title="لعبة جديدة" icon="account-group" variant="primary" onPress={onNewGame} />
          <Button title="انضم إلى لعبة" icon="account-multiple-plus" variant="dark" onPress={soon} />
          <Button title="الأدوار" icon="cards" variant="dark" onPress={onRules} />
          <Button title="شرح اللعبة" icon="book-open-variant" variant="dark" onPress={onRules} />
        </View>

        {/* شريط التبويب السفلي */}
        <View style={styles.tabBar}>
          <Tab icon="storefront" label="المتجر" onPress={soon} />
          <Tab icon="medal" label="الإنجازات" onPress={soon} />
          <Tab icon="home" label="الرئيسية" active />
          <Tab icon="chart-bar" label="التصنيف" onPress={soon} />
          <Tab icon="email-outline" label="الرسائل" onPress={soon} />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  safe: { flex: 1, paddingHorizontal: space.md },

  // الشريط العلوي
  topBar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: space.sm,
    paddingBottom: space.xs,
  },
  profile: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  avatarFrame: {
    width: 48,
    height: 48,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.frame,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  profileText: { alignItems: 'flex-start' },
  playerName: { color: colors.text, fontSize: font.small, fontFamily: bodyBold },
  level: { color: colors.frame, fontSize: 11, fontFamily: bodyBold, marginTop: 1 },
  xpTrack: { width: 88, height: 5, borderRadius: 3, backgroundColor: '#2A241B', marginTop: 3, overflow: 'hidden' },
  xpFill: { height: 5, backgroundColor: colors.frame, borderRadius: 3 },
  topRight: { flexDirection: 'row', gap: space.md },
  topIcon: { alignItems: 'center', gap: 3 },
  topIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.bgSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topIconLabel: { color: colors.textDim, fontSize: 10, fontFamily: body },

  // مساحة المشهد + العنوان
  hero: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: space.lg },
  title: {
    color: '#EBDFC6',
    fontSize: 72,
    fontWeight: '900',
    fontFamily: serif,
    letterSpacing: 2,
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 10,
  },
  subtitle: {
    color: '#C24039',
    fontSize: 32,
    fontWeight: '900',
    fontFamily: serif,
    marginTop: -10,
    letterSpacing: 2,
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  tagline: {
    color: '#D8CBB2',
    fontSize: font.small,
    fontFamily: body,
    marginTop: 6,
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },

  // القائمة
  menu: { alignSelf: 'stretch', gap: 12, paddingHorizontal: space.xs },

  // شريط التبويب
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: space.sm,
    paddingBottom: space.xs,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  tab: { flex: 1, alignItems: 'center', gap: 3 },
  tabLabel: { fontSize: 10, fontFamily: bodyBold },
});
