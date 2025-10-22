import * as React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Badge = React.forwardRef<View, BadgeProps>(
  ({ children, variant = "default", style, textStyle }, ref) => {
    return (
      <View ref={ref} style={[styles.badge, styles[`variant_${variant}`], style]}>
        <Text style={[styles.text, styles[`text_${variant}`], textStyle]}>
          {children}
        </Text>
      </View>
    );
  }
);

Badge.displayName = "Badge";

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: "flex-start",
  },
  variant_default: {
    backgroundColor: "#f59e0b",
    borderWidth: 0,
  },
  variant_secondary: {
    backgroundColor: "#6b7280",
    borderWidth: 0,
  },
  variant_destructive: {
    backgroundColor: "#ef4444",
    borderWidth: 0,
  },
  variant_outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
  },
  text_default: {
    color: "#fff",
  },
  text_secondary: {
    color: "#fff",
  },
  text_destructive: {
    color: "#fff",
  },
  text_outline: {
    color: "#000",
  },
});

export { Badge };
