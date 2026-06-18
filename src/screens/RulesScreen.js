import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import Icon from '../components/Icon';
import Frame from '../components/Frame';
import RoleArt from '../art/RoleArt';
import { Ribbon } from '../components/Nameplate';
import { Suit } from '../components/Ornament';
import { ROLES, TEAM_LABEL } from '../data/roles';
import { colors, space, font, radius, serif, body, bodyBold } from '../theme';

const ROLE_ORDER = ['mafia', 'godfather', 'doctor', 'detective', 'sniper', 'jester', 'citizen'];

function Section({ title, icon, children }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHead}>
        <Icon name={icon} size={22} color={colors.gold} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

function Bullet({ children }) {
  return (
    <View style={styles.bulletRow}>
      <Text style={styles.bulletText}>{children}</Text>
      <Suit type="diamond" size={11} color={colors.gold} />
    </View>
  );
}

export default function RulesScreen({ onBack }) {
  return (
    <Screen title="دليل اللعبة" subtitle="الأدوار والقوانين" onBack={onBack} backdrop="room">
      <Section title="الفكرة" icon="bullseye-arrow">
        <Frame variant="parchment" rad={radius.md} padding={space.md}>
          <Text style={styles.p}>
            تختبئ <Text style={styles.bMafia}>المافيا</Text> بين الناس وتقتل ليلاً، بينما يحاول
            <Text style={styles.bTown}> المدنيون</Text> كشفها نهاراً بالنقاش والتصويت.
          </Text>
        </Frame>
      </Section>

      <Section title="الأدوار" icon="cards">
        {ROLE_ORDER.map((k) => {
          const r = ROLES[k];
          return (
            <Frame key={k} variant="plaque" accent={r.color} rad={radius.md} padding={space.md} style={styles.roleCard}>
              <View style={styles.roleRow}>
                <View style={styles.roleText}>
                  <Text style={[styles.roleName, { color: r.color }]}>{r.name}</Text>
                  <Text style={styles.roleDesc}>{r.desc}</Text>
                  <View style={styles.roleRibbon}>
                    <Ribbon label={TEAM_LABEL[r.team]} color={r.color} textColor="#241A0E" height={24} />
                  </View>
                </View>
                <View style={[styles.roleThumb, { borderColor: r.color }]}>
                  <RoleArt role={k} size={56} />
                </View>
              </View>
            </Frame>
          );
        })}
      </Section>

      <Section title="سير الجولة" icon="theater">
        <Frame variant="plaque" rad={radius.md} padding={space.md}>
          <Bullet>الليل: المافيا تقتل، الطبيب يحمي، المحقق يحقّق، القنّاص يترصّد.</Bullet>
          <Bullet>الصباح: يُعلَن القتلى ويبدأ النقاش الساخن.</Bullet>
          <Bullet>التصويت: يُعدَم المشتبه ويُكشف دوره أمام الجميع.</Bullet>
          <Bullet>تتكرّر الجولات حتى يحسم أحد الفريقين الأمر.</Bullet>
        </Frame>
      </Section>

      <Section title="الفوز" icon="trophy-variant">
        <Frame variant="plaque" rad={radius.md} padding={space.md}>
          <Bullet>المدنيون: بالقضاء على كل المافيا.</Bullet>
          <Bullet>المافيا: إذا تساووا مع المدنيين أو زادوا عليهم.</Bullet>
          <Bullet>المهرّج: إذا أقنع الجماعة بإعدامه بالتصويت.</Bullet>
        </Frame>
      </Section>

      <Section title="لمدير اللعبة" icon="microphone-variant">
        <Frame variant="plaque" rad={radius.md} padding={space.md}>
          <Bullet>حافظ على إيقاع سريع ومشوّق.</Bullet>
          <Bullet>لا تفضح أحداً بنبرة صوتك أو نظراتك.</Bullet>
          <Bullet>للمبتدئين: مافيا وطبيب ومدنيون فقط.</Bullet>
          <Bullet>الموتى يشاهدون بصمت بلا تلميح.</Bullet>
        </Frame>
      </Section>

      <Frame variant="parchment" rad={radius.md} padding={space.md} corners style={styles.tipBox}>
        <View style={styles.tipHead}>
          <Icon name="hat-fedora" size={22} color={colors.goldDeep} />
          <Text style={styles.tipTitle}>همسة محقّق</Text>
        </View>
        <Text style={styles.tipText}>راقب من يُكثر الكلام ومن يلوذ بالصمت — الحقيقة أقرب مما تظن.</Text>
      </Frame>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: space.lg },
  sectionHead: { flexDirection: 'row-reverse', alignItems: 'center', gap: 8, marginBottom: space.sm },
  sectionTitle: { color: colors.frame, fontSize: font.h2 + 4, fontFamily: serif, textAlign: 'right' },
  p: { color: colors.ink, fontSize: font.body, lineHeight: 28, textAlign: 'right', fontFamily: body },
  bMafia: { color: colors.bloodDeep, fontFamily: bodyBold },
  bTown: { color: '#3F5430', fontFamily: bodyBold },
  roleCard: { marginBottom: space.sm },
  roleRow: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  roleText: { flex: 1, alignItems: 'flex-end' },
  roleName: { fontSize: font.h2 + 2, fontFamily: serif, textAlign: 'right' },
  roleDesc: { color: colors.textDim, fontSize: font.small, lineHeight: 22, textAlign: 'right', fontFamily: body, marginTop: 2 },
  roleRibbon: { marginTop: 6, alignItems: 'flex-end' },
  roleThumb: { width: 64, height: 64, borderRadius: 32, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: colors.bg },
  bulletRow: { flexDirection: 'row-reverse', alignItems: 'flex-start', gap: 8, marginBottom: 10 },
  bulletText: { color: colors.text, fontSize: font.body, lineHeight: 25, flexShrink: 1, textAlign: 'right', fontFamily: body },
  tipBox: { alignItems: 'center', gap: space.sm, marginTop: space.sm },
  tipHead: { flexDirection: 'row-reverse', alignItems: 'center', gap: 8 },
  tipTitle: { color: colors.goldDeep, fontSize: font.h2, fontFamily: serif },
  tipText: { color: colors.ink, fontSize: font.small + 1, lineHeight: 24, textAlign: 'center', fontFamily: body },
});
