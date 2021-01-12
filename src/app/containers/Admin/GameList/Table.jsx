import Table from 'app/components/Table';
import Button from 'app/components/Button';
import Form from 'app/components/Form';
import { memo } from 'react';
import useTable from 'hooks/useTable';
import { Link } from 'react-router-dom';

export const MainTable = ({ dataSource }) => {
  const [form] = Form.useForm();
  const { EditableCell, data, onChange } = useTable({
    form,
    dataSource,
  });
  const colms = [
    { title: 'First Player', dataIndex: 'firstUserName', width: '20%' },
    { title: 'Second Player', dataIndex: 'secondUserName', width: '20%' },
    { title: 'Winner', dataIndex: 'winner', width: '20%' },
    { title: 'Time', dataIndex: 'updatedAt', width: '20%' },
    { title: 'Room name', dataIndex: 'roomName', width: '10%' },
    {
      title: 'Action',
      render: (_, item) => {
        return (
          <Button size="small" type="primary">
            <Link to={`/history/${item.id.game}`}>View History</Link>
          </Button>
        );
      },
    },
  ];
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        dataSource={data}
        columns={colms}
        size="small"
        pagination={{ pageSize: 11, position: ['topRight'] }}
        bordered
        onChange={onChange}
      />
    </Form>
  );
};
export default memo(MainTable);
