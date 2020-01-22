import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from './SearchBar';

describe(SearchBar, () => {
  it('passes the value to the input', () => {
    const wrapper = shallow(<SearchBar searchTerm='search term' />);
    const input = wrapper.find('input');
    expect(input).toHaveLength(1);
    expect(input).toHaveProp({ value: 'search term' });
  });

  it('has the correct placeholder with a nodeName', () => {
    const wrapper = shallow(<SearchBar nodeName='node name' />);
    const input = wrapper.find('input');
    expect(input).toHaveLength(1);
    expect(input).toHaveProp({ placeholder: 'Search in node name' });
  });

  it('has the correct placeholder without a nodeName', () => {
    const wrapper = shallow(<SearchBar searchTerm='search term' />);
    const input = wrapper.find('input');
    expect(input).toHaveLength(1);
    expect(input).toHaveProp({ placeholder: 'Search' });
  });

  it('calls a callback when changed', () => {
    const onChangeMock = jest.fn();
    const wrapper = shallow(<SearchBar onChange={onChangeMock} />);
    const input = wrapper.find('input');
    expect(input).toHaveLength(1);
    input.simulate('change', { target: { value: 'stuff' } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith('stuff');
  });
});
