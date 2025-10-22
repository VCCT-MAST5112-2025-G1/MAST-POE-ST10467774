import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Modal,
  LayoutRectangle,
} from "react-native";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  side?: "top" | "bottom" | "left" | "right";
}

interface TooltipContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerLayout: LayoutRectangle | null;
  setTriggerLayout: (layout: LayoutRectangle | null) => void;
  content: string;
  side: "top" | "bottom" | "left" | "right";
}

const TooltipContext = React.createContext<TooltipContextValue>({
  open: false,
  setOpen: () => {},
  triggerLayout: null,
  setTriggerLayout: () => {},
  content: "",
  side: "top",
});

const TooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

const Tooltip: React.FC<TooltipProps> = ({ children, content, side = "top" }) => {
  const [open, setOpen] = React.useState(false);
  const [triggerLayout, setTriggerLayout] = React.useState<LayoutRectangle | null>(null);

  return (
    <TooltipContext.Provider
      value={{ open, setOpen, triggerLayout, setTriggerLayout, content, side }}
    >
      {children}
    </TooltipContext.Provider>
  );
};

const TooltipTrigger: React.FC<{ children: React.ReactElement; asChild?: boolean }> = ({
  children,
}) => {
  const { setOpen, setTriggerLayout } = React.useContext(TooltipContext);

  return React.cloneElement(children, {
    onPress: () => setOpen(true),
    onLayout: (event: any) => {
      const layout = event.nativeEvent.layout;
      setTriggerLayout(layout);
    },
  } as any);
};

const TooltipContent = React.forwardRef<View, { style?: ViewStyle; textStyle?: TextStyle }>(
  ({ style, textStyle }, ref) => {
    const { open, setOpen, content } = React.useContext(TooltipContext);

    if (!open) return null;

    return (
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View ref={ref} style={[styles.content, style]}>
            <Text style={[styles.text, textStyle]}>{content}</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
);

TooltipContent.displayName = "TooltipContent";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  content: {
    backgroundColor: '#1f2937',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    maxWidth: 250,
  },
  text: {
    color: '#ffffff',
    fontSize: 12,
    lineHeight: 16,
  },
});

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent };


