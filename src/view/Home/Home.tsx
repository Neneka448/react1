import './Home.css'
import {Outlet} from "react-router-dom";
import {WrappedLink} from "../../components/WrappedLink";
import InfoWidget from "../../components/InfoWidget";
export function Home(){
  return (
    <div>
      <nav className="home-navbar">
        <div className="home-navbar-list">
          <div className="home-navbar-item">
            <WrappedLink to='recommended'>综合</WrappedLink>
          </div>
          <div className="home-navbar-item">
            <WrappedLink to='following'>关注</WrappedLink>
          </div>
          <div className="home-navbar-item">
            <WrappedLink to='frontend'>前端</WrappedLink>
          </div>
          <div className="home-navbar-item">
            <WrappedLink to='backend'>后端</WrappedLink>
          </div>
          <div className="home-navbar-item">
            <WrappedLink to='articles'>文章</WrappedLink>
          </div>
        </div>
      </nav>
      <div className="home-content">
        <div className="home-content-passage">
          <Outlet/>
        </div>
        <div className="home-content-sidebar">
          <div className="home-content-sidebar-welcome">
            <InfoWidget
              header={
                <div style={{
                  height:'30px',
                  lineHeight:'30px',
                  marginLeft:'20px'
                }}>
                  下午好!
                </div>
              }
              content={
                <div
                  style={{
                    fontSize:12,
                    height:50,
                    lineHeight:'50px',
                    textAlign: 'center'
                  }}
                >
                点亮你在社区的每一天
                </div>
              }

            />
          </div>
          <div className="home-content-sidebar-ad">
            <InfoWidget content={<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6175104aec964d3f88670c283bd8b336~tplv-k3u1fbpfcp-no-mark:480:400:0:0.awebp?" alt=""/>
            }/>
          </div>
          <div className="home-content-sidebar-download">
            <InfoWidget content={
              <div style={{
                display:'flex',
                justifyContent:'space-around'
              }}>
                <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/home.e8f8c43.png" alt="" width="50px"/>
                <div style={{
                  display:'flex',
                  flexDirection:'column',
                  justifyContent: 'space-around'
                }}>
                  <div style={{fontSize:14}}>下载稀土掘金App</div>
                  <div style={{fontSize:12}}>一个帮助开发者成长的社区</div>
                </div>
              </div>
            }/>
          </div>
          <div className="home-content-sidebar-authorRank">
            <InfoWidget
              header={
                <div style={{
                  padding:10,
                  borderBottom:'1px solid rgb(244,244,244)',
                  fontSize:13
                }}>作者榜</div>
              }
              content={
                <div>123</div>
              }

            />
          </div>
        </div>

      </div>

    </div>
  )
}