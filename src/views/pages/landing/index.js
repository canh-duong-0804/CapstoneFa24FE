import { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Row, Col, Card, CardBody, Navbar, NavbarBrand, Nav, Badge } from 'reactstrap'
import { CSSTransition } from 'react-transition-group'
import '@src/assets/scss/pages/landing.scss'
import Logo from '@src/assets/images/logo/logo.png'

const testimonials = [
  {
    name: 'Nguyễn Văn B',
    role: 'Nam, 34 tuổi, Nhân viên văn phòng',
    image: require('@src/assets/images/portrait/small/avatar-s-1.jpg').default,
    content: 'Là một nhân viên văn phòng ngồi nhiều, tôi cần một ứng dụng giúp kiểm soát ăn uống và duy trì cân nặng mà không tốn quá nhiều thời gian. Health Tracking giúp tôi theo dõi các chỉ số dễ dàng, có gợi ý bài tập phù hợp và nhắc nhở tôi uống đủ nước.'
  },
  {
    name: 'Trần Thị C',
    role: 'Nữ, 28 tuổi, Giáo viên',
    image: require('@src/assets/images/portrait/small/avatar-s-2.jpg').default,
    content: 'Ứng dụng rất trực quan và dễ sử dụng. Tôi đặc biệt thích tính năng theo dõi dinh dưỡng và lịch tập luyện. Sau 3 tháng sử dụng, tôi đã giảm được 5kg và cảm thấy khỏe mạnh hơn rất nhiều.'
  },
  {
    name: 'Lê Văn D',
    role: 'Nam, 42 tuổi, Doanh nhân',
    image: require('@src/assets/images/portrait/small/avatar-s-6.jpg').default,
    content: 'Health Tracking giúp tôi cân bằng giữa công việc bận rộn và việc chăm sóc sức khỏe. Các bài tập ngắn nhưng hiệu quả, phù hợp với lịch trình của người đi làm.'
  },
  {
    name: 'Phạm Thị E',
    role: 'Nữ, 31 tuổi, Y tá',
    image: require('@src/assets/images/portrait/small/avatar-s-7.jpg').default,
    content: 'Là người làm trong ngành y tế, tôi đánh giá cao tính chính xác và khoa học của ứng dụng. Các chỉ số được theo dõi chi tiết và có cả lời khuyên từ chuyên gia dinh dưỡng.'
  }
]

const Landing = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const navigate = useNavigate()

  console.log(currentSlide)

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
    document.querySelectorAll('.fade-up, .fade-right, .fade-left').forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Thêm redirect tự động khi vào trang landing
    navigate('/login/admin')
  }, [])

  const handleTestimonialSlide = (direction) => {
    const testimonialCount = 4 // Số lượng testimonial
    if (direction === 'next') {
      setCurrentSlide(prev => {
        return (prev + 2 >= testimonialCount) ? 0 : prev + 2
      })
    } else {
      setCurrentSlide(prev => {
        return (prev - 2 < 0) ? testimonialCount - 2 : prev - 2
      })
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleTestimonialSlide('next')
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])

  const handleTestimonialChange = (direction) => {
    if (direction === 'next') {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    } else {
      setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }
  }

  return (
    <Fragment>
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
              <Button color={isScrolled ? 'light' : 'white'}>
                Đăng nhập
              </Button>
            </Link>
            <Link to='/register'>
              <Button outline color={isScrolled ? 'light' : 'white'}>
                Đăng ký
              </Button>
            </Link>
          </div>
        </div>
      </Navbar>

      <div className='landing-wrapper'>
        {/* Hero Section */}
        <section className='hero-section'>
          <div className='container h-100 d-flex align-items-center'>
            <Row className='w-100 align-items-center'>
              <Col lg='6' md='12'>
                <div className='hero-content fade-right'>
                  <h1 className='display-4 mb-3 fw-bolder' style={{ fontSize: '4rem', fontWeight: '900' }}>
                    Theo dõi sức khỏe thông minh cùng Health Tracking
                  </h1>
                  <p className='lead mb-4 delay-1'>
                    Giải pháp toàn diện giúp bạn theo dõi sức khỏe, dinh dưỡng và hoạt động thể chất một cách khoa học và hiệu quả
                  </p>
                  <div className='hero-highlights mb-4'>
                    <div className='d-flex align-items-center mb-2 fade-right delay-2'>
                      <i className='fas fa-check-circle me-2'></i>
                      <span>Dễ dàng ghi chép và theo dõi</span>
                    </div>
                    <div className='d-flex align-items-center mb-2 fade-right delay-3'>
                      <i className='fas fa-check-circle me-2'></i>
                      <span>Đồng bộ hóa trên mọi thiết bị</span>
                    </div>
                    <div className='d-flex align-items-center fade-right delay-4'>
                      <i className='fas fa-check-circle me-2'></i>
                      <span>Tư vấn từ chuyên gia</span>
                    </div>
                  </div>
                  <div className='hero-btns fade-right delay-5'>
                    <Link to='/register'>
                      <Button 
                        color='light' 
                        size='lg' 
                        className='hover-scale me-2'
                        style={{ 
                          color: '#28c76f',
                          fontWeight: '600',
                          borderColor: 'white'
                        }}
                      >
                        Bắt đầu miễn phí
                      </Button>
                    </Link>
                    <Link to='/features'>
                      <Button outline color='success' size='lg' className='hover-scale'>
                        Tìm hiểu thêm
                      </Button>
                    </Link>
                  </div>
                </div>
              </Col>
              <Col lg='6' md='12' className='text-center'>
                <div className='mockup-container fade-left delay-3'>
                  <img 
                    src={require('@src/assets/images/landing/Mockup.png').default}
                    alt='hero'
                    className='mockup-main hover-scale'
                    style={{ maxWidth: '250px', width: '100%', height: 'auto' }}
                  />
                </div>
              </Col>
            </Row>
          </div>
          <div className="wave-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="wave">
              <path 
                fill="#f8f9fa" 
                fillOpacity="1" 
                d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,266.7C960,267,1056,245,1152,229.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </section>

        {/* Core Features Section */}
        <section className='core-features'>
          <div className='container'>
            <div className='text-center mb-5 fade-up'>
              <h2 className='display-5 fw-bold'>Tính năng nổi bật</h2>
              <p className='lead text-muted'>Trải nghiệm những tính năng được thiết kế cho cuộc sống khỏe mạnh của bạn</p>
            </div>
            
            <Row className='g-4'>
              {[
                {
                  icon: 'fa-chart-line',
                  title: 'Theo dõi tiến độ',
                  description: 'Dễ dàng theo dõi và phân tích các chỉ số sức khỏe quan trọng'
                },
                {
                  icon: 'fa-utensils',
                  title: 'Nhật ký dinh dưỡng',
                  description: 'Ghi chép và tính toán lượng calo, chất dinh dưỡng hàng ngày một cách chính xác'
                },
                {
                  icon: 'fa-dumbbell',
                  title: 'Lịch tập luyện',
                  description: 'Lập kế hoạch và theo dõi các hoạt động thể chất với hướng dẫn chi tiết từ chuyên gia'
                },
                {
                  icon: 'fa-bullseye',
                  title: 'Mục tiêu cá nhân',
                  description: 'Đặt và theo dõi các mục tiêu sức khỏe với lộ trình được cá nhân hóa cho riêng bạn'
                }
              ].map((feature, index) => (
                <Col lg='3' md='6' key={index}>
                  <div className='feature-box text-center fade-up'>
                    <div className='feature-icon-wrapper'>
                      <i className={`fas ${feature.icon} feature-icon`}></i>
                    </div>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </section>

        {/* Platform Comparison Section */}
        <section className='platform-comparison'>
          <div className='container'>
            <div className='section-header text-center fade-up'>
              <h2 className='display-6 fw-bold mb-3'>Trải nghiệm đa nền tảng</h2>
              <p className='lead mb-5'>Sử dụng Health Tracking mọi lúc mọi nơi trên mọi thiết bị</p>
            </div>
            
            <Row>
              <Col lg='6' className='mb-4 mb-lg-0'>
                <Card className='platform-card h-100 border-0 shadow-sm fade-right'>
                  <CardBody>
                    <div className='platform-header'>
                      <div className='platform-icon-wrapper'>
                        <i className='fas fa-laptop'></i>
                      </div>
                      <h3>Phiên bản Web</h3>
                      <p>Quản lý dinh dưỡng và luyện tập hàng ngày</p>
                    </div>
                    <div className='feature-list'>
                      <div className='feature-item'>
                        <div className='feature-title'>
                          <i className='fas fa-utensils'></i>
                          <h5>Nhật ký dinh dưỡng</h5>
                        </div>
                        <p>Ghi chép và tính toán lượng calories, protein, carbs, fat từ bữa ăn hàng ngày</p>
                      </div>
                      
                      <div className='feature-item'>
                        <div className='feature-title'>
                          <i className='fas fa-dumbbell'></i>
                          <h5>Nhật ký luyện tập</h5>
                        </div>
                        <p>Theo dõi các bài tập và thời gian luyện tập mỗi ngày</p>
                      </div>
                      
                      <div className='feature-item'>
                        <div className='feature-title'>
                          <i className='fas fa-chart-pie'></i>
                          <h5>Theo dõi mục tiêu</h5>
                        </div>
                        <p>Hiển thị tiến độ calories và macros so với mục tiêu đề ra</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>

              <Col lg='6'>
                <Card className='platform-card h-100 border-0 shadow-sm fade-left'>
                  <CardBody>
                    <div className='platform-header'>
                      <div className='platform-icon-wrapper'>
                        <i className='fas fa-mobile-alt'></i>
                      </div>
                      <h3>Ứng dụng di động</h3>
                      <p>Theo dõi sức khỏe mọi lúc mọi nơi</p>
                    </div>
                    <div className='feature-list'>
                      <div className='feature-item'>
                        <div className='feature-title'>
                          <i className='fas fa-chart-line'></i>
                          <h5>Báo cáo chuyên sâu</h5>
                        </div>
                        <p>Phân tích chi tiết các chỉ số sức khỏe với biểu đồ trực quan</p>
                      </div>
                      
                      <div className='feature-item'>
                        <div className='feature-title'>
                          <i className='fas fa-bell'></i>
                          <h5>Thông báo thông minh</h5>
                        </div>
                        <p>Nhắc nhở lịch tập, bữa ăn và uống nước</p>
                      </div>
                      
                      <div className='feature-item'>
                        <div className='feature-title'>
                          <i className='fas fa-shoe-prints'></i>
                          <h5>Theo dõi hoạt động</h5>
                        </div>
                        <p>Tự động đếm bước chân và tính calo tiêu thụ</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </section>

        {/* Top Trainers Section */}
        <section className='top-trainers py-5'>
          <div className='container'>
            <div className='section-header text-center fade-up'>
              <h2 className='display-6 fw-bold mb-3'>Đội ngũ huấn luyện viên hàng đầu</h2>
              <p className='lead mb-5'>Được đào tạo và chứng nhận bởi các tổ chức uy tín</p>
            </div>
            
            <Row>
              {[
                {
                  name: 'Nguyễn Văn A',
                  role: 'HLV Thể hình & Dinh dưỡng',
                  image: require('@src/assets/images/portrait/small/avatar-s-3.jpg').default,
                  description: '10 năm kinh nghiệm, chứng chỉ ISSA',
                  specialties: ['Thể hình', 'Giảm cân', 'Dinh dưỡng']
                },
                {
                  name: 'Trần Thị B', 
                  role: 'HLV Yoga & Thiền',
                  image: require('@src/assets/images/portrait/small/avatar-s-4.jpg').default,
                  description: '8 năm kinh nghiệm, chứng nhận Yoga Alliance',
                  specialties: ['Yoga', 'Thiền', 'Thể dục']
                },
                {
                  name: 'Lê Văn C',
                  role: 'HLV Thể lực & Cardio',
                  image: require('@src/assets/images/portrait/small/avatar-s-5.jpg').default,
                  description: '12 năm kinh nghiệm, HLV thể lực FIFA',
                  specialties: ['Cardio', 'HIIT', 'Thể lực']
                }
              ].map((trainer, index) => (
                <Col lg='4' md='6' className='mb-4' key={index}>
                  <Card className='trainer-card h-100 border-0 shadow-sm fade-up'>
                    <CardBody className='text-center'>
                      <div className='trainer-avatar mb-3'>
                        <img 
                          src={trainer.image} 
                          alt={trainer.name}
                          className='rounded-circle'
                          width='120'
                        />
                      </div>
                      <h4>{trainer.name}</h4>
                      <p className='text-primary mb-2'>{trainer.role}</p>
                      <p className='mb-3'>{trainer.description}</p>
                      <div className='trainer-specialties'>
                        {trainer.specialties.map((specialty, idx) => (
                          <Badge 
                            color='light-primary' 
                            className='me-1 mb-1' 
                            key={idx}
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className='testimonials py-5 bg-light'>
          <div className='container'>
            <h2 className='text-center mb-5'>Đánh giá từ người dùng</h2>
            <div className='testimonial-container'>
              <Button 
                color='primary' 
                className='testimonial-btn testimonial-btn-prev'
                onClick={() => handleTestimonialChange('prev')}
              >
                <i className='fas fa-chevron-left'></i>
              </Button>

              <div className='testimonial-content'>
                <Card className='testimonial-card border-0 shadow-sm mx-auto'>
                  <CardBody>
                    <div className='d-flex align-items-center mb-3'>
                      <img 
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].name}
                        className='rounded-circle me-3'
                        width='60'
                      />
                      <div>
                        <h5 className='mb-0'>{testimonials[currentTestimonial].name}</h5>
                        <small className='text-muted'>{testimonials[currentTestimonial].role}</small>
                      </div>
                    </div>
                    <p className='mb-0'>{testimonials[currentTestimonial].content}</p>
                  </CardBody>
                </Card>
              </div>

              <Button 
                color='primary' 
                className='testimonial-btn testimonial-btn-next'
                onClick={() => handleTestimonialChange('next')}
              >
                <i className='fas fa-chevron-right'></i>
              </Button>
            </div>
          </div>
        </section>

        {/* App Preview Section */}
        <section className='app-preview py-5'>
          <div className='container'>
            <Row className='align-items-center'>
              <Col lg='6' className='mb-4 mb-lg-0'>
                <h2 className='display-6 fw-bold mb-4'>
                  Tải ứng dụng ngay hôm nay
                </h2>
                <p className='lead mb-4'>
                  Theo dõi sức khỏe mọi lúc mọi nơi với ứng dụng Health Tracking trên điện thoại của bạn
                </p>
                <div className='app-badges'>
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
                        objectFit: 'contain'
                      }}
                    />
                  </a>
                </div>
              </Col>
              <Col lg='6' className='text-center'>
                <div className='app-screenshots'>
                  <img 
                    src={require('@src/assets/images/landing/Mockup.png').default}
                    alt='App Screenshot'
                    className='img-fluid main-screenshot'
                  />
                </div>
              </Col>
            </Row>
          </div>
        </section>

        {/* CTA Section */}
        <section className='cta-section text-center py-5'>
          <h2>Bắt đầu hành trình sức khỏe của bạn ngay hôm nay</h2>
          <p className='mb-4'>Đ��ng ký miễn phí và trải nghiệm các tính năng tuyệt vời</p>
          <div>
            <Button color='success' size='lg' className='me-2'>
              Rate us
            </Button>
            <Button outline color='success' size='lg'>
              Share
            </Button>
          </div>
        </section>
      </div>
    </Fragment>
  )
}

export default Landing