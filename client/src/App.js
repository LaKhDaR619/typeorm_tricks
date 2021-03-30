import "./App.css";
import "antd/dist/antd.css";
import { Button, Col, Input, Row, Table, Typography } from "antd";
import { useState } from "react";

function App() {
  const [users, setUsers] = useState([{ name: "test", age: 2 }]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
  ];

  return (
    <div className="App">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Typography style={{ width: 100 }}>Name: </Typography>
          <Input />
        </Col>
        <Col span={24}>
          <Typography>Age: </Typography>
          <Input type="number" />
        </Col>
        <Col span={24}>
          <Button style={{ width: "100%" }}>Add User</Button>
        </Col>
        <Col span={24}>
          <Table dataSource={users} columns={columns} pagination={false} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
