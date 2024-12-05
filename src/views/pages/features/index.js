import { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, Card, CardBody, Navbar, NavbarBrand } from 'reactstrap'
import '@src/assets/scss/pages/features.scss'
import Logo from '@src/assets/images/logo/logo.png'

const Features = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    {
      icon: 'fa-heart',
      title: 'Theo dõi sức khỏe',
      description: 'Ghi chép và theo dõi các chỉ số sức khỏe quan trọng như nhịp tim, huyết áp, chỉ số BMI',
      color: '#ea5455'
    },
    {
      icon: 'fa-utensils',
      title: 'Quản lý dinh dưỡng',
      description: 'Lập kế hoạch bữa ăn, tính toán calo và theo dõi chế độ dinh dưỡng hàng ngày',
      color: '#28c76f'
    },
    {
      icon: 'fa-dumbbell',
      title: 'Lịch tập luyện',
      description: 'Tạo và theo dõi lịch tập với hơn 1000+ bài tập được hướng dẫn chi tiết bởi chuyên gia',
      color: '#ff9f43'
    },
    {
      icon: 'fa-brain',
      title: 'AI Tư vấn',
      description: 'Nhận tư vấn sức khỏe được cá nhân hóa từ AI dựa trên dữ liệu sức khỏe của bạn',
      color: '#7367f0'
    }
  ]

  return (
    <Fragment>
      <div className='features-wrapper'>
        {/* Fixed Navbar */}
        <Navbar className={`landing-navbar ${isScrolled ? 'scrolled' : ''}`} fixed='top' expand='md'>
          <div className='container'>
            <NavbarBrand href='/' className='navbar-brand'>
              <img 
                src={Logo}
                alt='logo'
                className='brand-logo'
                style={{ height: '45px', width: 'auto' }}
              />
              <h2 className='brand-text mb-0'>Health Tracking</h2>
            </NavbarBrand>
            <div className='auth-buttons'>
              <Link to='/login'>
                <Button color='white'>
                  Đăng nhập
                </Button>
              </Link>
              <Link to='/register'>
                <Button outline color='white'>
                  Đăng ký
                </Button>
              </Link>
            </div>
          </div>
        </Navbar>

        {/* Hero Section */}
        <section className='features-hero'>
          <div className='container'>
            <Row className='align-items-center'>
              <Col lg='6'>
                <h1 className='display-4 fw-bold mb-4'>Chăm sóc sức khỏe thông minh</h1>
                <p className='lead mb-4'>
                  Ứng dụng theo dõi sức khỏe toàn diện với công nghệ AI, giúp bạn đạt được mục tiêu sức khỏe một cách khoa học và hiệu quả
                </p>
                <Link to='/register'>
                  <Button color='white' size='lg' className='me-3'>
                    Dùng thử miễn phí
                  </Button>
                </Link>
              </Col>
              <Col lg='6' className='text-center'>
                <img 
                  src={require('@src/assets/images/features/phone2.png').default}
                  alt='Features'
                  className='img-fluid'
                />
              </Col>
            </Row>
          </div>
        </section>

        {/* Main Features Grid */}
        <section className='features-grid py-5'>
          <div className='container'>
            <div className='text-center mb-5'>
              <h2 className='display-5 fw-bold'>Tính năng nổi bật</h2>
              <p className='lead'>Trải nghiệm các công cụ theo dõi sức khỏe hiện đại</p>
            </div>
            <Row>
              {features.map((feature, index) => (
                <Col lg='6' className='mb-4' key={index}>
                  <Card className='feature-card h-100 border-0 shadow-sm'>
                    <CardBody className='p-4'>
                      <div className='d-flex align-items-center mb-4'>
                        <div 
                          className='feature-icon me-3'
                          style={{ backgroundColor: `${feature.color}15` }}
                        >
                          <i 
                            className={`fas ${feature.icon}`}
                            style={{ color: feature.color }}
                          ></i>
                        </div>
                        <h3 className='mb-0'>{feature.title}</h3>
                      </div>
                      <p className='mb-4'>{feature.description}</p>
                      <div className='feature-details'>
                        <div className='mb-3 d-flex align-items-center'>
                          <i className='fas fa-check-circle me-2' style={{color: feature.color}}></i>
                          <span>Cập nhật theo thời gian thực</span>
                        </div>
                        <div className='mb-3 d-flex align-items-center'>
                          <i className='fas fa-check-circle me-2' style={{color: feature.color}}></i>
                          <span>Báo cáo chi tiết</span>
                        </div>
                        <div className='d-flex align-items-center'>
                          <i className='fas fa-check-circle me-2' style={{color: feature.color}}></i>
                          <span>Tư vấn chuyên sâu</span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </section>

        {/* App Integration Section */}
        <section className='app-integration py-5 bg-light'>
          <div className='container'>
            <Row className='align-items-center'>
              <Col lg='6'>
                <img 
                  src={require('@src/assets/images/features/hero.png').default}
                  alt='Cross Platform'
                  className='img-fluid'
                />
              </Col>
              <Col lg='6'>
                <h2 className='display-6 fw-bold mb-4'>Đồng bộ mọi nền tảng</h2>
                <p className='lead mb-4'>
                  Truy cập và theo dõi sức khỏe của bạn mọi lúc, mọi nơi trên tất cả các thiết bị
                </p>
                <Row className='g-4'>
                  <Col sm='6'>
                    <div className='d-flex align-items-center'>
                      <i className='fas fa-mobile-alt fa-2x me-3' style={{color: '#28c76f'}}></i>
                      <div>
                        <h5 className='mb-1'>Mobile App</h5>
                        <p className='mb-0'>Android</p>
                      </div>
                    </div>
                  </Col>
                  <Col sm='6'>
                    <div className='d-flex align-items-center'>
                      <i className='fas fa-laptop fa-2x me-3' style={{color: '#7367f0'}}></i>
                      <div>
                        <h5 className='mb-1'>Web App</h5>
                        <p className='mb-0'>Mọi trình duyệt</p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </section>

        {/* CTA Section */}
        <section className='features-cta text-center py-5'>
          <div className='container'>
            <h2 className='display-6 fw-bold mb-4'>Bắt đầu hành trình sức khỏe của bạn</h2>
            <p className='lead mb-4'>
              Đăng ký ngay hôm nay và nhận 30 ngày dùng thử miễn phí cùng tư vấn sức khỏe từ chuyên gia
            </p>
            <Link to='/register'>
              <Button color='white' size='lg' className='me-3'>
                Dùng thử miễn phí
              </Button>
            </Link>
            <Button outline color='white' size='lg'>
              Tìm hiểu thêm
            </Button>
          </div>
        </section>
      </div>
    </Fragment>
  )
}

export default Features 