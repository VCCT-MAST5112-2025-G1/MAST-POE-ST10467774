import * as React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from "react-native";

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button = React.forwardRef<React.ElementRef<typeof TouchableOpacity>, ButtonProps>(
  ({ children, onPress, variant = "default", size = "default", disabled = false, loading = false, style, textStyle }, ref) => {
    const buttonStyle = [
      styles.base,
      styles[`variant_${variant}`],
      styles[`size_${size}`],
      disabled && styles.disabled,
      style,
    ];

    const textStyles = [
      styles.text,
      styles[`text_${variant}`],
      styles[`textSize_${size}`],
      disabled && styles.textDisabled,
      textStyle,
    ];

    return (
      <TouchableOpacity
        ref={ref}
        style={buttonStyle}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.7}
      >
        {loading ? (
          <ActivityIndicator color={variant === "outline" ? "#000" : "#fff"} />
        ) : (
          <Text style={textStyles}>{children}</Text>
        )}
      </TouchableOpacity>
    );
  }
);

Button.displayName = "Button";

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  // Variants
  variant_default: {
    backgroundColor: "#f59e0b",
  },
  variant_destructive: {
    backgroundColor: "#ef4444",
  },
  variant_outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  variant_secondary: {
    backgroundColor: "#6b7280",
  },
  variant_ghost: {
    backgroundColor: "transparent",
  },
  variant_link: {
    backgroundColor: "transparent",
  },
  // Sizes
  size_default: {
    height: 36,
    paddingHorizontal: 16,
  },
  size_sm: {
    height: 32,
    paddingHorizontal: 12,
  },
  size_lg: {
    height: 40,
    paddingHorizontal: 24,
  },
  size_icon: {
    width: 36,
    height: 36,
    paddingHorizontal: 0,
  },
  disabled: {
    opacity: 0.5,
  },
  // Text styles
  text: {
    fontSize: 14,
    fontWeight: "500",
  },
  text_default: {
    color: "#fff",
  },
  text_destructive: {
    color: "#fff",
  },
  text_outline: {
    color: "#000",
  },
  text_secondary: {
    color: "#fff",
  },
  text_ghost: {
    color: "#000",
  },
  text_link: {
    color: "#f59e0b",
    textDecorationLine: "underline",
  },
  textSize_default: {
    fontSize: 14,
  },
  textSize_sm: {
    fontSize: 12,
  },
  textSize_lg: {
    fontSize: 16,
  },
  textSize_icon: {
    fontSize: 14,
  },
  textDisabled: {
    opacity: 0.5,
  },
});

export { Button };
