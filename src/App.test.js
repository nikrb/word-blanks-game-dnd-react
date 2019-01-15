import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { cleanup, fireEvent, getNodeText, render } from 'react-testing-library';
import 'jest-dom/extend-expect';
import 'jest-styled-components';

import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

afterEach(() => {
  cleanup();
});

it('should mark answers as draggable', () => {
  const { getAllByTestId } = render(<App/>);
  const answer = getAllByTestId('answer');
  expect(answer.length).toBe(3);
  answer.forEach(a => {
    expect(a).toHaveAttribute('draggable');
  })
});
it('should not mark drop zones as draggable', () => {
  const { getAllByTestId } = render(<App/>);
  // const zones = getAllByTestId('droppable', { exact: false });
  const zones = getAllByTestId(/droppable/);
  expect(zones.length).toBe(3);
  zones.forEach(z => {
    expect(z.getAttribute('draggable')).toBeFalsy();
  });
});
it('should call setData on dataTransfer with correct text', () => {
  const { getByTestId } = render(<App />);
  const mockdt = { setData: jest.fn() };
  const answer = getByTestId('answer');
  expect(answer).toBeDefined();
  expect(getNodeText(answer)).toBe('brown');
  TestUtils.Simulate.dragStart(answer, { dataTransfer: mockdt });
  expect(mockdt.setData).toBeCalled();
  expect(mockdt.setData).toBeCalledWith('text/plain', 'brown');
});

it('should highlight dropzone on drag over', async () => {
  const { getByTestId } = render(<App/>);
  const dz = getByTestId('droppable1');
  expect(dz).toBeDefined();
  expect(getNodeText(dz)).toBe(' ');
  expect(dz).toHaveStyle('background-color: white');
  const mockEvent = {
    dataTransfer: { types: ['text/plain'] },
    preventDefault: jest.fn(),
  };
  fireEvent.dragOver(dz, mockEvent);
  expect(dz).toHaveStyle('background-color: yellow');
  // FIXME: doesn't get called?!
  // expect(mockEvent.preventDefault).toBeCalled();
})

it('should place answer in dropzone on drop', async () => {
  const { getByTestId } = render(<App/>);
  const dz = getByTestId('droppable1');
  expect(dz).toBeDefined();
  const mockEvent = { dataTransfer: { types: ['text/plain'] } };
  mockEvent.dataTransfer.getData = function() { return '\"brown\"'; };

  fireEvent.dragOver(dz, mockEvent);
  expect(dz).toHaveStyle('background-color: yellow');
  TestUtils.Simulate.drop(dz, mockEvent);
  expect(dz).toHaveStyle('background-color: white');
  expect(getNodeText(dz)).toBe('\"brown\"');
});

