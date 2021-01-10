import Table from 'app/components/Table';
import Form from 'app/components/Form';
import { memo } from 'react';
import useTable from 'hooks/useTable';

export const MainTable = ({ dataSource }) => {
  const [form] = Form.useForm();
  const { data, search, onChange } = useTable({
    form,
    dataSource,
  });
  const colms = [
    {
      title: 'Room Name',
      dataIndex: 'roomName',
      width: '20%',
      ...search('roomName'),
    },
    {
      title: 'First Player',
      dataIndex: 'playerFirst',
      width: '20%',
      ...search('playerFirst'),
    },
    {
      title: 'Second Player',
      dataIndex: 'playerSecond',
      width: '20%',
      ...search('playerSecond'),
    },
    { title: 'Winner', dataIndex: 'winner', width: '20%' },
    { title: 'Completed Time', dataIndex: 'completeAt', width: '20%' },
  ];
  return (
    <Table
      dataSource={data}
      columns={colms}
      pagination={{ defaultPageSize: 10, position: ['topRight'] }}
      onChange={onChange}
    />
  );
};
export default memo(MainTable);
