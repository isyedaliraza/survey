import * as React from "react"
import axios from "axios"
import {
  Button,
  Typography,
  Row,
  Col,
  Input,
  DatePicker,
  Form,
  Select,
  Card,
  message,
} from "antd"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"

const { Option } = Select

const AddSurveyPage = () => {
  const [form] = Form.useForm()

  const addSurvey = async (values) => {
    try {
      const params = new URLSearchParams()
      params.append("title", values.title)
      params.append(
        "questions",
        values.questions ? JSON.stringify(values.questions) : []
      )
      params.append("expiryDate", values.expiryDate.format("LLL"))
      params.append("isActive", JSON.stringify(true))
      const { status } = await axios.post(
        "http://localhost:3000/api/surveys",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )

      if (status === 200) {
        message.success("Survey added successfully.", 1).then(() => {
          window.location.reload()
        })
      } else {
        message.error("Something went wrong. Try again.")
      }
    } catch (e) {
      message.error("Something went wrong. Try again.")
    }
  }

  const onFinish = (values) => {
    console.log(values)
    addSurvey(values)
  }

  return (
    <>
      <Typography.Title level={2}>Add Survey</Typography.Title>
      <Form
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{
          title: "",
          expiryDate: "",
          questions: [{ title: "", type: "text", mcqs: undefined }],
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="Enter survey title" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="expiryDate"
              label="Expiry Date"
              rules={[{ required: true, message: "Required" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                showTime
                format="MMM DD YYYY, h:mm A"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.List name="questions">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field) => (
                    <Form.Item style={{ marginBottom: 16 }} key={field.key}>
                      <Card>
                        <Row gutter={[16, 16]}>
                          <Col span={16}>
                            <Form.Item
                              {...field}
                              name={[field.name, "title"]}
                              fieldKey={[field.fieldKey, "title"]}
                              rules={[{ required: true, message: "Required" }]}
                            >
                              <Input placeholder="Write your question here .." />
                            </Form.Item>
                            {form.getFieldsValue().questions &&
                            form.getFieldsValue().questions[field.name][
                              "type"
                            ] === "mcq" ? (
                              <Form.List name={[field.name, "mcqs"]}>
                                {(mcqs, { add, remove }, { errors }) => (
                                  <>
                                    {mcqs.map((mcq) => (
                                      <Form.Item key={mcq.key}>
                                        <div style={{ display: "flex" }}>
                                          <Form.Item
                                            style={{ flex: 1 }}
                                            {...mcq}
                                            name={mcq.name}
                                          >
                                            <Input placeholder="Enter your option" />
                                          </Form.Item>
                                          <Button
                                            type="link"
                                            danger
                                            icon={<MinusCircleOutlined />}
                                            style={{ marginLeft: 8 }}
                                            onClick={() => remove(mcq.name)}
                                          />
                                        </div>
                                      </Form.Item>
                                    ))}
                                    {form.getFieldsValue().questions &&
                                    form.getFieldsValue().questions[field.name][
                                      "type"
                                    ] === "mcq" ? (
                                      <Form.Item>
                                        <Button
                                          type="dashed"
                                          onClick={() => add()}
                                          style={{ width: "90%" }}
                                          icon={<PlusOutlined />}
                                        >
                                          Add Option
                                        </Button>
                                        <Form.ErrorList errors={errors} />
                                      </Form.Item>
                                    ) : null}
                                  </>
                                )}
                              </Form.List>
                            ) : null}
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              {...field}
                              name={[field.name, "type"]}
                              fieldKey={[field.fieldKey, "type"]}
                              rules={[{ required: true, message: "Required" }]}
                            >
                              <Select
                                style={{
                                  flex: 1,
                                  marginRight: 16,
                                  width: "100%",
                                }}
                                placeholder="Select question type"
                                onChange={(value) => form.setFieldsValue({})}
                              >
                                <Option value="text">Text</Option>
                                <Option value="mcq">Multiple Choice</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                        </Row>
                      </Card>
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add({ title: "", type: "text" })}
                      style={{ width: "100%" }}
                      icon={<PlusOutlined />}
                    >
                      Add Question
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              style={{
                direction: "rtl",
              }}
            >
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default AddSurveyPage
