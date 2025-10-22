import * as React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  ViewStyle,
  TextStyle,
} from 'react-native';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// Context
// ============================================================================

interface DrawerContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  direction?: 'top' | 'bottom' | 'left' | 'right';
}

const DrawerContext = React.createContext<DrawerContextValue | undefined>(undefined);

const useDrawer = () => {
  const context = React.useContext(DrawerContext);
  if (!context) {
    throw new Error('Drawer components must be used within a Drawer');
  }
  return context;
};

// ============================================================================
// Drawer (Root)
// ============================================================================

interface DrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  direction?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
}

const Drawer = React.forwardRef<View, DrawerProps>(
  ({ open: controlledOpen, onOpenChange, direction = 'bottom', children }, ref) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);

    const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
    const setOpen = React.useCallback(
      (newOpen: boolean) => {
        if (controlledOpen === undefined) {
          setUncontrolledOpen(newOpen);
        }
        onOpenChange?.(newOpen);
      },
      [controlledOpen, onOpenChange]
    );

    const contextValue: DrawerContextValue = React.useMemo(
      () => ({ open, setOpen, direction }),
      [open, setOpen, direction]
    );

    return (
      <DrawerContext.Provider value={contextValue}>
        <View ref={ref}>{children}</View>
      </DrawerContext.Provider>
    );
  }
);

Drawer.displayName = 'Drawer';

// ============================================================================
// DrawerTrigger
// ============================================================================

interface DrawerTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
}

const DrawerTrigger = React.forwardRef<View, DrawerTriggerProps>(
  ({ asChild, children, style }, ref) => {
    const { setOpen } = useDrawer();

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        onPress: () => setOpen(true),
      } as any);
    }

    return (
      <TouchableOpacity onPress={() => setOpen(true)} style={style}>
        {children}
      </TouchableOpacity>
    );
  }
);

DrawerTrigger.displayName = 'DrawerTrigger';

// ============================================================================
// DrawerClose
// ============================================================================

interface DrawerCloseProps {
  asChild?: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
}

const DrawerClose = React.forwardRef<View, DrawerCloseProps>(
  ({ asChild, children, style }, ref) => {
    const { setOpen } = useDrawer();

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        onPress: () => setOpen(false),
      } as any);
    }

    return (
      <TouchableOpacity onPress={() => setOpen(false)} style={style}>
        {children}
      </TouchableOpacity>
    );
  }
);

DrawerClose.displayName = 'DrawerClose';

// ============================================================================
// DrawerOverlay
// ============================================================================

interface DrawerOverlayProps {
  style?: ViewStyle;
}

const DrawerOverlay = React.forwardRef<View, DrawerOverlayProps>(({ style }, ref) => {
  const { setOpen } = useDrawer();

  return (
    <TouchableOpacity
      ref={ref}
      style={[styles.overlay, style]}
      activeOpacity={1}
      onPress={() => setOpen(false)}
    />
  );
});

DrawerOverlay.displayName = 'DrawerOverlay';

// ============================================================================
// DrawerContent
// ============================================================================

interface DrawerContentProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

const DrawerContent = React.forwardRef<View, DrawerContentProps>(
  ({ style, children }, ref) => {
    const { open, setOpen, direction = 'bottom' } = useDrawer();
    const slideAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
      Animated.spring(slideAnim, {
        toValue: open ? 1 : 0,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();
    }, [open, slideAnim]);

    const getTransform = (): any => {
      switch (direction) {
        case 'top':
          return {
            translateY: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-SCREEN_HEIGHT * 0.8, 0],
            }),
          };
        case 'bottom':
          return {
            translateY: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [SCREEN_HEIGHT * 0.8, 0],
            }),
          };
        case 'left':
          return {
            translateX: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-SCREEN_WIDTH * 0.75, 0],
            }),
          };
        case 'right':
          return {
            translateX: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [SCREEN_WIDTH * 0.75, 0],
            }),
          };
        default:
          return {};
      }
    };

    const getContentStyle = () => {
      const baseStyle = [styles.content, style];
      switch (direction) {
        case 'top':
          return [...baseStyle, styles.contentTop];
        case 'bottom':
          return [...baseStyle, styles.contentBottom];
        case 'left':
          return [...baseStyle, styles.contentLeft];
        case 'right':
          return [...baseStyle, styles.contentRight];
        default:
          return baseStyle;
      }
    };

    return (
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <View style={styles.modalContainer}>
          <DrawerOverlay />
          <Animated.View
            ref={ref}
            style={[getContentStyle(), { transform: [getTransform()] }]}
          >
            {(direction === 'bottom') && <View style={styles.handle} />}
            {children}
          </Animated.View>
        </View>
      </Modal>
    );
  }
);

DrawerContent.displayName = 'DrawerContent';

// ============================================================================
// DrawerHeader
// ============================================================================

interface DrawerHeaderProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

const DrawerHeader = React.forwardRef<View, DrawerHeaderProps>(({ style, children }, ref) => (
  <View ref={ref} style={[styles.header, style]}>
    {children}
  </View>
));

DrawerHeader.displayName = 'DrawerHeader';

// ============================================================================
// DrawerFooter
// ============================================================================

interface DrawerFooterProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

const DrawerFooter = React.forwardRef<View, DrawerFooterProps>(({ style, children }, ref) => (
  <View ref={ref} style={[styles.footer, style]}>
    {children}
  </View>
));

DrawerFooter.displayName = 'DrawerFooter';

// ============================================================================
// DrawerTitle
// ============================================================================

interface DrawerTitleProps {
  style?: TextStyle;
  children: React.ReactNode;
}

const DrawerTitle = React.forwardRef<Text, DrawerTitleProps>(({ style, children }, ref) => (
  <Text ref={ref} style={[styles.title, style]}>
    {children}
  </Text>
));

DrawerTitle.displayName = 'DrawerTitle';

// ============================================================================
// DrawerDescription
// ============================================================================

interface DrawerDescriptionProps {
  style?: TextStyle;
  children: React.ReactNode;
}

const DrawerDescription = React.forwardRef<Text, DrawerDescriptionProps>(
  ({ style, children }, ref) => (
    <Text ref={ref} style={[styles.description, style]}>
      {children}
    </Text>
  )
);

DrawerDescription.displayName = 'DrawerDescription';

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    backgroundColor: '#fff',
    maxHeight: SCREEN_HEIGHT * 0.8,
    position: 'absolute',
  },
  contentTop: {
    top: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  contentBottom: {
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  contentLeft: {
    top: 0,
    bottom: 0,
    left: 0,
    width: SCREEN_WIDTH * 0.75,
    maxWidth: 400,
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  contentRight: {
    top: 0,
    bottom: 0,
    right: 0,
    width: SCREEN_WIDTH * 0.75,
    maxWidth: 400,
    borderLeftWidth: 1,
    borderLeftColor: '#e5e7eb',
  },
  handle: {
    width: 100,
    height: 8,
    backgroundColor: '#d1d5db',
    borderRadius: 4,
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  header: {
    padding: 16,
    gap: 6,
  },
  footer: {
    padding: 16,
    gap: 8,
    marginTop: 'auto',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
  },
});

// ============================================================================
// Exports
// ============================================================================

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};


