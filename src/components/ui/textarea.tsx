import * as React from "react";
import { TextInput, StyleSheet, TextStyle, TextInputProps } from "react-native";

interface TextareaProps extends TextInputProps {
  style?: TextStyle;
  error?: boolean;
}

const Textarea = React.forwardRef<TextInput, TextareaProps>(
  ({ style, error, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        placeholderTextColor="#9ca3af"
        style={[
          styles.textarea,
          error && styles.error,
          style,
        ]}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

const styles = StyleSheet.create({
  textarea: {
    minHeight: 80,
    width: '100%',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#f9fafb',
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    lineHeight: 20,
    color: '#111827',
  },
  error: {
    borderColor: '#ef4444',
  },
});

export { Textarea };
