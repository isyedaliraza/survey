import * as React from "react"
import { Switch, Link, Route, useLocation } from "react-router-dom"
import { Layout, Menu } from "antd"
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons"
import "./index.css"
import Logo from "./logo.svg"
import SurveysPage from "../Survey/index"
import AddSurveyPage from "../Survey/addSurvey"

const { Header, Sider, Content, Footer } = Layout

const App = () => {
  const location = useLocation()
  const [collapsed, setCollapsed] = React.useState(false)

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <img
            alt="Logo"
            style={{ width: "100%", height: "100%" }}
            src={Logo}
          />
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
          <Menu.Item key="/" icon={<UnorderedListOutlined />}>
            <Link to="/">Surveys</Link>
          </Menu.Item>
          <Menu.Item key="/add-survey" icon={<PlusOutlined />}>
            <Link to="/add-survey">Add Survey</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Switch>
            <Route exact path="/">
              <SurveysPage />
            </Route>
            <Route path="/add-survey">
              <AddSurveyPage />
            </Route>
          </Switch>
        </Content>
        <Footer
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Made with <span style={{ color: "red" }}>&#9829;</span> by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/isyedaliraza"
          >
            Syed Ali Raza Bokhari
          </a>
        </Footer>
      </Layout>
    </Layout>
  )
}

export default App
