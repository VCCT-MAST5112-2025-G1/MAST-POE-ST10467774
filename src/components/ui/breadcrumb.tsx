import * as React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle, ViewProps, TextProps } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface BreadcrumbProps extends ViewProps {
  separator?: React.ReactNode;
  style?: ViewStyle;
}

interface BreadcrumbItemProps extends ViewProps {
  style?: ViewStyle;
}

interface BreadcrumbLinkProps extends TextProps {
  asChild?: boolean;
  style?: TextStyle;
}

interface BreadcrumbPageProps extends TextProps {
  style?: TextStyle;
}

interface BreadcrumbSeparatorProps extends ViewProps {
  children?: React.ReactNode;
  style?: ViewStyle;
}

interface BreadcrumbEllipsisProps extends ViewProps {
  style?: ViewStyle;
}

const Breadcrumb = React.forwardRef<View, BreadcrumbProps>(
  ({ separator, style, ...props }, ref) => {
    return (
      <View ref={ref} style={style} {...props} />
    );
  }
);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<View, ViewProps>(
  ({ style, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[styles.list, style]}
        {...props}
      />
    );
  }
);
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<View, BreadcrumbItemProps>(
  ({ style, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[styles.item, style]}
        {...props}
      />
    );
  }
);
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<Text, BreadcrumbLinkProps>(
  ({ asChild, style, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        style={[styles.link, style]}
        {...props}
      />
    );
  }
);
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<Text, BreadcrumbPageProps>(
  ({ style, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        accessibilityRole="link"
        style={[styles.page, style]}
        {...props}
      />
    );
  }
);
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({ children, style, ...props }: BreadcrumbSeparatorProps) => {
  return (
    <View
      style={[styles.separator, style]}
      {...props}
    >
      {children || <MaterialIcons name="chevron-right" size={16} color="#6b7280" />}
    </View>
  );
};
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({ style, ...props }: BreadcrumbEllipsisProps) => {
  return (
    <View
      style={[styles.ellipsis, style]}
      {...props}
    >
      <MaterialIcons name="more-horiz" size={16} color="#6b7280" />
    </View>
  );
};
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  link: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  page: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6b7280',
  },
  separator: {
    marginHorizontal: 2,
  },
  ellipsis: {
    height: 16,
    width: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
