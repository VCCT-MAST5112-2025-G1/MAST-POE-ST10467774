import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useIsMobile } from './use-mobile';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SIDEBAR_WIDTH = 256; // 16rem
const SIDEBAR_WIDTH_MOBILE = 288; // 18rem
const SIDEBAR_WIDTH_ICON = 48; // 3rem

// ============================================================================
// Context
// ============================================================================

interface SidebarContextValue {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}

// ============================================================================
// SidebarProvider
// ============================================================================

interface SidebarProviderProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  style?: ViewStyle;
  children: React.ReactNode;
}

export const SidebarProvider = React.forwardRef<View, SidebarProviderProps>(
  ({ defaultOpen = true, open: openProp, onOpenChange, style, children }, ref) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = React.useState(false);
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);

    const open = openProp !== undefined ? openProp : internalOpen;
    const setOpen = React.useCallback(
      (value: boolean) => {
        if (openProp === undefined) {
          setInternalOpen(value);
        }
        onOpenChange?.(value);
      },
      [openProp, onOpenChange]
    );

    const toggleSidebar = React.useCallback(() => {
      if (isMobile) {
        setOpenMobile((prev) => !prev);
      } else {
        setOpen(!open);
      }
    }, [isMobile, open, setOpen]);

    const state = open ? 'expanded' : 'collapsed';

    const contextValue: SidebarContextValue = React.useMemo(
      () => ({
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, openMobile, isMobile, toggleSidebar]
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <View ref={ref} style={[styles.provider, style]}>
          {children}
        </View>
      </SidebarContext.Provider>
    );
  }
);

SidebarProvider.displayName = 'SidebarProvider';

// ============================================================================
// Sidebar
// ============================================================================

interface SidebarProps {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'icon' | 'offcanvas' | 'none';
  style?: ViewStyle;
  children: React.ReactNode;
}

export const Sidebar = React.forwardRef<View, SidebarProps>(
  ({ side = 'left', variant = 'sidebar', collapsible = 'offcanvas', style, children }, ref) => {
    const { state, open, isMobile } = useSidebar();
    const slideAnim = React.useRef(new Animated.Value(open ? 1 : 0)).current;

    React.useEffect(() => {
      Animated.spring(slideAnim, {
        toValue: open ? 1 : 0,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();
    }, [open, slideAnim]);

    const width = isMobile ? SIDEBAR_WIDTH_MOBILE : collapsible === 'icon' && !open ? SIDEBAR_WIDTH_ICON : SIDEBAR_WIDTH;

    const translateX = slideAnim.interpolate({
      inputRange: [0, 1],
      outputRange: side === 'left' ? [-width, 0] : [width, 0],
    });

    return (
      <Animated.View
        ref={ref}
        style={[
          styles.sidebar,
          {
            width,
            transform: [{ translateX }],
            [side]: 0,
          },
          variant === 'floating' && styles.sidebarFloating,
          variant === 'inset' && styles.sidebarInset,
          style,
        ]}
      >
        {children}
      </Animated.View>
    );
  }
);

Sidebar.displayName = 'Sidebar';

// ============================================================================
// SidebarTrigger
// ============================================================================

interface SidebarTriggerProps {
  style?: ViewStyle;
}

export const SidebarTrigger = React.forwardRef<View, SidebarTriggerProps>(({ style }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <TouchableOpacity onPress={toggleSidebar} style={[styles.trigger, style]}>
      <Icon name="menu" size={24} color="#000" />
    </TouchableOpacity>
  );
});

SidebarTrigger.displayName = 'SidebarTrigger';

// ============================================================================
// SidebarContent
// ============================================================================

interface SidebarContentProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

export const SidebarContent = React.forwardRef<View, SidebarContentProps>(
  ({ style, children }, ref) => (
    <View ref={ref} style={[styles.content, style]}>
      {children}
    </View>
  )
);

SidebarContent.displayName = 'SidebarContent';

// ============================================================================
// SidebarHeader & SidebarFooter
// ============================================================================

export const SidebarHeader = React.forwardRef<View, { style?: ViewStyle; children: React.ReactNode }>(
  ({ style, children }, ref) => (
    <View ref={ref} style={[styles.header, style]}>
      {children}
    </View>
  )
);

SidebarHeader.displayName = 'SidebarHeader';

export const SidebarFooter = React.forwardRef<View, { style?: ViewStyle; children: React.ReactNode }>(
  ({ style, children }, ref) => (
    <View ref={ref} style={[styles.footer, style]}>
      {children}
    </View>
  )
);

SidebarFooter.displayName = 'SidebarFooter';

// ============================================================================
// SidebarGroup & SidebarGroupLabel
// ============================================================================

export const SidebarGroup = React.forwardRef<View, { style?: ViewStyle; children: React.ReactNode }>(
  ({ style, children }, ref) => (
    <View ref={ref} style={[styles.group, style]}>
      {children}
    </View>
  )
);

SidebarGroup.displayName = 'SidebarGroup';

export const SidebarGroupLabel = React.forwardRef<Text, { style?: TextStyle; children: React.ReactNode }>(
  ({ style, children }, ref) => (
    <Text ref={ref} style={[styles.groupLabel, style]}>
      {children}
    </Text>
  )
);

SidebarGroupLabel.displayName = 'SidebarGroupLabel';

export const SidebarGroupContent = React.forwardRef<View, { style?: ViewStyle; children: React.ReactNode }>(
  ({ style, children }, ref) => (
    <View ref={ref} style={style}>
      {children}
    </View>
  )
);

SidebarGroupContent.displayName = 'SidebarGroupContent';

// ============================================================================
// SidebarMenu, SidebarMenuItem, SidebarMenuButton
// ============================================================================

export const SidebarMenu = React.forwardRef<View, { style?: ViewStyle; children: React.ReactNode }>(
  ({ style, children }, ref) => (
    <View ref={ref} style={[styles.menu, style]}>
      {children}
    </View>
  )
);

SidebarMenu.displayName = 'SidebarMenu';

export const SidebarMenuItem = React.forwardRef<View, { style?: ViewStyle; children: React.ReactNode }>(
  ({ style, children }, ref) => (
    <View ref={ref} style={style}>
      {children}
    </View>
  )
);

SidebarMenuItem.displayName = 'SidebarMenuItem';

interface SidebarMenuButtonProps {
  onPress?: () => void;
  isActive?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
}

export const SidebarMenuButton = React.forwardRef<View, SidebarMenuButtonProps>(
  ({ onPress, isActive, style, textStyle, children }, ref) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.menuButton, isActive && styles.menuButtonActive, style]}
    >
      {typeof children === 'string' ? (
        <Text style={[styles.menuButtonText, isActive && styles.menuButtonTextActive, textStyle]}>
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  )
);

SidebarMenuButton.displayName = 'SidebarMenuButton';

// ============================================================================
// SidebarSeparator
// ============================================================================

export const SidebarSeparator = React.forwardRef<View, { style?: ViewStyle }>(({ style }, ref) => (
  <View ref={ref} style={[styles.separator, style]} />
));

SidebarSeparator.displayName = 'SidebarSeparator';

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  provider: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
    zIndex: 100,
  },
  sidebarFloating: {
    margin: 8,
    height: '98%',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sidebarInset: {
    marginTop: 8,
    marginLeft: 8,
    marginBottom: 8,
    height: '98%',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  trigger: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  group: {
    marginVertical: 8,
  },
  groupLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  menu: {
    gap: 4,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
  },
  menuButtonActive: {
    backgroundColor: '#f3f4f6',
  },
  menuButtonText: {
    fontSize: 14,
    color: '#000',
  },
  menuButtonTextActive: {
    fontWeight: '600',
    color: '#3b82f6',
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 8,
  },
});


