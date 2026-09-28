import { ScrollView, StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme";
import { formatPoints } from "../../utils/points";

type ProfileScreenProps = {
  name: string;
  email: string;
  city: string;
  points: number;
  totalRecyclingKg: number;
};

export function ProfileScreen({
  name,
  email,
  city,
  points,
  totalRecyclingKg,
}: ProfileScreenProps) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nome</Text>
        <Text style={styles.value}>{name}</Text>

        <Text style={styles.label}>E-mail</Text>
        <Text style={styles.value}>{email}</Text>

        <Text style={styles.label}>Cidade</Text>
        <Text style={styles.value}>{city}</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Pontos</Text>
          <Text style={styles.statValue}>{formatPoints(points)}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Reciclado</Text>
          <Text style={styles.statValue}>{totalRecyclingKg} kg</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 18,
  },
  title: {
    color: colors.foreground,
    fontSize: 28,
    fontWeight: "800",
  },
  card: {
    backgroundColor: "rgba(246, 241, 228, 0.04)",
    borderRadius: 16,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 18,
    gap: 10,
  },
  label: {
    color: colors.muted,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  value: {
    color: colors.foreground,
    fontSize: 18,
    fontWeight: "700",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: "rgba(246, 241, 228, 0.04)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
  },
  statLabel: {
    color: colors.muted,
    fontSize: 12,
    textTransform: "uppercase",
  },
  statValue: {
    color: colors.foreground,
    fontSize: 22,
    fontWeight: "800",
    marginTop: 8,
  },
});
