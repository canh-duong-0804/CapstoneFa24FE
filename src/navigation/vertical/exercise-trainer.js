// ** Icons Import
import { Circle, Activity, Coffee } from 'react-feather'
export default [
    {
        id: '26',
        title: 'Quản lý bài tập',
        icon: <Activity size={12} />,
        action: 'read',
        resource: 'All',
        navLink: '/exercise-trainer/manage-excercise',
        children: [
            {
              id: '27',
              title: 'Bài tập thể dục',
              icon: <Circle size={12} />,
              navLink: '/exercise-trainer/manage-excercise',
              action: 'read',
              resource: 'All'
            },         
            {
              id: '28',
              title: 'Gợi ý bài tập',
              icon: <Circle size={12} />,
              navLink: '/exercise-trainer/exercise-plan',
              action: 'read',
              resource: 'All'
            }
        ]
        
    },
    {
            id: '29',
            title: 'Chat',
            icon: <Coffee size={12} />,
            action: 'read',
            resource: 'All',
            navLink: '/exercise-trainer/chat'
        }
]
