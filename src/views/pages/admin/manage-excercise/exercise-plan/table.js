import { Fragment, useState, useContext, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useTranslation } from 'react-i18next'
import { Table, Space, Tooltip, Checkbox } from 'antd'
import { EditOutlined, EyeOutlined, SearchOutlined, DeleteOutlined } from "@ant-design/icons"
import {
  Card,
  Input,
  Button,
  Col,
  Row,
  InputGroup
} from 'reactstrap'
import { UserContext } from './useContext'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import api from '../../../../../api/index'
import { notificationError, notificationSuccess } from '../../../../../utility/notification'

const MySwal = withReactContent(Swal)

// ** Table Header
const CustomHeader = ({ handleAdd, handleFilter }) => {
  const { t } = useTranslation()
  //const isDefaultOptions = [
  //  { value: true, label: t('Active') },
  //  { value: false, label: t('Inactive') }
  //]
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
      <div className='d-flex justify-content-end mx-2'>
        <Button className='add-new-semester mx-50 my-25' color='primary' onClick={handleAdd}>
          {t('Thêm')}
        </Button>
      </div>
    </div >
  )
}

const Position = () => {
  const { t } = useTranslation()
  const {
    setDataItem,
    handleModal,
    // handleModalResetPassword,
    setTypeModal,
    windowSize,
    handleModalDetail,
    handleLoadTable,
    loadTable
  } = useContext(UserContext)
  const [showCheckbox, setShowCheckbox] = useState(false)
  const [selectedItems, setSelectedItems] = useState([])
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
    api.exercisePlanTrainerApi.getAllExercisePlanTrainerApi(currentPage)
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
  const handleToggleCheckbox = (record) => {
    // Toggle chọn/bỏ chọn một item
    const newSelectedItems = [...selectedItems]
    const index = newSelectedItems.findIndex(item => item.key === record.key)
    if (index !== -1) {
      newSelectedItems.splice(index, 1) // Bỏ chọn
    } else {
      newSelectedItems.push(record) // Chọn
    }
    setSelectedItems(newSelectedItems)
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

  const handleDelete = (item) => {
    console.log('item', item)
    MySwal.fire({
      title: t("Xác nhận"),
      text: t("Bạn có muốn xóa kế hoạch này không?"),
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: t("Xác nhận"),
      cancelButtonText: t("Hủy"),
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger ms-1"
      },
      buttonsStyling: false
    }).then(async (result) => {
      if (result.value) {
        api.exercisePlanTrainerApi.deleteExercisePlanTrainerByIdApi(item.exercisePlanId)
          .then(() => {
            handleLoadTable()
            notificationSuccess(t('Xóa kế hoạch thành công'))
            setSelectedItems([])
            setShowCheckbox(false)

          })
          .catch(() => {
            notificationError(t('Xóa kế hoạch thất bại'))
          })
        // handleDelete(contextMenuClick.rowInfo.rowData.id)
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
      }
    })
  }

  const handleEdit = (item) => {
    setDataItem(item)
    setTypeModal('Edit')
    handleModal()
  }

  const handleDetail = (item) => {
    setDataItem(item)
    handleModalDetail()
    setTypeModal('Detail')
  }

  const headerColumns = [
    {
      title: <div style={{ textAlign: 'left' }}>{'Tên'}</div>,
      dataIndex: 'name',
      key: 'name',
      width: 120,
      minWidth: 100,
      maxWidth: 130,
      align: 'left'
    },
    {
      title: <div style={{ textAlign: 'center' }}>{'Calories đốt cháy'}</div>,
      dataIndex: 'totalCaloriesBurned',
      key: 'totalCaloriesBurned',
      width: 120,
      minWidth: 100,
      maxWidth: 130,
      align: 'center'
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
          <Tooltip title={t(`View`)}>
            <EyeOutlined onClick={() => { handleDetail(record) }} />
          </Tooltip>
          <Tooltip title={t(`Edit`)}>
            <EditOutlined onClick={() => { handleEdit(record) }}></EditOutlined>
          </Tooltip>
          <Tooltip title={t(`Delete`)}>
            <DeleteOutlined onClick={() => { handleDelete(record) }}></DeleteOutlined>
          </Tooltip>
          {showCheckbox && (
            <Checkbox
              checked={selectedItems.some(item => item.key === record.key)}
              onChange={() => handleToggleCheckbox(record)}
            />
          )}
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
        <h2 style={{ fontWeight: '700' }} className='px-2 mt-2'>{t('Quản lý kế hoạch bài tập')}</h2>
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
