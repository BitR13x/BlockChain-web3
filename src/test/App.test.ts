import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import App from '../App';

describe('App component', () => {
  it('renders navbar and text content', () => {
    const wrapper = mount(App);

    // Check if the navbar component is rendered
    expect(wrapper.find('NavbarComponent')).to.have.lengthOf(1);

    // Check if the text content is rendered
    expect(wrapper.text()).to.contain('Edit src/App.js and save to reload.');
    expect(wrapper.text()).to.contain('Learn React');
  });
});