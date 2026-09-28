import { ScrollView, StyleSheet, Text, View } from "react-native";

import { partners } from "../../data/mockData";
import { colors } from "../../theme";

export function MapScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mapa</Text>
      <View style={styles.mapBox}>
        <Text style={styles.mapText}>Pontos de coleta próximos</Text>
      </View>

      {partners.map((partner) => (
        <View key={partner.id} style={styles.card}>
          <Text style={styles.cardTitle}>{partner.name}</Text>
          <Text style={styles.cardMeta}>{partner.type}</Text>
          <Text style={styles.cardMeta}>{partner.distance} • {partner.city}</Text>
        </View>
      ))}
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
  mapBox: {
    backgroundColor: "rgba(169, 204, 89, 0.14)",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(169, 204, 89, 0.5)",
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 140,
  },
  mapText: {
    color: colors.foreground,
    fontWeight: "700",
    fontSize: 18,
  },
  card: {
    backgroundColor: "rgba(246, 241, 228, 0.04)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  cardTitle: {
    color: colors.foreground,
    fontSize: 18,
    fontWeight: "700",
  },
  cardMeta: {
    marginTop: 4,
    color: colors.muted,
  },
});
