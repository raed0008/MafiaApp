import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import Icon from '../components/Icon';
import RoleArt from '../art/RoleArt';
import NightSky from '../art/NightSky';
import { ROLES, TEAM_LABEL } from '../data/roles';
import { allMafia } from '../game/engine';
import { colors, space, font, radius, serif } from '../theme';

export default function DealScreen({ players, onDone, onBack }) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const player = players[index];
  const isLast = index === players.length - 1;
  const role = ROLES[player.role];

  // زملاء المافيا (يعرفون بعضهم)
  const mates = allMafia(players)
    .filter((p) => p.id !== player.id)
    .map((p) => p.name);
  const knowsMates = role.team === 'mafia' && mates.length > 0;

  const next = () => {
    if (isLast) {
      onDone();
    } else {
      setRevealed(false);
      setIndex(index + 1);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <NightSky />
      <View style={styles.progressWrap}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${((index + 1) / players.length) * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {index + 1} / {players.length}
        </Text>
      </View>

      {!revealed ? (
        // غطاء — تمرير الجوال
        <View style={styles.center}>
          <Icon name="cellphone-arrow-down" size={64} color={colors.gold} style={styles.passIcon} />
          <Text style={styles.passHint}>مرر الجوال إلى</Text>
          <Text style={styles.passName}>{player.name}</Text>
          <Text style={styles.passNote}>لا تخل أحد يشوف</Text>
          <Button title="اكشف دوري" icon="eye" onPress={() => setRevealed(true)} style={styles.revealBtn} />
        </View>
      ) : (
        // كشف الدور
        <View style={styles.center}>
          <View style={[styles.roleCard, { borderColor: role.color }]}>
            <RoleArt role={player.role} size={130} />
            <Text style={[styles.roleName, { color: role.color }]}>{role.name}</Text>
            <View style={[styles.teamTag, { backgroundColor: role.color }]}>
              <Text style={styles.teamTagText}>{TEAM_LABEL[role.team]}</Text>
            </View>
            <Text style={styles.roleDesc}>{role.desc}</Text>

            {knowsMates ? (
              <View style={styles.matesBox}>
                <View style={styles.matesHead}>
                  <Icon name="account-group" size={18} color="#fff" />
                  <Text style={styles.matesLabel}>فريقك في المافيا</Text>
                </View>
                <Text style={styles.matesNames}>{mates.join('، ')}</Text>
              </View>
            ) : null}
          </View>

          <View style={styles.memorizeRow}>
            <Icon name="brain" size={16} color={colors.textFaint} />
            <Text style={styles.memorize}>احفظ دورك</Text>
          </View>
          <Button
            title={isLast ? 'ابدأ الليلة' : 'التالي'}
            icon={isLast ? 'weather-night' : undefined}
            onPress={next}
            style={styles.revealBtn}
          />
        </View>
      )}

      {index === 0 && !revealed ? (
        <Button title="رجوع" variant="ghost" onPress={onBack} style={styles.backBtn} />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg, padding: space.lg },
  progressWrap: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  progressBar: { flex: 1, height: 8, backgroundColor: colors.card, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: 8, backgroundColor: colors.gold, borderRadius: 4 },
  progressText: { color: colors.textDim, fontSize: font.small, fontWeight: '800', minWidth: 50, textAlign: 'center' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  passIcon: { marginBottom: space.md },
  passHint: { color: colors.textDim, fontSize: font.body },
  passName: { color: colors.frame, fontSize: 40, fontWeight: '900', marginVertical: space.sm, textAlign: 'center', fontFamily: serif },
  passNote: { color: colors.textFaint, fontSize: font.small, marginBottom: space.xl },
  roleCard: {
    width: '100%',
    backgroundColor: colors.card,
    borderWidth: 2,
    borderRadius: radius.lg,
    padding: space.lg,
    alignItems: 'center',
  },
  roleName: { fontSize: 36, fontWeight: '900', marginVertical: space.sm, fontFamily: serif, letterSpacing: 1 },
  teamTag: { borderRadius: radius.pill, paddingHorizontal: space.md, paddingVertical: 4, marginBottom: space.md },
  teamTagText: { color: '#0E1116', fontSize: font.small, fontWeight: '900' },
  roleDesc: { color: colors.textDim, fontSize: font.body, lineHeight: 26, textAlign: 'center' },
  matesBox: {
    marginTop: space.md,
    backgroundColor: colors.bloodDeep,
    borderRadius: radius.md,
    padding: space.md,
    width: '100%',
    alignItems: 'center',
  },
  matesHead: { flexDirection: 'row-reverse', alignItems: 'center', gap: 6 },
  matesLabel: { color: '#fff', fontSize: font.small, fontWeight: '800' },
  matesNames: { color: '#fff', fontSize: font.h2, fontWeight: '900', marginTop: 4, textAlign: 'center' },
  memorizeRow: { flexDirection: 'row-reverse', alignItems: 'center', gap: 6, marginVertical: space.lg },
  memorize: { color: colors.textFaint, fontSize: font.small },
  revealBtn: { width: '100%', marginTop: space.sm },
  backBtn: { marginTop: space.sm },
});
