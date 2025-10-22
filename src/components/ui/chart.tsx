import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

// ============================================================================
// Types
// ============================================================================

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color?: string;
    theme?: Record<string, string>;
  };
};

interface ChartContextValue {
  config: ChartConfig;
}

// ============================================================================
// Context
// ============================================================================

const ChartContext = React.createContext<ChartContextValue | undefined>(undefined);

const useChart = () => {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error('useChart must be used within a ChartContainer');
  }
  return context;
};

// ============================================================================
// ChartContainer
// ============================================================================

interface ChartContainerProps {
  config: ChartConfig;
  style?: ViewStyle;
  children: React.ReactNode;
}

const ChartContainer = React.forwardRef<View, ChartContainerProps>(
  ({ config, style, children }, ref) => {
    const contextValue: ChartContextValue = React.useMemo(() => ({ config }), [config]);

    return (
      <ChartContext.Provider value={contextValue}>
        <View ref={ref} style={[styles.container, style]}>
          {children}
        </View>
      </ChartContext.Provider>
    );
  }
);

ChartContainer.displayName = 'ChartContainer';

// ============================================================================
// ChartTooltip (Simple)
// ============================================================================

interface ChartTooltipProps {
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
}

const ChartTooltip = React.forwardRef<View, ChartTooltipProps>(
  ({ style, textStyle, children }, ref) => (
    <View ref={ref} style={[styles.tooltip, style]}>
      {typeof children === 'string' ? (
        <Text style={[styles.tooltipText, textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </View>
  )
);

ChartTooltip.displayName = 'ChartTooltip';

// ============================================================================
// ChartTooltipContent
// ============================================================================

interface ChartTooltipContentProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const ChartTooltipContent = React.forwardRef<View, ChartTooltipContentProps>(
  ({ active, payload, label, style, textStyle }, ref) => {
    const { config } = useChart();

    if (!active || !payload || payload.length === 0) {
      return null;
    }

    return (
      <View ref={ref} style={[styles.tooltipContent, style]}>
        {label && <Text style={[styles.tooltipLabel, textStyle]}>{label}</Text>}
        {payload.map((entry, index) => {
          const dataKey = entry.dataKey as string;
          const configItem = config[dataKey];
          return (
            <View key={index} style={styles.tooltipItem}>
              <View
                style={[
                  styles.tooltipColorIndicator,
                  { backgroundColor: configItem?.color || entry.color || '#3b82f6' },
                ]}
              />
              <Text style={[styles.tooltipItemText, textStyle]}>
                {configItem?.label || dataKey}: {entry.value}
              </Text>
            </View>
          );
        })}
      </View>
    );
  }
);

ChartTooltipContent.displayName = 'ChartTooltipContent';

// ============================================================================
// ChartLegend
// ============================================================================

interface ChartLegendProps {
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
}

const ChartLegend = React.forwardRef<View, ChartLegendProps>(
  ({ style, textStyle, children }, ref) => (
    <View ref={ref} style={[styles.legend, style]}>
      {typeof children === 'string' ? (
        <Text style={[styles.legendText, textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </View>
  )
);

ChartLegend.displayName = 'ChartLegend';

// ============================================================================
// ChartLegendContent
// ============================================================================

interface ChartLegendContentProps {
  payload?: any[];
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const ChartLegendContent = React.forwardRef<View, ChartLegendContentProps>(
  ({ payload = [], style, textStyle }, ref) => {
    const { config } = useChart();

    return (
      <View ref={ref} style={[styles.legendContent, style]}>
        {payload.map((entry, index) => {
          const dataKey = entry.dataKey as string;
          const configItem = config[dataKey];
          return (
            <View key={index} style={styles.legendItem}>
              <View
                style={[
                  styles.legendColorIndicator,
                  { backgroundColor: configItem?.color || entry.color || '#3b82f6' },
                ]}
              />
              <Text style={[styles.legendItemText, textStyle]}>
                {configItem?.label || entry.value}
              </Text>
            </View>
          );
        })}
      </View>
    );
  }
);

ChartLegendContent.displayName = 'ChartLegendContent';

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  tooltip: {
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tooltipText: {
    fontSize: 12,
    color: '#000',
  },
  tooltipContent: {
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tooltipLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  tooltipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  tooltipColorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  tooltipItemText: {
    fontSize: 12,
    color: '#000',
  },
  legend: {
    padding: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#000',
  },
  legendContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    padding: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginRight: 6,
  },
  legendItemText: {
    fontSize: 12,
    color: '#000',
  },
});

// ============================================================================
// Exports
// ============================================================================

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  useChart,
};


