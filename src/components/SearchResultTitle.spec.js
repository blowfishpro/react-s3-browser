import React from 'react';
import { shallow } from 'enzyme';
import SearchResultTitle from './SearchResultTitle';

describe(SearchResultTitle, () => {
  it('renders', () => {
    const matchData = [
      [
        { match: false, fragment: '123' },
        { match: true, fragment: 'matching' },
        { match: false, fragment: '456'},
      ],
      [{ match: false, fragment: 'thing6' }],
    ];

    const wrapper = shallow(<SearchResultTitle matchData={matchData}/>);
    expect(wrapper).toMatchElement(
      <span>
        <span key={0} style={{}}>123</span>
        <span key={1} style={{fontWeight: 'bold'}}>matching</span>
        <span key={2} style={{}}>456</span>
        <span key={3}>/</span>
        <span key={4} style={{}}>thing6</span>
      </span>,
      { ignoreProps: false },
    );
  });
});
