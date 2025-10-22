import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// ============================================================================
// Context
// ============================================================================

interface NavigationMenuContextValue {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  viewport: boolean;
}

const NavigationMenuContext = React.createContext<NavigationMenuContextValue | undefined>(
  undefined
);

const useNavigationMenu = () => {
  const context = React.useContext(NavigationMenuContext);
  if (!context) {
    throw new Error('NavigationMenu components must be used within a NavigationMenu');
  }
  return context;
};

interface NavigationMenuItemContextValue {
  itemId: string;
  isActive: boolean;
  setActive: (active: boolean) => void;
}

const NavigationMenuItemContext = React.createContext<
  NavigationMenuItemContextValue | undefined
>(undefined);

const useNavigationMenuItem = () => {
  const context = React.useContext(NavigationMenuItemContext);
  if (!context) {
    throw new Error('NavigationMenuItem components must be used within a NavigationMenuItem');
  }
  return context;
};

// ============================================================================
// NavigationMenu (Root)
// ============================================================================

interface NavigationMenuProps {
  viewport?: boolean;
  style?: ViewStyle;
  children: React.ReactNode;
}

const NavigationMenu = React.forwardRef<View, NavigationMenuProps>(
  ({ viewport = true, style, children }, ref) => {
    const [activeId, setActiveId] = React.useState<string | null>(null);

    const contextValue: NavigationMenuContextValue = React.useMemo(
      () => ({ activeId, setActiveId, viewport }),
      [activeId, viewport]
    );

    return (
      <NavigationMenuContext.Provider value={contextValue}>
        <View ref={ref} style={[styles.root, style]}>
          {children}
        </View>
      </NavigationMenuContext.Provider>
    );
  }
);

NavigationMenu.displayName = 'NavigationMenu';

// ============================================================================
// NavigationMenuList
// ============================================================================

interface NavigationMenuListProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

const NavigationMenuList = React.forwardRef<View, NavigationMenuListProps>(
  ({ style, children }, ref) => (
    <View ref={ref} style={[styles.list, style]}>
      {children}
    </View>
  )
);

NavigationMenuList.displayName = 'NavigationMenuList';

// ============================================================================
// NavigationMenuItem
// ============================================================================

interface NavigationMenuItemProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

const NavigationMenuItem = React.forwardRef<View, NavigationMenuItemProps>(
  ({ style, children }, ref) => {
    const itemId = React.useId();
    const { activeId, setActiveId } = useNavigationMenu();

    const isActive = activeId === itemId;
    const setActive = React.useCallback(
      (active: boolean) => {
        setActiveId(active ? itemId : null);
      },
      [itemId, setActiveId]
    );

    const contextValue: NavigationMenuItemContextValue = React.useMemo(
      () => ({ itemId, isActive, setActive }),
      [itemId, isActive, setActive]
    );

    return (
      <NavigationMenuItemContext.Provider value={contextValue}>
        <View ref={ref} style={[styles.item, style]}>
          {children}
        </View>
      </NavigationMenuItemContext.Provider>
    );
  }
);

NavigationMenuItem.displayName = 'NavigationMenuItem';

// ============================================================================
// NavigationMenuTrigger
// ============================================================================

interface NavigationMenuTriggerProps {
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
}

const NavigationMenuTrigger = React.forwardRef<View, NavigationMenuTriggerProps>(
  ({ style, textStyle, children }, ref) => {
    const { isActive, setActive } = useNavigationMenuItem();
    const rotateAnim = React.useRef(new Animated.Value(isActive ? 1 : 0)).current;

    React.useEffect(() => {
      Animated.timing(rotateAnim, {
        toValue: isActive ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, [isActive, rotateAnim]);

    const rotation = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    return (
      <TouchableOpacity
        onPress={() => setActive(!isActive)}
        style={[styles.trigger, isActive && styles.triggerActive, style]}
      >
        {typeof children === 'string' ? (
          <Text style={[styles.triggerText, textStyle]}>{children}</Text>
        ) : (
          children
        )}
        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
          <Icon name="keyboard-arrow-down" size={16} color="#666" />
        </Animated.View>
      </TouchableOpacity>
    );
  }
);

NavigationMenuTrigger.displayName = 'NavigationMenuTrigger';

// ============================================================================
// NavigationMenuContent
// ============================================================================

interface NavigationMenuContentProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

const NavigationMenuContent = React.forwardRef<View, NavigationMenuContentProps>(
  ({ style, children }, ref) => {
    const { isActive } = useNavigationMenuItem();
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: isActive ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }, [isActive, fadeAnim]);

    if (!isActive) return null;

    return (
      <Animated.View ref={ref} style={[styles.content, { opacity: fadeAnim }, style]}>
        {children}
      </Animated.View>
    );
  }
);

NavigationMenuContent.displayName = 'NavigationMenuContent';

// ============================================================================
// NavigationMenuLink
// ============================================================================

interface NavigationMenuLinkProps {
  onPress?: () => void;
  active?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
}

const NavigationMenuLink = React.forwardRef<View, NavigationMenuLinkProps>(
  ({ onPress, active, style, textStyle, children }, ref) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.link, active && styles.linkActive, style]}
    >
      {typeof children === 'string' ? (
        <Text style={[styles.linkText, active && styles.linkTextActive, textStyle]}>
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  )
);

NavigationMenuLink.displayName = 'NavigationMenuLink';

// ============================================================================
// NavigationMenuViewport
// ============================================================================

interface NavigationMenuViewportProps {
  style?: ViewStyle;
}

const NavigationMenuViewport = React.forwardRef<View, NavigationMenuViewportProps>(
  ({ style }, ref) => {
    const { activeId } = useNavigationMenu();
    const scaleAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
      Animated.spring(scaleAnim, {
        toValue: activeId ? 1 : 0,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();
    }, [activeId, scaleAnim]);

    if (!activeId) return null;

    return (
      <Animated.View
        ref={ref}
        style={[
          styles.viewport,
          {
            transform: [{ scale: scaleAnim }],
            opacity: scaleAnim,
          },
          style,
        ]}
      />
    );
  }
);

NavigationMenuViewport.displayName = 'NavigationMenuViewport';

// ============================================================================
// NavigationMenuIndicator
// ============================================================================

interface NavigationMenuIndicatorProps {
  style?: ViewStyle;
}

const NavigationMenuIndicator = React.forwardRef<View, NavigationMenuIndicatorProps>(
  ({ style }, ref) => {
    const { isActive } = useNavigationMenuItem();
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: isActive ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }, [isActive, fadeAnim]);

    if (!isActive) return null;

    return (
      <Animated.View ref={ref} style={[styles.indicator, { opacity: fadeAnim }, style]}>
        <View style={styles.indicatorArrow} />
      </Animated.View>
    );
  }
);

NavigationMenuIndicator.displayName = 'NavigationMenuIndicator';

// ============================================================================
// navigationMenuTriggerStyle (utility)
// ============================================================================

const navigationMenuTriggerStyle = (): ViewStyle => styles.trigger;

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '100%',
    position: 'relative',
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  item: {
    position: 'relative',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 6,
    height: 36,
  },
  triggerActive: {
    backgroundColor: '#f3f4f6',
  },
  triggerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginRight: 4,
  },
  content: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: 6,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  link: {
    flexDirection: 'column',
    gap: 4,
    padding: 8,
    borderRadius: 4,
  },
  linkActive: {
    backgroundColor: '#f3f4f6',
  },
  linkText: {
    fontSize: 14,
    color: '#000',
  },
  linkTextActive: {
    color: '#3b82f6',
  },
  viewport: {
    position: 'absolute',
    top: '100%',
    left: 0,
    marginTop: 6,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 6,
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  indicatorArrow: {
    width: 8,
    height: 8,
    backgroundColor: '#e5e7eb',
    transform: [{ rotate: '45deg' }],
    borderRadius: 2,
    marginBottom: -4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

// ============================================================================
// Exports
// ============================================================================

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
  NavigationMenuIndicator,
  navigationMenuTriggerStyle,
};

