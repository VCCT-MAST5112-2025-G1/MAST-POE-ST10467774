import * as React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Pressable,
} from "react-native";

interface AlertDialogContextValue {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const AlertDialogContext = React.createContext<AlertDialogContextValue | undefined>(
  undefined
);

function useAlertDialog() {
  const context = React.useContext(AlertDialogContext);
  if (!context) {
    throw new Error("AlertDialog components must be used within AlertDialog");
  }
  return context;
}

interface AlertDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function AlertDialog({ open = false, onOpenChange, children }: AlertDialogProps) {
  const [isOpen, setIsOpen] = React.useState(open);

  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  return (
    <AlertDialogContext.Provider value={{ isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </AlertDialogContext.Provider>
  );
}

interface AlertDialogTriggerProps {
  children: React.ReactElement;
  onPress?: () => void;
}

function AlertDialogTrigger({ children, onPress }: AlertDialogTriggerProps) {
  const { onOpenChange } = useAlertDialog();

  const handlePress = () => {
    onPress?.();
    onOpenChange(true);
  };

  return React.cloneElement(children, { onPress: handlePress } as any);
}

interface AlertDialogPortalProps {
  children: React.ReactNode;
}

function AlertDialogPortal({ children }: AlertDialogPortalProps) {
  return <>{children}</>;
}

interface AlertDialogOverlayProps {
  style?: ViewStyle;
}

function AlertDialogOverlay({ style }: AlertDialogOverlayProps) {
  const { onOpenChange } = useAlertDialog();

  return (
    <Pressable
      style={[styles.overlay, style]}
      onPress={() => onOpenChange(false)}
    />
  );
}

interface AlertDialogContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

function AlertDialogContent({ children, style }: AlertDialogContentProps) {
  const { isOpen, onOpenChange } = useAlertDialog();

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange(false)}
    >
      <View style={styles.modalContainer}>
        <AlertDialogOverlay />
        <View style={[styles.content, style]}>{children}</View>
      </View>
    </Modal>
  );
}

interface AlertDialogHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

function AlertDialogHeader({ children, style }: AlertDialogHeaderProps) {
  return <View style={[styles.header, style]}>{children}</View>;
}

interface AlertDialogFooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

function AlertDialogFooter({ children, style }: AlertDialogFooterProps) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

interface AlertDialogTitleProps {
  children: React.ReactNode;
  style?: TextStyle;
}

function AlertDialogTitle({ children, style }: AlertDialogTitleProps) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

interface AlertDialogDescriptionProps {
  children: React.ReactNode;
  style?: TextStyle;
}

function AlertDialogDescription({ children, style }: AlertDialogDescriptionProps) {
  return <Text style={[styles.description, style]}>{children}</Text>;
}

interface AlertDialogActionProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

function AlertDialogAction({ children, onPress, style, textStyle }: AlertDialogActionProps) {
  const { onOpenChange } = useAlertDialog();

  const handlePress = () => {
    onPress?.();
    onOpenChange(false);
  };

  return (
    <TouchableOpacity style={[styles.action, style]} onPress={handlePress}>
      <Text style={[styles.actionText, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
}

interface AlertDialogCancelProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

function AlertDialogCancel({ children, onPress, style, textStyle }: AlertDialogCancelProps) {
  const { onOpenChange } = useAlertDialog();

  const handlePress = () => {
    onPress?.();
    onOpenChange(false);
  };

  return (
    <TouchableOpacity style={[styles.cancel, style]} onPress={handlePress}>
      <Text style={[styles.cancelText, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 24,
    width: "90%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    marginBottom: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
  action: {
    backgroundColor: "#030213",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    minWidth: 80,
    alignItems: "center",
  },
  actionText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
  cancel: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#e5e5e5",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    minWidth: 80,
    alignItems: "center",
  },
  cancelText: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "500",
  },
});

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
