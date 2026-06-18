import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import Button from '../components/Button';
import Icon from '../components/Icon';
import Frame from '../components/Frame';
import Timer from '../components/Timer';
import RoleCard from '../components/RoleCard';
import PlayerChip from '../components/PlayerChip';
import { Ribbon } from '../components/Nameplate';
import { ROLES } from '../data/roles';
import { alive } from '../game/engine';
import * as feedback from '../feedback';
import { colors, space, font, radius, serif, body, bodyBold } from '../theme';

const CAUSE_TEXT = {
  mafia: 'سقط برصاص المافيا',
  sniper: 'أرداه القنّاص',
  backfire: 'ارتدّت عليه رصاصته',
};

export default function DayScreen({ players, dayNumber, deaths, discussionMinutes = 0, onExecute }) {
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

  useEffect(() => {
    if (deadInfo.length > 0) feedback.warn();
    else feedback.success();
  }, []);

  const discussSeconds = Math.round((discussionMinutes || 0) * 60);

  const confirmVote = () => {
    if (selected == null) return;
    feedback.impact();
    setExecuted(players.find((p) => p.id === selected));
    setPhase('reveal');
  };

  // ── إعلان الصباح ──
  if (phase === 'announce') {
    return (
      <Screen
        title={`اليوم ${dayNumber}`}
        subtitle="مطلع الفجر"
        backdrop="felt"
        footer={
          discussSeconds > 0 ? (
            <Button title="بدء النقاش" icon="account-voice" variant="gold" onPress={() => setPhase('discuss')} />
          ) : (
            <Button title="إلى التصويت" icon="gavel" variant="gold" onPress={() => setPhase('vote')} />
          )
        }
      >
        {deadInfo.length === 0 ? (
          <Frame variant="plaque" accent={colors.town} corners rad={radius.lg} padding={space.xl} glow style={styles.peaceful}>
            <Icon name="shield-check" size={66} color={colors.town} />
            <Text style={styles.peaceTitle}>ليلة بلا دماء</Text>
            <Text style={styles.peaceText}>نجا الجميع حتى الصباح</Text>
          </Frame>
        ) : (
          <>
            <Text style={styles.sectionLabel}>نعيٌ ووفيات</Text>
            {deadInfo.map((d, i) => (
              <Frame key={i} variant="plaque" accent={d.role.color} rad={radius.lg} padding={space.lg} glow style={styles.deathCard}>
                <Icon name="grave-stone" size={50} color={colors.textDim} />
                <Text style={styles.deathName}>{d.name}</Text>
                <Text style={styles.deathCause}>{CAUSE_TEXT[d.cause] || 'فارق الحياة'}</Text>
                <Ribbon label={d.role.name} icon={d.role.icon} color={d.role.color} textColor="#241A0E" height={28} />
              </Frame>
            ))}
          </>
        )}
      </Screen>
    );
  }

  // ── النقاش ──
  if (phase === 'discuss') {
    return (
      <Screen
        title={`اليوم ${dayNumber}`}
        subtitle="وقت النقاش"
        backdrop="felt"
        footer={<Button title="إلى التصويت" icon="gavel" variant="danger" onPress={() => setPhase('vote')} />}
      >
        <Timer seconds={discussSeconds} accent={colors.gold} />
        <Text style={styles.discussHint}>ناقشوا، اتّهموا، دافعوا — من الخائن بينكم؟</Text>
        <View style={styles.aliveWrap}>
          {livePlayers.map((p) => (
            <View key={p.id} style={styles.aliveChip}>
              <Icon name="account" size={13} color={colors.gold} />
              <Text style={styles.aliveName}>{p.name}</Text>
            </View>
          ))}
        </View>
      </Screen>
    );
  }

  // ── كشف المُعدَم ──
  if (phase === 'reveal') {
    return (
      <Screen title="حُكم الجماعة" subtitle="رُفعت الستار" backdrop="felt" footer={<Button title="تابع" variant="gold" onPress={() => onExecute(executed.id)} />}>
        <View style={styles.revealTop}>
          <Ribbon label={`أُعدم  ${executed.name}`} icon="gavel" color={colors.gold} textColor="#241A0E" height={32} big />
        </View>
        <RoleCard role={executed.role} size="md" />
      </Screen>
    );
  }

  // ── التصويت ──
  return (
    <Screen
      title="التصويت"
      subtitle="من الخائن؟"
      backdrop="felt"
      footer={
        <>
          <Button title="بلا إعدام" variant="ghost" onPress={() => onExecute(null)} />
          <Button title="تنفيذ الإعدام" icon="gavel" variant="danger" onPress={confirmVote} disabled={selected == null} />
        </>
      }
    >
      <Text style={styles.voteHint}>اختر من نال أكثر الأصوات لتنفيذ الحكم</Text>
      {livePlayers.map((p) => (
        <PlayerChip key={p.id} player={p} selected={selected === p.id} accent={colors.blood} onPress={() => setSelected(p.id)} />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  peaceful: { alignItems: 'center', gap: space.sm, marginTop: space.sm },
  peaceTitle: { color: colors.town, fontSize: font.h1, fontFamily: serif, marginTop: space.sm },
  peaceText: { color: colors.textDim, fontSize: font.body, textAlign: 'center', fontFamily: body },
  sectionLabel: { color: colors.frame, fontSize: font.h2, fontFamily: serif, textAlign: 'right', marginBottom: space.sm },
  deathCard: { alignItems: 'center', gap: 6, marginBottom: space.md },
  deathName: { color: colors.text, fontSize: font.h1, fontFamily: serif },
  deathCause: { color: colors.textDim, fontSize: font.body, marginBottom: 4, textAlign: 'center', fontFamily: body },
  discussHint: { color: colors.textDim, fontSize: font.body, textAlign: 'center', fontFamily: body, marginTop: space.sm, marginBottom: space.md },
  aliveWrap: { flexDirection: 'row-reverse', flexWrap: 'wrap', justifyContent: 'center', gap: space.sm },
  aliveChip: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(20,16,11,0.6)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: space.md,
    paddingVertical: 6,
  },
  aliveName: { color: colors.text, fontSize: font.small, fontFamily: bodyBold },
  revealTop: { alignItems: 'center', marginBottom: space.md },
  voteHint: { color: colors.textDim, fontSize: font.small, lineHeight: 22, marginBottom: space.md, textAlign: 'right', fontFamily: body },
});
