import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import Button from '../components/Button';
import Icon from '../components/Icon';
import RoleArt from '../art/RoleArt';
import PlayerChip from '../components/PlayerChip';
import { ROLES } from '../data/roles';
import { alive, aliveMafia, investigate } from '../game/engine';
import { colors, space, font, radius, serif } from '../theme';

// تعليمات كل خطوة ليلية
const STEP_META = {
  mafia: {
    role: 'mafia',
    title: 'المافيا',
    instruction: 'اختر ضحية المافيا',
    action: 'قتل',
  },
  doctor: {
    role: 'doctor',
    title: 'الطبيب',
    instruction: 'اختر من يحميه الطبيب',
    action: 'حماية',
  },
  detective: {
    role: 'detective',
    title: 'المحقق',
    instruction: 'اختر من يفحصه المحقق',
    action: 'فحص',
  },
  sniper: {
    role: 'sniper',
    title: 'القناص',
    instruction: 'اختر هدف القناص أو تخط',
    action: 'إطلاق',
  },
};

export default function NightScreen({ players, dayNumber, onResolve }) {
  // تحديد الخطوات الفعّالة حسب من هو حيّ
  const steps = useMemo(() => {
    const list = [];
    if (aliveMafia(players).length > 0) list.push('mafia');
    if (players.some((p) => p.alive && p.role === 'doctor')) list.push('doctor');
    if (players.some((p) => p.alive && p.role === 'detective')) list.push('detective');
    if (players.some((p) => p.alive && p.role === 'sniper' && !p.sniperUsed)) list.push('sniper');
    return list;
  }, [players]);

  const [stepIdx, setStepIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [actions, setActions] = useState({});
  const [detectiveResult, setDetectiveResult] = useState(null);

  const livePlayers = alive(players);
  const stepKey = steps[stepIdx];
  const meta = stepKey ? STEP_META[stepKey] : null;
  const role = meta ? ROLES[meta.role] : null;

  const goNext = (extraAction) => {
    const merged = { ...actions, ...extraAction };
    setActions(merged);
    setSelected(null);
    setDetectiveResult(null);
    if (stepIdx + 1 >= steps.length) {
      onResolve(merged);
    } else {
      setStepIdx(stepIdx + 1);
    }
  };

  const confirm = () => {
    if (stepKey === 'mafia') goNext({ mafiaTarget: selected });
    else if (stepKey === 'doctor') goNext({ doctorTarget: selected });
    else if (stepKey === 'sniper') goNext({ sniperTarget: selected });
    else if (stepKey === 'detective') {
      // عرض النتيجة قبل المتابعة
      const target = players.find((p) => p.id === selected);
      setDetectiveResult(investigate(target));
    }
  };

  // لا توجد خطوات ليلية (مثلاً مدنيون فقط) → ليلة هادئة
  if (steps.length === 0) {
    return (
      <Screen title={`الليلة ${dayNumber}`} subtitle="الجميع نائم">
        <View style={styles.empty}>
          <Icon name="weather-night" size={64} color={colors.textDim} style={styles.emptyIcon} />
          <Text style={styles.emptyText}>ليلة هادئة</Text>
        </View>
        <Button title="طلوع النهار" icon="white-balance-sunny" onPress={() => onResolve({})} />
      </Screen>
    );
  }

  const accent = role.color;

  return (
    <Screen
      title={`الليلة ${dayNumber}`}
      subtitle={`${stepIdx + 1} / ${steps.length}`}
      footer={
        detectiveResult ? (
          <Button title="تابع" onPress={() => goNext()} />
        ) : (
          <>
            {stepKey === 'sniper' ? (
              <Button title="تخط" variant="ghost" onPress={() => goNext({ sniperTarget: null })} />
            ) : null}
            <Button
              title={`تأكيد ${meta.action}`}
              variant={role.team === 'mafia' ? 'danger' : 'primary'}
              onPress={confirm}
              disabled={selected == null}
            />
          </>
        )
      }
    >
      <View style={[styles.banner, { borderColor: accent }]}>
        <RoleArt role={meta.role} size={84} />
        <Text style={[styles.bannerTitle, { color: accent }]}>{meta.title}</Text>
        <Text style={styles.bannerInstruction}>{meta.instruction}</Text>
      </View>

      {detectiveResult ? (
        // نتيجة المحقق
        <View style={styles.resultWrap}>
          <Text style={styles.resultLabel}>{players.find((p) => p.id === selected)?.name}</Text>
          <View
            style={[
              styles.resultBadge,
              { backgroundColor: detectiveResult === 'mafia' ? colors.blood : colors.town },
            ]}
          >
            <Icon name={detectiveResult === 'mafia' ? 'incognito' : 'account'} size={26} color="#fff" />
            <Text style={styles.resultText}>{detectiveResult === 'mafia' ? 'مافيا' : 'مدني'}</Text>
          </View>
          <Text style={styles.resultHint}>أبلغ المحقق بالنتيجة</Text>
        </View>
      ) : (
        // اختيار الهدف
        <View>
          <Text style={styles.pickLabel}>اختر لاعب</Text>
          {livePlayers.map((p) => (
            <PlayerChip
              key={p.id}
              player={p}
              selected={selected === p.id}
              accent={accent}
              onPress={() => setSelected(p.id)}
              badge={stepKey === 'doctor' ? null : undefined}
            />
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderRadius: radius.lg,
    padding: space.lg,
    alignItems: 'center',
    marginBottom: space.lg,
  },
  bannerTitle: { fontSize: font.h1, fontWeight: '900', marginVertical: space.sm, fontFamily: serif, letterSpacing: 1 },
  bannerInstruction: { color: colors.textDim, fontSize: font.body, lineHeight: 24, textAlign: 'center' },
  pickLabel: { color: colors.text, fontSize: font.body, fontWeight: '800', marginBottom: space.sm, textAlign: 'right' },
  empty: { alignItems: 'center', paddingVertical: space.xl },
  emptyIcon: { marginBottom: space.md },
  emptyText: { color: colors.textDim, fontSize: font.body, textAlign: 'center' },
  resultWrap: { alignItems: 'center', paddingVertical: space.lg },
  resultLabel: { color: colors.text, fontSize: font.body, fontWeight: '700', marginBottom: space.md, textAlign: 'center' },
  resultBadge: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
    borderRadius: radius.lg,
    paddingHorizontal: space.xl,
    paddingVertical: space.md,
  },
  resultText: { color: '#fff', fontSize: font.h1, fontWeight: '900' },
  resultHint: { color: colors.textFaint, fontSize: font.small, marginTop: space.lg, textAlign: 'center' },
});
