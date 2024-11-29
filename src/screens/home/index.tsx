import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {ErrorBox, Loader, NewsItem, NoInternet} from '../../components';
import {Colors} from '../../utils/colors';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {addEventListener} from '@react-native-community/netinfo';
import {fetchNews} from '../../redux/slices';
import {NavigationProp} from '@react-navigation/native';
import {RootStackProps} from '../../navigation';

type HomePageNavigationProps = NavigationProp<RootStackProps, 'Home'>;

type Props = {
  navigation: HomePageNavigationProps;
};

const MemoizedNewsItem = React.memo(NewsItem);

export const Home = ({navigation}: Props) => {
  const {news, isLoading, error} = useAppSelector(state => state);
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useAppDispatch();

  const callFetchNews = useCallback(() => {
    if (isConnected) {
      dispatch(fetchNews());
    }
  }, [dispatch, isConnected]);

  useEffect(() => {
    const unsubscribe = addEventListener(state => {
      setIsConnected(state?.isConnected || false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isConnected) {
      callFetchNews();
    }
  }, [isConnected, callFetchNews]);

  return (
    <>
      <View style={styles.container}>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <ErrorBox error={error} onPress={callFetchNews} />
        ) : (
          <FlatList
            data={news?.filter(
              item => item?.urlToImage?.length && item?.description?.length,
            )}
            renderItem={({item}) => (
              <MemoizedNewsItem
                title={`${item?.title?.slice(0, 20)}...`}
                desc={`${item?.description?.slice(0, 50)}...`}
                image={item?.urlToImage}
                onPress={() =>
                  navigation.navigate('NewsDetails', {newsItem: item})
                }
              />
            )}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={callFetchNews}
              />
            }
            keyExtractor={i => i?.title}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
          />
        )}
      </View>
      {!isConnected ? <NoInternet /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
