import React from 'react';
import { Link } from 'react-router-dom';
import { shallow } from 'enzyme';
import NodeLink from './NodeLink';
import PathSeparator from './PathSeparator';

describe(NodeLink, () => {
  it('renders a real link for a node without children', () => {
    const node = { url: 'https://example.com/file.txt' };
    const wrapper = shallow(
      <NodeLink node={node}>
        <span>hi1</span>
        <span>hi2</span>
      </NodeLink>
    );

    expect(wrapper.equals(
      <span>
        <a href='https://example.com/file.txt'>
          <span>hi1</span>
          <span>hi2</span>
        </a>
      </span>
    )).toBe(true);
  });

  it('renders a react router link for a node with children', () => {
    const node = {
      path: '/foo/bar',
      children: [],
    };

    const wrapper = shallow(
      <NodeLink node={node}>
        <span>hi1</span>
        <span>hi2</span>
      </NodeLink>
    );

    expect(wrapper.equals(
      <span>
        <Link to='/foo/bar'>
          <span>hi1</span>
          <span>hi2</span>
        </Link>
        <PathSeparator />
      </span>
    )).toBe(true);
  });
});
