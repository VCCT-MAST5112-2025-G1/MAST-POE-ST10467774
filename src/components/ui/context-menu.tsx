import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  ViewStyle,
  ViewProps,
} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface ContextMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  position: { x: number; y: number } | null;
  setPosition: (pos: { x: number; y: number } | null) => void;
}

const ContextMenuContext = React.createContext<ContextMenuContextValue>({
  open: false,
  setOpen: () => {},
  position: null,
  setPosition: () => {},
});

interface ContextMenuProps {
  children: React.ReactNode;
}

interface ContextMenuTriggerProps extends ViewProps {
  asChild?: boolean;
  style?: ViewStyle;
}

interface ContextMenuContentProps extends ViewProps {
  style?: ViewStyle;
}

interface ContextMenuItemProps extends ViewProps {
  onSelect?: () => void;
  style?: ViewStyle;
  destructive?: boolean;
}

const ContextMenu = ({ children }: ContextMenuProps) => {
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState<{ x: number; y: number } | null>(null);

  return (
    <ContextMenuContext.Provider value={{ open, setOpen, position, setPosition }}>
      {children}
    </ContextMenuContext.Provider>
  );
};

const ContextMenuTrigger = React.forwardRef<View, ContextMenuTriggerProps>(
  ({ asChild, children, ...props }, ref) => {
    const { setOpen, setPosition } = React.useContext(ContextMenuContext);

    // React Native uses long press for context menu
    const handleLongPress = (event: any) => {
      const { pageX, pageY } = event.nativeEvent;
      setPosition({ x: pageX, y: pageY });
      setOpen(true);
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as any, {
        onLongPress: handleLongPress,
      });
    }

    return (
      <TouchableOpacity ref={ref as any} onLongPress={handleLongPress} {...props}>
        {children}
      </TouchableOpacity>
    );
  }
);
ContextMenuTrigger.displayName = "ContextMenuTrigger";

const ContextMenuContent = React.forwardRef<View, ContextMenuContentProps>(
  ({ style, children, ...props }, ref) => {
    const { open, setOpen } = React.useContext(ContextMenuContext);

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
ContextMenuContent.displayName = "ContextMenuContent";

const ContextMenuItem = React.forwardRef<View, ContextMenuItemProps>(
  ({ onSelect, style, destructive, children, ...props }, ref) => {
    const { setOpen } = React.useContext(ContextMenuContext);

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
ContextMenuItem.displayName = "ContextMenuItem";

const ContextMenuLabel = React.forwardRef<Text, ViewProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <Text ref={ref as any} style={[styles.label, style]} {...props}>
        {children}
      </Text>
    );
  }
);
ContextMenuLabel.displayName = "ContextMenuLabel";

const ContextMenuSeparator = React.forwardRef<View, ViewProps>(
  ({ style, ...props }, ref) => {
    return <View ref={ref} style={[styles.separator, style]} {...props} />;
  }
);
ContextMenuSeparator.displayName = "ContextMenuSeparator";

const ContextMenuCheckboxItem = React.forwardRef<View, ViewProps & { checked?: boolean; onCheckedChange?: (checked: boolean) => void }>(
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
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";

const ContextMenuRadioItem = React.forwardRef<View, ViewProps & { value: string }>(
  ({ value, style, children, ...props }, ref) => {
    return (
      <TouchableOpacity ref={ref as any} style={[styles.item, style]} {...props}>
        <View style={styles.radio}>
          <MaterialIcons name="radio-button-checked" size={16} color="#000" />
        </View>
        {children}
      </TouchableOpacity>
    );
  }
);
ContextMenuRadioItem.displayName = "ContextMenuRadioItem";

const ContextMenuGroup = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.group}>{children}</View>;
};

const ContextMenuSub = ({ children }: { children: React.ReactNode }) => {
  return <View>{children}</View>;
};

const ContextMenuSubTrigger = React.forwardRef<View, ViewProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <TouchableOpacity ref={ref as any} style={[styles.item, style]} {...props}>
        {children}
        <MaterialIcons name="chevron-right" size={16} color="#6b7280" />
      </TouchableOpacity>
    );
  }
);
ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger";

const ContextMenuSubContent = React.forwardRef<View, ViewProps>(
  ({ style, ...props }, ref) => {
    return <View ref={ref} style={[styles.content, style]} {...props} />;
  }
);
ContextMenuSubContent.displayName = "ContextMenuSubContent";

const ContextMenuRadioGroup = ({ children }: { children: React.ReactNode }) => {
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
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuGroup,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuRadioGroup,
};


