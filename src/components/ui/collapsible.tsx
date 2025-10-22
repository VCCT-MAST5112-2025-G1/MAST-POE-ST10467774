import * as React from "react";
import { View, LayoutAnimation, Platform, UIManager, ViewProps, ViewStyle } from "react-native";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface CollapsibleContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CollapsibleContext = React.createContext<CollapsibleContextValue>({
  open: false,
  onOpenChange: () => {},
});

interface CollapsibleProps extends ViewProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  style?: ViewStyle;
}

const Collapsible = React.forwardRef<View, CollapsibleProps>(
  ({ open: controlledOpen, onOpenChange, defaultOpen = false, style, children, ...props }, ref) => {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

    const handleOpenChange = (newOpen: boolean) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      if (controlledOpen === undefined) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    };

    return (
      <CollapsibleContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>
        <View ref={ref} style={style} {...props}>
          {children}
        </View>
      </CollapsibleContext.Provider>
    );
  }
);

Collapsible.displayName = "Collapsible";

const CollapsibleTrigger: React.FC<{ children: React.ReactElement; asChild?: boolean }> = ({ children }) => {
  const { open, onOpenChange } = React.useContext(CollapsibleContext);
  
  return React.cloneElement(children, {
    onPress: () => onOpenChange(!open),
  } as any);
};

CollapsibleTrigger.displayName = "CollapsibleTrigger";

const CollapsibleContent = React.forwardRef<View, ViewProps & { style?: ViewStyle }>(
  ({ style, children, ...props }, ref) => {
    const { open } = React.useContext(CollapsibleContext);

    if (!open) return null;

    return (
      <View ref={ref} style={style} {...props}>
        {children}
      </View>
    );
  }
);

CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };


