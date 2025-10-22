import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// ============================================================================
// Context
// ============================================================================

interface MenubarContextValue {
  openMenuId: string | null;
  setOpenMenuId: (id: string | null) => void;
}

const MenubarContext = React.createContext<MenubarContextValue | undefined>(undefined);

const useMenubar = () => {
  const context = React.useContext(MenubarContext);
  if (!context) {
    throw new Error('Menubar components must be used within a Menubar');
  }
  return context;
};

interface MenubarMenuContextValue {
  menuId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const MenubarMenuContext = React.createContext<MenubarMenuContextValue | undefined>(undefined);

const useMenubarMenu = () => {
  const context = React.useContext(MenubarMenuContext);
  if (!context) {
    throw new Error('MenubarMenu components must be used within a MenubarMenu');
  }
  return context;
};

// ============================================================================
// Menubar (Root)
// ============================================================================

interface MenubarProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

const Menubar = React.forwardRef<View, MenubarProps>(({ style, children }, ref) => {
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);

  const contextValue: MenubarContextValue = React.useMemo(
    () => ({ openMenuId, setOpenMenuId }),
    [openMenuId]
  );

  return (
    <MenubarContext.Provider value={contextValue}>
      <View ref={ref} style={[styles.menubar, style]}>
        {children}
      </View>
    </MenubarContext.Provider>
  );
});

Menubar.displayName = 'Menubar';

// ============================================================================
// MenubarMenu
// ============================================================================

interface MenubarMenuProps {
  children: React.ReactNode;
}

const MenubarMenu = React.forwardRef<View, MenubarMenuProps>(({ children }, ref) => {
  const menuId = React.useId();
  const { openMenuId, setOpenMenuId } = useMenubar();

  const open = openMenuId === menuId;
  const setOpen = React.useCallback(
    (newOpen: boolean) => {
      setOpenMenuId(newOpen ? menuId : null);
    },
    [menuId, setOpenMenuId]
  );

  const contextValue: MenubarMenuContextValue = React.useMemo(
    () => ({ menuId, open, setOpen }),
    [menuId, open, setOpen]
  );

  return (
    <MenubarMenuContext.Provider value={contextValue}>
      <View ref={ref}>{children}</View>
    </MenubarMenuContext.Provider>
  );
});

MenubarMenu.displayName = 'MenubarMenu';

// ============================================================================
// MenubarTrigger
// ============================================================================

interface MenubarTriggerProps {
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
}

const MenubarTrigger = React.forwardRef<View, MenubarTriggerProps>(
  ({ style, textStyle, children }, ref) => {
    const { open, setOpen } = useMenubarMenu();

    return (
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        style={[styles.trigger, open && styles.triggerOpen, style]}
      >
        {typeof children === 'string' ? (
          <Text style={[styles.triggerText, textStyle]}>{children}</Text>
        ) : (
          children
        )}
      </TouchableOpacity>
    );
  }
);

MenubarTrigger.displayName = 'MenubarTrigger';

// ============================================================================
// MenubarContent
// ============================================================================

interface MenubarContentProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

const MenubarContent = React.forwardRef<View, MenubarContentProps>(
  ({ style, children }, ref) => {
    const { open, setOpen } = useMenubarMenu();

    return (
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View style={[styles.content, style]} ref={ref}>
            <ScrollView style={styles.contentScroll}>{children}</ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
);

MenubarContent.displayName = 'MenubarContent';

// ============================================================================
// MenubarItem
// ============================================================================

interface MenubarItemProps {
  onPress?: () => void;
  inset?: boolean;
  variant?: 'default' | 'destructive';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
}

const MenubarItem = React.forwardRef<View, MenubarItemProps>(
  ({ onPress, inset, variant = 'default', disabled, style, textStyle, children }, ref) => {
    const { setOpen } = useMenubarMenu();

    const handlePress = () => {
      if (!disabled && onPress) {
        onPress();
        setOpen(false);
      }
    };

    return (
      <TouchableOpacity
        ref={ref}
        onPress={handlePress}
        disabled={disabled}
        style={[
          styles.item,
          inset && styles.itemInset,
          variant === 'destructive' && styles.itemDestructive,
          disabled && styles.itemDisabled,
          style,
        ]}
      >
        {typeof children === 'string' ? (
          <Text
            style={[
              styles.itemText,
              variant === 'destructive' && styles.itemTextDestructive,
              disabled && styles.itemTextDisabled,
              textStyle,
            ]}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </TouchableOpacity>
    );
  }
);

MenubarItem.displayName = 'MenubarItem';

// ============================================================================
// MenubarCheckboxItem
// ============================================================================

interface MenubarCheckboxItemProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
}

const MenubarCheckboxItem = React.forwardRef<View, MenubarCheckboxItemProps>(
  ({ checked, onCheckedChange, disabled, style, textStyle, children }, ref) => {
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
        style={[styles.item, styles.itemCheckbox, disabled && styles.itemDisabled, style]}
      >
        <View style={styles.checkboxIndicator}>
          {checked && <Icon name="check" size={16} color="#000" />}
        </View>
        {typeof children === 'string' ? (
          <Text style={[styles.itemText, disabled && styles.itemTextDisabled, textStyle]}>
            {children}
          </Text>
        ) : (
          children
        )}
      </TouchableOpacity>
    );
  }
);

MenubarCheckboxItem.displayName = 'MenubarCheckboxItem';

// ============================================================================
// MenubarRadioGroup & MenubarRadioItem
// ============================================================================

interface MenubarRadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

const MenubarRadioContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
} | undefined>(undefined);

const MenubarRadioGroup = React.forwardRef<View, MenubarRadioGroupProps>(
  ({ value, onValueChange, children }, ref) => {
    return (
      <MenubarRadioContext.Provider value={{ value, onValueChange }}>
        <View ref={ref}>{children}</View>
      </MenubarRadioContext.Provider>
    );
  }
);

MenubarRadioGroup.displayName = 'MenubarRadioGroup';

interface MenubarRadioItemProps {
  value: string;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
}

const MenubarRadioItem = React.forwardRef<View, MenubarRadioItemProps>(
  ({ value, disabled, style, textStyle, children }, ref) => {
    const radioContext = React.useContext(MenubarRadioContext);
    const checked = radioContext?.value === value;

    const handlePress = () => {
      if (!disabled && radioContext?.onValueChange) {
        radioContext.onValueChange(value);
      }
    };

    return (
      <TouchableOpacity
        ref={ref}
        onPress={handlePress}
        disabled={disabled}
        style={[styles.item, styles.itemCheckbox, disabled && styles.itemDisabled, style]}
      >
        <View style={styles.radioIndicator}>
          {checked && <View style={styles.radioIndicatorInner} />}
        </View>
        {typeof children === 'string' ? (
          <Text style={[styles.itemText, disabled && styles.itemTextDisabled, textStyle]}>
            {children}
          </Text>
        ) : (
          children
        )}
      </TouchableOpacity>
    );
  }
);

MenubarRadioItem.displayName = 'MenubarRadioItem';

// ============================================================================
// MenubarLabel
// ============================================================================

interface MenubarLabelProps {
  inset?: boolean;
  style?: TextStyle;
  children: React.ReactNode;
}

const MenubarLabel = React.forwardRef<Text, MenubarLabelProps>(
  ({ inset, style, children }, ref) => (
    <Text ref={ref} style={[styles.label, inset && styles.labelInset, style]}>
      {children}
    </Text>
  )
);

MenubarLabel.displayName = 'MenubarLabel';

// ============================================================================
// MenubarSeparator
// ============================================================================

interface MenubarSeparatorProps {
  style?: ViewStyle;
}

const MenubarSeparator = React.forwardRef<View, MenubarSeparatorProps>(({ style }, ref) => (
  <View ref={ref} style={[styles.separator, style]} />
));

MenubarSeparator.displayName = 'MenubarSeparator';

// ============================================================================
// MenubarShortcut
// ============================================================================

interface MenubarShortcutProps {
  style?: TextStyle;
  children: React.ReactNode;
}

const MenubarShortcut = React.forwardRef<Text, MenubarShortcutProps>(
  ({ style, children }, ref) => (
    <Text ref={ref} style={[styles.shortcut, style]}>
      {children}
    </Text>
  )
);

MenubarShortcut.displayName = 'MenubarShortcut';

// ============================================================================
// MenubarGroup
// ============================================================================

interface MenubarGroupProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

const MenubarGroup = React.forwardRef<View, MenubarGroupProps>(({ style, children }, ref) => (
  <View ref={ref} style={style}>
    {children}
  </View>
));

MenubarGroup.displayName = 'MenubarGroup';

// ============================================================================
// Sub-menu components
// ============================================================================

interface MenubarSubProps {
  children: React.ReactNode;
}

const MenubarSub = React.forwardRef<View, MenubarSubProps>(({ children }, ref) => (
  <View ref={ref}>{children}</View>
));

MenubarSub.displayName = 'MenubarSub';

interface MenubarSubTriggerProps {
  inset?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
}

const MenubarSubTrigger = React.forwardRef<View, MenubarSubTriggerProps>(
  ({ inset, style, textStyle, children }, ref) => (
    <TouchableOpacity style={[styles.item, inset && styles.itemInset, style]}>
      {typeof children === 'string' ? (
        <Text style={[styles.itemText, textStyle]}>{children}</Text>
      ) : (
        children
      )}
      <Icon name="chevron-right" size={16} color="#666" style={styles.subIcon} />
    </TouchableOpacity>
  )
);

MenubarSubTrigger.displayName = 'MenubarSubTrigger';

interface MenubarSubContentProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

const MenubarSubContent = React.forwardRef<View, MenubarSubContentProps>(
  ({ style, children }, ref) => (
    <View ref={ref} style={[styles.content, style]}>
      {children}
    </View>
  )
);

MenubarSubContent.displayName = 'MenubarSubContent';

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  menubar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    padding: 4,
    height: 36,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  trigger: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  triggerOpen: {
    backgroundColor: '#f3f4f6',
  },
  triggerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    minWidth: 192,
    maxHeight: 400,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  contentScroll: {
    maxHeight: 400,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
  },
  itemInset: {
    paddingLeft: 32,
  },
  itemCheckbox: {
    paddingLeft: 32,
  },
  itemDestructive: {
    backgroundColor: '#fef2f2',
  },
  itemDisabled: {
    opacity: 0.5,
  },
  itemText: {
    fontSize: 14,
    color: '#000',
  },
  itemTextDestructive: {
    color: '#dc2626',
  },
  itemTextDisabled: {
    color: '#9ca3af',
  },
  checkboxIndicator: {
    position: 'absolute',
    left: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioIndicator: {
    position: 'absolute',
    left: 8,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioIndicatorInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  labelInset: {
    paddingLeft: 32,
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 4,
    marginHorizontal: -4,
  },
  shortcut: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 'auto',
    letterSpacing: 1,
  },
  subIcon: {
    marginLeft: 'auto',
  },
});

// ============================================================================
// Exports
// ============================================================================

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarShortcut,
  MenubarGroup,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
};


