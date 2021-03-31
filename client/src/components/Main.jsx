import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Table, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

const Main = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState();

  const cache = useQueryClient();

  const handleAddUser = async () => {
    try {
      if (name && age) {
        await fetch("/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, age }),
        });
        cache.invalidateQueries("users");
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
      cache.invalidateQueries("users");
    }
  };

  const getUsers = async () => {
    try {
      const res = await fetch("/users");
      const data = await res.json();

      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const { data: users } = useQuery("users", getUsers);

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
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (tags) => (
        <>
          {tags?.map((tag) => {
            const { name } = tag;
            let color = name.length > 5 ? "geekblue" : "green";
            if (name === "LOSER") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={name}>
                {name.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <DeleteOutlined onClick={() => handleDelete(record.id)} />
      ),
    },
  ];
  return (
    <Row gutter={[16, 16]}>
      <h2>Adding Users with Random Tags</h2>
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
  );
};

export default Main;
