import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// ============================================================================
// Calendar Component
// ============================================================================

interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
  mode?: 'single' | 'range';
  style?: ViewStyle;
}

const Calendar = React.forwardRef<View, CalendarProps>(
  ({ selected, onSelect, mode = 'single', style }, ref) => {
    const [currentMonth, setCurrentMonth] = React.useState(
      selected ? new Date(selected) : new Date()
    );

    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();

    const firstDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const goToPreviousMonth = () => {
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
      );
    };

    const goToNextMonth = () => {
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
      );
    };

    const handleDayPress = (day: number) => {
      const selectedDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      onSelect?.(selectedDate);
    };

    const isDaySelected = (day: number) => {
      if (!selected) return false;
      return (
        selected.getDate() === day &&
        selected.getMonth() === currentMonth.getMonth() &&
        selected.getFullYear() === currentMonth.getFullYear()
      );
    };

    const renderDays = () => {
      const days = [];
      
      // Empty cells for days before the first day of the month
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
      }

      // Days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const isSelected = isDaySelected(day);
        days.push(
          <TouchableOpacity
            key={day}
            style={[styles.dayCell, isSelected && styles.dayCellSelected]}
            onPress={() => handleDayPress(day)}
          >
            <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>
              {day}
            </Text>
          </TouchableOpacity>
        );
      }

      return days;
    };

    return (
      <View ref={ref} style={[styles.calendar, style]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goToPreviousMonth} style={styles.navButton}>
            <Icon name="chevron-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.monthText}>
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </Text>
          <TouchableOpacity onPress={goToNextMonth} style={styles.navButton}>
            <Icon name="chevron-right" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.weekDays}>
          {weekDays.map((day) => (
            <View key={day} style={styles.weekDayCell}>
              <Text style={styles.weekDayText}>{day}</Text>
            </View>
          ))}
        </View>

        <View style={styles.daysGrid}>{renderDays()}</View>
      </View>
    );
  }
);

Calendar.displayName = 'Calendar';

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  calendar: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 12,
    width: 280,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  navButton: {
    padding: 4,
  },
  monthText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  weekDays: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDayCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  weekDayText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%', // 100% / 7 days
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCellSelected: {
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
  dayText: {
    fontSize: 14,
    color: '#000',
  },
  dayTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
});

// ============================================================================
// Exports
// ============================================================================

export { Calendar };

