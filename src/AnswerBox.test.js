import React from 'react';
// import ReactTestUtils from 'react-dom/test-utils';
import { cleanup, fireEvent, render } from 'react-testing-library';
import 'jest-styled-components';

import AnswerBox from './AnswerBox';

afterEach(() => cleanup());

it('should mark answers as draggable', () => {
  const { getByTestId } = render(<AnswerBox answers={['brown']} />);
  const answer = getByTestId('answer');
  expect(answer.textContent).toBe('brown');
});

it('should call setData', () => {
  jest.mock('./AnswerBox', () => ({ onDragStart: jest.fn() }));
  // AnswerBox.onDragStart = jest.fn();
  const { getByTestId } = render(<AnswerBox answers={['brown']} />);
  const answer = getByTestId('answer');
  const mockdt = { setData: jest.fn() };
  const dt = new DataTransfer();
  dt.setData = jest.fn();
  fireEvent.dragStart(answer, dt); // { dataTransfer: mockdt});
  // AnswerBox.onDragStart({dataTransfer: mockdt});
  // expect(AnswerBox.onDragStart).toBeCalled();
  expect(dt.setData).toBeCalled();
});
