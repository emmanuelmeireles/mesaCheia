import { useState } from "react";
import {
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const colors = {
  background: "#142A1D",
  foreground: "#F6F1E4",
  muted: "rgba(246, 241, 228, 0.7)",
  faint: "rgba(246, 241, 228, 0.5)",
  border: "rgba(246, 241, 228, 0.15)",
  orange: "#E8791F",
  green: "#A9CC59",
};

const steps = [
  {
    number: "01",
    title: "Separe e leve",
    description:
      "Separe recicláveis limpos e secos e leve até um ponto de troca parceiro perto de você.",
  },
  {
    number: "02",
    title: "Pese e receba pontos",
    description:
      "O operador pesa o material na hora e credita os pontos direto na sua conta, sem burocracia.",
  },
  {
    number: "03",
    title: "Troque por comida fresca",
    description:
      "Use os pontos ali mesmo por frutas, legumes e verduras de hortas e produtores parceiros.",
  },
];

const partners = [
  "Cooperativas de reciclagem",
  "Hortas comunitárias",
  "ONGs de combate à fome",
  "Prefeituras parceiras",
];

export default function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function submitEmail() {
    if (email.trim()) {
      setSubmitted(true);
    }
  }

  function scrollToSection(section: "how-it-works" | "waitlist") {
    Linking.openURL(`troca-verde://${section}`).catch(() => undefined);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>
            Troca<Text style={styles.logoAccent}>verde</Text>
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => scrollToSection("waitlist")}
            style={styles.outlineButton}
          >
            <Text style={styles.outlineButtonText}>Entrar na lista</Text>
          </Pressable>
        </View>

        <View style={styles.hero}>.
        
          <Text style={styles.eyebrow}>UM APP PRA RECICLAGEM QUE ALIMENTA</Text>
          <Text style={styles.heroTitle}>
            Recicle.{"\n"}Troque.{"\n"}
            <Text style={styles.orangeText}>Coma.</Text>
          </Text>
          <Text style={styles.heroDescription}>
            Leve seus recicláveis limpos até um ponto de troca parceiro e volte
            pra casa com frutas, legumes e verduras frescas, na hora.
          </Text>
          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              onPress={() => scrollToSection("waitlist")}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>Entrar na lista de espera</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={() => scrollToSection("how-it-works")}
              style={styles.outlineButton}
            >
              <Text style={styles.outlineButtonText}>Ver como funciona</Text>
            </Pressable>
          </View>
          <View style={styles.stamp} accessibilityElementsHidden>
            <Text style={styles.stampText}>2KG ♻️</Text>
            <Text style={styles.stampEquals}>=</Text>
            <Text style={styles.stampText}>1KG 🥬</Text>
          </View>
        </View>

        <View style={styles.section} nativeID="how-it-works">
          <Text style={styles.sectionLabel}>COMO FUNCIONA</Text>
          <View style={styles.steps}>
            {steps.map((step) => (
              <View key={step.number} style={styles.step}>
                <Text style={styles.stepNumber}>{step.number}</Text>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.bodyText}>{step.description}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.goals}>
          <Text style={styles.sectionLabel}>METAS DO PILOTO</Text>
          <View style={styles.goalGrid}>
            <Goal value="500+" label="famílias no primeiro bairro" />
            <Goal value="10" label="pontos de troca parceiros" />
            <Goal value="5t" label="de recicláveis coletados por mês" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>FEITO JUNTO COM</Text>
          <View style={styles.partnerList}>
            {partners.map((partner) => (
              <View key={partner} style={styles.partnerTag}>
                <Text style={styles.partnerText}>{partner}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.cta} nativeID="waitlist">
          <Text style={styles.ctaTitle}>Quer levar o Trocaverde pro seu bairro?</Text>
          <Text style={styles.bodyText}>
            Deixe seu e-mail e avisamos assim que abrirmos um ponto de troca perto de você.
          </Text>
          {submitted ? (
            <Text style={styles.successText}>E-mail recebido. Obrigado!</Text>
          ) : (
            <View style={styles.form}>
              <TextInput
                accessibilityLabel="Seu e-mail"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={setEmail}
                placeholder="seu@email.com"
                placeholderTextColor="rgba(246, 241, 228, 0.4)"
                style={styles.input}
                value={email}
              />
              <Pressable
                accessibilityRole="button"
                onPress={submitEmail}
                style={styles.primaryButton}
              >
                <Text style={styles.primaryButtonText}>Entrar na lista</Text>
              </Pressable>
            </View>
          )}
        </View>

        <Text style={styles.footer}>Trocaverde - reciclagem que vira comida.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Goal({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.goal}>
      <Text style={styles.goalValue}>{value}</Text>
      <Text style={styles.goalLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { width: "100%", maxWidth: 960, alignSelf: "center", padding: 24, paddingBottom: 40 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 16 },
  logo: { color: colors.foreground, fontSize: 18, fontWeight: "900", letterSpacing: 0.5 },
  logoAccent: { color: colors.green },
  hero: { paddingTop: 52, paddingBottom: 100, position: "relative" },
  eyebrow: { color: colors.green, fontSize: 12, fontWeight: "700", letterSpacing: 2, marginBottom: 30 },
  heroTitle: { color: colors.foreground, fontSize: 60, fontWeight: "900", lineHeight: 60, letterSpacing: 0.5, marginBottom: 28 },
  orangeText: { color: colors.orange },
  heroDescription: { maxWidth: 520, color: colors.muted, fontSize: 18, lineHeight: 29, marginBottom: 28 },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  primaryButton: { minHeight: 48, borderRadius: 24, backgroundColor: colors.orange, paddingHorizontal: 24, alignItems: "center", justifyContent: "center" },
  primaryButtonText: { color: colors.background, fontSize: 14, fontWeight: "700" },
  outlineButton: { minHeight: 48, borderRadius: 24, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 18, alignItems: "center", justifyContent: "center" },
  outlineButtonText: { color: colors.foreground, fontSize: 14, fontWeight: "600" },
  stamp: { position: "absolute", right: 10, top: 48, width: 150, height: 150, borderRadius: 75, borderWidth: 2, borderStyle: "dashed", borderColor: "rgba(169, 204, 89, 0.6)", alignItems: "center", justifyContent: "center", transform: [{ rotate: "-9deg" }] },
  stampText: { color: colors.foreground, fontSize: 22, fontWeight: "700", lineHeight: 27 },
  stampEquals: { color: colors.green, fontSize: 12, fontWeight: "700", marginVertical: 2 },
  section: { paddingVertical: 42 },
  sectionLabel: { color: colors.green, fontSize: 12, fontWeight: "700", letterSpacing: 2, marginBottom: 32 },
  steps: { flexDirection: "row", flexWrap: "wrap", gap: 28 },
  step: { flex: 1, minWidth: 220, gap: 10 },
  stepNumber: { color: colors.orange, fontSize: 14, fontWeight: "700" },
  stepTitle: { color: colors.foreground, fontSize: 20, fontWeight: "700" },
  bodyText: { color: colors.muted, fontSize: 15, lineHeight: 24 },
  goals: { marginVertical: 42, padding: 32, borderRadius: 16, borderWidth: 1, borderColor: "rgba(246, 241, 228, 0.1)", backgroundColor: "rgba(246, 241, 228, 0.05)" },
  goalGrid: { flexDirection: "row", flexWrap: "wrap", gap: 28 },
  goal: { flex: 1, minWidth: 160, gap: 4 },
  goalValue: { color: colors.foreground, fontSize: 38, fontWeight: "700" },
  goalLabel: { color: colors.faint, fontSize: 14, lineHeight: 20 },
  partnerList: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  partnerTag: { borderRadius: 20, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 16, paddingVertical: 10 },
  partnerText: { color: colors.muted, fontSize: 14 },
  cta: { paddingTop: 58, paddingBottom: 70, borderTopWidth: 1, borderTopColor: "rgba(246, 241, 228, 0.1)", gap: 18 },
  ctaTitle: { maxWidth: 480, color: colors.foreground, fontSize: 32, lineHeight: 36, fontWeight: "900" },
  form: { flexDirection: "row", flexWrap: "wrap", gap: 10, maxWidth: 560 },
  input: { flex: 1, minWidth: 220, height: 48, borderRadius: 24, borderWidth: 1, borderColor: colors.border, color: colors.foreground, paddingHorizontal: 20, fontSize: 14 },
  successText: { color: colors.green, fontSize: 15, fontWeight: "600" },
  footer: { paddingTop: 28, borderTopWidth: 1, borderTopColor: "rgba(246, 241, 228, 0.1)", color: colors.faint, fontSize: 14 },
});