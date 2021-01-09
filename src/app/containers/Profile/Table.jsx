import Table from 'app/components/Table';
import Form from 'app/components/Form';
import { memo } from 'react';
import useTable from 'hooks/useTable';

export const MainTable = ({ dataSource }) => {
  const [form] = Form.useForm();
  const { EditableCell, data, search, onChange } = useTable({
    form,
    dataSource,
  });
  const colms = [
    { title: 'Room ID', dataIndex: 'name', width: '25%', ...search('name') },
    { title: 'Room Name', dataIndex: 'name', width: '25%', ...search('name') },
    {
      title: 'First Player',
      dataIndex: 'firstPlayer',
      ...search('email'),
    },
    { title: 'Second Player', dataIndex: 'secondPlayer' },
    { title: 'Winner', dataIndex: 'userWin' },
    { title: 'Completed Time', dataIndex: 'completedAt' },
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
