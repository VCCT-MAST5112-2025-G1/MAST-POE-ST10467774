import * as React from "react";
import { View, StyleSheet, ViewStyle, ViewProps } from "react-native";

interface SeparatorProps extends ViewProps {
  orientation?: "horizontal" | "vertical";
  style?: ViewStyle;
}

const Separator = React.forwardRef<View, SeparatorProps>(
  ({ orientation = "horizontal", style, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[
          styles.separator,
          orientation === "horizontal" ? styles.horizontal : styles.vertical,
          style,
        ]}
        {...props}
      />
    );
  }
);

Separator.displayName = "Separator";

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#e5e7eb',
  },
  horizontal: {
    height: 1,
    width: '100%',
  },
  vertical: {
    width: 1,
    height: '100%',
  },
});

export { Separator };
