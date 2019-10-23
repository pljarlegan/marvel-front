import React from 'react';
import ReactDOM from 'react-dom';
import CharacterCard from './index';
import { shallow } from "enzyme";
import { configure } from 'enzyme';
import { Provider } from "../../provider/apollo-graphql";
import Adapter from 'enzyme-adapter-react-16';
import config from "../../config/default";
import {
  BrowserRouter as Router
} from "react-router-dom";

configure({ adapter: new Adapter() });

describe('test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><Provider value={{uri: config.graphql.endpoint}}><CharacterCard /></Provider></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
  });



  it("Matches the snapshot", () => {
    const wrapper = shallow(<Provider value={{uri: config.graphql.endpoint}}><CharacterCard /></Provider>);
    expect(wrapper).toMatchSnapshot();
  });
});
