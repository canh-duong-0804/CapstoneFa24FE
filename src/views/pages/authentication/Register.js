import React, { useState } from 'react'
import { Button, Steps, Modal, theme, Radio, Space, Typography, Form, Select, InputNumber, DatePicker, Input } from 'antd'
import api from '../../../api/index'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'


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

const SecondContent = ({ userInfo, setUserInfo, errors, setValue, trigger }) => {
  const handleChange = async (name, value) => {
    setUserInfo(prev => ({ ...prev, [name]: value }))
    setValue(name, value)
    await trigger(name)
  }

  return (
    <div className="flex flex-col items-center">
      <Typography.Title level={4}>Thông tin cá nhân</Typography.Title>
      
      <Form layout="vertical" style={{ width: '100%', maxWidth: '400px' }}>
        <Form.Item 
          label="Giới tính" 
          required
          validateStatus={errors?.gender ? 'error' : ''}
          help={errors?.gender?.message}
        >
          <Select
            value={userInfo.gender}
            onChange={(value) => handleChange('gender', value)}
            placeholder="Chọn giới tính"
            options={[
              { value: 'male', label: 'Nam' },
              { value: 'female', label: 'Nữ' },
              { value: 'other', label: 'Khác' }
            ]}
            status={errors?.gender ? 'error' : ''}
          />
        </Form.Item>

        <Form.Item 
          label="Ngày sinh" 
          required
          validateStatus={errors?.dob ? 'error' : ''}
          help={errors?.dob?.message}
        >
          <DatePicker
            value={userInfo.dob}
            onChange={(date) => handleChange('dob', date)}
            style={{ width: '100%' }}
            placeholder="Chọn ngày sinh"
            format="DD/MM/YYYY"
            status={errors?.dob ? 'error' : ''}
          />
        </Form.Item>

        <Form.Item 
          label="Chiều cao (cm)" 
          required
          validateStatus={errors?.height ? 'error' : ''}
          help={errors?.height?.message}
        >
          <InputNumber
            value={userInfo.height}
            onChange={(value) => handleChange('height', value)}
            min={1}
            max={300}
            style={{ width: '100%' }}
            placeholder="Nhập chiều cao"
            status={errors?.height ? 'error' : ''}
          />
        </Form.Item>

        <Form.Item 
          label="Cân nặng (kg)" 
          required
          validateStatus={errors?.weight ? 'error' : ''}
          help={errors?.weight?.message}
        >
          <InputNumber
            value={userInfo.weight}
            onChange={(value) => handleChange('weight', value)}
            min={1}
            max={500}
            style={{ width: '100%' }}
            placeholder="Nhập cân nặng"
            status={errors?.weight ? 'error' : ''}
          />
        </Form.Item>

        <Form.Item 
          label="Cân nặng mong muốn (kg)" 
          required
          validateStatus={errors?.targetWeight ? 'error' : ''}
          help={errors?.targetWeight?.message}
        >
          <InputNumber
            value={userInfo.targetWeight}
            onChange={(value) => handleChange('targetWeight', value)}
            min={1}
            max={500}
            style={{ width: '100%' }}
            placeholder="Nhập cân nặng mong muốn"
            status={errors?.targetWeight ? 'error' : ''}
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

const FourthContent = ({ userInfo, setUserInfo, errors, setValue, trigger }) => {
  const handleChange = async (name, value) => {
    setUserInfo(prev => ({ ...prev, [name]: value }))
    setValue(name, value)
    await trigger(name)
  }

  return (
    <div className="flex flex-col items-center">
      <Typography.Title level={4}>Tài khoản</Typography.Title>
      
      <Form layout="vertical" style={{ width: '100%', maxWidth: '400px' }}>
        <Form.Item 
          label="Tên đăng nhập" 
          required
          validateStatus={errors?.userName ? 'error' : ''}
          help={errors?.userName?.message}
        >
          <Input 
            value={userInfo.userName}
            onChange={(e) => handleChange('userName', e.target.value)}
            placeholder="Nhập tên đăng nhập"
            status={errors?.userName ? 'error' : ''}
          />
        </Form.Item>

        <Form.Item 
          label="Email" 
          required
          validateStatus={errors?.email ? 'error' : ''}
          help={errors?.email?.message}
        >
          <Input 
            value={userInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Nhập email"
            status={errors?.email ? 'error' : ''}
          />
        </Form.Item>

        <Form.Item 
          label="Số điện thoại" 
          required
          validateStatus={errors?.phoneNumber ? 'error' : ''}
          help={errors?.phoneNumber?.message}
        >
          <Input 
            value={userInfo.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            placeholder="Nhập số điện thoại"
            status={errors?.phoneNumber ? 'error' : ''}
          />
        </Form.Item>

        <Form.Item 
          label="Mật khẩu" 
          required
          validateStatus={errors?.password ? 'error' : ''}
          help={errors?.password?.message}
        >
          <Input.Password 
            value={userInfo.password}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder="Nhập mật khẩu"
            status={errors?.password ? 'error' : ''}
          />
        </Form.Item>
      </Form>
    </div>
  )
}

// Thêm schema validation
const formSchema = yup.object().shape({
  userName: yup.string()
    .required('Vui lòng nhập tên đăng nhập')
    .min(3, 'Tên đăng nhập phải có ít nhất 3 ký tự'),
  
  email: yup.string()
    .required('Vui lòng nhập email')
    .email('Email không hợp lệ'),
  
  phoneNumber: yup.string()
    .required('Vui lòng nhập số điện thoại')
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, 'Số điện thoại không hợp lệ'),
  
  password: yup.string()
    .required('Vui lòng nhập mật khẩu')
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 số và 1 ký tự đặc biệt'
    ),
  
  height: yup.number()
    .required('Vui lòng nhập chiều cao')
    .min(50, 'Chiều cao không hợp lệ')
    .max(250, 'Chiều cao không hợp lệ'),
  
  weight: yup.number()
    .required('Vui lòng nhập cân nặng')
    .min(20, 'Cân nặng không hợp lệ')
    .max(300, 'Cân nặng không hợp lệ'),
  
  targetWeight: yup.number()
    .required('Vui lòng nhập cân nặng mục tiêu')
    .min(20, 'Cân nặng mục tiêu không hợp lệ')
    .max(300, 'Cân nặng mục tiêu không hợp lệ'),
  
  dob: yup.date()
    .required('Vui lòng chọn ngày sinh')
    .max(new Date(), 'Ngày sinh không hợp lệ'),
  
  gender: yup.string()
    .required('Vui lòng chọn giới tính')
})

const Register = () => {
  const { token } = theme.useToken()
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [activityLevel, setActivityLevel] = useState(null)
  const [diet, setDiet] = useState(null)
  const [goal, setGoal] = useState(null)
  const [userInfo, setUserInfo] = useState({
    gender: '',
    height: '',
    weight: '',
    targetWeight: '',
    dob: null
  })
  const [accountInfo, setAccountInfo] = useState({
    userName: undefined,
    email: undefined,
    phoneNumber: undefined,
    password: undefined
  })

  const {
    trigger,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(formSchema),
    mode: 'onChange'
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
      content: <SecondContent userInfo={userInfo} setUserInfo={setUserInfo} errors={errors} setValue={setValue} trigger={trigger} />
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
      content: (
        <FourthContent 
          userInfo={accountInfo} 
          setUserInfo={setAccountInfo} 
          errors={errors}
          setValue={setValue}
          trigger={trigger}
        />
      )
    }
  ]

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title
  }))

  // Validate từng bước
  const validateStep = async () => {
    let isValid = true
    
    switch (current) {
      case 0:
        if (!activityLevel) {
          toast.error('Vui lòng chọn mức độ hoạt động')
          isValid = false
        }
        break
        
      case 1:
        if (!diet) {
          toast.error('Vui lòng chọn chế độ ăn')
          isValid = false
        }
        break
        
      case 2:
        const fieldsToValidate = ['height', 'weight', 'targetWeight', 'dob', 'gender']
        const results = await Promise.all(fieldsToValidate.map(field => trigger(field)))
        isValid = results.every(result => result === true)
        break
        
      case 3:
        if (!goal) {
          toast.error('Vui lòng chọn mục tiêu')
          isValid = false
        }
        break
        
      case 4:
        isValid = await trigger(['userName', 'email', 'phoneNumber', 'password'])
        break
        
      default:
        break
    }
    
    return isValid
  }

  const next = async () => {
    const isValid = await validateStep()
    if (isValid) {
      setCurrent(current + 1)
    }
  }

  const onSubmit = async () => {
    try {
      setIsLoading(true)
      
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

      await api.authApi.registerApi(formData)
      toast.success('Đăng ký thành công!')
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Đăng ký thất bại, vui lòng thử lại')
    } finally {
      setIsLoading(false) 
    }
  }

  const prev = () => {
    setCurrent(current - 1)
  }

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
      onCancel={() => {
        if (window.confirm('Bạn có chắc muốn hủy đăng ký?')) {
          setVisible(false)
          navigate('/')
        }
      }}
      footer={null}
      width={700}
      style={{ padding: '16px' }}
    >
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next} loading={isLoading}>
            Tiếp
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={onSubmit} loading={isLoading}>
            Hoàn tất
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