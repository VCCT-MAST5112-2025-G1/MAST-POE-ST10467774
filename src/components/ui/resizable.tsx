import * as React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';



// ============================================================================
// ResizablePanelGroup
// ============================================================================

interface ResizablePanelGroupProps {
  direction?: 'horizontal' | 'vertical';
  style?: ViewStyle;
  children: React.ReactNode;
}

const ResizablePanelGroup = React.forwardRef<View, ResizablePanelGroupProps>(
  ({ direction = 'horizontal', style, children }, ref) => (
    <View
      ref={ref}
      style={[
        styles.panelGroup,
        direction === 'vertical' ? styles.panelGroupVertical : styles.panelGroupHorizontal,
        style,
      ]}
    >
      {children}
    </View>
  )
);

ResizablePanelGroup.displayName = 'ResizablePanelGroup';

// ============================================================================
// ResizablePanel
// ============================================================================

interface ResizablePanelProps {
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  style?: ViewStyle;
  children: React.ReactNode;
}

const ResizablePanel = React.forwardRef<View, ResizablePanelProps>(
  ({ defaultSize = 50, style, children }, ref) => (
    <View
      ref={ref}
      style={[
        styles.panel,
        {
          flex: defaultSize / 100, // Convert percentage to flex value
        },
        style,
      ]}
    >
      {children}
    </View>
  )
);

ResizablePanel.displayName = 'ResizablePanel';

// ============================================================================
// ResizableHandle
// ============================================================================

interface ResizableHandleProps {
  withHandle?: boolean;
  style?: ViewStyle;
}

const ResizableHandle = React.forwardRef<View, ResizableHandleProps>(
  ({ withHandle, style }, ref) => (
    <View ref={ref} style={[styles.handle, style]}>
      {withHandle && <View style={styles.handleGrip} />}
    </View>
  )
);

ResizableHandle.displayName = 'ResizableHandle';

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  panelGroup: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  panelGroupHorizontal: {
    flexDirection: 'row',
  },
  panelGroupVertical: {
    flexDirection: 'column',
  },
  panel: {
    overflow: 'hidden',
  },
  handle: {
    width: 4,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  handleGrip: {
    width: 12,
    height: 16,
    backgroundColor: '#d1d5db',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#9ca3af',
  },
});

// ============================================================================
// Exports
// ============================================================================

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };


