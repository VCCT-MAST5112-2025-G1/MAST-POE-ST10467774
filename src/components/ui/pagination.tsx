import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, ViewProps, TextProps } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface PaginationProps extends ViewProps {
  style?: ViewStyle;
}

interface PaginationContentProps extends ViewProps {
  style?: ViewStyle;
}

interface PaginationItemProps extends ViewProps {
  style?: ViewStyle;
}

interface PaginationLinkProps extends ViewProps {
  isActive?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

interface PaginationPreviousProps extends ViewProps {
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
}

interface PaginationNextProps extends ViewProps {
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
}

interface PaginationEllipsisProps extends ViewProps {
  style?: ViewStyle;
}

const Pagination = React.forwardRef<View, PaginationProps>(
  ({ style, ...props }, ref) => {
    return (
      <View ref={ref} style={[styles.pagination, style]} {...props} />
    );
  }
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<View, PaginationContentProps>(
  ({ style, ...props }, ref) => {
    return (
      <View ref={ref} style={[styles.content, style]} {...props} />
    );
  }
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<View, PaginationItemProps>(
  ({ style, ...props }, ref) => {
    return (
      <View ref={ref} style={[styles.item, style]} {...props} />
    );
  }
);
PaginationItem.displayName = "PaginationItem";

const PaginationLink = React.forwardRef<View, PaginationLinkProps>(
  ({ isActive, onPress, style, children, ...props }, ref) => {
    return (
      <TouchableOpacity
        ref={ref as any}
        onPress={onPress}
        style={[styles.link, isActive && styles.activeLink, style]}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = React.forwardRef<View, PaginationPreviousProps>(
  ({ onPress, disabled, style, ...props }, ref) => {
    return (
      <TouchableOpacity
        ref={ref as any}
        onPress={onPress}
        disabled={disabled}
        style={[styles.navigationButton, disabled && styles.disabled, style]}
        {...props}
      >
        <MaterialIcons name="chevron-left" size={20} color={disabled ? "#d1d5db" : "#000"} />
        <Text style={[styles.navigationText, disabled && styles.disabledText]}>Previous</Text>
      </TouchableOpacity>
    );
  }
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = React.forwardRef<View, PaginationNextProps>(
  ({ onPress, disabled, style, ...props }, ref) => {
    return (
      <TouchableOpacity
        ref={ref as any}
        onPress={onPress}
        disabled={disabled}
        style={[styles.navigationButton, disabled && styles.disabled, style]}
        {...props}
      >
        <Text style={[styles.navigationText, disabled && styles.disabledText]}>Next</Text>
        <MaterialIcons name="chevron-right" size={20} color={disabled ? "#d1d5db" : "#000"} />
      </TouchableOpacity>
    );
  }
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = React.forwardRef<View, PaginationEllipsisProps>(
  ({ style, ...props }, ref) => {
    return (
      <View ref={ref} style={[styles.ellipsis, style]} {...props}>
        <MaterialIcons name="more-horiz" size={20} color="#6b7280" />
      </View>
    );
  }
);
PaginationEllipsis.displayName = "PaginationEllipsis";

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  item: {
    // Item container
  },
  link: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 36,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeLink: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  navigationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
  },
  navigationText: {
    fontSize: 14,
    color: '#000',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: '#d1d5db',
  },
  ellipsis: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};



