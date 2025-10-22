import * as React from "react";
import { ScrollView, StyleSheet, ScrollViewProps, ViewStyle } from "react-native";

interface ScrollAreaProps extends ScrollViewProps {
  style?: ViewStyle;
}

const ScrollArea = React.forwardRef<ScrollView, ScrollAreaProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <ScrollView
        ref={ref}
        style={[styles.scrollArea, style]}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        {...props}
      >
        {children}
      </ScrollView>
    );
  }
);

ScrollArea.displayName = "ScrollArea";

const styles = StyleSheet.create({
  scrollArea: {
    flex: 1,
  },
});

export { ScrollArea };


