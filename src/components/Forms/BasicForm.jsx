import { Button, Form, Icon, Input } from "antd";
import { useCallback, useEffect } from "react";

const hasErrors = (fieldsError) => {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
};

const BasicForm = ({ form }) => {
  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } =
    form;

  const usernameError = isFieldTouched("username") && getFieldError("username");
  const passwordError = isFieldTouched("password") && getFieldError("password");

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  const validateForm = useCallback(() => {
    form.validateFields();
  }, []);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <Form.Item
        validateStatus={usernameError ? "error" : ""}
        help={usernameError || ""}
      >
        {getFieldDecorator("username", {
          rules: [{ required: true, message: "Please input your username!" }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Username"
          />
        )}
      </Form.Item>
      <Form.Item
        validateStatus={passwordError ? "error" : ""}
        help={passwordError || ""}
      >
        {getFieldDecorator("password", {
          rules: [{ required: true, message: "Please input your Password!" }],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          disabled={hasErrors(getFieldsError())}
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedBasicForm = Form.create({ name: "basic_form" })(BasicForm);

export default WrappedBasicForm;
