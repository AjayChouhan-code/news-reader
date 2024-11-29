import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, NewsDetails} from '../../screens';
import {NewsItem} from '../../redux/slices';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {ShareIcon} from '../../assets';
import {moderateScale} from '../../utils/helper';
import Share from 'react-native-share';

export type RootStackProps = {
  Home: undefined;
  NewsDetails: {
    newsItem: NewsItem;
  };
};

type ShareProps = {
  url: string;
};

const Stack = createNativeStackNavigator<RootStackProps>();

const ShareComponent = ({url}: ShareProps) => {
  return (
    <TouchableOpacity onPress={() => Share.open({url})}>
      <Image source={ShareIcon} style={styles.headerRightIcon} />
    </TouchableOpacity>
  );
};

const newsDetailsOptions = (newsItem: NewsItem) => ({
  headerRight: () => <ShareComponent url={newsItem.url} />,
  title: 'Details',
});

export const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewsDetails"
        component={NewsDetails}
        options={({route}) => newsDetailsOptions(route.params.newsItem)}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerRightIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
});
