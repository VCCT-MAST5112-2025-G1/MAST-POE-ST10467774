import * as React from "react";
import { View, StyleSheet, ViewStyle, ViewProps } from "react-native";

interface ProgressProps extends ViewProps {
  value?: number;
  style?: ViewStyle;
}

const Progress = React.forwardRef<View, ProgressProps>(
  ({ value = 0, style, ...props }, ref) => {
    const clampedValue = Math.min(Math.max(value, 0), 100);

    return (
      <View
        ref={ref}
        style={[styles.container, style]}
        {...props}
      >
        <View
          style={[
            styles.indicator,
            { width: `${clampedValue}%` },
          ]}
        />
      </View>
    );
  }
);

Progress.displayName = "Progress";

const styles = StyleSheet.create({
  container: {
    height: 8,
    width: '100%',
    backgroundColor: '#dbeafe',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  indicator: {
    height: '100%',
    backgroundColor: '#3b82f6',
  },
});

export { Progress };
