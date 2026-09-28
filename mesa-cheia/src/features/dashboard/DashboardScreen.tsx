import { ScrollView, StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme";
import { formatPoints } from "../../utils/points";

type DashboardScreenProps = {
  userName: string;
  points: number;
  thisMonthPoints: number;
  entriesCount: number;
  highlights: Array<{ label: string; value: string }>;
};

export function DashboardScreen({
  userName,
  points,
  thisMonthPoints,
  entriesCount,
  highlights,
}: DashboardScreenProps) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.greeting}>Olá, {userName}</Text>
      <View style={styles.cardPrimary}>
        <Text style={styles.cardLabel}>Saldo de pontos</Text>
        <Text style={styles.points}>{formatPoints(points)}</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Este mês</Text>
          <Text style={styles.cardValue}>{formatPoints(thisMonthPoints)}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Envios</Text>
          <Text style={styles.cardValue}>{entriesCount}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Resumo</Text>
      <View style={styles.highlightList}>
        {highlights.map((item) => (
          <View key={item.label} style={styles.highlightItem}>
            <Text style={styles.highlightLabel}>{item.label}</Text>
            <Text style={styles.highlightValue}>{item.value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 18,
  },
  greeting: {
    color: colors.foreground,
    fontSize: 28,
    fontWeight: "800",
  },
  cardPrimary: {
    backgroundColor: colors.orange,
    borderRadius: 18,
    padding: 20,
  },
  cardLabel: {
    color: colors.muted,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  points: {
    marginTop: 10,
    color: colors.background,
    fontSize: 34,
    fontWeight: "900",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  card: {
    flex: 1,
    backgroundColor: "rgba(246, 241, 228, 0.05)",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardValue: {
    marginTop: 8,
    color: colors.foreground,
    fontSize: 24,
    fontWeight: "700",
  },
  sectionTitle: {
    color: colors.foreground,
    fontSize: 18,
    fontWeight: "800",
  },
  highlightList: {
    gap: 12,
  },
  highlightItem: {
    backgroundColor: "rgba(246, 241, 228, 0.04)",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  highlightLabel: {
    color: colors.muted,
    fontSize: 14,
  },
  highlightValue: {
    color: colors.foreground,
    fontWeight: "700",
  },
});
