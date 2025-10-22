import * as React from "react";
import { View, StyleSheet, ViewStyle, ViewProps } from "react-native";

interface AspectRatioProps extends ViewProps {
  ratio?: number;
  style?: ViewStyle;
}

const AspectRatio = React.forwardRef<View, AspectRatioProps>(
  ({ ratio = 1, style, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[styles.container, style]}
        {...props}
      >
        <View style={{ aspectRatio: ratio }}>
          {children}
        </View>
      </View>
    );
  }
);

AspectRatio.displayName = "AspectRatio";

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export { AspectRatio };
