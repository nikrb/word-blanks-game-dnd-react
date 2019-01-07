import React from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import 'jest-styled-components';

import AnswerBox from './AnswerBox';

afterEach(() => cleanup());

it('should mark answers as draggable', () => {
  const { getByTestId } = render(<AnswerBox answers={['brown']} />);
  const answer = getByTestId('answer');
  expect(answer.textContent).toBe('brown');
});

xit('should call setData', () => {
  const { getByTestId } = render(<AnswerBox answers={['brown']} />);
  const answer = getByTestId('answer');
  const mockdt = { setData: jest.fn() };
  fireEvent.dragStart(answer, { dataTransfer: mockdt});
  expect(mockdt.setData).toBeCalled();
});
