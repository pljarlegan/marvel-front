import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from "enzyme";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ListComicsName from './index'

configure({ adapter: new Adapter() });

describe('test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ListComicsName title={"bob"} items={[]}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Matches the snapshot title 'bob', 0 items", () => {
    const wrapper = shallow(<ListComicsName title={"bob"} items={[]}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it("Matches the snapshot title 'bob', 2 items", () => {
    const wrapper = shallow(<ListComicsName title={"bob"} items={[{name: "a"}, {name: "b"}]}/>);
    expect(wrapper).toMatchSnapshot();
  });
});


