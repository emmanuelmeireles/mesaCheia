import { Text, View } from "react-native";

import { Goal } from "../Goal";
import { styles } from "../../styles";

type GoalsSectionProps = {
  goals: Array<{ value: string; label: string }>;
};

export function GoalsSection({ goals }: GoalsSectionProps) {
  return (
    <View style={styles.goals}>
      <Text style={styles.sectionLabel}>METAS DO PILOTO</Text>
      <View style={styles.goalGrid}>
        {goals.map((goal) => (
          <Goal key={goal.label} value={goal.value} label={goal.label} />
        ))}
      </View>
    </View>
  );
}
