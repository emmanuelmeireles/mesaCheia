import { ScrollView, StyleSheet, Text, View } from "react-native";

import { partners } from "../../data/mockData";
import { colors } from "../../theme";

export function PartnersScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Parceiros</Text>

      {partners.map((partner) => (
        <View key={partner.id} style={styles.card}>
          <Text style={styles.name}>{partner.name}</Text>
          <Text style={styles.meta}>{partner.type}</Text>
          <Text style={styles.meta}>{partner.city}</Text>
          <Text style={styles.distance}>{partner.distance}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
  },
  title: {
    color: colors.foreground,
    fontSize: 28,
    fontWeight: "800",
  },
  card: {
    backgroundColor: "rgba(246, 241, 228, 0.04)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  name: {
    color: colors.foreground,
    fontSize: 18,
    fontWeight: "700",
  },
  meta: {
    color: colors.muted,
    marginTop: 4,
  },
  distance: {
    color: colors.orange,
    marginTop: 8,
    fontWeight: "700",
  },
});
