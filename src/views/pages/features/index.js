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

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    }

    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          // Ngừng theo dõi sau khi đã hiển thị
          observer.unobserve(entry.target)
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersect, observerOptions)

    // Quan sát tất cả các elements có class animation
    document.querySelectorAll('.fade-up, .fade-right, .fade-left, .fade-down').forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const features = [
    {
      icon: 'fa-heart',
      title: 'Theo dõi sức khỏe',
      description: 'Ghi chép và theo dõi các chỉ số sức khỏe quan trọng như nhịp tim, huyết áp, chỉ số BMI',
      color: '#ea5455',
      image: require('@src/assets/images/features/phone2.png').default
    },
    {
      icon: 'fa-utensils',
      title: 'Quản lý dinh dưỡng',
      description: 'Lập kế hoạch bữa ăn, tính toán calo và theo dõi chế độ dinh dưỡng hàng ngày',
      color: '#28c76f',
      image: require('@src/assets/images/features/phone2.png').default
    },
    {
      icon: 'fa-dumbbell',
      title: 'Lịch tập luyện',
      description: 'Tạo và theo dõi lịch tập với hơn 1000+ bài tập được hướng dẫn chi tiết bởi chuyên gia',
      color: '#ff9f43',
      image: require('@src/assets/images/features/phone2.png').default
    },
    {
      icon: 'fa-brain',
      title: 'AI Tư vấn',
      description: 'Nhận tư vấn sức khỏe được cá nhân hóa từ AI dựa trên dữ liệu sức khỏe của bạn',
      color: '#7367f0',
      image: require('@src/assets/images/features/phone2.png').default
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
                <h1 className='display-4 fw-bold mb-4 fade-left'>Chăm sóc sức khỏe thông minh</h1>
                <p className='lead mb-4 fade-left delay-1'>
                  Ứng dụng theo dõi sức khỏe toàn diện với công nghệ AI, giúp bạn đạt được mục tiêu sức khỏe một cách khoa học và hiệu quả
                </p>
                <div className='hero-cta fade-left delay-2'>
                  <Link to='/register'>
                    <Button 
                      color='primary'
                      size='lg'
                      className='me-3 btn-try-free'
                    >
                      Dùng thử miễn phí
                    </Button>
                  </Link>
                  <div className='mt-3'>
                    <p className='text-white mb-2'>Hoặc tải ngay:</p>
                    <div className='store-badges'>
                    <a 
                    href="https://play.google.com/store/apps/details?id=com.fpt.edu.healthtracking"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <img 
                      src={require('@src/assets/images/landing/google-play.png').default} 
                      alt='Google Play'
                      style={{
                        height: '52px',
                        width: 'auto',
                        objectFit: 'contain'
                      }}
                    />
                  </a>
                  <a 
                    href="https://appdistribution.firebase.dev/i/2a29d68c3106111b"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img 
                      src={require('@src/assets/images/landing/Firebase.png').default} 
                      alt='FireBase'
                      style={{
                        height: '52px', 
                        width: 'auto',
                        width: 'auto',
                        objectFit: 'contain'
                      }}
                    />
                  </a>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg='6' className='text-center'>
                <img 
                  src={require('@src/assets/images/features/phone2.png').default}
                  alt='Features'
                  className='img-fluid fade-right delay-2'
                />
              </Col>
            </Row>
          </div>
        </section>

        {/* Main Features Grid */}
        <section className='features-grid py-5'>
          <div className='container'>
            <div className='text-center mb-5'>
              <h2 className='display-5 fw-bold fade-up'>Tính năng nổi bật</h2>
              <p className='lead fade-up delay-1'>Trải nghiệm các công cụ theo dõi sức khỏe hiện đại</p>
            </div>
            {features.map((feature, index) => (
              <div className='feature-row fade-up delay-2' key={index}>
                <Card className='feature-card border-0'>
                  <Row className='g-0'>
                    {index % 2 === 0 ? (
                      <>
                        <Col md='6'>
                          <div className='feature-image-wrapper'>
                            <img
                              src={feature.image}
                              alt={feature.title}
                              className='feature-image'
                            />
                          </div>
                        </Col>
                        <Col md='6'>
                          <CardBody className='p-4'>
                            <div className='feature-content'>
                              <span className='feature-badge' style={{backgroundColor: feature.color}}>0{index + 1}</span>
                              <div className='d-flex align-items-center mb-3'>
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
                              <p className='feature-description'>{feature.description}</p>
                              <div className='feature-details'>
                                <div className='feature-item'>
                                  <i className='fas fa-check-circle' style={{color: feature.color}}></i>
                                  <span>Cập nhật theo thời gian thực</span>
                                </div>
                                <div className='feature-item'>
                                  <i className='fas fa-check-circle' style={{color: feature.color}}></i>
                                  <span>Báo cáo chi tiết</span>
                                </div>
                                <div className='feature-item'>
                                  <i className='fas fa-check-circle' style={{color: feature.color}}></i>
                                  <span>Tư vấn chuyên sâu</span>
                                </div>
                              </div>
                            </div>
                          </CardBody>
                        </Col>
                      </>
                    ) : (
                      <>
                        <Col md='6'>
                          <CardBody className='p-4'>
                            <div className='feature-content'>
                              <span className='feature-badge' style={{backgroundColor: feature.color}}>0{index + 1}</span>
                              <div className='d-flex align-items-center mb-3'>
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
                              <p className='feature-description'>{feature.description}</p>
                              <div className='feature-details'>
                                <div className='feature-item'>
                                  <i className='fas fa-check-circle' style={{color: feature.color}}></i>
                                  <span>Cập nhật theo thời gian thực</span>
                                </div>
                                <div className='feature-item'>
                                  <i className='fas fa-check-circle' style={{color: feature.color}}></i>
                                  <span>Báo cáo chi tiết</span>
                                </div>
                                <div className='feature-item'>
                                  <i className='fas fa-check-circle' style={{color: feature.color}}></i>
                                  <span>Tư vấn chuyên sâu</span>
                                </div>
                              </div>
                            </div>
                          </CardBody>
                        </Col>
                        <Col md='6'>
                          <div className='feature-image-wrapper'>
                            <img
                              src={feature.image}
                              alt={feature.title}
                              className='feature-image'
                            />
                          </div>
                        </Col>
                      </>
                    )}
                  </Row>
                </Card>
              </div>
            ))}
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
                  className='img-fluid fade-left'
                />
              </Col>
              <Col lg='6'>
                <h2 className='display-6 fw-bold mb-4 fade-right'>Đồng bộ mọi nền tảng</h2>
                <p className='lead mb-4 fade-right delay-1'>
                  Truy cập và theo dõi sức khỏe của bạn mọi lúc, mọi nơi trên tất cả các thiết bị
                </p>
                <Row className='g-4 fade-right delay-2'>
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
            <h2 className='display-6 fw-bold mb-4 fade-up'>Bắt đầu hành trình sức khỏe của bạn</h2>
            <p className='lead mb-4 fade-up delay-1'>
              Đăng ký ngay hôm nay và nhận 30 ngày dùng thử miễn phí cùng tư vấn sức khỏe từ chuyên gia
            </p>
            <div className='fade-up delay-2'>
              <Link to='/register'>
                <Button color='white' size='lg' className='me-3'>
                  Dùng thử miễn phí
                </Button>
              </Link>
              <Button outline color='white' size='lg'>
                Tìm hiểu thêm
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  )
}

export default Features 