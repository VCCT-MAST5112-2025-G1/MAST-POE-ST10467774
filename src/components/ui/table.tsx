import * as React from "react";
import { View, Text, ScrollView, StyleSheet, ViewStyle, TextStyle, ViewProps, TextProps } from "react-native";

interface TableProps extends ViewProps {
  style?: ViewStyle;
}

interface TableHeaderProps extends ViewProps {
  style?: ViewStyle;
}

interface TableBodyProps extends ViewProps {
  style?: ViewStyle;
}

interface TableFooterProps extends ViewProps {
  style?: ViewStyle;
}

interface TableRowProps extends ViewProps {
  style?: ViewStyle;
}

interface TableHeadProps extends TextProps {
  style?: TextStyle;
}

interface TableCellProps extends TextProps {
  style?: TextStyle;
}

interface TableCaptionProps extends TextProps {
  style?: TextStyle;
}

const Table = React.forwardRef<ScrollView, TableProps>(
  ({ style, ...props }, ref) => {
    return (
      <ScrollView
        ref={ref}
        horizontal
        style={[styles.tableContainer, style]}
        {...props}
      />
    );
  }
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<View, TableHeaderProps>(
  ({ style, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[styles.header, style]}
        {...props}
      />
    );
  }
);
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<View, TableBodyProps>(
  ({ style, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[styles.body, style]}
        {...props}
      />
    );
  }
);
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<View, TableFooterProps>(
  ({ style, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[styles.footer, style]}
        {...props}
      />
    );
  }
);
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<View, TableRowProps>(
  ({ style, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[styles.row, style]}
        {...props}
      />
    );
  }
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<Text, TableHeadProps>(
  ({ style, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        style={[styles.head, style]}
        {...props}
      />
    );
  }
);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<Text, TableCellProps>(
  ({ style, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        style={[styles.cell, style]}
        {...props}
      />
    );
  }
);
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<Text, TableCaptionProps>(
  ({ style, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        style={[styles.caption, style]}
        {...props}
      />
    );
  }
);
TableCaption.displayName = "TableCaption";

const styles = StyleSheet.create({
  tableContainer: {
    width: '100%',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  body: {
    // Body specific styles
  },
  footer: {
    backgroundColor: '#f9fafb',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  head: {
    height: 40,
    paddingHorizontal: 8,
    textAlign: 'left',
    fontWeight: '500',
    color: '#000',
    fontSize: 14,
  },
  cell: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    fontSize: 14,
    color: '#000',
  },
  caption: {
    marginTop: 16,
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};
