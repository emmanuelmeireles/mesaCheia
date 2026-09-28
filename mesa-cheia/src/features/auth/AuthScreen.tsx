import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { colors } from "../../theme";

type AuthScreenProps = {
  onLogin: (email: string, password: string) => void;
  onRegister: (name: string, email: string, password: string, city: string) => void;
};

export function AuthScreen({ onLogin, onRegister }: AuthScreenProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("Recife");

  function handleSubmit() {
    if (mode === "login") {
      onLogin(email, password);
      return;
    }

    onRegister(name, email, password, city);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.logo}>Troca<Text style={styles.logoAccent}>verde</Text></Text>
        <Text style={styles.title}>{mode === "login" ? "Entrar" : "Criar conta"}</Text>

        <View style={styles.switcher}>
          <Pressable
            onPress={() => setMode("login")}
            style={[styles.switch, mode === "login" && styles.switchActive]}
          >
            <Text style={styles.switchText}>Login</Text>
          </Pressable>
          <Pressable
            onPress={() => setMode("register")}
            style={[styles.switch, mode === "register" && styles.switchActive]}
          >
            <Text style={styles.switchText}>Cadastro</Text>
          </Pressable>
        </View>

        {mode === "register" && (
          <TextInput
            placeholder="Nome completo"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
        )}

        <TextInput
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />

        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        {mode === "register" && (
          <TextInput
            placeholder="Cidade"
            value={city}
            onChangeText={setCity}
            style={styles.input}
          />
        )}

        <Pressable onPress={handleSubmit} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>
            {mode === "login" ? "Entrar" : "Cadastrar"}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
    gap: 16,
  },
  logo: {
    color: colors.foreground,
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
  },
  logoAccent: {
    color: colors.green,
  },
  title: {
    color: colors.foreground,
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },
  switcher: {
    flexDirection: "row",
    backgroundColor: "rgba(246, 241, 228, 0.08)",
    borderRadius: 14,
    padding: 6,
  },
  switch: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  switchActive: {
    backgroundColor: colors.orange,
  },
  switchText: {
    color: colors.foreground,
    fontWeight: "700",
  },
  input: {
    backgroundColor: "rgba(246, 241, 228, 0.05)",
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 14,
    color: colors.foreground,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: colors.orange,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: colors.background,
    fontWeight: "800",
    fontSize: 16,
  },
});
