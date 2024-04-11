import { TableProps } from "antd";
import Table from "antd/es/table";
import * as React from "react";

const UserListTable: React.FC<TableProps<any>> = ({
  columns,
  dataSource,
  rowClassName,
  pagination,
  className,
  loading,
  ...restTableProp
}) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowClassName={rowClassName}
      pagination={{ ...pagination }}
      className={className}
      loading={loading}
      size={"middle"}
      {...restTableProp}
    />
  );
};

export default UserListTable;
