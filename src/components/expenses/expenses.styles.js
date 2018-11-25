import styled, { css } from 'styled-components';

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: ${props => props.col ? 'flex-start' : 'center'};
  ${props => props.col && `
    flex-direction: column;
  `};
  .expenses__inputs {
    flex: 1 1 300px;
    margin-right: 1rem;
  }
  .expenses__summary {
    padding: 2rem 1rem;
    background: antiquewhite;
    border-radius: 14px;
    p {
      margin: 0;
    }
  }
`;

export default Form;