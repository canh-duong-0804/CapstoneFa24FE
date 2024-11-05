// ** Icons Import
import { BarChart, User, Circle, Coffee, Activity, Book} from 'react-feather'
export default [
  {
    id: '1',
    title: 'Statistic',
    icon: <BarChart size={12} />,
    action: 'read',
    resource: 'All',
    navLink: '/admin/statistic'
  },
  {
    id: '2',
    title: 'Quản lý tài khoản',
    icon: <User size={12} />,
    action: 'read',
    resource: 'All',
    navLink: '/admin/manage-account'
  },
  {
    id: '3',
    title: 'Quản lý món ăn',
    icon: <Coffee size={12} />,
    action: 'read',
    resource: 'All',
    navLink: '/admin/manage-food',
    children: [
      {
        id: '4',
        title: 'Món ăn',
        icon: <Circle size={12} />,
        navLink: '/admin/manage-food',
        action: 'read',
        resource: 'All'
      },
      {
        id: '5',
        title: 'Công thức nấu ăn',
        icon: <Circle size={12} />,
        navLink: '/admin/manage-recipe',
        action: 'read',
        resource: 'All'
      },
      {
        id: '6',
        title: 'Nguyên liệu',
        icon: <Circle size={12} />,
        navLink: '/admin/manage-ingredient',
        action: 'read',
        resource: 'All'
      },
      {
        id: '7',
        title: 'Gợi ý kế hoạch',
        icon: <Circle size={12} />,
        navLink: '/admin/manage-meal-plan',
        action: 'read',
        resource: 'All'
      }
    ]
  },
  {
    id: '8',
    title: 'Quản lý bài tập',
    icon: <Activity size={12} />,
    action: 'read',
    resource: 'All',
    navLink: '/admin/manage-excercise',
    children: [
      {
        id: '9',
        title: 'Bài tập thể dục',
        icon: <Circle size={12} />,
        navLink: '/admin/manage-excercise',
        action: 'read',
        resource: 'All'
      },
      {
        id: '10',
        title: 'Thể loại bài tập',
        icon: <Circle size={12} />,
        navLink: '/admin/exercise-category',
        action: 'read',
        resource: 'All'
      },
      {
        id: '11',
        title: 'Gợi ý bài tập',
        icon: <Circle size={12} />,
        navLink: '/admin/suggest-excercise',
        action: 'read',
        resource: 'All'
      }, {
        id: '12',
        title: 'Thông tin bài tập',
        icon: <Circle size={12} />,
        navLink: '/admin/excercise-information',
        action: 'read',
        resource: 'All'
      }
    ]
  },
  {
    id: '13',
    title: 'Quản lý blog',
    icon: <Book size={12} />,
    action: 'read',
    resource: 'All',
    navLink: '/admin/manage-blog'
  }

]
