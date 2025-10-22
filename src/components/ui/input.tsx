import * as React from "react";
import { TextInput, StyleSheet, TextInputProps, ViewStyle } from "react-native";

interface InputProps extends TextInputProps {
  style?: ViewStyle;
  error?: boolean;
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ style, error, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        style={[styles.input, error && styles.error, style]}
        placeholderTextColor="#9ca3af"
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    backgroundColor: "#f9fafb",
    color: "#000",
  },
  error: {
    borderColor: "#ef4444",
  },
});

export { Input };
