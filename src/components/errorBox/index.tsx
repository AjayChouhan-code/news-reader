import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {moderateScale} from '../../utils/helper';
import {Colors} from '../../utils/colors';
import {RefreshIcon} from '../../assets';

type Props = {
  error: string | null;
  onPress: () => void;
};

export const ErrorBox = ({error, onPress}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{error}</Text>
      <TouchableOpacity onPress={onPress}>
        <Image source={RefreshIcon} style={styles.refreshIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: moderateScale(10),
  },
  errorText: {
    alignSelf: 'center',
    marginTop: moderateScale(10),
    color: Colors.red,
  },
  refreshIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
});
