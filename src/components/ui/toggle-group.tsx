import * as React from "react";
import { View, StyleSheet, ViewStyle, ViewProps } from "react-native";

type ToggleVariant = "default" | "outline";
type ToggleSize = "default" | "sm" | "lg";

interface ToggleGroupContextValue {
  value?: string | string[];
  onValueChange?: (value: string) => void;
  type?: "single" | "multiple";
  variant?: ToggleVariant;
  size?: ToggleSize;
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  variant: "default",
  size: "default",
  type: "single",
});

interface ToggleGroupProps extends ViewProps {
  type?: "single" | "multiple";
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  variant?: ToggleVariant;
  size?: ToggleSize;
  style?: ViewStyle;
}

interface ToggleGroupItemProps extends ViewProps {
  value: string;
  style?: ViewStyle;
  children: React.ReactNode;
}

const ToggleGroup = React.forwardRef<View, ToggleGroupProps>(
  ({ type = "single", value, onValueChange, variant = "default", size = "default", style, children, ...props }, ref) => {
    const handleValueChange = (itemValue: string) => {
      if (type === "single") {
        onValueChange?.(itemValue);
      } else {
        const currentValues = Array.isArray(value) ? value : [];
        const newValues = currentValues.includes(itemValue)
          ? currentValues.filter(v => v !== itemValue)
          : [...currentValues, itemValue];
        onValueChange?.(newValues);
      }
    };

    return (
      <ToggleGroupContext.Provider value={{ value, onValueChange: handleValueChange, type, variant, size }}>
        <View ref={ref} style={[styles.group, styles[`variant_${variant}`], style]} {...props}>
          {children}
        </View>
      </ToggleGroupContext.Provider>
    );
  }
);

ToggleGroup.displayName = "ToggleGroup";

const ToggleGroupItem = React.forwardRef<View, ToggleGroupItemProps>(
  ({ value: itemValue, style, children, ...props }, ref) => {
    const { value, onValueChange, type, variant, size } = React.useContext(ToggleGroupContext);
    
    const isSelected = type === "single" 
      ? value === itemValue 
      : Array.isArray(value) && value.includes(itemValue);

    return (
      <View
        ref={ref}
        style={[
          styles.item,
          styles[`variant_${variant}`],
          styles[`size_${size}`],
          isSelected && styles.selected,
          style,
        ]}
        {...props}
      >
        {children}
      </View>
    );
  }
);

ToggleGroupItem.displayName = "ToggleGroupItem";

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    borderRadius: 6,
  },
  variant_default: {
    backgroundColor: 'transparent',
  },
  variant_outline: {
    backgroundColor: '#f9fafb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  item: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  size_default: {
    height: 36,
  },
  size_sm: {
    height: 32,
  },
  size_lg: {
    height: 40,
  },
  selected: {
    backgroundColor: '#f3f4f6',
  },
});

export { ToggleGroup, ToggleGroupItem };
