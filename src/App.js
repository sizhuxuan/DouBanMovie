import React, { Component } from 'react'
//导入路由
import { HashRouter as Router, Route, Link, withRouter } from 'react-router-dom'
//导入antd
import { Layout, Menu } from 'antd'
import './App.css'
//导入组件
import Home from './pages/Home/Home'
import Movie from './pages/Movie/Movie'
import About from './pages/About/About'
const { Header, Content, Footer } = Layout

//封装菜单函数组件
const Menus = ({ location }) => {
  let key = location.pathname
  if (key.startsWith('/movie')) {
    key = '/movie'
  }
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[key]}
      style={{ lineHeight: '64px' }}
    >
      <Menu.Item key="/">
        <Link to="/">首页</Link>
      </Menu.Item>
      <Menu.Item key="/movie">
        <Link to="/movie/in_theaters">电影列表</Link>
      </Menu.Item>
      <Menu.Item key="/about">
        <Link to="/about">关于</Link>
      </Menu.Item>
    </Menu>
  )
}

//使用高阶组件withRouter包裹 Menus函数组件
const MenuWithRouter = withRouter(Menus)

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Layout className="layout">
            <Header>
              <div className="logo" />
              <MenuWithRouter />
            </Header>

            <Content>
              <div
                style={{
                  background: '#fff',
                  paddingTop: 24,
                  minHeight: 280,
                  height: '100%'
                }}
              >
                <Route path="/" exact component={Home} />
                <Route path="/movie" component={Movie} />
                <Route path="/about" component={About} />
              </div>
            </Content>

            <Footer style={{ textAlign: 'center' }}>
              react is so easy ©2018 Created by sizhuxuan
            </Footer>
          </Layout>
        </div>
      </Router>
    )
  }
}

export default App
