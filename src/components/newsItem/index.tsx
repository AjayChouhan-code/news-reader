import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {moderateScale} from '../../utils/helper';
import {Colors} from '../../utils/colors';

type Props = {
  title: string;
  desc: string;
  image: string;
  onPress: () => void;
};

export const NewsItem = ({title, desc, image, onPress}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress()}>
      <Image
        source={{
          uri: image,
        }}
        style={styles.image}
      />
      <View style={styles.textView}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.descText}>{desc}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: moderateScale(10),
    padding: moderateScale(10),
    backgroundColor: Colors.lightGrey,
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    borderColor: Colors.mediumGrey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(10),
  },
  textView: {
    width: '50%',
  },
  titleText: {
    fontWeight: 'bold',
    color: Colors.black,
    fontSize: moderateScale(20),
    marginBottom: moderateScale(5),
  },
  descText: {
    color: Colors.black,
  },
});
