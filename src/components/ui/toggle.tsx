import * as React from "react";
import { TouchableOpacity, View, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacityProps } from "react-native";

type ToggleVariant = "default" | "outline";
type ToggleSize = "default" | "sm" | "lg";

interface ToggleProps extends Omit<TouchableOpacityProps, 'onPress'> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: ToggleVariant;
  size?: ToggleSize;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Toggle = React.forwardRef<View, ToggleProps>(
  ({ 
    pressed = false, 
    onPressedChange, 
    variant = "default", 
    size = "default",
    disabled = false,
    style, 
    textStyle,
    children,
    ...props 
  }, ref) => {
    const handlePress = () => {
      if (!disabled && onPressedChange) {
        onPressedChange(!pressed);
      }
    };

    return (
      <TouchableOpacity
        ref={ref}
        onPress={handlePress}
        disabled={disabled}
        style={[
          styles.toggle,
          styles[`variant_${variant}`],
          styles[`size_${size}`],
          pressed && styles.pressed,
          pressed && styles[`pressed_${variant}`],
          disabled && styles.disabled,
          style,
        ]}
        {...props}
      >
        {typeof children === 'string' ? (
          <Text style={[styles.text, textStyle]}>{children}</Text>
        ) : (
          children
        )}
      </TouchableOpacity>
    );
  }
);

Toggle.displayName = "Toggle";

const styles = StyleSheet.create({
  toggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    gap: 8,
  },
  variant_default: {
    backgroundColor: 'transparent',
  },
  variant_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  size_default: {
    height: 36,
    paddingHorizontal: 8,
    minWidth: 36,
  },
  size_sm: {
    height: 32,
    paddingHorizontal: 6,
    minWidth: 32,
  },
  size_lg: {
    height: 40,
    paddingHorizontal: 10,
    minWidth: 40,
  },
  pressed: {},
  pressed_default: {
    backgroundColor: '#f3f4f6',
  },
  pressed_outline: {
    backgroundColor: '#f3f4f6',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
});

export { Toggle };
