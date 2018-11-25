import React from 'react'
// import './button.css';

import styled from 'styled-components'

const StyledButton = styled.button`
  border: 1px solid white;
  border-radius: 6px;
  padding: 11px;
  background: ${props => props.background ? props.background : '#44f5c7'};
  color: ${props => props.color ? props.color : '#262633'};
  &:hover,
  :focus {
    cursor: pointer;
  }
`

const Button = ({ children, ...rest }) => <StyledButton {...rest}>{children}</StyledButton>

export default Button
