import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import Icon from '../components/Icon';
import Frame from '../components/Frame';
import RoleCard from '../components/RoleCard';
import Backdrop from '../art/Backdrop';
import Logo from '../art/Logo';
import { ROLES } from '../data/roles';
import { allMafia } from '../game/engine';
import * as feedback from '../feedback';
import { colors, space, font, radius, serif, body, bodyBold } from '../theme';

export default function DealScreen({ players, onDone, onBack }) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const player = players[index];
  const isLast = index === players.length - 1;
  const role = ROLES[player.role];

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
    <View style={styles.root}>
      <Backdrop variant="room" />
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        {/* شريط التقدّم */}
        <View style={styles.progressWrap}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${((index + 1) / players.length) * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>{index + 1} / {players.length}</Text>
        </View>

        {!revealed ? (
          // ظهر البطاقة — مرّر الجوال
          <View style={styles.center}>
            <Frame variant="plaque" corners rad={radius.lg} padding={space.xl} glow style={styles.backCard}>
              <Text style={styles.passHint}>مرّر الجوال إلى</Text>
              <Text style={styles.passName}>{player.name}</Text>
              <View style={styles.emblem}>
                <Logo size={128} />
              </View>
              <View style={styles.noteRow}>
                <Icon name="eye-off-outline" size={15} color={colors.textFaint} />
                <Text style={styles.passNote}>لا تدع أحداً يرى شاشتك</Text>
              </View>
            </Frame>
            <Button title="اكشف دوري" icon="cards" variant="gold" onPress={() => { feedback.reveal(); setRevealed(true); }} style={styles.cta} />
            {index === 0 ? <Button title="رجوع" variant="ghost" onPress={onBack} style={styles.backBtn} /> : null}
          </View>
        ) : (
          // كشف الدور
          <ScrollView contentContainerStyle={styles.revealScroll} showsVerticalScrollIndicator={false}>
            <RoleCard role={player.role} size="lg">
              {knowsMates ? (
                <Frame variant="plaque" accent={colors.blood} rad={radius.md} padding={space.md} style={styles.matesBox}>
                  <View style={styles.matesHead}>
                    <Icon name="account-group" size={18} color={colors.bloodLight} />
                    <Text style={styles.matesLabel}>شركاؤك في الجريمة</Text>
                  </View>
                  <Text style={styles.matesNames}>{mates.join('   •   ')}</Text>
                </Frame>
              ) : null}
            </RoleCard>

            <View style={styles.memorizeRow}>
              <Icon name="brain" size={16} color={colors.textFaint} />
              <Text style={styles.memorize}>احفظ دورك جيداً</Text>
            </View>
            <Button
              title={isLast ? 'ابدأ الليلة' : 'التالي'}
              icon={isLast ? 'weather-night' : 'arrow-left'}
              variant={isLast ? 'gold' : 'primary'}
              onPress={next}
              style={styles.cta}
            />
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  safe: { flex: 1, padding: space.lg },
  progressWrap: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  progressBar: { flex: 1, height: 8, backgroundColor: colors.card, borderRadius: 4, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  progressFill: { height: '100%', backgroundColor: colors.gold, borderRadius: 4 },
  progressText: { color: colors.textDim, fontSize: font.small, fontFamily: bodyBold, minWidth: 52, textAlign: 'center' },

  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  backCard: { width: '100%', alignItems: 'center' },
  passHint: { color: colors.textDim, fontSize: font.body, fontFamily: body },
  passName: { color: colors.frame, fontSize: 40, marginVertical: space.xs, textAlign: 'center', fontFamily: serif },
  emblem: { marginVertical: space.md },
  noteRow: { flexDirection: 'row-reverse', alignItems: 'center', gap: 6 },
  passNote: { color: colors.textFaint, fontSize: font.small, fontFamily: body },
  cta: { width: '100%', marginTop: space.lg },
  backBtn: { width: '100%', marginTop: space.sm },

  revealScroll: { alignItems: 'center', paddingVertical: space.sm },
  matesBox: { width: '100%', alignItems: 'center', marginTop: space.md },
  matesHead: { flexDirection: 'row-reverse', alignItems: 'center', gap: 6 },
  matesLabel: { color: colors.bloodLight, fontSize: font.small, fontFamily: bodyBold },
  matesNames: { color: colors.text, fontSize: font.h2, fontFamily: serif, marginTop: 6, textAlign: 'center' },
  memorizeRow: { flexDirection: 'row-reverse', alignItems: 'center', gap: 6, marginVertical: space.lg },
  memorize: { color: colors.textFaint, fontSize: font.small, fontFamily: body },
});
