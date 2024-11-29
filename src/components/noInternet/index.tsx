import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/colors';

export const NoInternet = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No Internet Connection</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: Colors.darkGrey,
  },
  text: {
    color: Colors.white,
  },
});
