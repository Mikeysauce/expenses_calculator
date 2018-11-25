import React from 'react'
import Layout from '../components/layout';
import Expenses from '../components/expenses/expenses';

class HomePage extends React.Component {
  render() {
    return (
      <Layout>
        <p>Fill in your starting salary and your monthly expenses</p>
        <Expenses/>
      </Layout>
    )
  }
}

export default HomePage
