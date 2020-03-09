import React from 'react';
import { shallow } from 'enzyme';
import NotFound from './NotFound';
import PathNavigation from './PathNavigation';

describe(NotFound, () => {
  it('renders', () => {
    const root = { key: '/', path: '/', name: 'root' };
    const wrapper = shallow(<NotFound root={root} path='/not/found' />);

    const pathNavigation = wrapper.find(PathNavigation);
    expect(pathNavigation).toHaveLength(1);
    expect(pathNavigation).toHaveProp({ node: root });

    const notFoundMessage = wrapper.find('.not-found');
    expect(notFoundMessage).toHaveLength(1);
    expect(notFoundMessage).toIncludeText('/not/found');
  })
});
