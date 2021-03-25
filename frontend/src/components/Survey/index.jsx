import * as React from "react"
import moment from "moment"
import { Typography, Table, Button, Space, message } from "antd"
import axios from "axios"
import confirm from "antd/lib/modal/confirm"

const SurveysPage = () => {
  const [data, setData] = React.useState()

  React.useEffect(() => {
    getSurveys()
  }, [])

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (text, record, index) => (
        <Typography.Text>
          {moment(record.expiryDate).format("LLL")}
        </Typography.Text>
      ),
    },
    {
      title: "Is Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (text, record, index) => (
        <Typography.Text>
          {record.isActive ? "Active" : "Disabled"}
        </Typography.Text>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => deleteSurvey(record.id)} type="link" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  const getSurveys = async () => {
    const surveys = await axios.get(`http://localhost:3000/api/surveys`)
    if (surveys.status === 200) {
      setData(surveys.data)
    }
  }

  const deleteSurvey = async (id) => {
    try {
      confirm({
        title: "Confirmation",
        content: "Do you want to delete this survey?",
        okText: "Delete",
        cancelText: "Cancel",
        onOk: async () => {
          const response = await axios.delete(
            `http://localhost:3000/api/surveys/${id}`
          )
          if (response.status === 200) {
            window.location.reload()
          } else {
            message.error("Something went wrong. Try again.")
          }
        },
      })
    } catch (e) {
      message.error("Something went wrong. Try again.")
      return Promise.reject()
    }
  }

  return (
    <>
      <Typography.Title level={2}>Surveys</Typography.Title>
      <Table rowKey="id" loading={!data} columns={columns} dataSource={data} />
    </>
  )
}

export default SurveysPage
