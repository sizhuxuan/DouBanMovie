import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import { Link, Route, Switch } from 'react-router-dom'
import MovieList from './MovieList'
import MovieDetail from './MovieDetail'
const { Content, Sider } = Layout

export default class Movice extends Component {
  render() {
    let key = this.props.location.pathname.replace(/\/\d+/, '')
    return (
      <div style={{ height: '100%' }}>
        <Layout style={{ height: '100%', padding: 0 }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[key]}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              <Menu.Item key="/movie/in_theaters">
                <Link to="/movie/in_theaters">正在热映</Link>
              </Menu.Item>
              <Menu.Item key="/movie/coming_soon">
                <Link to="/movie/coming_soon">即将上映</Link>
              </Menu.Item>
              <Menu.Item key="/movie/top250">
                <Link to="/movie/top250">top250</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
              height: '100%',
              backgroundColor: '#fff'
            }}
          >
            <Switch>
              {/* 电影详情得Route */}
              <Route path="/movie/detail/:movieID" component={MovieDetail} />
              <Route path="/movie/:movieType/:page?" component={MovieList} />
            </Switch>
          </Content>
        </Layout>
      </div>
    )
  }
}
