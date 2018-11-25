import React, { createRef, Fragment } from 'react'
import Input from '../input'
import Button from '../button/button'
import Form from './expenses.styles'

class CreateExpense extends React.Component {
  state = {
    name: '',
  }
  handleChange = e => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.cb({
      ...this.state,
      label: this.state.name,
    })
    this.setState({ name: '' })
  }
  render() {
    return (
      <Form col onSubmit={this.handleSubmit}>
        <div className="field-group">
          <label htmlFor="name">Expense Name</label>
          <Input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            onBlur={this.handleSubmit}
            placeholder="Expense Name"
          />
        </div>
        <div>
          <Button background="#6a289d" color="white" type="submit">
            Create
          </Button>
        </div>
      </Form>
    )
  }
}

export default class Expenses extends React.Component {
  state = {
    openingBalance: 0,
    expensesBalance: {},
    expensesPanelVisible: false,
    expensesItems: [],
  }
  componentDidMount() {
    const expenses = localStorage.getItem('expenses')
    if (expenses) {
      this.setState(state => ({ ...JSON.parse(expenses) }))
    }
  }
  handleChange = e => {
    e.preventDefault()
    const { name, value } = e.target

    this.setState(state => {
      if (name === 'openingBalance') {
        return {
          ...state,
          [name]: value,
        }
      } else {
        return {
          expensesBalance: {
            ...this.state.expensesBalance,
            [name]: value,
          },
        }
      }
    })
  }
  handleToggleExpenseCreationPanel = () => {
    this.setState({ expensesPanelVisible: !this.state.expensesPanelVisible })
  }
  handleRemoveExpense = (e, expense) => {
    e.preventDefault();
    this.setState(
      ({ expensesItems, expensesBalance }) => {
        const expenseIndex = expensesItems.findIndex(i => i === expense);
        const newObj = {
          ...expensesBalance
        }
        delete newObj[expense.name];
        return {
          expensesItems: [
            ...expensesItems.slice(0, expenseIndex),
            ...expensesItems.slice(expenseIndex + 1),
          ],
          expensesBalance: {
            ...newObj
          }
        }
      },
      () => localStorage.setItem('expenses', JSON.stringify(this.state))
    )
  }
  handlePersistExpenses = () => {
    console.log(this.state)
    localStorage.setItem('expenses', JSON.stringify(this.state))
    console.log('donezo')
  }
  handleCreateNewExpense = expense => {
    this.setState(({ expensesItems }) => {
      const newItems = [...expensesItems, ...expense]
      const focusIndex = newItems.length - 1
      return {
        expensesItems: newItems,
        focusIndex,
      }
    })
  }
  SummariseExpenses = () => {
    const { expensesBalance, openingBalance } = this.state
    const keys = Object.keys(expensesBalance)
    if (keys.length < 1) return
    const summary = keys.reduce(
      (prev, curr) =>
        isNaN(parseFloat(expensesBalance[curr]))
          ? prev
          : parseFloat(expensesBalance[curr]) + parseFloat(prev),
      0
    )
    const remainder = openingBalance - summary
    return (
      <div className="expenses__summary">
        <p>Total Expenditure: {summary}</p>
        <p>Remainder: {isNaN(remainder) ? 0 : remainder.toFixed(2)}</p>
      </div>
    )
  }
  render() {
    const {
      expensesBalance,
      openingBalance,
      expensesPanelVisible,
      expensesItems,
      focusIndex,
    } = this.state
    return (
      <div>
        <Form>
          <div className="expenses__inputs">
            <Input
              type="text"
              name="openingBalance"
              value={openingBalance}
              onChange={this.handleChange}
              label="Opening Balance"
            />
            {expensesItems.map((item, index) => (
              <Fragment>
                <Input
                  {...item}
                  onChange={this.handleChange}
                  value={expensesBalance[item.name]}
                  shouldHighlight={index === focusIndex && item.name !== ''}
                />
                <button onClick={(e) => this.handleRemoveExpense(e, item)}>
                  delete
                </button>
              </Fragment>
            ))}
          </div>

          {Object.keys(expensesBalance).length > 0 && (
            <this.SummariseExpenses />
          )}
        </Form>
        <Button
          background="#99ff83"
          onClick={this.handleToggleExpenseCreationPanel}
        >
          New Expense
        </Button>
        <Button
          background="#682e9b"
          color="white"
          onClick={this.handlePersistExpenses}
        >
          Save Expenses
        </Button>
        {expensesPanelVisible && (
          <CreateExpense cb={this.handleCreateNewExpense} />
        )}
      </div>
    )
  }
}
