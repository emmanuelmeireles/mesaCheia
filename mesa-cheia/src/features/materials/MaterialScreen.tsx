import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { materialCatalog, type MaterialEntry } from "../../data/mockData";
import { colors } from "../../theme";
import { calculatePoints } from "../../utils/points";

type MaterialScreenProps = {
  entries: MaterialEntry[];
  onSubmit: (materialId: string, weightKg: number) => void;
};

export function MaterialScreen({ entries, onSubmit }: MaterialScreenProps) {
  const [materialId, setMaterialId] = useState(materialCatalog[0].id);
  const [weightKg, setWeightKg] = useState("2");

  const selectedMaterial = useMemo(
    () => materialCatalog.find((item) => item.id === materialId) ?? materialCatalog[0],
    [materialId],
  );

  const pointsPreview = calculatePoints(selectedMaterial, Number(weightKg || 0));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de material</Text>

      <Text style={styles.label}>Tipo de material</Text>
      <View style={styles.chipGroup}>
        {materialCatalog.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => setMaterialId(item.id)}
            style={[styles.chip, item.id === materialId && styles.chipActive]}
          >
            <Text style={styles.chipText}>{item.name}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Peso em kg</Text>
      <TextInput
        value={weightKg}
        onChangeText={setWeightKg}
        keyboardType="decimal-pad"
        style={styles.input}
      />

      <View style={styles.previewBox}>
        <Text style={styles.previewLabel}>Pré-visualização</Text>
        <Text style={styles.previewValue}>{pointsPreview} pontos</Text>
      </View>

      <Pressable
        style={styles.primaryButton}
        onPress={() => onSubmit(materialId, Number(weightKg || 0))}
      >
        <Text style={styles.primaryButtonText}>Salvar material</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>Últimos registros</Text>
      {entries.length === 0 ? (
        <Text style={styles.empty}>Nenhum material cadastrado ainda.</Text>
      ) : (
        entries.slice(0, 5).map((entry) => {
          const item = materialCatalog.find((material) => material.id === entry.materialId);
          return (
            <View key={entry.id} style={styles.entry}>
              <Text style={styles.entryTitle}>{item?.name ?? "Material"}</Text>
              <Text style={styles.entryMeta}>{entry.weightKg} kg • {entry.pointsEarned} pts</Text>
            </View>
          );
        })
      )}
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
  label: {
    color: colors.foreground,
    fontSize: 14,
    fontWeight: "700",
  },
  chipGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "rgba(246, 241, 228, 0.04)",
  },
  chipActive: {
    backgroundColor: colors.orange,
    borderColor: colors.orange,
  },
  chipText: {
    color: colors.foreground,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "rgba(246, 241, 228, 0.05)",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    color: colors.foreground,
    padding: 14,
  },
  previewBox: {
    backgroundColor: "rgba(169, 204, 89, 0.12)",
    padding: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(169, 204, 89, 0.5)",
  },
  previewLabel: {
    color: colors.foreground,
    fontWeight: "600",
  },
  previewValue: {
    marginTop: 6,
    color: colors.green,
    fontSize: 26,
    fontWeight: "800",
  },
  primaryButton: {
    backgroundColor: colors.orange,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  primaryButtonText: {
    color: colors.background,
    fontWeight: "800",
  },
  sectionTitle: {
    color: colors.foreground,
    fontSize: 18,
    fontWeight: "700",
    marginTop: 8,
  },
  entry: {
    backgroundColor: "rgba(246, 241, 228, 0.04)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  entryTitle: {
    color: colors.foreground,
    fontWeight: "700",
  },
  entryMeta: {
    color: colors.muted,
    marginTop: 4,
  },
  empty: {
    color: colors.muted,
  },
});
