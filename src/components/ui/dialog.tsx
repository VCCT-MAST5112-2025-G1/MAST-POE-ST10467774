import * as React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ModalProps,
  ViewProps,
  TextProps,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextValue>({
  open: false,
  onOpenChange: () => {},
});

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

interface DialogContentProps extends ViewProps {
  style?: ViewStyle;
}

interface DialogHeaderProps extends ViewProps {
  style?: ViewStyle;
}

interface DialogFooterProps extends ViewProps {
  style?: ViewStyle;
}

interface DialogTitleProps extends TextProps {
  style?: TextStyle;
}

interface DialogDescriptionProps extends TextProps {
  style?: TextStyle;
}

const Dialog: React.FC<DialogProps> = ({ open = false, onOpenChange, children }) => {
  return (
    <DialogContext.Provider value={{ open, onOpenChange: onOpenChange || (() => {}) }}>
      {children}
    </DialogContext.Provider>
  );
};

const DialogTrigger: React.FC<{ children: React.ReactElement; asChild?: boolean }> = ({ children }) => {
  const { onOpenChange } = React.useContext(DialogContext);
  
  return React.cloneElement(children, {
    onPress: () => onOpenChange(true),
  } as any);
};

const DialogContent = React.forwardRef<View, DialogContentProps>(
  ({ style, children, ...props }, ref) => {
    const { open, onOpenChange } = React.useContext(DialogContext);

    return (
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => onOpenChange(false)}
      >
        <View style={styles.overlay}>
          <View ref={ref} style={[styles.content, style]} {...props}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => onOpenChange(false)}
            >
              <Icon name="close" size={24} color="#6b7280" />
            </TouchableOpacity>
            {children}
          </View>
        </View>
      </Modal>
    );
  }
);

DialogContent.displayName = "DialogContent";

const DialogHeader = React.forwardRef<View, DialogHeaderProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <View ref={ref} style={[styles.header, style]} {...props}>
        {children}
      </View>
    );
  }
);

DialogHeader.displayName = "DialogHeader";

const DialogFooter = React.forwardRef<View, DialogFooterProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <View ref={ref} style={[styles.footer, style]} {...props}>
        {children}
      </View>
    );
  }
);

DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<Text, DialogTitleProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <Text ref={ref} style={[styles.title, style]} {...props}>
        {children}
      </Text>
    );
  }
);

DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<Text, DialogDescriptionProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <Text ref={ref} style={[styles.description, style]} {...props}>
        {children}
      </Text>
    );
  }
);

DialogDescription.displayName = "DialogDescription";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  content: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  header: {
    marginBottom: 16,
  },
  footer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    color: '#111827',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6b7280',
    marginTop: 8,
  },
});

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};



