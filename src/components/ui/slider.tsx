import * as React from "react";
import { View, StyleSheet, ViewStyle, ViewProps, PanResponder, Animated } from "react-native";

interface SliderProps extends ViewProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
  style?: ViewStyle;
}

const Slider = React.forwardRef<View, SliderProps>(
  ({ 
    value, 
    defaultValue = 0, 
    min = 0, 
    max = 100,
    step = 1,
    onValueChange,
    disabled = false,
    style, 
    ...props 
  }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [sliderWidth, setSliderWidth] = React.useState(0);
    const currentValue = value !== undefined ? value : internalValue;

    const panResponder = React.useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled,
        onMoveShouldSetPanResponder: () => !disabled,
        onPanResponderGrant: (evt) => {
          if (!disabled) {
            updateValue(evt.nativeEvent.locationX);
          }
        },
        onPanResponderMove: (evt) => {
          if (!disabled) {
            updateValue(evt.nativeEvent.locationX);
          }
        },
      })
    ).current;

    const updateValue = (x: number) => {
      const percentage = Math.max(0, Math.min(1, x / sliderWidth));
      let newValue = min + percentage * (max - min);
      newValue = Math.round(newValue / step) * step;
      newValue = Math.max(min, Math.min(max, newValue));

      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    const percentage = ((currentValue - min) / (max - min)) * 100;

    return (
      <View
        ref={ref}
        style={[styles.container, disabled && styles.disabled, style]}
        onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}
        {...panResponder.panHandlers}
        {...props}
      >
        <View style={styles.track}>
          <View style={[styles.range, { width: `${percentage}%` }]} />
          <View style={[styles.thumb, { left: `${percentage}%` }]} />
        </View>
      </View>
    );
  }
);

Slider.displayName = "Slider";

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
  },
  track: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 9999,
    position: 'relative',
  },
  range: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 9999,
    position: 'absolute',
  },
  thumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#3b82f6',
    position: 'absolute',
    top: -6,
    marginLeft: -8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  disabled: {
    opacity: 0.5,
  },
});

export { Slider };
