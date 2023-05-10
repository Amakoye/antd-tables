import { Button, Checkbox, Form, Icon, Input } from "antd";

const LoginForm = ({ form }) => {
  const { getFieldDecorator } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "300px",
        border: "1px solid #ccc",
        padding: "1em",
        borderRadius: "1em",
      }}
    >
      <Form.Item>
        {getFieldDecorator("username", {
          rules: [
            {
              required: true,
              message: "Please input your username!",
            },
          ],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Username"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("password", {
          rules: [
            {
              required: true,
              message: "Please input your Password!",
            },
          ],
        })(
          <Input
            type="password"
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("remember", {
          valuePropName: "checked",
          initialValue: true,
        })(<Checkbox>Remember me</Checkbox>)}
        <a
          href=""
          style={{
            float: "right",
          }}
        >
          Forgot password
        </a>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            width: "100%",
          }}
        >
          Log in
        </Button>
        Or <a href="">register now</a>
      </Form.Item>
    </Form>
  );
};

const WrappedLoginForm = Form.create({ name: "login_form" })(LoginForm);

export default WrappedLoginForm;
