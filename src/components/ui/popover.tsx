import * as React from "react";
import { Modal, View, TouchableOpacity, StyleSheet, ViewStyle, ViewProps } from "react-native";

interface PopoverContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PopoverContext = React.createContext<PopoverContextValue>({
  open: false,
  onOpenChange: () => {},
});

interface PopoverProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

interface PopoverContentProps extends ViewProps {
  style?: ViewStyle;
  align?: "start" | "center" | "end";
}

const Popover: React.FC<PopoverProps> = ({ open = false, onOpenChange, children }) => {
  return (
    <PopoverContext.Provider value={{ open, onOpenChange: onOpenChange || (() => {}) }}>
      {children}
    </PopoverContext.Provider>
  );
};

const PopoverTrigger: React.FC<{ children: React.ReactElement; asChild?: boolean }> = ({ children }) => {
  const { onOpenChange } = React.useContext(PopoverContext);
  
  return React.cloneElement(children, {
    onPress: () => onOpenChange(true),
  } as any);
};

const PopoverContent = React.forwardRef<View, PopoverContentProps>(
  ({ style, children, align = "center", ...props }, ref) => {
    const { open, onOpenChange } = React.useContext(PopoverContext);

    return (
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => onOpenChange(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => onOpenChange(false)}
        >
          <View
            ref={ref}
            style={[
              styles.content,
              align === "start" && styles.alignStart,
              align === "end" && styles.alignEnd,
              style,
            ]}
            {...props}
          >
            {children}
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
);

PopoverContent.displayName = "PopoverContent";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    width: 288,
    maxWidth: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  alignStart: {
    alignSelf: 'flex-start',
    marginLeft: 16,
  },
  alignEnd: {
    alignSelf: 'flex-end',
    marginRight: 16,
  },
});

export { Popover, PopoverTrigger, PopoverContent };


