import React, { Component } from 'react'
import { Card } from 'antd'
import './MovieList.css'
import { Rate, Pagination, Spin, Alert } from 'antd'

export default class MovieList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      list: [],
      isLoading: true,
      total: ''
    }

    let {
      params: { movieType, page }
    } = this.props.match
    this.movieType = movieType
    this.page = page - 0 || 1
  }

  //封装获取电影数据方法
  fetchMovieList() {
    //获取数据前,先加载loading
    this.setState({
      isLoading: true
    })

    //根据页码获得每页起始索引号
    const start = 5 * (this.page - 1)

    //使用了反向代理规则来进行跨域获取数据
    fetch(`/api/movie/${this.movieType}?start=${start}&count=5`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          list: data.subjects,
          total: data.total,
          isLoading: false
        })
      })
  }

  componentDidMount() {
    this.fetchMovieList()
  }

  //分页事件处理程序
  changePage = page => {
    this.props.history.push(`/movie/${this.movieType}/${page}`)
  }

  componentDidUpdate(prevProps) {
    const { page: prevPage, movieType: prevmovieType } = prevProps.match.params
    const { page: currpage, movieType: currmovieType } = this.props.match.params
    if (prevmovieType !== currmovieType || prevPage !== currpage) {
      //重新设置最新得页码以及电影类型
      this.page = currpage - 0 || 1
      this.movieType = currmovieType
      this.fetchMovieList()
    }
  }

  //跳转电影详情页面
  goDetail(movieID) {
    this.props.history.push(`/movie/detail/${movieID}`)
  }

  render() {
    const { list, isLoading, total } = this.state

    //组织电影列表数据
    const movies = list.map(item => {
      return (
        <Card
          onClick={() => this.goDetail(item.id)}
          key={item.id}
          hoverable
          style={{
            width: 240,
            marginRight: 10,
            marginBottom: 10
          }}
          cover={
            <img
              alt="example"
              style={{ width: 198, height: 280 }}
              src={item.images.small}
            />
          }
        >
          <h3>电影名称: {item.title}</h3>
          <p>电影类型: {item.genres.join('-')}</p>
          <p>上映年份: {item.year}</p>
          <Rate disabled allowHalf defaultValue={item.rating.average / 2} />
        </Card>
      )
    })

    //loading加载效果
    const loading = (
      <Spin tip="Loading...">
        <Alert
          message="温馨提示:"
          description="数据玩命加载中,请稍后..."
          type="info"
        />
      </Spin>
    )
    return (
      <div className="movies-list-wrapper" sytle={{ height: '100%' }}>
        {isLoading ? (
          loading
        ) : (
          // 这里不是组件,千万不要写成组件形式,否则报错
          <>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>{movies}</div>
            <Pagination
              current={this.page}
              defaultCurrent={1}
              total={total}
              defaultPageSize={5}
              onChange={this.changePage}
            />
          </>
        )}
      </div>
    )
  }
}
