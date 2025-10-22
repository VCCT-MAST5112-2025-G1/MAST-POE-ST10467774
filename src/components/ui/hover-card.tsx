import * as React from "react";
import { View, Modal, TouchableOpacity, StyleSheet, ViewStyle, ViewProps } from "react-native";

interface HoverCardContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerLayout: { x: number; y: number; width: number; height: number } | null;
  setTriggerLayout: (layout: { x: number; y: number; width: number; height: number }) => void;
}

const HoverCardContext = React.createContext<HoverCardContextValue>({
  open: false,
  setOpen: () => {},
  triggerLayout: null,
  setTriggerLayout: () => {},
});

interface HoverCardProps {
  children: React.ReactNode;
}

interface HoverCardTriggerProps extends ViewProps {
  asChild?: boolean;
  style?: ViewStyle;
}

interface HoverCardContentProps extends ViewProps {
  align?: "start" | "center" | "end";
  style?: ViewStyle;
}

const HoverCard = ({ children }: HoverCardProps) => {
  const [open, setOpen] = React.useState(false);
  const [triggerLayout, setTriggerLayout] = React.useState<{ x: number; y: number; width: number; height: number } | null>(null);

  return (
    <HoverCardContext.Provider value={{ open, setOpen, triggerLayout, setTriggerLayout }}>
      {children}
    </HoverCardContext.Provider>
  );
};

const HoverCardTrigger = React.forwardRef<View, HoverCardTriggerProps>(
  ({ asChild, children, ...props }, ref) => {
    const { setOpen, setTriggerLayout } = React.useContext(HoverCardContext);

    // Note: React Native doesn't support hover, so this is treated like a long press
    const handleLongPress = () => setOpen(true);

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as any, {
        onLongPress: handleLongPress,
        onLayout: (event: any) => {
          const { x, y, width, height } = event.nativeEvent.layout;
          setTriggerLayout({ x, y, width, height });
        },
      });
    }

    return (
      <TouchableOpacity
        ref={ref as any}
        onLongPress={handleLongPress}
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
HoverCardTrigger.displayName = "HoverCardTrigger";

const HoverCardContent = React.forwardRef<View, HoverCardContentProps>(
  ({ align = "center", style, children, ...props }, ref) => {
    const { open, setOpen } = React.useContext(HoverCardContext);

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
            {children}
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
);
HoverCardContent.displayName = "HoverCardContent";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    width: 256,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export { HoverCard, HoverCardTrigger, HoverCardContent };



