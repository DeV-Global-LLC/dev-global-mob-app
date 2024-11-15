import { useThemeColor } from '@hooks/useThemeColor';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type ViewType = 'list' | 'month';

interface ToggleViewProps {
  onViewChange?: (view: ViewType) => void;
}

const ToggleView: React.FC<ToggleViewProps> = ({ onViewChange }) => {
  const [activeView, setActiveView] = useState<ViewType>('list');
const colors = useThemeColor()
  const handlePress = (view: ViewType) => {
    setActiveView(view);
    onViewChange?.(view);
  };

  return (
    <View style={styles(colors).container}>
      <View style={styles(colors).toggleContainer}>
        <TouchableOpacity
          style={[
            styles(colors).button,
            activeView === 'list' && styles(colors).activeButton,
            styles(colors).leftButton,
          ]}
          onPress={() => handlePress('list')}
        >
          <Text
            style={[
              styles(colors).buttonText,
              activeView === 'list' && styles(colors).activeText,
            ]}
          >
            List
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles(colors).button,
            activeView === 'month' && styles(colors).activeButton,
            styles(colors).rightButton,
          ]}
          onPress={() => handlePress('month')}
        >
          <Text
            style={[
              styles(colors).buttonText,
              activeView === 'month' && styles(colors).activeText,
            ]}
          >
            Month
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles =(colors:any) =>  StyleSheet.create({
  container: {
    padding: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 4,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: colors.primary, // Dark blue color from image
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.body,
    fontWeight: '500',
  },
  activeText: {
    color: '#FFFFFF',
  },
  leftButton: {
    marginRight: 2,
  },
  rightButton: {
    marginLeft: 2,
  },
});

export default ToggleView;