import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";

import { colors } from "../../theme";

type TradeScreenProps = {
  points: number;
};

const offers = [
  { id: "offer-1", title: "Cesta básica", points: 180, description: "Frutas e verduras frescas" },
  { id: "offer-2", title: "Kit de legumes", points: 260, description: "Legumes para a semana" },
  { id: "offer-3", title: "Sacola de feira", points: 320, description: "Produtos locais e orgânicos" },
];

export function TradeScreen({ points }: TradeScreenProps) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Troca de pontos</Text>
      <Text style={styles.subtitle}>Você tem {points} pontos disponíveis.</Text>

      {offers.map((offer) => (
        <View key={offer.id} style={styles.card}>
          <Text style={styles.offerTitle}>{offer.title}</Text>
          <Text style={styles.offerMeta}>{offer.description}</Text>
          <View style={styles.offerRow}>
            <Text style={styles.points}>{offer.points} pts</Text>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Trocar</Text>
            </Pressable>
          </View>
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
  subtitle: {
    color: colors.muted,
    fontSize: 16,
  },
  card: {
    backgroundColor: "rgba(246, 241, 228, 0.04)",
    borderRadius: 16,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 18,
    gap: 10,
  },
  offerTitle: {
    color: colors.foreground,
    fontSize: 20,
    fontWeight: "700",
  },
  offerMeta: {
    color: colors.muted,
  },
  offerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  points: {
    color: colors.orange,
    fontSize: 18,
    fontWeight: "800",
  },
  button: {
    backgroundColor: colors.orange,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  buttonText: {
    color: colors.background,
    fontWeight: "800",
  },
});
