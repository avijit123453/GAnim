import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import {AlphabetList as Flatlist} from 'react-native-section-alphabet-list';

const data = [
  {value: 'Lillie-Mai Allen', key: 'lCUTs2'},
  {value: 'Emmanuel Goldstein', key: 'TXdL0c'},
  {value: 'Winston Smith', key: 'zqsiEw'},
  {value: 'William Blazkowicz', key: 'psg2PM'},
  {value: 'Gordon Comstock', key: '1K6I18'},
  {value: 'Philip Ravelston', key: 'NVHSkA'},
  {value: 'Rosemary Waterlow', key: 'SaHqyG'},
  {value: 'Julia Comstock', key: 'iaT1Ex'},
  {value: 'Mihai Maldonado', key: 'OvMd5e'},
  {value: 'Murtaza Molina', key: '25zqAO'},
  {value: 'Peter Petigrew', key: '8cWuu3'},
];

const AlphabetList = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <Flatlist
        data={data}
        indexLetterStyle={{
          color: 'blue',
          fontSize: 15,
        }}
        renderCustomItem={item => (
          <View style={styles.listItemContainer}>
            <Text style={styles.listItemLabel}>{item.value}</Text>
          </View>
        )}
        renderCustomSectionHeader={section => (
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeaderLabel}>{section.title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default AlphabetList;

const styles = StyleSheet.create({
  listItemContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listItemLabel: {
    fontSize: 18,
  },
  sectionHeaderContainer: {
    height: 30,
    width: '100%',
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionHeaderLabel: {
    fontSize: 16,
  },
});
