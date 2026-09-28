import { Text, TextInput, View } from "react-native";

import { PrimaryButton } from "../ui/PrimaryButton";
import { styles } from "../../styles";

type WaitlistSectionProps = {
  email: string;
  submitted: boolean;
  onEmailChange: (value: string) => void;
  onSubmit: () => void;
};

export function WaitlistSection({
  email,
  submitted,
  onEmailChange,
  onSubmit,
}: WaitlistSectionProps) {
  return (
    <View style={styles.cta} nativeID="waitlist">
      <Text style={styles.ctaTitle}>Quer levar o Trocaverde pro seu bairro?</Text>
      <Text style={styles.bodyText}>
        Deixe seu e-mail e avisamos assim que abrirmos um ponto de troca perto de você.
      </Text>

      {submitted ? (
        <Text style={styles.successText}>E-mail recebido. Obrigado!</Text>
      ) : (
        <View style={styles.form}>
          <TextInput
            accessibilityLabel="Seu e-mail"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={onEmailChange}
            placeholder="seu@email.com"
            placeholderTextColor="rgba(246, 241, 228, 0.4)"
            style={styles.input}
            value={email}
          />
          <PrimaryButton title="Entrar na lista" onPress={onSubmit} />
        </View>
      )}
    </View>
  );
}
