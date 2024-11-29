import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {API_KEY, BASE_URL} from '../../utils/constants';

export type NewsItem = {
  author: string;
  content: string;
  description: string;
  title: string;
  url: string;
  urlToImage: string;
};

type NewsItemArticle = {
  articles: NewsItem[];
};

type NewsState = {
  news: NewsItem[];
  isLoading: boolean;
  error: string | null;
};

const initialState: NewsState = {
  news: [],
  isLoading: false,
  error: null,
};

export const fetchNews = createAsyncThunk<
  NewsItemArticle,
  void,
  {rejectValue: string}
>('news/fetchNews', async (_, {rejectWithValue}) => {
  try {
    const response = await fetch(`${BASE_URL}${API_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    return await response.json();
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNews.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.news = action.payload.articles;
        state.error = null;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch news';
      });
  },
});

export default newsSlice.reducer;
