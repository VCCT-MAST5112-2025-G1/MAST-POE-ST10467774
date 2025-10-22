import * as React from "react";
import { View, TouchableOpacity, StyleSheet, ViewStyle, ViewProps } from "react-native";

interface RadioGroupContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue>({});

interface RadioGroupProps extends ViewProps {
  value?: string;
  onValueChange?: (value: string) => void;
  style?: ViewStyle;
}

interface RadioGroupItemProps extends ViewProps {
  value: string;
  style?: ViewStyle;
  disabled?: boolean;
}

const RadioGroup = React.forwardRef<View, RadioGroupProps>(
  ({ value, onValueChange, style, children, ...props }, ref) => {
    return (
      <RadioGroupContext.Provider value={{ value, onValueChange }}>
        <View ref={ref} style={[styles.radioGroup, style]} {...props}>
          {children}
        </View>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = React.forwardRef<View, RadioGroupItemProps>(
  ({ value, style, disabled, ...props }, ref) => {
    const context = React.useContext(RadioGroupContext);
    const isSelected = context.value === value;

    const handlePress = () => {
      if (!disabled && context.onValueChange) {
        context.onValueChange(value);
      }
    };

    return (
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled}
        style={[styles.item, disabled && styles.disabled]}
      >
        <View
          ref={ref}
          style={[
            styles.radio,
            isSelected && styles.radioSelected,
            style,
          ]}
          {...props}
        >
          {isSelected && <View style={styles.indicator} />}
        </View>
      </TouchableOpacity>
    );
  }
);

RadioGroupItem.displayName = "RadioGroupItem";

const styles = StyleSheet.create({
  radioGroup: {
    gap: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#3b82f6',
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3b82f6',
  },
  disabled: {
    opacity: 0.5,
  },
});

export { RadioGroup, RadioGroupItem };
