import { Text, View } from "react-native";

import { OutlineButton } from "../ui/OutlineButton";
import { styles } from "../../styles";

type HeaderSectionProps = {
  onWaitlistPress: () => void;
};

export function HeaderSection({ onWaitlistPress }: HeaderSectionProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>
        Troca<Text style={styles.logoAccent}>verde</Text>
      </Text>
      <OutlineButton title="Entrar na lista" onPress={onWaitlistPress} />
    </View>
  );
}
