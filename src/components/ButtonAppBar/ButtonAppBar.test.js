import React from 'react';
import ReactDOM from 'react-dom';
import ButtonAppBar from './index';
import { shallow } from "enzyme";
import { configure } from 'enzyme';
import {
  BrowserRouter as Router
} from "react-router-dom";
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><ButtonAppBar/></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Matches the snapshot", () => {
    const wrapper = shallow(<Router><ButtonAppBar/></Router>);
    expect(wrapper).toMatchSnapshot();
  });
});
