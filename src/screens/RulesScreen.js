import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import Icon from '../components/Icon';
import Divider from '../components/Divider';
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
      <Icon name="circle-medium" size={18} color={colors.gold} style={{ marginTop: 2 }} />
    </View>
  );
}

export default function RulesScreen({ onBack }) {
  return (
    <Screen title="الأدوار والقوانين" onBack={onBack}>
      <Section title="الفكرة" icon="bullseye-arrow">
        <Text style={styles.p}>
          <Text style={styles.bMafia}>المافيا</Text> تقتل ليلا.
          <Text style={styles.bTown}> المدنيون</Text> يكشفونها نهارا بالتصويت.
        </Text>
      </Section>

      <Section title="الأدوار" icon="cards">
        {ROLE_ORDER.map((k) => {
          const r = ROLES[k];
          return (
            <View key={k} style={[styles.roleCard, { borderColor: r.color }]}>
              <View style={styles.roleHead}>
                <View style={[styles.teamTag, { backgroundColor: r.color }]}>
                  <Text style={styles.teamTagText}>{TEAM_LABEL[r.team]}</Text>
                </View>
                <View style={styles.roleNameWrap}>
                  <Text style={styles.roleName}>{r.name}</Text>
                  <Icon name={r.icon} size={20} color={r.color} />
                </View>
              </View>
              <Text style={styles.roleDesc}>{r.desc}</Text>
            </View>
          );
        })}
      </Section>

      <Section title="سير الجولة" icon="theater">
        <Bullet>الليل: المافيا تقتل، الطبيب يحمي، المحقق يفحص.</Bullet>
        <Bullet>النهار: يظهر القتلى ويبدأ النقاش.</Bullet>
        <Bullet>التصويت: اعدام مشتبه ويظهر دوره.</Bullet>
        <Bullet>تتكرر الجولات حتى يفوز فريق.</Bullet>
      </Section>

      <Section title="الفوز" icon="trophy">
        <Bullet>المدنيون: بقتل كل المافيا.</Bullet>
        <Bullet>المافيا: لو تساووا مع المدنيين أو زادوا.</Bullet>
        <Bullet>المهرج: لو اعدم بالتصويت.</Bullet>
      </Section>

      <Section title="للمدير" icon="microphone">
        <Bullet>ثبت ايقاع سريع.</Bullet>
        <Bullet>لا تكشف المافيا بتعابير وجهك.</Bullet>
        <Bullet>للاطفال: مافيا وطبيب ومدنيون فقط.</Bullet>
        <Bullet>الموتى يتفرجون بلا تلميح.</Bullet>
      </Section>

      {/* صندوق النصيحة */}
      <View style={styles.tipBox}>
        <View style={styles.tipHead}>
          <Icon name="hat-fedora" size={22} color={colors.frame} />
          <Text style={styles.tipTitle}>نصيحة</Text>
        </View>
        <Divider width={120} />
        <Text style={styles.tipText}>راقب من يتكلم كثير ومن يسكت — الحقيقة أقرب مما تظن.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: space.lg },
  sectionHead: { flexDirection: 'row-reverse', alignItems: 'center', gap: 8, marginBottom: space.sm },
  sectionTitle: { color: colors.gold, fontSize: font.h2 + 4, fontFamily: serif, textAlign: 'right' },
  p: { color: colors.text, fontSize: font.body, lineHeight: 28, textAlign: 'right', fontFamily: body },
  bMafia: { color: colors.blood, fontFamily: bodyBold },
  bTown: { color: colors.town, fontFamily: bodyBold },
  roleCard: {
    backgroundColor: colors.card,
    borderRightWidth: 4,
    borderRadius: radius.md,
    padding: space.md,
    marginBottom: space.sm,
  },
  roleHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  roleNameWrap: { flexDirection: 'row-reverse', alignItems: 'center', gap: 6 },
  roleName: { color: colors.text, fontSize: font.h2 + 2, fontFamily: serif },
  teamTag: { borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 3 },
  teamTagText: { color: '#16100A', fontSize: 11, fontFamily: bodyBold },
  roleDesc: { color: colors.textDim, fontSize: font.small, lineHeight: 22, textAlign: 'right', fontFamily: body },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end', gap: 6, marginBottom: 8 },
  bulletText: { color: colors.text, fontSize: font.body, lineHeight: 26, flexShrink: 1, textAlign: 'right', fontFamily: body },
  tipBox: {
    backgroundColor: colors.cardSoft,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: space.md,
    alignItems: 'center',
    gap: space.sm,
    marginTop: space.sm,
  },
  tipHead: { flexDirection: 'row-reverse', alignItems: 'center', gap: 8 },
  tipTitle: { color: colors.frame, fontSize: font.h2, fontFamily: serif },
  tipText: { color: colors.textDim, fontSize: font.small, lineHeight: 22, textAlign: 'center', fontFamily: body },
});
