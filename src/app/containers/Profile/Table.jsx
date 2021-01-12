import Table from 'app/components/Table';
import Form from 'app/components/Form';
import { memo } from 'react';
import useTable from 'hooks/useTable';
import { Link } from 'react-router-dom';

export const MainTable = ({ dataSource }) => {
  const [form] = Form.useForm();
  const { data, search, onChange } = useTable({
    form,
    dataSource,
  });
  const colms = [
    {
      title: 'Room Name',
      dataIndex: '_roomName',
      width: '16.6%',
      ...search('roomName'),
    },
    {
      title: 'First Player',
      dataIndex: '_playerFirst',
      width: '16.6%',
      ...search('playerFirst'),
    },
    {
      title: 'Second Player',
      dataIndex: '_playerSecond',
      width: '16.6%',
      ...search('playerSecond'),
    },
    { title: 'Winner', dataIndex: '_winner', width: '16.6%' },
    { title: 'Completed Time', dataIndex: '_completeAt', width: '16.6%' },
    {
      title: 'Actions',
      width: '16.6%',
      render: (_, item) => <Link to={`/history/${item.id}`}>View History</Link>,
    },
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
