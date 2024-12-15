// ** Icons Import
import { Circle, Coffee } from 'react-feather'
export default [
    {
        id: '22',
        title: 'Quản lý món ăn',
        icon: <Coffee size={12} />,
        action: 'read',
        resource: 'All',
        navLink: '/food-trainer/manage-food',
        children: [
            {
                id: '23',
                title: 'Món ăn',
                icon: <Circle size={12} />,
                navLink: '/food-trainer/manage-food',
                action: 'read',
                resource: 'All'
            },
            {
                id: '24',
                title: 'Gợi ý kế hoạch',
                icon: <Circle size={12} />,
                navLink: '/food-trainer/manage-meal-plan',
                action: 'read',
                resource: 'All'
            }
        ]
    },
    {
        id: '25',
        title: 'Chat',
        icon: <Coffee size={12} />,
        action: 'read',
        resource: 'All',
        navLink: '/food-trainer/chat'
    }
]
