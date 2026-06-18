import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import Button from '../components/Button';
import Icon from '../components/Icon';
import Frame from '../components/Frame';
import Seal from '../components/Seal';
import AdBanner from '../ads/AdBanner';
import { ROLES } from '../data/roles';
import * as feedback from '../feedback';
import { colors, space, font, radius, serif, body, bodyBold } from '../theme';

const RESULT = {
  town: { title: 'انتصر المدنيون', icon: 'trophy-variant', color: colors.town, text: 'طُهّرت المدينة من المافيا' },
  mafia: { title: 'سيطرت المافيا', icon: 'incognito', color: colors.blood, text: 'أحكمت العصابة قبضتها على المدينة' },
  jester: { title: 'فاز المهرّج', icon: 'drama-masks', color: colors.jester, text: 'ضحك الأخير... فقد خدعكم جميعاً' },
};

export default function GameOverScreen({ winner, players, jester, onReplay, onHome }) {
  const r = RESULT[winner] || RESULT.town;

  useEffect(() => {
    if (winner === 'mafia') feedback.warn();
    else feedback.success();
  }, []);

  return (
    <Screen
      backdrop="room"
      footer={
        <>
          <AdBanner style={{ marginBottom: space.xs }} />
          <Button title="جولة جديدة بنفس العصابة" icon="refresh" variant="gold" onPress={onReplay} />
          <Button title="القائمة الرئيسية" icon="home-variant" variant="ghost" onPress={onHome} />
        </>
      }
    >
      <Frame variant="plaque" accent={r.color} corners rad={radius.lg} padding={space.xl} glow style={styles.hero}>
        <Seal size={112} color={r.color} icon={r.icon} />
        <Text style={[styles.title, { color: r.color }]}>{r.title}</Text>
        <Text style={styles.text}>{r.text}</Text>
        {winner === 'jester' && jester ? <Text style={[styles.jesterName, { color: r.color }]}>{jester.name}</Text> : null}
      </Frame>

      <Text style={styles.sectionTitle}>كشف الأدوار</Text>
      {players.map((p) => {
        const role = ROLES[p.role];
        return (
          <View key={p.id} style={[styles.row, !p.alive && styles.rowDead]}>
            <View style={styles.status}>
              {p.alive ? (
                <Icon name="heart-pulse" size={18} color={colors.town} />
              ) : (
                <Icon name="skull" size={18} color={colors.textFaint} />
              )}
            </View>
            <View style={[styles.roleTag, { backgroundColor: role.color }]}>
              <Icon name={role.icon} size={14} color="#1B130A" />
              <Text style={styles.roleTagText}>{role.name}</Text>
            </View>
            <Text style={[styles.rowName, !p.alive && styles.dead]} numberOfLines={1}>{p.name}</Text>
          </View>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', gap: space.sm, marginTop: space.sm, marginBottom: space.lg },
  title: { fontSize: font.title, fontFamily: serif, letterSpacing: 1, marginTop: space.sm },
  text: { color: colors.textDim, fontSize: font.body, textAlign: 'center', lineHeight: 24, fontFamily: body },
  jesterName: { fontSize: font.h1, marginTop: space.xs, fontFamily: serif },
  sectionTitle: { color: colors.frame, fontSize: font.h2 + 2, fontFamily: serif, marginBottom: space.sm, textAlign: 'right' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(20,16,11,0.7)',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 11,
    paddingHorizontal: space.md,
    marginBottom: space.sm,
    gap: space.sm,
  },
  rowDead: { opacity: 0.7 },
  status: { minWidth: 32, alignItems: 'center' },
  roleTag: { flexDirection: 'row-reverse', alignItems: 'center', gap: 5, borderRadius: radius.pill, paddingHorizontal: space.md, paddingVertical: 4 },
  roleTagText: { color: '#1B130A', fontSize: font.small, fontFamily: bodyBold },
  rowName: { flex: 1, color: colors.text, fontSize: font.body, fontFamily: bodyBold, textAlign: 'right' },
  dead: { color: colors.textFaint, textDecorationLine: 'line-through' },
});
