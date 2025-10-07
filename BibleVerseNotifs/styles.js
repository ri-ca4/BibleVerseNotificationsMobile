import { StyleSheet } from 'react-native';

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    backgroundColor: '#000',
    color: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#fff'
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
    color: "#fff"
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  sliderContainer: { 
    width: '100%',
    paddingHorizontal: 5, 
    paddingVertical: 10,
    marginBottom: 20, 
    marginTop: 10,
    flexDirection: 'row',
  },
  countSlider: {
    width: '70%',
  },
  countText: {
    color: '#fff',
  },
  timeContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  timeInput: {
    width: '25%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
    fontSize: 20,
    marginHorizontal: 5,
  },
  timeColon: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
  error: {
    color: '#f00',
  },
  activeBtn: {
    backgroundColor: '#009dffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
  },
  inactiveBtn: {
    backgroundColor: '#404040',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
  },
  intervalContainer: {
    marginBottom: 20,
    tintColor: '#5b84b1'
  },
  overnightContainer: {
    flexDirection: 'row',
  },
  overnightLabel: {
    color: '#fff',
  },

});