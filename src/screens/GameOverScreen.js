import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import Button from '../components/Button';
import Icon from '../components/Icon';
import AdBanner from '../ads/AdBanner';
import { ROLES } from '../data/roles';
import { colors, space, font, radius, serif, body, bodyBold } from '../theme';

const RESULT = {
  town: { title: 'فاز المدنيون', icon: 'trophy', color: colors.town, text: 'كشفوا كل المافيا' },
  mafia: { title: 'فازت المافيا', icon: 'incognito', color: colors.blood, text: 'سيطرت المافيا' },
  jester: { title: 'فاز المهرج', icon: 'drama-masks', color: colors.jester, text: 'اعدمه اللاعبون فربح' },
};

export default function GameOverScreen({ winner, players, jester, onReplay, onHome }) {
  const r = RESULT[winner] || RESULT.town;

  return (
    <Screen
      footer={
        <>
          <AdBanner style={{ marginBottom: space.xs }} />
          <Button title="إعادة بنفس اللاعبين" icon="refresh" onPress={onReplay} />
          <Button title="الرئيسية" variant="ghost" onPress={onHome} />
        </>
      }
    >
      <View style={[styles.hero, { borderColor: r.color }]}>
        <Icon name={r.icon} size={72} color={r.color} />
        <Text style={[styles.title, { color: r.color }]}>{r.title}</Text>
        <Text style={styles.text}>{r.text}</Text>
        {winner === 'jester' && jester ? (
          <Text style={[styles.jesterName, { color: r.color }]}>{jester.name}</Text>
        ) : null}
      </View>

      <Text style={styles.revealTitle}>الأدوار</Text>
      {players.map((p) => {
        const role = ROLES[p.role];
        return (
          <View key={p.id} style={styles.row}>
            <View style={styles.rowStatus}>
              {p.alive ? (
                <Text style={styles.aliveText}>حي</Text>
              ) : (
                <Icon name="skull" size={18} color={colors.textFaint} />
              )}
            </View>
            <View style={[styles.roleTag, { backgroundColor: role.color }]}>
              <Icon name={role.icon} size={15} color="#0E1116" />
              <Text style={styles.roleTagText}>{role.name}</Text>
            </View>
            <Text style={[styles.rowName, !p.alive && styles.dead]}>{p.name}</Text>
          </View>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderRadius: radius.lg,
    padding: space.lg,
    alignItems: 'center',
    marginBottom: space.lg,
    marginTop: space.md,
  },
  title: { fontSize: font.title, fontWeight: '900', marginVertical: space.sm, fontFamily: serif, letterSpacing: 1 },
  text: { color: colors.textDim, fontSize: font.body, textAlign: 'center', lineHeight: 24, fontFamily: body },
  jesterName: { fontSize: font.h1, marginTop: space.sm, fontFamily: serif },
  revealTitle: { color: colors.text, fontSize: font.h2 + 2, fontFamily: serif, marginBottom: space.sm, textAlign: 'right' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.bgSoft,
    borderRadius: radius.md,
    paddingVertical: 12,
    paddingHorizontal: space.md,
    marginBottom: space.sm,
    gap: space.sm,
  },
  rowStatus: { minWidth: 36, alignItems: 'center' },
  aliveText: { color: colors.town, fontSize: font.body, fontFamily: bodyBold },
  roleTag: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 5,
    borderRadius: radius.pill,
    paddingHorizontal: space.md,
    paddingVertical: 4,
  },
  roleTagText: { color: '#16100A', fontSize: font.small, fontFamily: bodyBold },
  rowName: { flex: 1, color: colors.text, fontSize: font.body, fontFamily: bodyBold, textAlign: 'right' },
  dead: { color: colors.textFaint, textDecorationLine: 'line-through' },
});
