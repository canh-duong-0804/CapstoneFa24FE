// ** Icons Import
import { Circle, Activity, Coffee } from 'react-feather'
export default [
    {
        id: '14',
        title: 'Quản lý món ăn',
        icon: <Coffee size={12} />,
        action: 'read',
        resource: 'All',
        navLink: '/trainer/manage-food',
        children: [
            {
                id: '15',
                title: 'Món ăn',
                icon: <Circle size={12} />,
                navLink: '/trainer/manage-food',
                action: 'read',
                resource: 'All'
            },
            {
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
        icon: <Activity size={12} />,
        action: 'read',
        resource: 'All',
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
                title: 'Gợi ý bài tập',
                icon: <Circle size={12} />,
                navLink: '/trainer/manage-exercise-plan',
                action: 'read',
                resource: 'All'
            }
        ]
    }

]
