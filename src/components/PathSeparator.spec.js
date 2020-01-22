import React from 'react';
import { shallow } from 'enzyme';
import PathSeparator from './PathSeparator';

describe(PathSeparator, () => {
  it('renders correctly', () => {
    const wrapper = shallow(<PathSeparator />);
    expect(wrapper).toMatchElement(
      <span className="path-separator">/</span>,
      { ignoreProps: false },
    );
  });
});
