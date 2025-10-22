import * as React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  ViewStyle,
  ViewProps,
  TextProps,
} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface SheetContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SheetContext = React.createContext<SheetContextValue>({
  open: false,
  onOpenChange: () => {},
});

interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

interface SheetTriggerProps extends ViewProps {
  asChild?: boolean;
  style?: ViewStyle;
}

interface SheetContentProps extends ViewProps {
  side?: "top" | "right" | "bottom" | "left";
  style?: ViewStyle;
}

interface SheetHeaderProps extends ViewProps {
  style?: ViewStyle;
}

interface SheetFooterProps extends ViewProps {
  style?: ViewStyle;
}

interface SheetTitleProps extends TextProps {
  style?: ViewStyle;
}

interface SheetDescriptionProps extends TextProps {
  style?: ViewStyle;
}

const Sheet = ({ open, onOpenChange, children }: SheetProps) => {
  return (
    <SheetContext.Provider value={{ open: open || false, onOpenChange: onOpenChange || (() => {}) }}>
      {children}
    </SheetContext.Provider>
  );
};

const SheetTrigger = React.forwardRef<View, SheetTriggerProps>(
  ({ asChild, children, ...props }, ref) => {
    const { onOpenChange } = React.useContext(SheetContext);

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as any, {
        onPress: () => onOpenChange(true),
      });
    }

    return (
      <TouchableOpacity ref={ref as any} onPress={() => onOpenChange(true)} {...props}>
        {children}
      </TouchableOpacity>
    );
  }
);
SheetTrigger.displayName = "SheetTrigger";

const SheetContent = React.forwardRef<View, SheetContentProps>(
  ({ side = "right", style, children, ...props }, ref) => {
    const { open, onOpenChange } = React.useContext(SheetContext);
    const slideAnim = React.useRef(new Animated.Value(0)).current;
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    React.useEffect(() => {
      Animated.timing(slideAnim, {
        toValue: open ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, [open]);

    const getTransform = () => {
      switch (side) {
        case "right":
          return [{ translateX: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [screenWidth, 0] }) }];
        case "left":
          return [{ translateX: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [-screenWidth, 0] }) }];
        case "top":
          return [{ translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [-screenHeight, 0] }) }];
        case "bottom":
          return [{ translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [screenHeight, 0] }) }];
      }
    };

    const getContentStyle = () => {
      switch (side) {
        case "right":
          return styles.contentRight;
        case "left":
          return styles.contentLeft;
        case "top":
          return styles.contentTop;
        case "bottom":
          return styles.contentBottom;
      }
    };

    return (
      <Modal visible={open} transparent animationType="none" onRequestClose={() => onOpenChange(false)}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => onOpenChange(false)}
        >
          <Animated.View
            ref={ref}
            style={[
              styles.content,
              getContentStyle(),
              { transform: getTransform() },
              style,
            ]}
            onStartShouldSetResponder={() => true}
            {...props}
          >
            {children}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => onOpenChange(false)}
            >
              <MaterialIcons name="close" size={20} color="#000" />
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    );
  }
);
SheetContent.displayName = "SheetContent";

const SheetHeader = React.forwardRef<View, SheetHeaderProps>(
  ({ style, ...props }, ref) => {
    return <View ref={ref} style={[styles.header, style]} {...props} />;
  }
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = React.forwardRef<View, SheetFooterProps>(
  ({ style, ...props }, ref) => {
    return <View ref={ref} style={[styles.footer, style]} {...props} />;
  }
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<Text, SheetTitleProps>(
  ({ style, ...props }, ref) => {
    return <Text ref={ref} style={[styles.title, style]} {...props} />;
  }
);
SheetTitle.displayName = "SheetTitle";

const SheetDescription = React.forwardRef<Text, SheetDescriptionProps>(
  ({ style, ...props }, ref) => {
    return <Text ref={ref} style={[styles.description, style]} {...props} />;
  }
);
SheetDescription.displayName = "SheetDescription";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentRight: {
    right: 0,
    top: 0,
    bottom: 0,
    width: '75%',
    maxWidth: 400,
  },
  contentLeft: {
    left: 0,
    top: 0,
    bottom: 0,
    width: '75%',
    maxWidth: 400,
  },
  contentTop: {
    top: 0,
    left: 0,
    right: 0,
    maxHeight: '50%',
  },
  contentBottom: {
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: '50%',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
  },
  header: {
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription };



