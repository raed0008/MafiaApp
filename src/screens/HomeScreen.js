import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import Icon from '../components/Icon';
import Divider from '../components/Divider';
import Frame from '../components/Frame';
import Logo from '../art/Logo';
import Backdrop from '../art/Backdrop';
import * as feedback from '../feedback';
import { colors, space, font, serif, body, bodyBold, shadow } from '../theme';

const soon = () => {
  feedback.tap();
  Alert.alert('قريباً', 'هذه الميزة تحت التطوير.');
};

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

function Tab({ icon, label, active, onPress }) {
  const color = active ? colors.gold : colors.textDim;
  return (
    <Pressable onPress={onPress} style={styles.tab} hitSlop={6}>
      <Icon name={icon} size={23} color={color} />
      <Text style={[styles.tabLabel, { color }]}>{label}</Text>
      {active ? <View style={styles.tabDot} /> : null}
    </Pressable>
  );
}

export default function HomeScreen({ onNewGame, onRules, onSettings }) {
  return (
    <View style={styles.root}>
      <Backdrop variant="image" />
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        {/* الشريط العلوي — بطاقة عضوية */}
        <View style={styles.topBar}>
          <Frame variant="plaque" rad={12} padding={8} style={styles.profile}>
            <View style={styles.profileRow}>
              <View style={styles.avatarFrame}>
                <Logo size={38} />
              </View>
              <View style={styles.profileText}>
                <Text style={styles.playerName}>الزعيم</Text>
                <Text style={styles.level}>المرتبة ١</Text>
                <View style={styles.xpTrack}>
                  <View style={[styles.xpFill, { width: '35%' }]} />
                </View>
              </View>
            </View>
          </Frame>
          <View style={styles.topRight}>
            <TopIcon icon="crown" label="المهام" onPress={soon} />
            <TopIcon icon="cog" label="الإعدادات" onPress={onSettings} />
          </View>
        </View>

        {/* البطل */}
        <View style={styles.hero}>
          <Logo size={132} />
          <Text style={styles.title}>مافيا</Text>
          <Text style={styles.subtitle}>الـــزعـــيـــم</Text>
          <View style={styles.heroDivider}>
            <Divider width={210} color={colors.gold} />
          </View>
          <Text style={styles.tagline}>اكتشف الخائن بينكم قبل فوات الأوان</Text>
        </View>

        {/* القائمة */}
        <View style={styles.menu}>
          <Button title="لعبة جديدة" icon="cards-playing-outline" variant="gold" onPress={onNewGame} />
          <View style={styles.menuRow}>
            <Button title="الأدوار" icon="cards" variant="dark" onPress={onRules} style={styles.half} />
            <Button title="الشرح" icon="book-open-variant" variant="dark" onPress={onRules} style={styles.half} />
          </View>
          <Button title="انضم إلى لعبة" icon="account-multiple-plus" variant="dark" onPress={soon} />
        </View>

        {/* شريط التبويب السفلي */}
        <View style={styles.tabBar}>
          <Tab icon="storefront" label="المتجر" onPress={soon} />
          <Tab icon="medal" label="الإنجازات" onPress={soon} />
          <Tab icon="home-variant" label="الرئيسية" active />
          <Tab icon="trophy-variant" label="التصنيف" onPress={soon} />
          <Tab icon="email-outline" label="الرسائل" onPress={soon} />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  safe: { flex: 1, paddingHorizontal: space.md },

  topBar: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingTop: space.sm },
  profile: { },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  avatarFrame: {
    width: 46,
    height: 46,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.frame,
    backgroundColor: colors.bgSoft,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  profileText: { alignItems: 'flex-start' },
  playerName: { color: colors.text, fontSize: font.small + 1, fontFamily: bodyBold },
  level: { color: colors.gold, fontSize: 11, fontFamily: bodyBold, marginTop: 1 },
  xpTrack: { width: 90, height: 5, borderRadius: 3, backgroundColor: '#2A241B', marginTop: 3, overflow: 'hidden' },
  xpFill: { height: 5, backgroundColor: colors.gold, borderRadius: 3 },

  topRight: { flexDirection: 'row', gap: space.md, paddingTop: 2 },
  topIcon: { alignItems: 'center', gap: 3 },
  topIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.gold,
    backgroundColor: 'rgba(20,16,11,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.soft,
  },
  topIconLabel: { color: colors.textDim, fontSize: 10, fontFamily: body },

  hero: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: {
    color: '#EFE3C8',
    fontSize: 76,
    fontFamily: serif,
    letterSpacing: 3,
    marginTop: space.sm,
    textShadowColor: 'rgba(0,0,0,0.95)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
  },
  subtitle: {
    color: colors.blood,
    fontSize: 30,
    fontFamily: serif,
    marginTop: -12,
    letterSpacing: 4,
    textShadowColor: 'rgba(0,0,0,0.95)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  heroDivider: { marginTop: space.md },
  tagline: {
    color: '#DCCFB4',
    fontSize: font.small + 1,
    fontFamily: body,
    marginTop: space.md,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },

  menu: { alignSelf: 'stretch', gap: 12, paddingHorizontal: space.xs, paddingBottom: space.sm },
  menuRow: { flexDirection: 'row', gap: 12 },
  half: { flex: 1 },

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
  tabDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: colors.gold, marginTop: 1 },
});
