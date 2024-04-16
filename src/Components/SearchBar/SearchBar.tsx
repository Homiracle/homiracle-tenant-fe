import React from 'react';
import {
  Searchbar,
  SearchbarProps as RNPSearchbarProps,
} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export interface SearchBarProps extends RNPSearchbarProps {
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = props => {
  return (
    <Searchbar
      style={{
        marginBottom: hp('2%'),
        width: wp('90%'),
        left: wp('5%'),
      }}
      {...props}
    />
  );
};
