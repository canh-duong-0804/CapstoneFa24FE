import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, Card, CardBody, Navbar, NavbarBrand, Nav } from 'reactstrap'
import { CSSTransition } from 'react-transition-group'
import '@src/assets/scss/pages/landing.scss'
import Logo from '@src/assets/images/logo/logo.png'

const Landing = () => {
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
    document.querySelectorAll('.fade-up, .fade-right, .fade-left').forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

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
                  description: 'Ghi chép và tính toán lượng calo, chất dinh dưỡng hàng ngày'
                },
                {
                  icon: 'fa-dumbbell',
                  title: 'Lịch tập luyện',
                  description: 'Lập kế hoạch và theo dõi các hoạt động thể chất của bạn'
                },
                {
                  icon: 'fa-bullseye',
                  title: 'Mục tiêu cá nhân',
                  description: 'Đặt và theo dõi các mục tiêu sức khỏe của riêng bạn'
                }
              ].map((feature, index) => (
                <Col lg='3' md='6' key={index}>
                  <div className={`feature-box text-center fade-up delay-${index + 1}`}>
                    <div className='feature-icon-wrapper mb-4'>
                      <div className='feature-icon'>
                        <i className={`fas ${feature.icon}`}></i>
                      </div>
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
                    <div className='platform-header text-center mb-4'>
                      <div className='platform-icon-wrapper mb-3'>
                        <i className='fas fa-laptop text-primary'></i>
                      </div>
                      <h3 className='mb-2'>Phiên bản Web</h3>
                      <p className='text-muted'>Truy cập mọi tính năng từ trình duyệt web</p>
                    </div>
                    <div className='feature-list'>
                      <div className='feature-item'>
                        <div className='feature-title'>
                          <i className='fas fa-check-circle text-success'></i>
                          <h5>Theo dõi chỉ số</h5>
                        </div>
                        <p>Cân nặng, chỉ số BMI, lượng nước, calories...</p>
                      </div>
                      
                      <div className='feature-item'>
                        <div className='feature-title'>
                          <i className='fas fa-check-circle text-success'></i>
                          <h5>Nhật ký dinh dưỡng</h5>
                        </div>
                        <p>Ghi chép bữa ăn, tính toán dinh dưỡng tự động</p>
                      </div>
                      
                      <div className='feature-item'>
                        <div className='feature-title'>
                          <i className='fas fa-check-circle text-success'></i>
                          <h5>Lịch tập luyện</h5>
                        </div>
                        <p>Đặt lịch và theo dõi các bài tập</p>
                      </div>
                      
                      <div className='feature-item'>
                        <div className='feature-title'>
                          <i className='fas fa-check-circle text-success'></i>
                          <h5>Báo cáo & Thống kê</h5>
                        </div>
                        <p>Xem tiến trình và phân tích chi tiết</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>

              <Col lg='6'>
                <Card className='platform-card h-100 border-0 shadow fade-left'>
                  <CardBody>
                    <div className='platform-header text-center mb-4'>
                      <div className='platform-icon-wrapper mb-3'>
                        <i className='fas fa-mobile-alt text-primary'></i>
                      </div>
                      <h3 className='mb-2'>Ứng dụng di động</h3>
                      <p className='text-muted'>Theo dõi sức khỏe mọi lúc mọi nơi</p>
                    </div>
                    <div className='feature-list'>
                      <div className='feature-item'>
                        <div className='feature-title'>
                          <i className='fas fa-check-circle text-success'></i>
                          <h5>Đồng bộ đa thiết bị</h5>
                        </div>
                        <p>Dữ liệu được đồng bộ tức thì giữa các thiết bị</p>
                      </div>
                      
                      <div className='feature-item'>
                        <div className='feature-title'>
                          <i className='fas fa-check-circle text-success'></i>
                          <h5>Thông báo thông minh</h5>
                        </div>
                        <p>Nhắc nhở lịch tập, bữa ăn, uống nước...</p>
                      </div>
                      
                      <div className='feature-item'>
                        <div className='feature-title'>
                          <i className='fas fa-check-circle text-success'></i>
                          <h5>Theo dõi hoạt động</h5>
                        </div>
                        <p>Tự động đếm bước chân, quãng đường, calories</p>
                      </div>
                      
                      <div className='feature-item'>
                        <div className='feature-title'>
                          <i className='fas fa-check-circle text-success'></i>
                          <h5>Hỗ trợ ngoại tuyến</h5>
                        </div>
                        <p>Sử dụng được cả khi không có kết nối mạng</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </section>

        {/* Detailed Features Section */}
        <section className='detailed-features py-5 bg-light'>
          <div className='container'>
            <Row className='feature-item align-items-center mb-5'>
              <Col lg='6' className='order-lg-2'>
                <div className='feature-content ps-lg-5'>
                  <div className='feature-tag mb-3'>Theo dõi & Phân tích</div>
                  <h3 className='mb-4'>Theo dõi sức khỏe thông minh</h3>
                  <p className='mb-4'>Ghi lại mọi hoạt động hàng ngày của bạn một cách chi tiết. Từ bữa ăn, giấc ngủ đến các bài tập, tất cả đều được theo dõi và phân tích một cách khoa học.</p>
                  <ul className='feature-list'>
                    <li><i className='fas fa-check-circle me-2'></i>Theo dõi calo và dinh dưỡng</li>
                    <li><i className='fas fa-check-circle me-2'></i>Đo lường các chỉ số cơ thể</li>
                    <li><i className='fas fa-check-circle me-2'></i>Phân tích xu hướng sức khỏe</li>
                  </ul>
                </div>
              </Col>
              <Col lg='6' className='order-lg-1'>
                <div className='feature-image'>
                  <img 
                    src={require('@src/assets/images/landing/progress.png').default}
                    alt='tracking'
                    className='img-fluid rounded-3 shadow'
                  />
                </div>
              </Col>
            </Row>

            <Row className='feature-item align-items-center mb-5'>
              <Col lg='6'>
                <div className='feature-content pe-lg-5'>
                  <div className='feature-tag mb-3'>Kế hoạch & Hướng dẫn</div>
                  <h3 className='mb-4'>Kế hoạch tập luyện chuyên nghiệp</h3>
                  <p className='mb-4'>Tiếp cận kho bài tập đa dạng với hướng dẫn chi tiết từ các chuyên gia. Tự động tựo lịch tập phù hợp với mục tiêu của bạn.</p>
                  <ul className='feature-list'>
                    <li><i className='fas fa-check-circle me-2'></i>Thư viện bài tập phong phú</li>
                    <li><i className='fas fa-check-circle me-2'></i>Lịch tập được cá nhân hóa</li>
                    <li><i className='fas fa-check-circle me-2'></i>Video hướng dẫn chất lượng cao</li>
                  </ul>
                </div>
              </Col>
              <Col lg='6'>
                <div className='feature-image'>
                  <img 
                    src={require('@src/assets/images/landing/exercise.png').default}
                    alt='workout'
                    className='img-fluid rounded-3 shadow'
                  />
                </div>
              </Col>
            </Row>

            <Row className='feature-item align-items-center'>
              <Col lg='6' className='order-lg-2'>
                <div className='feature-content ps-lg-5'>
                  <div className='feature-tag mb-3'>Tư vấn & Hỗ trợ</div>
                  <h3 className='mb-4'>Tư vấn dinh dưỡng thông minh</h3>
                  <p className='mb-4'>Nhận các gợi ý về chế độ ăn uống phù hợp và tư vấn từ các chuyên gia dinh dưỡng. AI Chatbot hỗ trợ 24/7 cho mọi thắc mắc của bạn.</p>
                  <ul className='feature-list'>
                    <li><i className='fas fa-check-circle me-2'></i>Tư vấn từ chuyên gia dinh dưỡng</li>
                    <li><i className='fas fa-check-circle me-2'></i>Gợi ý thực đơn hàng ngày</li>
                    <li><i className='fas fa-check-circle me-2'></i>AI Chatbot hỗ trợ 24/7</li>
                  </ul>
                </div>
              </Col>
              <Col lg='6' className='order-lg-1'>
                <div className='feature-image'>
                  <img 
                    src={require('@src/assets/images/landing/nutrition.png').default}
                    alt='nutrition'
                    className='img-fluid rounded-3 shadow'
                  />
                </div>
              </Col>
            </Row>
          </div>
        </section>

        {/* App Preview Section */}
        <section className='app-preview py-5'>
          <h2 className='text-center mb-5'>Chúng tôi có cả web và app</h2>
          <Row className='justify-content-center'>
            <Col md='8'>
              <div className='app-screenshots'>
                {/* Add your app screenshots here */}
              </div>
              <div className='text-center mt-4'>
                <Button color='success' size='lg' className='me-2'>
                  Bắt đầu ngay
                </Button>
                <img src={require('@src/assets/images/landing/google-play.png').default} alt='Google Play' height='52' />
              </div>
            </Col>
          </Row>
        </section>

        {/* Testimonials Section */}
        <section className='testimonials py-5'>
          <h2 className='text-center mb-5'>Đánh giá khách hàng</h2>
          <Row>
            <Col md='6'>
              <Card className='testimonial-card'>
                <CardBody>
                  <div className='d-flex align-items-center mb-3'>
                    <img src={require('@src/assets/images/portrait/small/avatar-s-1.jpg').default} alt='avatar' className='rounded-circle me-2' width='50' />
                    <div>
                      <h5 className='mb-0'>Nguyễn Văn B</h5>
                      <small>Nam, 34 tuổi, Nhân viên văn phòng</small>
                    </div>
                  </div>
                  <p>Là một nhân viên văn phòng ngồi nhiều, tôi cần một ứng dụng giúp kiểm soát ăn uống và duy trì cân nặng mà không tốn quá nhiều thời gian. Health Tracking giúp tôi theo dõi các chỉ số dễ dàng, có gợi ý bài tập phù hợp và nhắc nhở tôi uống đủ nước.</p>
                </CardBody>
              </Card>
            </Col>
            <Col md='6'>
              <Card className='testimonial-card'>
                <CardBody>
                  <div className='d-flex align-items-center mb-3'>
                    <img src={require('@src/assets/images/portrait/small/avatar-s-2.jpg').default} alt='avatar' className='rounded-circle me-2' width='50' />
                    <div>
                      <h5 className='mb-0'>Bob</h5>
                      <small>Highly Recommend</small>
                    </div>
                  </div>
                  <p>Great app for tracking health and fitness goals. The interface is intuitive and the features are comprehensive.</p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </section>

        {/* CTA Section */}
        <section className='cta-section text-center py-5'>
          <h2>Bắt đầu hành trình sức khỏe của bạn ngay hôm nay</h2>
          <p className='mb-4'>Đăng ký miễn phí và trải nghiệm các tính năng tuyệt vời</p>
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