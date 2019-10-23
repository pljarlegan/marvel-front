import React from 'react';
import ReactDOM from 'react-dom';
import Home from './index';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea"
import { shallow } from "enzyme";
import { configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Home/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should render 2 cards', () => {
    const wrapper = shallow(<Home/>);
    expect(wrapper.find(Card)).toHaveLength(2);
  });

  it('should render a CardActionArea', () => {
    const wrapper = shallow(<Home/>);
    expect(wrapper.find(CardActionArea)).toHaveLength(1);
  });

  it("Matches the snapshot", () => {
    const wrapper = shallow(<Home/>);
    expect(wrapper).toMatchSnapshot();
  });
});
