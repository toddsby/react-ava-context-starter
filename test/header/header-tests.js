import React from 'react';
import test from 'ava';
import {shallow, mount} from 'enzyme';
import Header from '../../components/header/header-index';

test('should have an h1', function(t){
    let Wrapper = shallow(<Header />);
    t.is(Wrapper.find('h1').length, 1);
});

test('h1 should contain the text jngl!', function(t){
    let Wrapper = shallow(<Header />);
    t.is(Wrapper.find('h1').text(), "jngl");
});
