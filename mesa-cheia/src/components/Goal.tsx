import { StyleSheet, Text, View } from "react-native";

import { colors } from "../theme";

type GoalProps = {
  value: string;
  label: string;
};

export function Goal({ value, label }: GoalProps) {
  return (
    <View style={styles.goal}>
      <Text style={styles.goalValue}>{value}</Text>
      <Text style={styles.goalLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  goal: {
    flex: 1,
    minWidth: 160,
    gap: 4,
  },
  goalValue: {
    color: colors.foreground,
    fontSize: 38,
    fontWeight: "700",
  },
  goalLabel: {
    color: "rgba(246, 241, 228, 0.5)",
    fontSize: 14,
    lineHeight: 20,
  },
});
