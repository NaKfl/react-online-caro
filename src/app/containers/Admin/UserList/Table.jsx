import Table from 'app/components/Table';
import Space from 'app/components/Space';
import Button from 'app/components/Button';
import { memo } from 'react';
const configTable = () => {
  const colms = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Point', dataIndex: 'point' },
    { title: 'Is Active', dataIndex: 'isActived' },
    { title: 'Is Block', dataIndex: 'isBlock' },
    {
      title: 'Action',
      width: '10%',
      render: () => (
        <Space>
          <Button size="small">Edit</Button>
          <Button size="small" type="danger">
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      email: `Baodeptrai${i}@gmail.com`,
      point: `${i}`,
      isActived: true,
      isBlock: false,
    });
  }
  return { columns: colms, data };
};

export const MainTable = () => {
  const { columns, data } = configTable();
  return (
    <Table
      columns={columns}
      dataSource={data}
      size="small"
      pagination={{ pageSize: 11, position: ['topRight'] }}
      bordered
    ></Table>
  );
};
export default memo(MainTable);
