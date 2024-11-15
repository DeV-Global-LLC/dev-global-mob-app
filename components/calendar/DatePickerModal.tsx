import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@hooks/useThemeColor";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";

interface CustomDatePickerProps {
  isVisible: boolean;
  onClose: () => void;
  onDateSelect: (date: string) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  isVisible,
  onClose,
  onDateSelect,
}) => {
  const [selectedDate, setSelectedDate] = useState<number>(
    new Date().getDate()
  );
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const colors = useThemeColor();

  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number): number => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const totalDays = Math.ceil((daysInMonth + firstDay) / 7) * 7;
    const days: (number | null)[] = Array(totalDays).fill(null);

    // Fill in the actual days
    for (let i = 0; i < daysInMonth; i++) {
      days[i + firstDay] = i + 1;
    }

    // Group days into rows
    const rows = [];
    for (let i = 0; i < days.length; i += 7) {
      rows.push(days.slice(i, i + 7));
    }

    return rows;
  };

  const handleDateSelect = (day: number) => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    setSelectedDate(day);
    onDateSelect(dateString);
    onClose();
  };

  const renderWeekDays = () => {
    const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
    return weekDays.map((day, index) => (
      <View key={index} style={styles(colors).weekDayContainer}>
        <Text style={styles(colors).weekDay}>{day}</Text>
      </View>
    ));
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles(colors).modalContainer}>
        <View style={styles(colors).modalContent}>
          <TouchableOpacity
           onPress={onClose}
            style={{
              gap: 8,
              alignItems: "center",
              flexDirection: "row",
              paddingTop: 8,
              paddingBottom: 24,
              marginHorizontal: 24,
              borderBottomWidth: 1,
              borderBottomColor: "#CAC4D0",
            }}
          >
         
              <Ionicons name="chevron-back" size={20} color={colors.text} />
           
            <Text style={styles(colors).headerTitle}>Select date</Text>
          </TouchableOpacity>

          <View style={styles(colors).monthSelector}>
            <View>
              <Text style={styles(colors).monthYear}>
                {`${months[currentMonth]} ${currentYear}`}
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
              <TouchableOpacity onPress={handlePrevMonth}>
                <Ionicons name="chevron-back" size={20} color={colors.text} />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleNextMonth}>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.text}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles(colors).calendar}>
            <View style={styles(colors).weekDays}>{renderWeekDays()}</View>
            <View style={styles(colors).daysGrid}>
              {generateCalendarDays().map((row, rowIndex) => (
                <View key={rowIndex} style={styles(colors).row}>
                  {row.map((day, colIndex) => (
                    <TouchableOpacity
                      key={colIndex}
                      style={[
                        styles(colors).dayCell,
                        day === selectedDate && styles(colors).selectedDay,
                      ]}
                      onPress={() => day && handleDateSelect(day)}
                      disabled={!day}
                    >
                      <Text
                        style={[
                          styles(colors).dayText,
                          day === selectedDate && styles(colors).selectedDayText,
                        ]}
                      >
                        {day || ""}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles =(colors:any) =>  StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "500",
    color: colors.body,
  },
  monthSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
    marginBottom: 20,
    marginTop: 10,
  },
  monthYear: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.body,
  },
  calendar: {
    paddingHorizontal: 10,
  },
  weekDays: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  weekDayContainer: {
    width: 40,
    alignItems: 'center',
  },
  weekDay: {
    fontSize: 15,
    color: colors.text,
    textAlign: 'center',
  },
  daysGrid: {
    width: '100%',
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: '100%',
  },
  dayCell: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    fontSize: 16,
    color:colors.text,
  },
  selectedDay: {
    backgroundColor: `${colors.primary}10`,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  selectedDayText: {
    color: colors.primary,
    fontWeight: "600",
  },
});

export default CustomDatePicker;