import { Text, View } from "react-native";

import type { Step } from "../../types";
import { styles } from "../../styles";

type HowItWorksSectionProps = {
  steps: Step[];
};

export function HowItWorksSection({ steps }: HowItWorksSectionProps) {
  return (
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
  );
}
