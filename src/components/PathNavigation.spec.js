import React from 'react';
import { shallow } from 'enzyme';
import PathNavigation from './PathNavigation';
import NodeLink from './NodeLink';

describe(PathNavigation, () => {
  it('renders a single node link for root', () => {
      const node = {
        name: 'The Node',
        key: '',
        parent: null,
      };

      const wrapper = shallow(<PathNavigation node={node} />);
      expect(wrapper).toMatchElement(
        <div className='path-navigation'>
          <NodeLink node={node} key=''>The Node</NodeLink>
        </div>,
        { ignoreProps: false },
      );
  });

  it('renders the path to a sub-node', () => {
      const root = {
        name: 'Root',
        key: '',
        parent: null,
      };

      const subNode1 = {
        name: 'Sub Node 1',
        key: 'subNode1',
        parent: root,
      }

      const subNode2 = {
        name: 'Sub Node 2',
        key: 'subNode1/subNode2',
        parent: subNode1,
      }

      const wrapper = shallow(<PathNavigation node={subNode2} />);
      expect(wrapper).toMatchElement(
        <div className='path-navigation'>
          <NodeLink node={root} key=''>Root</NodeLink>
          <NodeLink node={subNode1} key='subNode1'>Sub Node 1</NodeLink>
          <NodeLink node={subNode2} key='subNode1/subNode2'>Sub Node 2</NodeLink>
        </div>,
        { ignoreProps: false },
      );
  });
});
