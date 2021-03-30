import "./App.css";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import { Button, Col, Input, Row, Table, Tag, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

function App() {
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState();

  const handleAddUser = async () => {
    try {
      if (name && age) {
        await fetch("/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, age }),
        });
        getUsers();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (id) {
      await fetch(`/users/${id}`, {
        method: "DELETE",
      });
      getUsers();
    }
  };

  const getUsers = async () => {
    try {
      const res = await fetch("/users");
      const data = await res.json();

      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

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
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <DeleteOutlined onClick={() => handleDelete(record.id)} />
      ),
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (tags) => (
        <>
          {tags?.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

  return (
    <div className="App">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Typography style={{ width: 100 }}>Name: </Typography>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Col>
        <Col span={24}>
          <Typography>Age: </Typography>
          <Input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type="number"
          />
        </Col>
        <Col span={24}>
          <Button style={{ width: "100%" }} onClick={handleAddUser}>
            Add User
          </Button>
        </Col>
        <Col span={24}>
          <Table dataSource={users} columns={columns} pagination={false} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
