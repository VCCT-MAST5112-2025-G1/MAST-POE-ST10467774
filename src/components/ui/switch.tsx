import * as React from "react";
import {
  Switch as RNSwitch,
  SwitchProps as RNSwitchProps,
  StyleSheet,
  ViewStyle,
} from "react-native";

interface SwitchProps extends Omit<RNSwitchProps, 'style'> {
  style?: ViewStyle;
}

const Switch = React.forwardRef<RNSwitch, SwitchProps>(
  ({ style, disabled, ...props }, ref) => {
    return (
      <RNSwitch
        ref={ref}
        trackColor={{
          false: '#e5e7eb', // Light gray for unchecked
          true: '#3b82f6',  // Blue for checked
        }}
        thumbColor={props.value ? '#ffffff' : '#ffffff'}
        ios_backgroundColor="#e5e7eb"
        disabled={disabled}
        style={[styles.switch, disabled && styles.disabled, style]}
        {...props}
      />
    );
  }
);

Switch.displayName = "Switch";

const styles = StyleSheet.create({
  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },
  disabled: {
    opacity: 0.5,
  },
});

export { Switch };
