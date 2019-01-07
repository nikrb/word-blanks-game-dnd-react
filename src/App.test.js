import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, cleanup, getNodeText, waitForElement } from 'react-testing-library';
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
it('should set dataTransfer with correct types and items', () => {
  const { getByTestId } = render(<App/>);
  const answer = getByTestId('answer');
  expect(answer).toBeDefined();
  expect(getNodeText(answer)).toBe('brown');
  const mockDataTransfer = { setData: jest.fn()};
  fireEvent.dragStart(answer, { dataTransfer: mockDataTransfer });
  expect(mockDataTransfer.setData).toBeCalled();
  // expect(mockDataTransfer.setData).toBeCalledWith('text/plain', 'brown');
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
  // FIXME: why isn't is called?
  // expect(mockEvent.preventDefault).toBeCalled();
})

xit('should place answer in dropzone on drop', async () => {
  const { debug, getByTestId, getByText } = render(<App/>);
  const dz = getByTestId('droppable1');
  expect(dz).toBeDefined();
  const mockEvent = { dataTransfer: { types: ['text/plain'] } };
  // mockEvent.dataTransfer.getData = function() { return '"brown"'; };

  Object.defineProperty(mockEvent.dataTransfer, 'getData', {
    value: function(type) { return 'brown'; }
  });

  fireEvent.dragOver(dz, mockEvent);
  expect(dz).toHaveStyle('background-color: yellow');
  fireEvent.drop(dz, mockEvent);
  expect(dz).toHaveStyle('background-color: white');
  expect(getNodeText(dz)).toBe('brown');
  // expect(dz).toHaveStyle('background-color: rgba(255,255,255,0)');
});
