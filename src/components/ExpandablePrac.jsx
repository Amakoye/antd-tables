import { Table, Tag } from "antd";
import { useFetch } from "../hooks/useFetch";
const ExpandablePrac = () => {
  const [data] = useFetch("https://dummyjson.com/products", "products");

  const brandFilters = data
    .map((item) => {
      return { text: item.brand, value: item.brand };
    })
    .reduce((accumulator, current) => {
      if (!accumulator.find((item) => item.text === current.text)) {
        accumulator.push(current);
      }
      return accumulator;
    }, []); // use a reducer function to remove duplicates

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title) => <h4>{title}</h4>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <h4>{price}</h4>,
      sorter: (a, b) => a.price.length - b.price.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Discount",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
    },
    {
      title: "Available Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      filters: [...brandFilters],
      filterMultiple: false,
      onFilter: (value, record) => record.brand.indexOf(value) === 0,
      render: (brand) => (
        <span>
          <Tag color="cyan">{brand}</Tag>
        </span>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => (
        <span>
          <Tag color="magenta">{category}</Tag>
        </span>
      ),
    },
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
      render: (images) => (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1em",
          }}
        >
          {images.map((image) => (
            <Tag
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid transparent",
                borderRadius: "1em",
              }}
            >
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "1em",
                }}
                src={`${image}`}
                alt={`${image}`}
              />
            </Tag>
          ))}
        </div>
      ),
    },
  ];

  console.log(brandFilters);

  return (
    <div
      style={{
        padding: "1.2em",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Table
        expandedRowRender={(record) => <p>{record.description}</p>}
        bordered
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default ExpandablePrac;
