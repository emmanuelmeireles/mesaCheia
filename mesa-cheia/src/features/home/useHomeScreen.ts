import { useState } from "react";
import { Linking } from "react-native";

import type { SectionId } from "../../types";

export function useHomeScreen() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function submitEmail() {
    if (email.trim()) {
      setSubmitted(true);
    }
  }

  function scrollToSection(section: SectionId) {
    Linking.openURL(`troca-verde://${section}`).catch(() => undefined);
  }

  return {
    email,
    setEmail,
    submitted,
    submitEmail,
    scrollToSection,
  };
}
