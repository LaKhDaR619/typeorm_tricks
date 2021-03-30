import { DeleteOutlined } from "@ant-design/icons";
import { Table, Tag } from "antd";
import { useEffect, useState } from "react";

const SortedArray = () => {
  const [users, setUsers] = useState([]);

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
      const res = await fetch("/users/ordered-by-tag");
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
    <div className="section">
      <h2>Sorted User tags by COOL -TEACHER - DEVELOPER - LOSER </h2>
      <Table dataSource={users} columns={columns} pagination={false} />
    </div>
  );
};

export default SortedArray;
