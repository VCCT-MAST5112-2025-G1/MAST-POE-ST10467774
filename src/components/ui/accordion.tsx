import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, ViewProps, LayoutAnimation, Platform, UIManager } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface AccordionContextValue {
  openItems: string[];
  toggleItem: (value: string) => void;
  type?: "single" | "multiple";
}

const AccordionContext = React.createContext<AccordionContextValue>({
  openItems: [],
  toggleItem: () => {},
  type: "single",
});

interface AccordionProps extends ViewProps {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  style?: ViewStyle;
}

interface AccordionItemProps extends ViewProps {
  value: string;
  style?: ViewStyle;
}

interface AccordionTriggerProps extends ViewProps {
  style?: ViewStyle;
  textStyle?: TextStyle;
}

interface AccordionContentProps extends ViewProps {
  style?: ViewStyle;
}

const Accordion = React.forwardRef<View, AccordionProps>(
  ({ type = "single", defaultValue, style, children, ...props }, ref) => {
    const [openItems, setOpenItems] = React.useState<string[]>(() => {
      if (defaultValue) {
        return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
      }
      return [];
    });

    const toggleItem = (value: string) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      
      setOpenItems((prev) => {
        if (type === "single") {
          return prev.includes(value) ? [] : [value];
        } else {
          return prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value];
        }
      });
    };

    return (
      <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
        <View ref={ref} style={[styles.accordion, style]} {...props}>
          {children}
        </View>
      </AccordionContext.Provider>
    );
  }
);

Accordion.displayName = "Accordion";

const AccordionItem = React.forwardRef<View, AccordionItemProps>(
  ({ value, style, children, ...props }, ref) => {
    return (
      <View ref={ref} style={[styles.item, style]} {...props}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, { value });
          }
          return child;
        })}
      </View>
    );
  }
);

AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<View, AccordionTriggerProps & { value?: string }>(
  ({ value = "", style, textStyle, children, ...props }, ref) => {
    const { openItems, toggleItem } = React.useContext(AccordionContext);
    const isOpen = openItems.includes(value);

    return (
      <TouchableOpacity onPress={() => toggleItem(value)} style={styles.triggerButton}>
        <View ref={ref} style={[styles.trigger, style]} {...props}>
          {typeof children === "string" ? (
            <Text style={[styles.triggerText, textStyle]}>{children}</Text>
          ) : (
            children
          )}
          <Icon
            name="keyboard-arrow-down"
            size={24}
            color="#6b7280"
            style={[styles.icon, isOpen && styles.iconRotated]}
          />
        </View>
      </TouchableOpacity>
    );
  }
);

AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<View, AccordionContentProps & { value?: string }>(
  ({ value = "", style, children, ...props }, ref) => {
    const { openItems } = React.useContext(AccordionContext);
    const isOpen = openItems.includes(value);

    if (!isOpen) return null;

    return (
      <View ref={ref} style={[styles.content, style]} {...props}>
        {children}
      </View>
    );
  }
);

AccordionContent.displayName = "AccordionContent";

const styles = StyleSheet.create({
  accordion: {
    width: '100%',
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  triggerButton: {
    width: '100%',
  },
  trigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 16,
  },
  triggerText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  icon: {
  },
  iconRotated: {
    transform: [{ rotate: '180deg' }],
  },
  content: {
    paddingBottom: 16,
  },
});

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };


