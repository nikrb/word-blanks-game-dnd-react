import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Block = styled.div`
  margin: 1em auto;
`;

export const FormRow = styled.div`
  margin: 0.5em;
  padding: 0.5em;
`;

export const FormInput = styled.input`
  margin: 0.5em;
  line-height: 1.5em;
`;

export const WordBox = styled.div`
  background-color: ${props => props.bgcolor || 'white'};
  margin: 0.5em;
  padding: 0.25em 0.5em;
  cursor: pointer;
  min-width: 1em;
  border-bottom: 1px solid black;
`;

export const WordWrapper = styled.div`
  display: flex;
  justify-content: center;
`;


export const PrimaryButton = styled.button`
  color: #fff;
  background-color: #6c6;
  border-radius: 5px;
  border-color: #5b5;
  margin: 0;
  padding: 0.4em 0.8em;
  line-height: 1.5em;
`;
