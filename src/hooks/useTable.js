import Form from 'app/components/Form';
import Input from 'app/components/Input';
import InputNumber from 'app/components/InputNumber';
import Space from 'app/components/Space';
import Button from 'app/components/Button';
import { SearchOutlined } from '@ant-design/icons';
import { useState, useRef, useCallback } from 'react';
import { message } from 'antd';
export const useTable = ({ dataSource }) => {
  const [search, setSearch] = useState({ searchText: '', searchedColumn: '' });
  const searchInput = useRef(null);
  const data = dataSource.map(value => ({ key: value?.id, ...value }));
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode =
      inputType === 'text' ? (
        <Input />
      ) : inputType === 'number' ? (
        <InputNumber />
      ) : (
        <Input />
      );
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      const a = record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '';
      return a;
    },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current.focus(), 100);
      }
    },
    render: text => (search.searchedColumn === dataIndex ? text : `${text}`),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearch({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearch(preState => ({ ...preState, searchText: '' }));
  };
  const onChange = useCallback((_, filters, _2, extra) => {
    for (const key in filters) {
      if (!!filters[key]) {
        return message.success(
          `You got ${extra.currentDataSource.length} record`,
        );
      }
    }
  }, []);
  return {
    EditableCell,
    data: data,
    search: getColumnSearchProps,
    onChange,
  };
};
export default useTable;
