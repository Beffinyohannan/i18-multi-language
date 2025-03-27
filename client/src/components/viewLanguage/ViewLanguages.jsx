import { Alert, Button, Col, Input, Modal, Row, Space, Table, Tooltip, Typography } from 'antd';
import Highlighter from 'react-highlight-words';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { CgBlock, CgUnblock } from 'react-icons/cg';
import { MdDelete } from 'react-icons/md';
import { ExclamationCircleFilled, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { deactiveLanguages, deleteLanguages, getLanguages } from '../../api/ApiRequests';
// import { deactiveLanguages, deleteLanguages, getLanguages } from '../../../api/AdminRequest';

const { Title } = Typography;
const { confirm } = Modal;

function ViewLanguages() {

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const [language, setLanguage] = useState('')
  const [loader, setLoader] = useState(true)
  const [change, setChange] = useState('')

  const navigate = useNavigate();


  useEffect(() => {
    const allLanguages = async () => {
      try {
        const { data } = await getLanguages()
        // console.log(data, '12355');
        setLanguage(data.languages)
        setLoader(false)
      } catch (error) {
        // console.log(error.message);
      }
    }
    allLanguages()
  }, [change])

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            className='bg-blue-800'
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          {/* <Button
                    type="link"
                    size="small"
                    onClick={() => {
                        confirm({
                            closeDropdown: false,
                        });
                        setSearchText(selectedKeys[0]);
                        setSearchedColumn(dataIndex);
                    }}
                >
                    Filter
                </Button> */}
          <Button
            type="link"
            size="small"
            onClick={() => {
              clearFilters && handleReset(clearFilters)
              handleSearch(selectedKeys, confirm)
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'No.',
      dataIndex: '_id',
      key: 'index',
      // render: (text, record, index) => index + 1,
      render: (text, record, index) => (language.indexOf(record) + 1),
    },
    {
      title: 'Language',
      dataIndex: 'language',
      key: 'language',
      ...getColumnSearchProps('language'),
    },
    {
      title: 'Language Code',
      dataIndex: 'languageCode',
      key: 'languageCode',
      ...getColumnSearchProps('languageCode'),
    },

    {
      title: 'Flag Code',
      dataIndex: 'flagCode',
      key: 'flagCode',
      ...getColumnSearchProps('flagCode'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      // width: '10%',
      // ...getColumnSearchProps('status'),
      render: (status) => { return status === 'active' ? <p className=' text-center'>Active</p> : <p className='bg-red-500  px-1 text-white text-center rounded-xl'>Blocked</p> },
    },
    {
      title: 'Action',
      dataIndex: 'status._id',
      key: '_id',
      render: (status, _id) => {
        return (
          <>
            <div className='flex gap-3 items-center'>
              {/* <Tooltip title="view"><FaEye size={20} className='cursor-pointer' onClick={() => showDrawer(_id)} /></Tooltip> */}
              <Tooltip title="edit"><FaEdit size={20} className='cursor-pointer' onClick={() => handleEdit(_id)} /></Tooltip>
              {_id.status === 'active' ?
                <Tooltip title="block"><CgBlock size={28} className='cursor-pointer' onClick={() => showDeactiveConfirm(_id)} /></Tooltip>
                :
                <Tooltip title="unblock"> <CgUnblock size={20} className='cursor-pointer' onClick={() => showDeactiveConfirm(_id)} /></Tooltip>
              }
              <Tooltip title="delete"><MdDelete size={20} className='cursor-pointer' onClick={() => showDeleteConfirm(_id)} /></Tooltip>
            </div>
          </>
        )
      }

    },

  ];

  const handleEdit = (id) => {
    navigate("/edit-language", { state: id });

  }
  // console.log(edit,'view pg');
  const handleDeactive = async (id) => {

    try {
      setLoader(true)
      const { data } = await deactiveLanguages(id);
      // console.log(data);
      if (data.block || data.active) {
        // console.log("sucess blocked");
        // setCardStatus("blocked")
        setLoader(false)
      }
      // if (data.active) {
      //   // setCardStatus("active")
      //   setLoader(false)
      // }
      setChange(Date.now())
    } catch (error) {
      console.log(error);
      toast(error?.response?.data?.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoader(true)
      const { data } = await deleteLanguages(id);
      // console.log(data);
      if (data.delete) {
        // console.log("sucess delete");
        setChange(Date.now())
        setLoader(false)
      }
    } catch (error) {
      console.log(error);
    }
  };
  const showDeactiveConfirm = (data) => {
    confirm({

      title: `${data?.status === 'active' ? 'Are you sure to Block ' : 'Are you sure to Active'}`,
      icon: <ExclamationCircleFilled />,
      content: `${data?.status === 'active' ? 'if you block, the product cannot view any more ' : 'if you activate, all can view the product.'}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDeactive(data._id);
        // { cardStatus === "active" ? setCardStatus("deactive") : setCardStatus("active") }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }
  const showDeleteConfirm = (data) => {
    confirm({
      title: "Are you sure delete?",
      icon: <ExclamationCircleFilled />,
      // content: `${admin ? 'if you delete the card the user also get deleted.' : ' }` ,
      content: `if you delete, the product will deleted`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(data._id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }
  const message = "If you want to add new translations, you can add through English language only, An add new transition button is in there in English language edit part."

  return (
    <div className='min-h-screen'>
      <Row gutter={16}>
        <Col span={12}>
         
            <Title level={2}> <Link to={'/'}>Home/</Link>Languages </Title>
        </Col>

        <Col span={12} className='text-right'>
          <Link to={'/create-language'} className='add-button bg-sky-500 p-2 rounded-lg ml-auto'  ><PlusOutlined />Add Language</Link>
        </Col>
      </Row>
      {/* <p className='mt-5'>If you want to add new translations, you can add through English language only, An add new transition button is in there in English language edit part.</p> */}
      <Alert className='mt-5  text-black  h-10 ' message={message} type="success" closable />
      <div className='flex justify-center'>
        <div className='w-full mt-4'>
          <Table columns={columns} loading={loader} dataSource={language} pagination={language.length > 10 ? true : false} />


        </div>
      </div>
    </div>
  )
}

export default ViewLanguages