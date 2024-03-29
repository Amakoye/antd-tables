import { Button, Divider, Table, Tag } from "antd";
import { useFetch } from "../hooks/useFetch";

const PostsTable = () => {
  const [data] = useFetch("https://dummyjson.com/posts");
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title) => (
        <h4
          style={{
            textAlign: "justify",
          }}
        >
          {title}
        </h4>
      ),
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
      render: (body) => (
        <div style={{ width: "500px", textAlign: "justify" }}>
          <p>{body}</p>
        </div>
      ),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags) => (
        <span>
          {tags.map((tag) => (
            <Tag>{tag}</Tag>
          ))}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <span>
          <Button type="primary">View</Button>
          <Divider type="vertical" />
          <Button type="danger">Delete</Button>
        </span>
      ),
    },
  ];
  console.log(data);
  return (
    <div
      style={{
        padding: "1.2em",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Table bordered columns={columns} dataSource={data} />
    </div>
  );
};

export default PostsTable;
