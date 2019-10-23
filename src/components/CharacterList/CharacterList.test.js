import React from 'react';
import ReactDOM from 'react-dom';
import CharacterList from './index';
import { shallow } from "enzyme";
import { configure } from 'enzyme';
import { Provider } from "../../provider/apollo-graphql";
import Adapter from 'enzyme-adapter-react-16';
import config from "../../config/default";

configure({ adapter: new Adapter() });

describe('test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider value={{uri: config.graphql.endpoint}}><CharacterList /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });



  it("Matches the snapshot", () => {
    const wrapper = shallow(<Provider value={{uri: config.graphql.endpoint}}><CharacterList /></Provider>);
    expect(wrapper).toMatchSnapshot();
  });
});
