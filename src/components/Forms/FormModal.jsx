import { Button, Form, Input, Modal } from "antd";
import { useRef, useState } from "react";

const FormModal = ({ form, visible, onCancel, onCreate }) => {
  const { getFieldDecorator } = form;

  const handleCreate = () => {
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log(values);
      form.resetFields();
      onCreate();
    });
  };

  return (
    <Modal
      visible={visible}
      title="Form in a modal"
      okText="Create"
      onCancel={onCancel}
      onOk={handleCreate}
    >
      <Form>
        <Form.Item label="Title">
          {getFieldDecorator("title", {
            rules: [{ required: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("description", {
            rules: [{ required: true }],
          })(<Input type="textarea" />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

const FormModalPage = () => {
  const [visible, setVisible] = useState(false);
  const formRef = useRef(null);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCreate = () => {
    const { form } = formRef.current;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log(values);
      form.resetFields();
      setVisible(false);
    });
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Create New
      </Button>
      <WrappedFormModal
        wrappedComponentRef={formRef}
        visible={visible}
        onCancel={handleCancel}
        onCreate={handleCreate}
      />
    </div>
  );
};

const WrappedFormModal = Form.create({ name: "form_modal" })(FormModal);

export default FormModalPage;
