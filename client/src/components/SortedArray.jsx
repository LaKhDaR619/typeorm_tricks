import { DeleteOutlined } from "@ant-design/icons";
import { Table, Tag } from "antd";
import { useQuery, useQueryClient } from "react-query";

const SortedArray = () => {
  const cache = useQueryClient();

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
      const res = await fetch("/users/ordered-by-tag");
      const data = await res.json();

      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const { data: users } = useQuery(["users", "array"], getUsers);

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
      <h2>Sorted User tags by COOL -TEACHER - NICE - DEVELOPER - LOSER </h2>
      <Table dataSource={users} columns={columns} pagination={false} />
    </div>
  );
};

export default SortedArray;
