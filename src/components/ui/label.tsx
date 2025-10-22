import * as React from "react";
import { Text, StyleSheet, TextStyle, TextProps } from "react-native";

interface LabelProps extends TextProps {
  style?: TextStyle;
  disabled?: boolean;
}

const Label = React.forwardRef<Text, LabelProps>(
  ({ style, disabled, children, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        style={[
          styles.label,
          disabled && styles.disabled,
          style,
        ]}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

Label.displayName = "Label";

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: '#111827',
  },
  disabled: {
    opacity: 0.5,
  },
});

export { Label };
