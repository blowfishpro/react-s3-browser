import React from 'react';
import { shallow } from 'enzyme';
import FileSize from './FileSize';

describe(FileSize, () => {
  it('has the right CSS classes', () => {
    const wrapper = shallow(<FileSize size={10} />);
    expect(wrapper.prop('className')).toEqual('file-size');
    expect(wrapper.children()).toHaveLength(2);
    expect(wrapper.children().first().prop('className')).toEqual('file-size__number');
    expect(wrapper.children().first().text()).toEqual('10');
    expect(wrapper.children().last().prop('className')).toEqual('file-size__suffix');
    expect(wrapper.children().last().text()).toEqual('B');
  });

  it('returns 1023 B for 1023', () => {
    const wrapper = shallow(<FileSize size={1023} />);
    expect(wrapper.children().first().text()).toEqual('1023');
    expect(wrapper.children().last().text()).toEqual('B');
  });

  it('returns 1 KB for 1024', () => {
    const wrapper = shallow(<FileSize size={1024} />);
    expect(wrapper.children().first().text()).toEqual('1');
    expect(wrapper.children().last().text()).toEqual('KB');
  });

  it('returns 1023 KB for 1023 K', () => {
    const wrapper = shallow(<FileSize size={1023 * 1024} />);
    expect(wrapper.children().first().text()).toEqual('1023');
    expect(wrapper.children().last().text()).toEqual('KB');
  });

  it('returns 1 MB for 1024 K', () => {
    const wrapper = shallow(<FileSize size={1024 * 1024} />);
    expect(wrapper.children().first().text()).toEqual('1');
    expect(wrapper.children().last().text()).toEqual('MB');
  });

  it('returns 1023 MB for 1023 M', () => {
    const wrapper = shallow(<FileSize size={1023 * 1024 * 1024} />);
    expect(wrapper.children().first().text()).toEqual('1023');
    expect(wrapper.children().last().text()).toEqual('MB');
  });

  it('returns 1 GB for 1024 MB', () => {
    const wrapper = shallow(<FileSize size={1024 * 1024 * 1024} />);
    expect(wrapper.children().first().text()).toEqual('1');
    expect(wrapper.children().last().text()).toEqual('GB');
  });

  it('returns 1023 GB for 1023 G', () => {
    const wrapper = shallow(<FileSize size={1023 * 1024 * 1024 * 1024} />);
    expect(wrapper.children().first().text()).toEqual('1023');
    expect(wrapper.children().last().text()).toEqual('GB');
  });

  it('returns 1 TB for 1024 G', () => {
    const wrapper = shallow(<FileSize size={1024 * 1024 * 1024 * 1024} />);
    expect(wrapper.children().first().text()).toEqual('1');
    expect(wrapper.children().last().text()).toEqual('TB');
  });

  it('returns 1024 TB for 1024 T', () => {
    const wrapper = shallow(<FileSize size={1024 * 1024 * 1024 * 1024 * 1024} />);
    expect(wrapper.children().first().text()).toEqual('1024');
    expect(wrapper.children().last().text()).toEqual('TB');
  });
});
