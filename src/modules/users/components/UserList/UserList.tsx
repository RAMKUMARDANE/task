import * as React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Modal } from "antd";
import UserListTable from "../UserListTable";
import { ColumnsType } from "antd/es/table";
import { TYPE_OF_USER } from "../../modal/types/user.types";
import UserFrom from "../UserFrom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store/store";
import { add, edit, delete_user } from "../../../../store/userSlice";
import dayjs from "dayjs";

const UserList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<
    TYPE_OF_USER | undefined
  >();

  const userList = useSelector((state: RootState) => state.user.userList);
  const dispatch = useDispatch();
  const [filtredUsers, setFiltredUsers] = React.useState(userList);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleEditBtn = (user: TYPE_OF_USER) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  const handleDeleteBtn = (user: TYPE_OF_USER) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure to delete this user",
      onOk: () => {
        dispatch(delete_user(user));
      },
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      ),
    });
  };

  const handleOk = (user: TYPE_OF_USER) => {
    if (selectedUser && selectedUser.key) {
      dispatch(
        edit({
          ...user,
          key: selectedUser.key,
        })
      );
    } else {
      let max_key =
        userList.length > 0
          ? Math.max(...userList.map((o) => o.key as number))
          : 0;
      dispatch(
        add({
          ...user,
          key: max_key + 1,
          user_created: dayjs().toString(),
        })
      );
    }
    setIsModalOpen(false);
    setSelectedUser(undefined);
  };

  const handleCancel = () => {
    setSelectedUser(undefined);
    setIsModalOpen(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 3) {
      if (filtredUsers.length === 0) {
        setFiltredUsers(userList);
      }
      e.preventDefault();
      return false;
    }
    setFiltredUsers(
      userList.filter(
        (user) =>
          user.user_name.search(e.target.value) !== -1 ||
          user.user_email.search(e.target.value) !== -1
      )
    );
  };

  React.useEffect(() => {
    setFiltredUsers(userList);
  }, [userList]);

  const userTableColumns: ColumnsType<TYPE_OF_USER> = [
    {
      key: "user_name",
      title: "Name",
      dataIndex: "user_name",
      sorter: (a: TYPE_OF_USER, b: TYPE_OF_USER) =>
        a.user_name.localeCompare(b.user_name),
      render: (_, record) => {
        return <div>{record.user_name}</div>;
      },
    },
    {
      key: "user_email",
      title: "Email",
      dataIndex: "user_email",
      sorter: (a: TYPE_OF_USER, b: TYPE_OF_USER) =>
        a.user_email.localeCompare(b.user_email),
      render: (_, record) => {
        return <div>{record.user_email}</div>;
      },
    },
    {
      key: "user_mobile",
      title: "Mobile",
      dataIndex: "user_mobile",
      render: (_, record) => {
        return <div>{record.user_mobile}</div>;
      },
    },
    {
      key: "user_dob",
      title: "Date Of Birth",
      dataIndex: "user_dob",
      sorter: (a: TYPE_OF_USER, b: TYPE_OF_USER) =>
        a.user_email.localeCompare(b.user_email),
      render: (_, record) => {
        return <div>{dayjs(record.user_dob).format("DD/MM/YYYY")}</div>;
      },
    },
    {
      key: "actions",
      title: "Action",
      dataIndex: "key",
      align: "center",
      render: (_, record) => {
        return (
          <>
            <Button type="primary" onClick={() => handleEditBtn(record)}>
              <span className="underline">Edit</span>
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => handleDeleteBtn(record)}
            >
              <span className="underline">Delete</span>
            </Button>
          </>
        );
      },
    },
  ];
  return (
    <div>
      <div className="header">
        <div>
          <Input
            placeholder="Search by name"
            prefix={<SearchOutlined />}
            style={{ width: 220 }}
            onChange={handleSearch}
          />
        </div>
        <div>
          <Button type="primary" onClick={showModal}>
            Add New User
          </Button>
        </div>
      </div>
      <div className="list-container">
        <UserListTable
          columns={userTableColumns}
          dataSource={filtredUsers}
          pagination={{ position: ["none", "none"] }}
          loading={false}
        />
      </div>
      {isModalOpen ? (
        <Modal title="Add or edit" open={isModalOpen} footer={null}>
          <UserFrom
            selectedUser={selectedUser}
            handleSave={handleOk}
            handleCancel={handleCancel}
          />
        </Modal>
      ) : null}
    </div>
  );
};

export default UserList;
