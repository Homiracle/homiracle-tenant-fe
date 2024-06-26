import { API } from '../Services/base';
import { IoTAPI } from '../Services/devices/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {
  homeReducers,
  themeReducers,
  authReducers,
  userReducers,
  roomingHouseReducers,
  deviceReducers,
  onboardingReducers,
} from './reducers';
import { predictionAPI } from '../Services/prediction/base';

const reducers = combineReducers({
  api: API.reducer,
  iotApi: IoTAPI.reducer,
  predictionApi: predictionAPI.reducer,
  theme: themeReducers,
  home: homeReducers,
  user: userReducers,
  auth: authReducers,
  roomingHouse: roomingHouseReducers,
  device: deviceReducers,
  onboarding: onboardingReducers,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme', 'auth', 'onboarding', 'user', 'device'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(API.middleware)
      .concat(IoTAPI.middleware)
      .concat(predictionAPI.middleware);

    // if (__DEV__ && !process.env.JEST_WORKER_ID) {
    //   const createDebugger = require("redux-flipper").default;
    //   middlewares.push(createDebugger());
    // }

    return middlewares;
  },
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {api: ApiState, theme: ThemeState, home: HomeState, user: UserState, auth: AuthState}
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
