// ** Icons Import
import { User, Circle } from 'react-feather'
export default [
    {
        id: '10',
        title: 'Quản lý món ăn',
        icon: <User size={12} />,
        action: 'read',
        resource: 'All',
        navLink: '/trainer/manage-food',
        children: [
            {
                id: '11',
                title: 'Món ăn',
                icon: <Circle size={12} />,
                navLink: '/trainer/manage-receipt',
                action: 'read',
                resource: 'All'
            },
            {
                id: '12',
                title: 'Công thức nấu ăn',
                icon: <Circle size={12} />,
                navLink: '/trainer/manage-receipt',
                action: 'read',
                resource: 'All'
            }, {
                id: '13',
                title: 'Gợi ý kế hoạch',
                icon: <Circle size={12} />,
                navLink: '/trainer/manage-meal-plan',
                action: 'read',
                resource: 'All'
            }
        ]
    },
    {
        id: '14',
        title: 'Quản lý bài tập',
        icon: <User size={12} />,
        action: 'read',
        resource: 'All',
        navLink: '/trainer/manage-excercise',
        children: [
            {
              id: '15',
              title: 'Bài tập thể dục',
              icon: <Circle size={12} />,
              navLink: '/admin/manage-excercise',
              action: 'read',
              resource: 'All'
            },
            {
              id: '16',
              title: 'Gợi ý bài tập',
              icon: <Circle size={12} />,
              navLink: '/admin/suggest-excercise',
              action: 'read',
              resource: 'All'
            }, {
              id: '17',
              title: 'Thông tin bài tập',
              icon: <Circle size={12} />,
              navLink: '/admin/excercise-information',
              action: 'read',
              resource: 'All'
            }
        ]
    }
    
]
