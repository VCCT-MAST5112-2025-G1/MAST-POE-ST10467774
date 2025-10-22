import * as React from "react";
import { View, StyleSheet, ViewStyle, ViewProps, Animated } from "react-native";

interface SkeletonProps extends ViewProps {
  style?: ViewStyle;
}

const Skeleton = React.forwardRef<View, SkeletonProps>(
  ({ style, ...props }, ref) => {
    const opacity = React.useRef(new Animated.Value(0.3)).current;

    React.useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.3,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, [opacity]);

    return (
      <Animated.View
        ref={ref}
        style={[
          styles.skeleton,
          { opacity },
          style,
        ]}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
  },
});

export { Skeleton };
