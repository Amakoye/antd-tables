import { Button, Col, Form, Icon, Input, Row } from "antd";
import { useState } from "react";

const AdvancedSearch = ({ form }) => {
  const [expand, setExpand] = useState(false);
  const { getFieldDecorator, validateFields, resetFields } = form;

  //generates mock Form.Item
  const getFields = () => {
    const count = expand ? 10 : 6;
    const children = [];
    for (let i = 0; i < 10; i++) {
      children.push(
        <Col span={8} key={i} style={{ display: i < count ? "block" : "none" }}>
          <Form.Item label={`Field ${i}`}>
            {getFieldDecorator(`field-${i}`, {
              rules: [
                {
                  required: true,
                  message: "Input something!",
                },
              ],
            })(<Input placeholder="placeholder" />)}
          </Form.Item>
        </Col>
      );
    }
    return children;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      console.log(values);
    });
  };

  const handleReset = () => {
    resetFields();
  };

  const toggle = () => {
    setExpand(!expand);
  };

  return (
    <Form
      style={{
        padding: "24px",
        background: "#fbfbfb",
        border: " 1px solid #d9d9d9",
        borderRadius: "6px",
      }}
      onSubmit={handleSearch}
    >
      <Row gutter={24}>{getFields()}</Row>
      <Row>
        <Col span={24} style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>
            Clear
          </Button>
          <a style={{ marginLeft: 8, fontSize: 12 }} onClick={toggle}>
            Collapse <Icon type={expand ? "up" : "down"} />
          </a>
        </Col>
      </Row>
    </Form>
  );
};

const WrappedAdvancedSearchForm = Form.create({ name: "advanced_search" })(
  AdvancedSearch
);

const WrappedAdvancedSearch = () => {
  return (
    <div>
      <WrappedAdvancedSearchForm />
      <div></div>
    </div>
  );
};

export default WrappedAdvancedSearch;
