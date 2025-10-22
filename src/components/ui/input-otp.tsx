import * as React from 'react';
import { View, TextInput, StyleSheet, Text, ViewStyle, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// ============================================================================
// Context & Types
// ============================================================================

type OTPSlot = {
  char?: string;
  hasFakeCaret?: boolean;
  isActive?: boolean;
};

interface OTPInputContextValue {
  slots: OTPSlot[];
}

const OTPInputContext = React.createContext<OTPInputContextValue | null>(null);

// ============================================================================
// InputOTP (Container)
// ============================================================================

interface InputOTPProps {
  value?: string;
  onChange?: (value: string) => void;
  length?: number;
  style?: ViewStyle;
  children?: React.ReactNode;
}

const InputOTP = React.forwardRef<View, InputOTPProps>(
  ({ value = '', onChange, length = 6, style, children }, ref) => {
    const [activeIndex, setActiveIndex] = React.useState(0);

    // Create slots from value
    const slots: OTPSlot[] = React.useMemo(() => {
      const chars = value.split('');
      return Array.from({ length }, (_, i) => ({
        char: chars[i] || undefined,
        isActive: i === activeIndex,
        hasFakeCaret: i === activeIndex && !chars[i],
      }));
    }, [value, length, activeIndex]);

    const contextValue: OTPInputContextValue = React.useMemo(
      () => ({ slots }),
      [slots]
    );

    return (
      <OTPInputContext.Provider value={contextValue}>
        <View ref={ref} style={[styles.container, style]}>
          {children}
        </View>
      </OTPInputContext.Provider>
    );
  }
);

InputOTP.displayName = 'InputOTP';

// ============================================================================
// InputOTPGroup
// ============================================================================

interface InputOTPGroupProps {
  style?: ViewStyle;
  children?: React.ReactNode;
}

const InputOTPGroup = React.forwardRef<View, InputOTPGroupProps>(
  ({ style, children }, ref) => {
    return (
      <View ref={ref} style={[styles.group, style]}>
        {children}
      </View>
    );
  }
);

InputOTPGroup.displayName = 'InputOTPGroup';

// ============================================================================
// InputOTPSlot
// ============================================================================

interface InputOTPSlotProps {
  index: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const InputOTPSlot = React.forwardRef<View, InputOTPSlotProps>(
  ({ index, style, textStyle }, ref) => {
    const context = React.useContext(OTPInputContext);
    const { char, hasFakeCaret, isActive } = context?.slots[index] ?? {};

    return (
      <View
        ref={ref}
        style={[
          styles.slot,
          isActive && styles.slotActive,
          style,
        ]}
      >
        <Text style={[styles.slotText, textStyle]}>{char || ''}</Text>
        {hasFakeCaret && (
          <View style={styles.caret} />
        )}
      </View>
    );
  }
);

InputOTPSlot.displayName = 'InputOTPSlot';

// ============================================================================
// InputOTPSeparator
// ============================================================================

interface InputOTPSeparatorProps {
  style?: ViewStyle;
}

const InputOTPSeparator = React.forwardRef<View, InputOTPSeparatorProps>(
  ({ style }, ref) => {
    return (
      <View ref={ref} style={[styles.separator, style]}>
        <Icon name="remove" size={16} color="#666" />
      </View>
    );
  }
);

InputOTPSeparator.displayName = 'InputOTPSeparator';

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  slot: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
    position: 'relative',
  },
  slotActive: {
    borderColor: '#3b82f6',
    borderWidth: 2,
  },
  slotText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  caret: {
    position: 'absolute',
    width: 1,
    height: 16,
    backgroundColor: '#000',
  },
  separator: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
});

// ============================================================================
// Exports
// ============================================================================

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };


