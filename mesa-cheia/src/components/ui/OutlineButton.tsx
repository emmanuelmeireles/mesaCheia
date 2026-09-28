import {
  Pressable,
  Text,
  type PressableProps,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { colors } from "../../theme";

type OutlineButtonProps = Omit<PressableProps, "style"> & {
  title: string;
  style?: StyleProp<ViewStyle>;
};

export function OutlineButton({ title, style, ...props }: OutlineButtonProps) {
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
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.foreground,
    fontSize: 14,
    fontWeight: "600",
  },
});
