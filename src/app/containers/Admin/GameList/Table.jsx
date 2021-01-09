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

export const MainTable = ({ dataSource }) => {
  const [form] = Form.useForm();
  const { EditableCell, data, onChange } = useTable({
    form,
    dataSource,
  });
  const colms = [];
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
