import React, {useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { GlobalStyles } from './styles';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import Checkbox from "expo-checkbox";

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
  const [notificationCount, setNotificationCount] = useState(1);
  const [overnight, setOvernight] = useState(false);
  const [startTimeHour, setStartTimeHour] = useState('00');
  const [startTimeMin, setStartTimeMin] = useState('00');
  const [startTimeString, setStartTimeString] = useState('00:00');
  const [endTimeHour, setEndTimeHour] = useState('23');
  const [endTimeMin, setEndTimeMin] = useState('59');
  const [endTimeString, setEndTimeString] = useState('23:59'); 
  const [startErrorMessage, setStartErrorMessage] = useState('');
  const [endErrorMessage, setEndErrorMessage] = useState('');
  const [startIsSet, setStartIsSet] = useState(false);
  const [endIsSet, setEndIsSet] = useState(false);
  const [saveErrorMessage, setSaveErrorMessage] = useState('');
  const [intervalMode, setIntervalMode] = useState('random');
  

  const handleStartHourChange = (text) => {
    setStartTimeHour(text);
    setStartIsSet(false);
    setEndIsSet(false);
  }

  const handleStartMinChange = (text) => {
    setStartTimeMin(text);
    setStartIsSet(false);
    setEndIsSet(false);
  }

  const handleEndHourChange = (text) => {
    setEndTimeHour(text);
    setEndIsSet(false);
  }

  const handleEndMinChange = (text) => {
    setEndTimeMin(text);
    setEndIsSet(false);
  }

  const handleOvernightChange = (newValue) => {
    setOvernight(newValue);

    const startHourNum = Number(startTimeHour);
    const startMinNum = Number(startTimeMin);
    const endHourNum = Number(endTimeHour);
    const endMinNum = Number(endTimeMin);

    if (newValue === false && endIsSet) {


      if(endHourNum < startHourNum ||
        (endHourNum === startHourNum && endMinNum <= startMinNum)){
          setEndErrorMessage('Overnight option removed. Please re-set time.');
          setEndIsSet(false);
          setStartIsSet(false);
      }
    }

    if (newValue === true) {
      if(endHourNum < startHourNum ||
        (endHourNum === startHourNum && endMinNum <= startMinNum)){
          setEndErrorMessage('');
    }
  }
}

  const handleSetStart = () => {
    setEndErrorMessage('');
    
    const regexHr = /^(0[0-9]|1[0-9]|2[0-3])$/;
    const regexMin = /^[0-5][0-9]$/;

    if (!regexHr.test(startTimeHour) || !regexMin.test(startTimeMin)){
      setStartErrorMessage('Set a valid time (24hr)')
    } else {     
      setStartErrorMessage(''); 
      setStartIsSet(true);
      setStartTimeString(startTimeHour + ':' + startTimeMin);
    }
  }

  const handleSetEnd = () => {
    if (!startIsSet){
      setEndErrorMessage('Set start time first');
      return;
    }

    setEndTimeString(endTimeHour + ':' + endTimeMin);

    const regexHr = /^(0[0-9]|1[0-9]|2[0-3])$/;
    const regexMin = /^[0-5][0-9]$/;



    if (!regexHr.test(endTimeHour) || !regexMin.test(endTimeMin)){
      setEndErrorMessage('Set a valid time (24hr)');
      return;
    } 

    const startHourNum = Number(startTimeHour);
    const startMinNum = Number(startTimeMin);
    const endHourNum = Number(endTimeHour);
    const endMinNum = Number(endTimeMin);

    if (endHourNum < startHourNum ||
        (endHourNum === startHourNum && endMinNum <= startMinNum)) {
          if (overnight){
            setEndErrorMessage('');
            setEndIsSet(true);
            return;
          }else{
            setEndErrorMessage('End time must be after start time');
            return;
          }
        };

    setEndErrorMessage('');
    setEndIsSet(true);

  }

  const handleIntervalModeChange = (event) => {
    const index = event.nativeEvent.selectedSegmentIndex;
    const newMode = index === 0 ? 'random' : 'set';

    setIntervalMode(newMode);
  };

  const handleSaveSettings = () => {

    if (startIsSet && endIsSet){
      setSaveErrorMessage('');

      //The console.logs will be replaced with code to call API- this is just placeholder for now.
      console.log("Selected API ID:", selectedTranslation);
      console.log("Notification Count:", notificationCount);
      console.log("Start Time String:", startTimeString);
      console.log("End Time String:", endTimeString);
      console.log("Interval Mode Set:", intervalMode);

    } else {
      setSaveErrorMessage('Please Set Times')
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={GlobalStyles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={100} // Adjust this value if it still overlaps!
        >
          <ScrollView>
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
            <Text style={GlobalStyles.label}>
              Number of Notifications:
            </Text>
            <View style={GlobalStyles.sliderContainer}>

              <Slider
                style={GlobalStyles.countSlider}
                minimumValue={1} 
                maximumValue={24} 
                step={1} 
                value={notificationCount}
                onValueChange={setNotificationCount}
                minimumTrackTintColor="#007AFF" 
                maximumTrackTintColor="#B5B5B5" 
                thumbTintColor="#FFFFFF"
              />
              <Text style={GlobalStyles.countText}>
                {notificationCount}
              </Text>
            </View>
            <View style={GlobalStyles.overnightContainer}>
            <Checkbox
              value={overnight}
              onValueChange={handleOvernightChange}
            />
            <Text style={GlobalStyles.overnightLabel}>Schedule Overnight</Text>
            </View>
            <Text style={GlobalStyles.label}>
              Notification Window Start (HH:MM):
            </Text>
            <View style={GlobalStyles.timeContainer}>
              <TextInput
                style={GlobalStyles.timeInput}
                value= {startTimeHour}
                onChangeText={handleStartHourChange}
                keyboardType='numeric' 
                minLength={2}
                maxLength={2}
                
              />
              <Text style={GlobalStyles.timeColon}>:</Text>
              <TextInput
                style={GlobalStyles.timeInput}
                value= {startTimeMin}
                onChangeText={handleStartMinChange}
                keyboardType='numeric' 
                minLength={2}
                maxLength={2}
              />
              <TouchableOpacity style={startIsSet ? GlobalStyles.inactiveBtn : GlobalStyles.activeBtn}
                title= 'Set'
                onPress={handleSetStart}
              >
              <Text>Set</Text>
              </TouchableOpacity>
            </View>

            <Text style={GlobalStyles.error}>{startErrorMessage}</Text>
            
            <Text style={GlobalStyles.label}>
              Notification Window End (HH:MM):
            </Text>
            <View style={GlobalStyles.timeContainer}>
              <TextInput
                style={GlobalStyles.timeInput}
                value= {endTimeHour}
                onChangeText={handleEndHourChange}
                keyboardType='numeric' 
                minLength={2}
                maxLength={2}
              />
              <Text style={GlobalStyles.timeColon}>:</Text>
              <TextInput
                style={GlobalStyles.timeInput}
                value= {endTimeMin}
                onChangeText={handleEndMinChange}
                keyboardType='numeric' 
                minLength={2}
                maxLength={2}
              />
              <TouchableOpacity style={endIsSet ? GlobalStyles.inactiveBtn : GlobalStyles.activeBtn}
                title= 'Set'
                onPress={handleSetEnd}
              >
                <Text>Set</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={GlobalStyles.error}>{endErrorMessage}</Text>
            
            <Text style={GlobalStyles.label}>
              Interval Pattern:
            </Text>
            <View style={GlobalStyles.intervalContainer}>
              <SegmentedControl
              values={['Random', 'Set']}
              selectedIndex={intervalMode === 'random' ? 0 : 1}
              onChange={handleIntervalModeChange}
            />
            </View>


            <Button title="Save" onPress={handleSaveSettings} />
            <Text style={GlobalStyles.error}>{saveErrorMessage}</Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
