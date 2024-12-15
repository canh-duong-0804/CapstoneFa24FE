import { Fragment, useState, useContext, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useTranslation } from 'react-i18next'
import { Table, Tag, Modal, Space, Tooltip, Checkbox } from 'antd'
import { EditOutlined, EyeOutlined, SearchOutlined, DeleteOutlined } from "@ant-design/icons"
import {
  Card,
  Input,
  Button,
  Badge,
  Col,
  Row,
  InputGroup
} from 'reactstrap'
import { UserContext } from './useContext'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import api from '../../../../api'

const MySwal = withReactContent(Swal)

// ** Table Header
const CustomHeader = ({handleFilter }) => {
  const { t } = useTranslation()
  const [searchText, setSearchTerm] = useState('')

  return (
    <div className='invoice-list-table-header w-100 me-1 ms-50 my-1 mb-75 d-flex justify-content-between flex-wrap px-1'>
      < div className='d-flex align-items-centerm mx-50'>
        <InputGroup className='my-25'>
          <Input
            id='search-invoice'
            style={{ minWidth: '200px' }}
            placeholder={t('Search')}
            type='search'
            value={searchText}
            onChange={e => {
              if (e.target.value) {
                setSearchTerm(e.target.value)
              } else {
                handleFilter('')
                setSearchTerm(e.target.value)
              }

            }}
          />
          <span style={{ cursor: 'pointer' }} onClick={() => { handleFilter(searchText) }} className='input-group-text '>
            <SearchOutlined></SearchOutlined>
          </span>
        </InputGroup>
        {/*<div className='d-flex align-items-center mx-50' style={{ minWidth: "220px", maxWidth: "220px" }}>
          <Select
            //theme={selectThemeColors}
            isClearable={true}
            className='my-25 react-select w-100'
            classNamePrefix='select'
            menuPosition="fixed"
            placeholder={t('Select status')}
            options={isDefaultOptions}
            value={currentStatus}
            onChange={data => {
              setcurrentStatus(data)
            }}
          />
        </div>*/}
      </div>
    </div >
  )
}

const Position = () => {
  const { t } = useTranslation()
  const {
    setDataItem,
    handleModal,
    setTypeModal,
    windowSize,
    loadTable
  } = useContext(UserContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  //const [rowsPerPage, setRowsPerPage] = useState(10)
  const [totalItems, setTotalItems] = useState(0)
  const [currentStatus, setcurrentStatus] = useState()
  const [loading, setLoading] = useState(false)
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1
    }
  })
  //const userData = getUserData()
  const handleTableChange = (pagination, filters, sorter) => {
    setCurrentPage(pagination.current)
    setRowsPerPage(pagination.pageSize)
    setTableParams({
      pagination,
      filters,
      ...sorter
    })

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([])
    }
  }
 
  const fetchData = () => {
    setLoading(true)
    api.adminChatApi.getAllChatForTrainerApi(currentPage)
      .then((rs) => {
        console.log('rs', rs)
        setData(rs.data)
        setTotalItems(rs.totalPages)
        setLoading(false)
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: rs.data.counta
          }
        })
      }).catch(() => {
        setLoading(false)
      })
  }
  useEffect(() => {
    fetchData()
  }, [JSON.stringify(tableParams), loadTable, searchTerm, currentStatus, currentPage])

  const handleAdd = () => {
    setDataItem({})
    setTypeModal('Add')
    handleModal()
  }

  const handlePagination = page => {
    setCurrentPage(page.selected + 1)
  }
  
  let tmi
  const handleFilter = val => {
    clearTimeout(tmi)
    tmi = setTimeout(() => {
      setSearchTerm(val)

    }, 500)
  }

  const CustomPagination = () => {

    const countPage = Number(Math.ceil(totalItems))
    return (
      <div className='d-flex align-items-center w-100 justify-content-between'>
        <div className='ps-2'>
        </div>
        <ReactPaginate
          previousLabel={''}
          nextLabel={''}
          pageCount={countPage || 1}
          activeClassName='active'
          forcePage={currentPage !== 0 ? currentPage - 1 : 0}
          onPageChange={page => handlePagination(page)}
          pageClassName={'page-item'}
          nextLinkClassName={'page-link'}
          nextClassName={'page-item next'}
          previousClassName={'page-item prev'}
          previousLinkClassName={'page-link'}
          pageLinkClassName={'page-link'}
          containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
        />
      </div >
    )
  }


  const handleEdit = (item) => {
    setDataItem(item)
    setTypeModal('Edit')
    handleModal()
  }

  // const formatDate = (date) => {
  //   const d = new Date(date)
  //   const day = String(d.getDate()).padStart(2, '0')
  //   const month = String(d.getMonth() + 1).padStart(2, '0') 
  //   const year = d.getFullYear()
  //   return `${day}-${month}-${year}`
  // }

  const headerColumns = [
    {
      title: <div style={{ textAlign: 'left' }}>{'ID người dùng'}</div>,
      dataIndex: 'memberId',
      key: 'memberId',
      width: 120,
      minWidth: 100,
      maxWidth: 130,
      align: 'left'
    },
    {
      title: <div style={{ textAlign: 'left' }}>{'Nội dung quan tâm'}</div>,
      dataIndex: 'contentStart',
      key: 'contentStart',
      width: 120,
      minWidth: 100,
      maxWidth: 130,
      align: 'left'
    },
    {
      title: <div style={{ textAlign: 'center' }}>{'Ngày tạo'}</div>,
      dataIndex: 'createAt',
      key: 'createAt',
      width: 150,
      minWidth: 50,
      maxWidth: 200,
      align: 'center',
      render: (text) => {
        const date = new Date(text)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}-${month}-${year}`
      }
    },
    {
      title: (
        <div>
          <Space size="middle">
            Action
          </Space>
        </div>),
      dataIndex: '',
      align: 'center',
      key: 'action',
      width: 100,
      minWidth: 50,
      maxWidth: 200,
      render: (_, record) => (
        < Space size="middle" >
          <Tooltip title={t(`Edit`)}>
            <EditOutlined onClick={() => { handleEdit(record) }}></EditOutlined>
          </Tooltip>
        </Space >
      )
    }
  ]
  const getRowClassName = (record, index) => {
    return index % 2 === 0 ? 'even-row' : 'odd-row'
  }
  return (
    <Fragment >
      <Card className='overflow-hidden'>
        <h2 style={{ fontWeight: '700' }} className='px-2 mt-2'>{t('Hỗ trợ người dùng')}</h2>
        <Row>
          <Col xl={12} lg={12} md={12}>
            <CustomHeader
              currentStatus={currentStatus}
              setcurrentStatus={setcurrentStatus}
              searchTerm={searchTerm}
              handleFilter={handleFilter}
              handleAdd={handleAdd}
            />
          </Col>
        </Row>
        <div className='react-dataTable mx-2'>
          <Table
            dataSource={data}
            bordered
            columns={headerColumns}
            pagination={false}
            onChange={handleTableChange}
            loading={loading}
            scroll={{
              x: 'max-content',
              y: windowSize.innerHeight - 280
            }}
            rowClassName={getRowClassName}
          ></Table>
          <CustomPagination />
        </div>
      </Card>
    </Fragment >
  )
}

export default Position
