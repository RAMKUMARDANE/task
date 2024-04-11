import { Button, DatePicker, Form, Input } from "antd";
import * as React from "react";
import { TYPE_OF_USER } from "../../modal/types/user.types";
import dayjs from "dayjs";

type UserFromProps = {
  selectedUser: TYPE_OF_USER | undefined;
  handleSave: Function;
  handleCancel: Function;
};

const UserFrom: React.FC<UserFromProps> = (props: UserFromProps) => {
  const { selectedUser, handleSave, handleCancel } = props;
  const disabledDates = (current: any) => {
    return current && current > dayjs().subtract(18, "years");
  };
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (selectedUser) {
      form.setFieldsValue({
        ...selectedUser,
        user_dob: dayjs(selectedUser.user_dob),
      });
    }
    //eslint-disable-next-line
  }, [selectedUser]);

  const handleOnSubmit = (values: TYPE_OF_USER) => {
    handleSave({
      ...values,
      user_dob: values.user_dob.toString(),
    });
  };

  return (
    <div>
      <Form
        form={form}
        style={{ maxWidth: 600 }}
        initialValues={{
          ...selectedUser,
          user_dob: selectedUser ? dayjs(selectedUser.user_dob) : null,
        }}
        onFinish={handleOnSubmit}
        layout="vertical"
      >
        <Form.Item
          label="Name"
          name={"user_name"}
          rules={[
            {
              required: true,
              validateTrigger: ["onChange", "onBlur"],
              message: "Name is required",
            },
          ]}
        >
          <Input placeholder="" id="error" />
        </Form.Item>
        <Form.Item
          label="Email"
          name={"user_email"}
          rules={[
            {
              required: true,
              validateTrigger: ["onChange", "onBlur"],
              message: "Email is required",
            },
          ]}
        >
          <Input placeholder="" id="error" />
        </Form.Item>
        <Form.Item
          label="Mobile"
          name={"user_mobile"}
          rules={[
            {
              required: true,
              validateTrigger: ["onChange", "onBlur"],
              message: "Mobile Number is required",
            },
          ]}
        >
          <Input placeholder="" id="error" />
        </Form.Item>
        <Form.Item
          label="Date Of Birth"
          name={"user_dob"}
          rules={[
            {
              required: true,
              message: "Date of Birth is required",
            },
          ]}
        >
          <DatePicker placeholder="" disabledDate={disabledDates} />
        </Form.Item>
        <div className="form-footer">
          <Form.Item>
            <Button onClick={() => handleCancel()}>Discard</Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default UserFrom;
