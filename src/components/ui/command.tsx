import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// ============================================================================
// Context
// ============================================================================

interface CommandContextValue {
  search: string;
  setSearch: (search: string) => void;
}

const CommandContext = React.createContext<CommandContextValue | undefined>(undefined);

const useCommand = () => {
  const context = React.useContext(CommandContext);
  if (!context) {
    throw new Error('Command components must be used within a Command');
  }
  return context;
};

// ============================================================================
// Command (Root)
// ============================================================================

interface CommandProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

const Command = React.forwardRef<View, CommandProps>(({ style, children }, ref) => {
  const [search, setSearch] = React.useState('');

  const contextValue: CommandContextValue = React.useMemo(
    () => ({ search, setSearch }),
    [search]
  );

  return (
    <CommandContext.Provider value={contextValue}>
      <View ref={ref} style={[styles.command, style]}>
        {children}
      </View>
    </CommandContext.Provider>
  );
});

Command.displayName = 'Command';

// ============================================================================
// CommandDialog
// ============================================================================

interface CommandDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  style?: ViewStyle;
  children: React.ReactNode;
}

const CommandDialog = React.forwardRef<View, CommandDialogProps>(
  ({ open, onOpenChange, title = 'Command Palette', description, style, children }, ref) => {
    return (
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => onOpenChange?.(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => onOpenChange?.(false)}
        >
          <View style={[styles.dialogContent, style]} ref={ref}>
            <Command>{children}</Command>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
);

CommandDialog.displayName = 'CommandDialog';

// ============================================================================
// CommandInput
// ============================================================================

interface CommandInputProps {
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  style?: ViewStyle;
  inputStyle?: TextStyle;
}

const CommandInput = React.forwardRef<View, CommandInputProps>(
  ({ placeholder = 'Search...', value: controlledValue, onValueChange, style, inputStyle }, ref) => {
    const { search, setSearch } = useCommand();

    const handleChange = (text: string) => {
      setSearch(text);
      onValueChange?.(text);
    };

    const displayValue = controlledValue !== undefined ? controlledValue : search;

    return (
      <View ref={ref} style={[styles.inputWrapper, style]}>
        <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          value={displayValue}
          onChangeText={handleChange}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          style={[styles.input, inputStyle]}
        />
      </View>
    );
  }
);

CommandInput.displayName = 'CommandInput';

// ============================================================================
// CommandList
// ============================================================================

interface CommandListProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

const CommandList = React.forwardRef<ScrollView, CommandListProps>(({ style, children }, ref) => (
  <ScrollView ref={ref} style={[styles.list, style]}>
    {children}
  </ScrollView>
));

CommandList.displayName = 'CommandList';

// ============================================================================
// CommandEmpty
// ============================================================================

interface CommandEmptyProps {
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
}

const CommandEmpty = React.forwardRef<View, CommandEmptyProps>(
  ({ style, textStyle, children = 'No results found.' }, ref) => (
    <View ref={ref} style={[styles.empty, style]}>
      {typeof children === 'string' ? (
        <Text style={[styles.emptyText, textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </View>
  )
);

CommandEmpty.displayName = 'CommandEmpty';

// ============================================================================
// CommandGroup
// ============================================================================

interface CommandGroupProps {
  heading?: string;
  style?: ViewStyle;
  headingStyle?: TextStyle;
  children: React.ReactNode;
}

const CommandGroup = React.forwardRef<View, CommandGroupProps>(
  ({ heading, style, headingStyle, children }, ref) => (
    <View ref={ref} style={[styles.group, style]}>
      {heading && <Text style={[styles.groupHeading, headingStyle]}>{heading}</Text>}
      {children}
    </View>
  )
);

CommandGroup.displayName = 'CommandGroup';

// ============================================================================
// CommandItem
// ============================================================================

interface CommandItemProps {
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
}

const CommandItem = React.forwardRef<View, CommandItemProps>(
  ({ onPress, disabled, style, textStyle, children }, ref) => (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.item, disabled && styles.itemDisabled, style]}
    >
      {typeof children === 'string' ? (
        <Text style={[styles.itemText, disabled && styles.itemTextDisabled, textStyle]}>
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  )
);

CommandItem.displayName = 'CommandItem';

// ============================================================================
// CommandSeparator
// ============================================================================

interface CommandSeparatorProps {
  style?: ViewStyle;
}

const CommandSeparator = React.forwardRef<View, CommandSeparatorProps>(({ style }, ref) => (
  <View ref={ref} style={[styles.separator, style]} />
));

CommandSeparator.displayName = 'CommandSeparator';

// ============================================================================
// CommandShortcut
// ============================================================================

interface CommandShortcutProps {
  style?: TextStyle;
  children: React.ReactNode;
}

const CommandShortcut = React.forwardRef<Text, CommandShortcutProps>(
  ({ style, children }, ref) => (
    <Text ref={ref} style={[styles.shortcut, style]}>
      {children}
    </Text>
  )
);

CommandShortcut.displayName = 'CommandShortcut';

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  command: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogContent: {
    width: '90%',
    maxWidth: 600,
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    height: 48,
  },
  list: {
    maxHeight: 400,
  },
  empty: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#6b7280',
  },
  group: {
    paddingVertical: 8,
  },
  groupHeading: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  itemDisabled: {
    opacity: 0.5,
  },
  itemText: {
    fontSize: 14,
    color: '#000',
  },
  itemTextDisabled: {
    color: '#9ca3af',
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 4,
  },
  shortcut: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 'auto',
  },
});

// ============================================================================
// Exports
// ============================================================================

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
};


