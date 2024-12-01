import React, { useState } from 'react'
import { Button, message, Steps, Modal, theme, Radio, Space, Typography, Form, Select, InputNumber, DatePicker, Input } from 'antd'
import api from '../../../api/index'
import { useNavigate } from 'react-router-dom'


const FirstContent = ({ activityLevel, setActivityLevel }) => {
  const radioStyle = {
    display: 'block',
    padding: '15px 25px',
    borderRadius: '10px',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    fontSize: '16px',
    marginBottom: '12px',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  }

  const selectedStyle = {
    ...radioStyle,
    backgroundColor: '#e6f7ff',
    borderColor: '#1890ff'
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Typography.Title level={4}>
        Mức độ vận động của bạn thế nào?
      </Typography.Title>
      
      <Radio.Group className="mt-4" onChange={(e) => setActivityLevel(e.target.value)} value={activityLevel}>
        <Space direction="vertical" size="large">
          <Radio value="1" style={activityLevel === "1" ? selectedStyle : radioStyle}>
            Ít hoặc không hoạt động
          </Radio>
          <Radio value="2" style={activityLevel === "2" ? selectedStyle : radioStyle}>
            Hoạt động nhẹ nhàng
          </Radio>
          <Radio value="3" style={activityLevel === "3" ? selectedStyle : radioStyle}>
            Hoạt động rất nhiều
          </Radio>
        </Space>
      </Radio.Group>
    </div>
  )
}

const DietContent = ({ diet, setDiet }) => {
  const radioStyle = {
    display: 'block',
    padding: '15px 25px',
    borderRadius: '10px',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    fontSize: '16px',
    marginBottom: '12px',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  }

  const selectedStyle = {
    ...radioStyle,
    backgroundColor: '#e6f7ff',
    borderColor: '#1890ff'
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Typography.Title level={4}>
        Bạn có theo chế độ ăn đặc biệt nào không?
      </Typography.Title>
      
      <Radio.Group className="mt-4" onChange={(e) => setDiet(e.target.value)} value={diet}>
        <Space direction="vertical" size="large">
          <Radio value="1" style={diet === "1" ? selectedStyle : radioStyle}>
            Tôi sử dụng chế độ ăn thông thường
          </Radio>
          <Radio value="2" style={diet === "2" ? selectedStyle : radioStyle}>
            Low-crab
          </Radio>
          <Radio value="3" style={diet === "3" ? selectedStyle : radioStyle}>
            Ăn chay
          </Radio>
          <Radio value="4" style={diet === "4" ? selectedStyle : radioStyle}>
            Eat clean
          </Radio>
        </Space>
      </Radio.Group>
    </div>
  )
}

const SecondContent = ({ userInfo, setUserInfo }) => {
  const handleChange = (name, value) => {
    setUserInfo(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="flex flex-col items-center">
      <Typography.Title level={4}>Thông tin cá nhân</Typography.Title>
      
      <Form layout="vertical" style={{ width: '100%', maxWidth: '400px' }}>
        <Form.Item label="Giới tính" required>
          <Select
            value={userInfo?.gender}
            onChange={(value) => handleChange('gender', value)}
            placeholder="Chọn giới tính"
            options={[
              { value: 'male', label: 'Nam' },
              { value: 'female', label: 'Nữ' },
              { value: 'other', label: 'Khác' }
            ]}
          />
        </Form.Item>

        <Form.Item label="Ngày sinh" required>
          <DatePicker
            value={userInfo?.dob}
            onChange={(date) => handleChange('dob', date)}
            style={{ width: '100%' }}
            placeholder="Chọn ngày sinh"
            format="DD/MM/YYYY"
          />
        </Form.Item>

        <Form.Item label="Chiều cao (cm)" required>
          <InputNumber
            value={userInfo?.height}
            onChange={(value) => handleChange('height', value)}
            min={1}
            max={300}
            style={{ width: '100%' }}
            placeholder="Nhập chiều cao"
          />
        </Form.Item>

        <Form.Item label="Cân nặng (kg)" required>
          <InputNumber
            value={userInfo?.weight}
            onChange={(value) => handleChange('weight', value)}
            min={1}
            max={500}
            style={{ width: '100%' }}
            placeholder="Nhập cân nặng"
          />
        </Form.Item>

        <Form.Item label="Cân nặng mong muốn(kg)" required>
          <InputNumber
            value={userInfo?.targetWeight}
            onChange={(value) => handleChange('targetWeight', value)}
            min={1}
            max={500}
            style={{ width: '100%' }}
            placeholder="Nhập cân nặng mong muốn"
          />
        </Form.Item>

        
      </Form>
    </div>
  )
}

const ThirdContent = ({ weight, targetWeight, goal, setGoal }) => {
  const radioStyle = {
    display: 'block',
    padding: '15px 25px',
    borderRadius: '10px',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    fontSize: '16px',
    marginBottom: '12px',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  }

  const selectedStyle = {
    ...radioStyle,
    backgroundColor: '#e6f7ff',
    borderColor: '#1890ff'
  }

  const getProgressOptions = () => {
    if (weight === targetWeight) {
      return (
        <Typography.Text>Bạn đang muốn giữ nguyên cân</Typography.Text>
      )
    }

    const isLoseWeight = weight > targetWeight
    const prefix = isLoseWeight ? 'Giảm' : 'Tăng'
    const values = ['0.25', '0.5', '0.75', '1', '1.5']

    return (
      <div className="flex flex-col items-center gap-4">
        <Typography.Title level={5}>Tiến độ bạn mong muốn</Typography.Title>
        <Radio.Group className="mt-4" onChange={(e) => setGoal(e.target.value)} value={goal}>
          <Space direction="vertical" size="large">
            {values.map(value => (
              <Radio 
                key={value}
                value={value}
                style={goal === value ? selectedStyle : radioStyle}
              >
                {`${prefix} ${value}kg/tuần`}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {getProgressOptions()}
    </div>
  )
}

const FourthContent = ({ userInfo, setUserInfo }) => {
  const handleChange = (name, value) => {
    setUserInfo(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="flex flex-col items-center">
      <Typography.Title level={4}>Tài khoản</Typography.Title>
      
      <Form layout="vertical" style={{ width: '100%', maxWidth: '400px' }}>
        <Form.Item 
          label="Tên đăng nhập" 
          required
          rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
        >
          <Input 
            value={userInfo?.userName}
            onChange={(e) => handleChange('userName', e.target.value)}
            placeholder="Nhập tên đăng nhập"
          />
        </Form.Item>

        <Form.Item 
          label="Email" 
          required
          rules={[
            { required: true, message: 'Vui lòng nhập email' },
            { type: 'email', message: 'Email không hợp lệ' }
          ]}
        >
          <Input 
            value={userInfo?.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Nhập email"
          />
        </Form.Item>

        <Form.Item 
          label="Số điện thoại" 
          required
          rules={[
            { required: true, message: 'Vui lòng nhập số điện thoại' },
            { pattern: /^[0-9]+$/, message: 'Số điện thoại chỉ được chứa số' }
          ]}
        >
          <Input 
            value={userInfo?.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            placeholder="Nhập số điện thoại"
          />
        </Form.Item>

        <Form.Item 
          label="Mật khẩu" 
          required
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu' },
            { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
          ]}
        >
          <Input.Password 
            value={userInfo?.password}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder="Nhập mật khẩu"
          />
        </Form.Item>
      </Form>
    </div>
  )
}

const Register = () => {
  const { token } = theme.useToken()
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)
  const [activityLevel, setActivityLevel] = useState(null)
  const [diet, setDiet] = useState(null)
  const [goal, setGoal] = useState(null)
  const [userInfo, setUserInfo] = useState({
    gender: undefined,
    height: undefined,
    weight: undefined,
    targetWeight: undefined,
    dob: undefined
  })
  const [accountInfo, setAccountInfo] = useState({
    ...userInfo,
    name: undefined,
    email: undefined,
    phone: undefined,
    password: undefined
  })

  const steps = [
    {
      title: 'Mức độ',
      content: <FirstContent activityLevel={activityLevel} setActivityLevel={setActivityLevel} />
    },
    {
      title: 'Chế độ ăn',
      content: <DietContent diet={diet} setDiet={setDiet} />
    },
    {
      title: 'Thông số',
      content: <SecondContent userInfo={userInfo} setUserInfo={setUserInfo} />
    },
    {
      title: 'Tiến độ',
      content: (
        <ThirdContent 
          weight={userInfo.weight}
          targetWeight={userInfo.targetWeight}
          goal={goal}
          setGoal={setGoal}
        />
      )
    },
    {
      title: 'Tài khoản',
      content: <FourthContent userInfo={accountInfo} setUserInfo={setAccountInfo} />
    }
  ]

  const handleSubmit = () => {
    const formData = {
      userName: accountInfo.userName,
      email: accountInfo.email,
      password: accountInfo.password,
      dob: userInfo.dob?.toISOString(),
      gender: userInfo.gender === 'male',
      height: userInfo.height,
      weight: userInfo.weight,
      weightPerWeek: Number(goal),
      targetWeight: userInfo.targetWeight,
      dietId: Number(diet),
      exerciseLevel: Number(activityLevel),
      phoneNumber: accountInfo.phoneNumber
    }

    api.authApi.registerApi(formData)
        .then(() => {
          message.success('Đăng ký thành công!')
          navigate('/login')
        })
        .catch(err => console.log(err))
        navigate('/login')
    
  }

  const next = () => {
    setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title
  }))

  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    padding: '16px'
  }

  return (
    <Modal
      title="Đăng ký"
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={null}
      width={700}
      style={{ padding: '16px' }}
    >
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Tiếp
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={handleSubmit}>
            Xong
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Trước
          </Button>
        )}
      </div>
    </Modal>
  )
}

export default Register