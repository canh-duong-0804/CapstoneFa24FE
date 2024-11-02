// ** Icons Import
import { User, Circle } from 'react-feather'
export default [
    {
        id: '14',
        title: 'Quản lý món ăn',
        icon: <User size={12} />,
        action: 'read',
        resource: 'All',
        navLink: '/trainer/manage-food',
        children: [
            {
                id: '15',
                title: 'Món ăn',
                icon: <Circle size={12} />,
                navLink: '/trainer/manage-receipt',
                action: 'read',
                resource: 'All'
            },
            {
                id: '16',
                title: 'Công thức nấu ăn',
                icon: <Circle size={12} />,
                navLink: '/trainer/manage-receipt',
                action: 'read',
                resource: 'All'
            }, {
                id: '17',
                title: 'Gợi ý kế hoạch',
                icon: <Circle size={12} />,
                navLink: '/trainer/manage-meal-plan',
                action: 'read',
                resource: 'All'
            }
        ]
    },
    {
        id: '18',
        title: 'Quản lý bài tập',
        icon: <User size={12} />,
        action: 'read',
        resource: 'All',
        navLink: '/trainer/manage-excercise',
        children: [
            {
              id: '19',
              title: 'Bài tập thể dục',
              icon: <Circle size={12} />,
              navLink: '/trainer/manage-excercise',
              action: 'read',
              resource: 'All'
            },
            {
                id: '20',
                title: 'Thể loại bài tập',
                icon: <Circle size={12} />,
                navLink: '/trainer/exercise-category',
                action: 'read',
                resource: 'All'
              },
            {
              id: '21',
              title: 'Gợi ý bài tập',
              icon: <Circle size={12} />,
              navLink: '/trainer/suggest-excercise',
              action: 'read',
              resource: 'All'
            }, {
              id: '22',
              title: 'Thông tin bài tập',
              icon: <Circle size={12} />,
              navLink: '/trainer/excercise-information',
              action: 'read',
              resource: 'All'
            }
        ]
    }
    
]
