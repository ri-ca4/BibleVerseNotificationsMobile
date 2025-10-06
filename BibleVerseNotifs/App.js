import React, {useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Platform
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { GlobalStyles } from './styles';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';



const TOP_TRANSLATIONS =[
  {label: 'King James Version (KJV)',
    value: 'KJV'
  },
  {label: 'Berean Study Bible (BSB)',
    value: 'BSB'
  },
  {label: 'American Standard Version (ASV)',
    value: 'ASV'
  },
  {label: 'World English Bible (WEB)',
    value: 'WEB'
  },
  {label: 'Young\'s Literal Translation (YLT)',
    value: 'YLT'
  },
];

export default function App() {
  const [selectedTranslation, setSelectedTranslation] = useState('KJV');

  const handleSaveSettings = () => {
    console.log("Selected API ID:", selectedTranslation)
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={GlobalStyles.container}>
        <View>
          <Text style={GlobalStyles.header}>
            Daily Verse Notifier Settings
          </Text>
          <Text style={GlobalStyles.label}>
            Select Translation:
          </Text>
          <View style={GlobalStyles.pickerContainer}>
            <Picker
            selectedValue={selectedTranslation}
            onValueChange={(itemValue) => setSelectedTranslation(itemValue)}>
              {TOP_TRANSLATIONS.map((item)=>(
                <Picker.Item 
                  key={item.value}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>
          <Button title="Save" onPress={handleSaveSettings} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
