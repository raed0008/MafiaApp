import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import Button from '../components/Button';
import Icon from '../components/Icon';
import RoleArt from '../art/RoleArt';
import PlayerChip from '../components/PlayerChip';
import { ROLES, TEAM_LABEL } from '../data/roles';
import { alive } from '../game/engine';
import { colors, space, font, radius, serif } from '../theme';

const CAUSE_TEXT = {
  mafia: 'قتلته المافيا',
  sniper: 'قتله القناص',
  backfire: 'ارتدت عليه رصاصته',
};

export default function DayScreen({ players, dayNumber, deaths, onExecute }) {
  // phase: 'announce' | 'vote' | 'reveal'
  const [phase, setPhase] = useState('announce');
  const [selected, setSelected] = useState(null);
  const [executed, setExecuted] = useState(null);

  const livePlayers = alive(players);

  const deadInfo = deaths
    .map((d) => {
      const p = players.find((x) => x.id === d.id);
      return p ? { name: p.name, role: ROLES[p.role], cause: d.cause } : null;
    })
    .filter(Boolean);

  const confirmVote = () => {
    if (selected == null) return;
    setExecuted(players.find((p) => p.id === selected));
    setPhase('reveal');
  };

  // ── إعلان نتائج الليل ──
  if (phase === 'announce') {
    return (
      <Screen title={`اليوم ${dayNumber}`} subtitle="الصباح">
        <View style={styles.announceWrap}>
          {deadInfo.length === 0 ? (
            <View style={styles.peaceful}>
              <Icon name="shield-check" size={64} color={colors.town} style={styles.bigIcon} />
              <Text style={styles.peaceTitle}>لا قتلى</Text>
              <Text style={styles.peaceText}>نجا الجميع الليلة</Text>
            </View>
          ) : (
            deadInfo.map((d, i) => (
              <View key={i} style={[styles.deathCard, { borderColor: d.role.color }]}>
                <Icon name="skull" size={56} color={colors.textDim} style={styles.bigIcon} />
                <Text style={styles.deathName}>{d.name}</Text>
                <Text style={styles.deathCause}>{CAUSE_TEXT[d.cause] || 'مات'}</Text>
                <View style={[styles.roleReveal, { backgroundColor: d.role.color }]}>
                  <Icon name={d.role.icon} size={18} color="#0E1116" />
                  <Text style={styles.roleRevealText}>{d.role.name}</Text>
                </View>
              </View>
            ))
          )}
        </View>
        <Button title="التصويت" icon="vote" onPress={() => setPhase('vote')} />
      </Screen>
    );
  }

  // ── كشف دور من أُعدم ──
  if (phase === 'reveal') {
    const role = ROLES[executed.role];
    return (
      <Screen title="نتيجة التصويت" subtitle="اعدم">
        <View style={styles.announceWrap}>
          <View style={[styles.deathCard, { borderColor: role.color }]}>
            <RoleArt role={executed.role} size={104} />
            <Text style={[styles.deathName, { marginTop: space.sm }]}>{executed.name}</Text>
            <View style={[styles.roleReveal, { backgroundColor: role.color }]}>
              <Text style={styles.roleRevealText}>{role.name}</Text>
            </View>
            <Text style={styles.teamLine}>{TEAM_LABEL[role.team]}</Text>
          </View>
        </View>
        <Button title="تابع" onPress={() => onExecute(executed.id)} />
      </Screen>
    );
  }

  // ── التصويت ──
  return (
    <Screen
      title="التصويت"
      subtitle="من تشتبهون فيه"
      footer={
        <>
          <Button title="بلا إعدام" variant="ghost" onPress={() => onExecute(null)} />
          <Button title="إعدام" variant="danger" onPress={confirmVote} disabled={selected == null} />
        </>
      }
    >
      <Text style={styles.voteHint}>اختر من حصل على أكثر الأصوات</Text>
      {livePlayers.map((p) => (
        <PlayerChip
          key={p.id}
          player={p}
          selected={selected === p.id}
          accent={colors.blood}
          onPress={() => setSelected(p.id)}
        />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  announceWrap: { alignItems: 'center', marginBottom: space.lg },
  bigIcon: { marginBottom: space.sm },
  peaceful: { alignItems: 'center', paddingVertical: space.lg },
  peaceTitle: { color: colors.town, fontSize: font.h1, fontWeight: '900', fontFamily: serif },
  peaceText: { color: colors.textDim, fontSize: font.body, textAlign: 'center', marginTop: space.sm, lineHeight: 24 },
  deathCard: {
    width: '100%',
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderRadius: radius.lg,
    padding: space.lg,
    alignItems: 'center',
    marginBottom: space.md,
  },
  deathName: { color: colors.text, fontSize: font.h1, fontWeight: '900', fontFamily: serif },
  deathCause: { color: colors.textDim, fontSize: font.body, marginVertical: space.sm, textAlign: 'center' },
  roleReveal: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 6,
    borderRadius: radius.pill,
    paddingHorizontal: space.lg,
    paddingVertical: 6,
    marginTop: space.sm,
  },
  roleRevealText: { color: '#0E1116', fontSize: font.body, fontWeight: '900' },
  teamLine: { color: colors.textFaint, fontSize: font.small, marginTop: space.sm },
  voteHint: { color: colors.textDim, fontSize: font.small, lineHeight: 22, marginBottom: space.md, textAlign: 'right' },
});
