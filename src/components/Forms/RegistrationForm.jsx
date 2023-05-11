import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Icon,
  Input,
  Row,
  Select,
  Tooltip,
} from "antd";
import { useCallback, useEffect, useState } from "react";

const { Option } = Select;

const AutoCompleteOption = AutoComplete.Option;

const residences = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];

const RegistrationForm = ({ form }) => {
  const [confirmDirty, setConfirmDity] = useState(false);
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const { getFieldDecorator } = form;

  const validateForm = useCallback(() => {
    form.validateFields();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };

  const handleConfirmBlur = (e) => {
    const { value } = e.target;
    setConfirmDity(confirmDirty || !!value);
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you entered is inconsistent");
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  const handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = [".com", ".org", ".net"].map(
        (domain) => `${value}${domain}`
      );
    }
    setAutoCompleteResult(autoCompleteResult);
  };

  const prefixSelector = getFieldDecorator("prefix", {
    initialValue: "86",
  })(
    <Select
      style={{
        width: 70,
      }}
    >
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
    </Select>
  );

  const websiteOptions = autoCompleteResult.map((website) => (
    <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
  ));

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  return (
    <Row style={{ display: "flex", justifyContent: "center" }}>
      <Col className="" xs={24} lg={12}>
        <Form
          layout="vertical"
          /* {...formItemLayout} */
          onSubmit={handleSubmit}
          style={{ border: "1px solid #ccc", padding: "1em" }}
        >
          <Row gutter={12}>
            <Col xs={24} sm={24} md={12} span={12}>
              <Form.Item label="E-mail">
                {getFieldDecorator("email", {
                  rules: [
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} span={12}>
              <Form.Item label="Password" hasFeedback>
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                    {
                      validator: validateToNextPassword,
                    },
                  ],
                })(<Input.Password />)}
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} span={12}>
              <Form.Item label="Confirm Password" hasFeedback>
                {getFieldDecorator("confirm", {
                  rules: [
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    {
                      validator: compareToFirstPassword,
                    },
                  ],
                })(<Input.Password onBlur={handleConfirmBlur} />)}
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} span={12}>
              <Form.Item
                label={
                  <span>
                    Nickname&nbsp;
                    <Tooltip title="What do you want others to call you?">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
              >
                {getFieldDecorator("nickname", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your nickname!",
                      whitespace: true,
                    },
                  ],
                })(<Input />)}
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} span={12}>
              <Form.Item label="Habitual Residence">
                {getFieldDecorator("residence", {
                  initialValue: ["zhejiang", "hangzhou", "xihu"],
                  rules: [
                    {
                      type: "array",
                      required: true,
                      message: "Please select your habitual residence!",
                    },
                  ],
                })(<Cascader options={residences} />)}
              </Form.Item>
              <Form.Item label="Phone Number">
                {getFieldDecorator("phone", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ],
                })(
                  <Input
                    addonBefore={prefixSelector}
                    style={{ width: "100%" }}
                  />
                )}
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} span={12}>
              <Form.Item label="Website">
                {getFieldDecorator("website", {
                  rules: [{ required: true, message: "Please input website!" }],
                })(
                  <AutoComplete
                    dataSource={websiteOptions}
                    onChange={handleWebsiteChange}
                    placeholder="website"
                  >
                    <Input />
                  </AutoComplete>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Form.Item style={{ float: "left" }}>
              {getFieldDecorator("agreement", {
                valuePropName: "checked",
              })(
                <Checkbox>
                  I have read the <a href="">agreement</a>
                </Checkbox>
              )}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              style={{
                float: "left",
              }}
            >
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

const WrappedRegistrationForm = Form.create({ name: "registration_form" })(
  RegistrationForm
);

export default WrappedRegistrationForm;
