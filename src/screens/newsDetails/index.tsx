import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {NewsItem} from '../../redux/slices';
import {moderateScale} from '../../utils/helper';
import {Colors} from '../../utils/colors';

type Props = {
  route: {
    params: {
      newsItem: NewsItem;
    };
  };
};

export const NewsDetails = ({
  route: {
    params: {newsItem},
  },
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{newsItem?.title}</Text>
      <Image source={{uri: newsItem?.urlToImage}} style={styles.image} />
      <Text style={styles.desc}>{newsItem?.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: moderateScale(10),
  },
  heading: {
    fontSize: moderateScale(20),
    color: Colors.black,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: moderateScale(300),
    borderRadius: moderateScale(10),
    marginVertical: moderateScale(10),
  },
  desc: {},
});
