import { Text, View } from "react-native";

import { PrimaryButton } from "../ui/PrimaryButton";
import { OutlineButton } from "../ui/OutlineButton";
import { styles } from "../../styles";

type HeroSectionProps = {
  onWaitlistPress: () => void;
  onHowItWorksPress: () => void;
};

export function HeroSection({
  onWaitlistPress,
  onHowItWorksPress,
}: HeroSectionProps) {
  return (
    <View style={styles.hero}>
      <Text style={styles.eyebrow}>UM APP PRA RECICLAGEM QUE ALIMENTA</Text>
      <Text style={styles.heroTitle}>
        Recicle.{"\n"}Troque.{"\n"}
        <Text style={styles.orangeText}>Coma.</Text>
      </Text>
      <Text style={styles.heroDescription}>
        Leve seus recicláveis limpos até um ponto de troca parceiro e volte pra
        casa com frutas, legumes e verduras frescas, na hora.
      </Text>

      <View style={styles.actions}>
        <PrimaryButton title="Entrar na lista de espera" onPress={onWaitlistPress} />
        <OutlineButton title="Ver como funciona" onPress={onHowItWorksPress} />
      </View>

      <View style={styles.stamp} accessibilityElementsHidden>
        <Text style={styles.stampText}>2KG ♻️</Text>
        <Text style={styles.stampEquals}>=</Text>
        <Text style={styles.stampText}>1KG 🥬</Text>
      </View>
    </View>
  );
}
