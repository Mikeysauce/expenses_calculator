import React from 'react'
import './input.css'
import StyledInput from './input/styles'

class Input extends React.Component {
  myRef = React.createRef();
  state = {
    shouldHighlight: false
  }
  componentDidMount() {
    if (this.props.shouldHighlight) {
      this.setState({
        shouldHighlight: true
      }, () => {
        this.myRef.current.focus();
      })
    }
  }
  render() {
    const {
      label,
      name,
      onChange,
      onBlur,
      type,
      value,
      placeholder = 'Enter your costs',
      shouldHighlight,
    } = this.props
    return name && (
      <div className="field-group">
        {label && <label htmlFor={name}>{label}</label>}
        {type &&
          name &&
          onChange && (
            <StyledInput
              ref={shouldHighlight ? this.myRef : null}
              placeholder={placeholder}
              type={type}
              value={value}
              name={name}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
      </div>
    )
  }
}

Input.defaultProps = {
  type: 'text',
}

export default Input
