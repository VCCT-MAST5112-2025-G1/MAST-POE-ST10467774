import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ViewProps,
  TextProps,
} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface SelectContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  placeholder?: string;
}

const SelectContext = React.createContext<SelectContextValue>({
  open: false,
  setOpen: () => {},
});

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

interface SelectTriggerProps extends ViewProps {
  style?: ViewStyle;
  children?: React.ReactNode;
}

interface SelectContentProps extends ViewProps {
  style?: ViewStyle;
}

interface SelectItemProps extends ViewProps {
  value: string;
  style?: ViewStyle;
  children?: React.ReactNode;
}

interface SelectValueProps extends TextProps {
  placeholder?: string;
  style?: TextStyle;
}

interface SelectLabelProps extends TextProps {
  style?: TextStyle;
}

const Select = ({ value, onValueChange, children }: SelectProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
      {children}
    </SelectContext.Provider>
  );
};

const SelectTrigger = React.forwardRef<View, SelectTriggerProps>(
  ({ style, children, ...props }, ref) => {
    const { setOpen } = React.useContext(SelectContext);

    return (
      <TouchableOpacity
        ref={ref as any}
        onPress={() => setOpen(true)}
        style={[styles.trigger, style]}
        {...props}
      >
        {children}
        <MaterialIcons name="arrow-drop-down" size={24} color="#6b7280" />
      </TouchableOpacity>
    );
  }
);
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = React.forwardRef<Text, SelectValueProps>(
  ({ placeholder, style, ...props }, ref) => {
    const { value } = React.useContext(SelectContext);

    return (
      <Text ref={ref} style={[styles.value, !value && styles.placeholder, style]} {...props}>
        {value || placeholder || "Select..."}
      </Text>
    );
  }
);
SelectValue.displayName = "SelectValue";

const SelectContent = React.forwardRef<View, SelectContentProps>(
  ({ style, children, ...props }, ref) => {
    const { open, setOpen } = React.useContext(SelectContext);

    return (
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View style={[styles.content, style]} ref={ref} {...props}>
            <ScrollView>{children}</ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
);
SelectContent.displayName = "SelectContent";

const SelectItem = React.forwardRef<View, SelectItemProps>(
  ({ value: itemValue, style, children, ...props }, ref) => {
    const { value, onValueChange, setOpen } = React.useContext(SelectContext);
    const isSelected = value === itemValue;

    return (
      <TouchableOpacity
        ref={ref as any}
        onPress={() => {
          onValueChange?.(itemValue);
          setOpen(false);
        }}
        style={[styles.item, isSelected && styles.selectedItem, style]}
        {...props}
      >
        <Text style={[styles.itemText, isSelected && styles.selectedText]}>
          {children}
        </Text>
        {isSelected && (
          <MaterialIcons name="check" size={20} color="#000" />
        )}
      </TouchableOpacity>
    );
  }
);
SelectItem.displayName = "SelectItem";

const SelectLabel = React.forwardRef<Text, SelectLabelProps>(
  ({ style, ...props }, ref) => {
    return (
      <Text ref={ref} style={[styles.label, style]} {...props} />
    );
  }
);
SelectLabel.displayName = "SelectLabel";

const SelectSeparator = React.forwardRef<View, ViewProps>(
  ({ style, ...props }, ref) => {
    return (
      <View ref={ref} style={[styles.separator, style]} {...props} />
    );
  }
);
SelectSeparator.displayName = "SelectSeparator";

const SelectGroup = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.group}>{children}</View>;
};

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 36,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  value: {
    fontSize: 14,
    color: '#000',
    flex: 1,
  },
  placeholder: {
    color: '#9ca3af',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 8,
    minWidth: 200,
    maxHeight: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  selectedItem: {
    backgroundColor: '#f3f4f6',
  },
  itemText: {
    fontSize: 14,
    color: '#000',
    flex: 1,
  },
  selectedText: {
    fontWeight: '500',
  },
  label: {
    fontSize: 12,
    color: '#6b7280',
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 4,
  },
  group: {
    // Group container
  },
});

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectGroup,
};
