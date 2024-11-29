import {ActivityIndicator} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/colors';

export const Loader = () => {
  return <ActivityIndicator size={'large'} color={Colors.black} />;
};
