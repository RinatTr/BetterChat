//When comp rerenders, need to be booleans. 
import React from 'react';
import renderer from 'react-test-renderer';
import Main from './Main';
import axios from 'axios';

// Jest does not use proxy for API calls
const PROXY = "http://localhost:3100";

test('Main snapshot test', () => {
  const component = renderer.create(<Main />);
  const tree = component.toJSON();
  console.log(tree.props)
  expect(tree).toMatchSnapshot();
});

test('non-unique username request fails with expected error code', () => {
    const EXISTING_USERNAME = "wolverine";
    return axios.post(`${PROXY}/api/users/${EXISTING_USERNAME}`).catch(e => {
        let err_code = e.response.data.error.code; 
        expect(err_code).toBe('23505');
    });
  });