import Table from 'app/components/Table';
import Button from 'app/components/Button';
import Form from 'app/components/Form';
import { memo } from 'react';
import useTable from 'hooks/useTable';
import Status from 'app/components/Status';
import { STATUS } from 'utils/constants';
import Popconfirm from 'app/components/Popconfirm';
import { actions } from './slice';
import useActions from 'hooks/useActions';

export const MainTable = ({ dataSource, handleBlock }) => {
  const [form] = Form.useForm();
  const { openModal } = useActions({ openModal: actions.openModal }, [actions]);
  const { EditableCell, data, search, onChange } = useTable({
    form,
    dataSource,
  });
  const colms = [
    { title: 'Name', dataIndex: 'name', width: '25%', ...search('name') },
    { title: 'Email', dataIndex: 'email', width: '30%', ...search('email') },
    { title: 'Point', dataIndex: 'point', width: '15%' },
    {
      title: 'Activated',
      dataIndex: 'isActivated',
      width: '15%',
      render: (_, record) => {
        return (
          <Status
            type={!!record?.isActivated ? STATUS.SUCCESS : STATUS.PENDING}
          />
        );
      },
    },
    {
      title: 'Blocked',
      width: '10%',
      dataIndex: 'isBlocked',
      render: (_, record) => {
        return (
          <Popconfirm
            title={`Do you want to ${
              !!record?.isBlocked ? 'Unblock' : 'Block'
            } this user`}
            onConfirm={() =>
              handleBlock({ ...record, type: record?.isBlocked })
            }
          >
            <Button size="small" type="danger">
              {record?.isBlocked ? 'Unblock' : 'Block'}
            </Button>
          </Popconfirm>
        );
      },
    },
    {
      title: 'Action',
      render: (_, record) => (
        <Button size="small" type="primary" onClick={() => openModal(record)}>
          View Detail
        </Button>
      ),
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
