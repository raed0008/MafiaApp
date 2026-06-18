import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import Button from '../components/Button';
import Icon from '../components/Icon';
import Frame from '../components/Frame';
import Seal from '../components/Seal';
import RoleArt from '../art/RoleArt';
import PlayerChip from '../components/PlayerChip';
import { ROLES } from '../data/roles';
import { alive, aliveMafia, investigate } from '../game/engine';
import * as feedback from '../feedback';
import { colors, space, font, radius, serif, body, bodyBold } from '../theme';

const STEP_META = {
  mafia: { role: 'mafia', title: 'المافيا', instruction: 'اختر ضحية هذه الليلة', action: 'قتل' },
  doctor: { role: 'doctor', title: 'الطبيب', instruction: 'اختر من تحميه الليلة', action: 'حماية' },
  detective: { role: 'detective', title: 'المحقق', instruction: 'اختر من تحقّق في أمره', action: 'فحص' },
  sniper: { role: 'sniper', title: 'القنّاص', instruction: 'صوّب على هدفك أو تخطَّ', action: 'إطلاق' },
};

export default function NightScreen({ players, dayNumber, onResolve }) {
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
  const doctor = players.find((p) => p.role === 'doctor');

  const goNext = (extraAction) => {
    const merged = { ...actions, ...extraAction };
    setActions(merged);
    setSelected(null);
    setDetectiveResult(null);
    if (stepIdx + 1 >= steps.length) onResolve(merged);
    else setStepIdx(stepIdx + 1);
  };

  const confirm = () => {
    if (stepKey === 'mafia') goNext({ mafiaTarget: selected });
    else if (stepKey === 'doctor') goNext({ doctorTarget: selected });
    else if (stepKey === 'sniper') goNext({ sniperTarget: selected });
    else if (stepKey === 'detective') {
      feedback.reveal();
      setDetectiveResult(investigate(players.find((p) => p.id === selected)));
    }
  };

  // لا خطوات ليلية → ليلة هادئة
  if (steps.length === 0) {
    return (
      <Screen title={`الليلة ${dayNumber}`} subtitle="الجميع نائم" backdrop="room">
        <Frame variant="plaque" corners rad={radius.lg} padding={space.xl} style={styles.quiet}>
          <Icon name="weather-night" size={70} color={colors.gold} />
          <Text style={styles.quietText}>تمرّ الليلة بسلام...</Text>
        </Frame>
        <Button title="طلوع النهار" icon="white-balance-sunny" variant="gold" onPress={() => onResolve({})} />
      </Screen>
    );
  }

  const accent = role.color;
  const isMafia = role.team === 'mafia';

  return (
    <Screen
      title={`الليلة ${dayNumber}`}
      subtitle={`الدور ${stepIdx + 1} من ${steps.length}`}
      backdrop="room"
      footer={
        detectiveResult ? (
          <Button title="تابع" variant="gold" onPress={() => goNext()} />
        ) : (
          <>
            {stepKey === 'sniper' ? (
              <Button title="تخطَّ الإطلاق" variant="ghost" onPress={() => goNext({ sniperTarget: null })} />
            ) : null}
            <Button
              title={`تأكيد ${meta.action}`}
              variant={isMafia ? 'danger' : 'primary'}
              onPress={confirm}
              disabled={selected == null}
            />
          </>
        )
      }
    >
      {/* بطاقة الدور الفاعل */}
      <Frame variant="plaque" accent={accent} corners rad={radius.lg} padding={space.lg} glow style={styles.banner}>
        <View style={styles.portrait}>
          <RoleArt role={meta.role} size={86} />
        </View>
        <Text style={[styles.bannerTitle, { color: accent }]}>{meta.title}</Text>
        <Text style={styles.bannerInstruction}>{meta.instruction}</Text>
      </Frame>

      {detectiveResult ? (
        <View style={styles.resultWrap}>
          <Text style={styles.resultName}>{players.find((p) => p.id === selected)?.name}</Text>
          <Seal
            size={120}
            color={detectiveResult === 'mafia' ? colors.blood : colors.town}
            icon={detectiveResult === 'mafia' ? 'incognito' : 'shield-account'}
            label={detectiveResult === 'mafia' ? 'مافيا' : 'بريء'}
          />
          <Text style={styles.resultHint}>أبلغ المحقق بالنتيجة سرّاً</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.pickLabel}>المشتبه بهم</Text>
          {livePlayers.map((p) => {
            const isSelf = stepKey === 'doctor' && doctor && p.id === doctor.id;
            const selfBlocked = isSelf && doctor.selfHealUsed;
            return (
              <PlayerChip
                key={p.id}
                player={p}
                selected={selected === p.id}
                accent={accent}
                disabled={selfBlocked}
                onPress={() => setSelected(p.id)}
                badge={isSelf ? (selfBlocked ? 'استُخدمت' : 'نفسك') : undefined}
              />
            );
          })}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  quiet: { alignItems: 'center', gap: space.md, marginBottom: space.lg },
  quietText: { color: colors.textDim, fontSize: font.h2, fontFamily: serif, textAlign: 'center' },
  banner: { alignItems: 'center', marginBottom: space.lg },
  portrait: { marginBottom: space.sm },
  bannerTitle: { fontSize: font.title, fontFamily: serif, letterSpacing: 1, marginBottom: 4 },
  bannerInstruction: { color: colors.textDim, fontSize: font.body, lineHeight: 24, textAlign: 'center', fontFamily: body },
  pickLabel: { color: colors.frame, fontSize: font.h2, fontFamily: serif, marginBottom: space.sm, textAlign: 'right' },
  resultWrap: { alignItems: 'center', paddingVertical: space.md, gap: space.md },
  resultName: { color: colors.text, fontSize: font.h1, fontFamily: serif, textAlign: 'center' },
  resultHint: { color: colors.textFaint, fontSize: font.small, fontFamily: body, textAlign: 'center' },
});
