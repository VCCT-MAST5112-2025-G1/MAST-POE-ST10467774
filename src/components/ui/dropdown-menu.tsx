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

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerLayout: { x: number; y: number; width: number; height: number } | null;
  setTriggerLayout: (layout: { x: number; y: number; width: number; height: number }) => void;
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue>({
  open: false,
  setOpen: () => {},
  triggerLayout: null,
  setTriggerLayout: () => {},
});

interface DropdownMenuProps {
  children: React.ReactNode;
}

interface DropdownMenuTriggerProps extends ViewProps {
  asChild?: boolean;
  style?: ViewStyle;
}

interface DropdownMenuContentProps extends ViewProps {
  style?: ViewStyle;
  align?: "start" | "center" | "end";
}

interface DropdownMenuItemProps extends ViewProps {
  onSelect?: () => void;
  style?: ViewStyle;
  destructive?: boolean;
}

interface DropdownMenuLabelProps extends TextProps {
  style?: TextStyle;
}

interface DropdownMenuCheckboxItemProps extends ViewProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  style?: ViewStyle;
}

interface DropdownMenuRadioItemProps extends ViewProps {
  value: string;
  style?: ViewStyle;
}

const DropdownMenu = ({ children }: DropdownMenuProps) => {
  const [open, setOpen] = React.useState(false);
  const [triggerLayout, setTriggerLayout] = React.useState<{ x: number; y: number; width: number; height: number } | null>(null);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen, triggerLayout, setTriggerLayout }}>
      {children}
    </DropdownMenuContext.Provider>
  );
};

const DropdownMenuTrigger = React.forwardRef<View, DropdownMenuTriggerProps>(
  ({ asChild, children, ...props }, ref) => {
    const { setOpen, setTriggerLayout } = React.useContext(DropdownMenuContext);

    const handlePress = () => setOpen(true);

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as any, {
        onPress: handlePress,
        onLayout: (event: any) => {
          const { x, y, width, height } = event.nativeEvent.layout;
          setTriggerLayout({ x, y, width, height });
        },
      });
    }

    return (
      <TouchableOpacity
        ref={ref as any}
        onPress={handlePress}
        onLayout={(event) => {
          const { x, y, width, height } = event.nativeEvent.layout;
          setTriggerLayout({ x, y, width, height });
        }}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }
);
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

const DropdownMenuContent = React.forwardRef<View, DropdownMenuContentProps>(
  ({ style, align = "start", children, ...props }, ref) => {
    const { open, setOpen } = React.useContext(DropdownMenuContext);

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
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuItem = React.forwardRef<View, DropdownMenuItemProps>(
  ({ onSelect, style, destructive, children, ...props }, ref) => {
    const { setOpen } = React.useContext(DropdownMenuContext);

    return (
      <TouchableOpacity
        ref={ref as any}
        onPress={() => {
          onSelect?.();
          setOpen(false);
        }}
        style={[styles.item, destructive && styles.destructiveItem, style]}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }
);
DropdownMenuItem.displayName = "DropdownMenuItem";

const DropdownMenuLabel = React.forwardRef<Text, DropdownMenuLabelProps>(
  ({ style, ...props }, ref) => {
    return <Text ref={ref} style={[styles.label, style]} {...props} />;
  }
);
DropdownMenuLabel.displayName = "DropdownMenuLabel";

const DropdownMenuSeparator = React.forwardRef<View, ViewProps>(
  ({ style, ...props }, ref) => {
    return <View ref={ref} style={[styles.separator, style]} {...props} />;
  }
);
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

const DropdownMenuCheckboxItem = React.forwardRef<View, DropdownMenuCheckboxItemProps>(
  ({ checked, onCheckedChange, style, children, ...props }, ref) => {
    return (
      <TouchableOpacity
        ref={ref as any}
        onPress={() => onCheckedChange?.(!checked)}
        style={[styles.item, style]}
        {...props}
      >
        <View style={styles.checkbox}>
          {checked && <MaterialIcons name="check" size={16} color="#000" />}
        </View>
        {children}
      </TouchableOpacity>
    );
  }
);
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

const DropdownMenuRadioItem = React.forwardRef<View, DropdownMenuRadioItemProps>(
  ({ value, style, children, ...props }, ref) => {
    return (
      <TouchableOpacity
        ref={ref as any}
        style={[styles.item, style]}
        {...props}
      >
        <View style={styles.radio}>
          <MaterialIcons name="radio-button-checked" size={16} color="#000" />
        </View>
        {children}
      </TouchableOpacity>
    );
  }
);
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

const DropdownMenuGroup = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.group}>{children}</View>;
};

const DropdownMenuSub = ({ children }: { children: React.ReactNode }) => {
  return <View>{children}</View>;
};

const DropdownMenuSubTrigger = React.forwardRef<View, ViewProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <TouchableOpacity ref={ref as any} style={[styles.item, style]} {...props}>
        {children}
        <MaterialIcons name="chevron-right" size={16} color="#6b7280" />
      </TouchableOpacity>
    );
  }
);
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

const DropdownMenuSubContent = React.forwardRef<View, ViewProps>(
  ({ style, ...props }, ref) => {
    return <View ref={ref} style={[styles.content, style]} {...props} />;
  }
);
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";

const DropdownMenuRadioGroup = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.group}>{children}</View>;
};

const styles = StyleSheet.create({
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
    maxHeight: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 4,
  },
  destructiveItem: {
    backgroundColor: '#fee2e2',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radio: {
    marginRight: 8,
  },
  group: {
    // Group container
  },
});

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
};
