import * as React from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacityProps,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface CheckboxProps extends Omit<TouchableOpacityProps, 'onPress'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
}

const Checkbox = React.forwardRef<View, CheckboxProps>(
  ({ checked = false, onCheckedChange, disabled = false, style, ...props }, ref) => {
    const handlePress = () => {
      if (!disabled && onCheckedChange) {
        onCheckedChange(!checked);
      }
    };

    return (
      <TouchableOpacity
        ref={ref}
        onPress={handlePress}
        disabled={disabled}
        style={[
          styles.checkbox,
          checked && styles.checked,
          disabled && styles.disabled,
          style,
        ]}
        {...props}
      >
        {checked && (
          <Icon name="check" size={16} color="#ffffff" />
        )}
      </TouchableOpacity>
    );
  }
);

Checkbox.displayName = "Checkbox";

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  disabled: {
    opacity: 0.5,
  },
});

export { Checkbox };
