import {
  Pressable,
  Text,
  type PressableProps,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { colors } from "../../theme";

type PrimaryButtonProps = Omit<PressableProps, "style"> & {
  title: string;
  style?: StyleProp<ViewStyle>;
};

export function PrimaryButton({ title, style, ...props }: PrimaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      style={[styles.button, style]}
      {...props}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: 24,
    backgroundColor: colors.orange,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.background,
    fontSize: 14,
    fontWeight: "700",
  },
});
