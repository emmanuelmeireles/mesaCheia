import { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme";

const slides = [
  {
    title: "Recicle para alimentar",
    description: "Troque materiais recicláveis por alimentos e benefícios locais.",
  },
  {
    title: "Acompanhe seu saldo",
    description: "Veja seus pontos, evoluções e histórico em tempo real.",
  },
  {
    title: "Conecte a comunidade",
    description: "Encontre parceiros, hortas e pontos de coleta próximos de você.",
  },
];

type OnboardingScreenProps = {
  onFinish: () => void;
};

export function OnboardingScreen({ onFinish }: OnboardingScreenProps) {
  const [index, setIndex] = useState(0);

  const currentSlide = slides[index];
  const isLastStep = index === slides.length - 1;

  function handleNext() {
    if (isLastStep) {
      onFinish();
      return;
    }

    setIndex((value) => value + 1);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.badge}>TROCA VERDE</Text>
        <Text style={styles.title}>{currentSlide.title}</Text>
        <Text style={styles.description}>{currentSlide.description}</Text>

        <View style={styles.dots}>
          {slides.map((slide, slideIndex) => (
            <View
              key={slide.title}
              style={[styles.dot, slideIndex === index && styles.dotActive]}
            />
          ))}
        </View>

        <Pressable onPress={handleNext} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>{isLastStep ? "Começar" : "Próximo"}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    gap: 20,
  },
  badge: {
    color: colors.green,
    fontWeight: "800",
    letterSpacing: 2,
    fontSize: 12,
  },
  title: {
    color: colors.foreground,
    fontSize: 34,
    fontWeight: "900",
  },
  description: {
    color: colors.muted,
    fontSize: 18,
    lineHeight: 28,
  },
  dots: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: "rgba(246, 241, 228, 0.2)",
  },
  dotActive: {
    backgroundColor: colors.orange,
  },
  primaryButton: {
    backgroundColor: colors.orange,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
  },
  primaryButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "800",
  },
});
