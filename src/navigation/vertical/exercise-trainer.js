// ** Icons Import
import { Circle, Activity } from 'react-feather'
export default [
    {
        id: '26',
        title: 'Quản lý bài tập',
        icon: <Activity size={12} />,
        action: 'read',
        resource: 'All',
        navLink: '/exercise-trainer/manage-excercise/manage-excercise',
        children: [
            {
              id: '27',
              title: 'Bài tập thể dục',
              icon: <Circle size={12} />,
              navLink: '/exercise-trainer/manage-excercise/manage-excercise',
              action: 'read',
              resource: 'All'
            },         
            {
              id: '28',
              title: 'Gợi ý bài tập',
              icon: <Circle size={12} />,
              navLink: '/exercise-trainer/manage-excercise/suggest-excercise',
              action: 'read',
              resource: 'All'
            }, {
              id: '29',
              title: 'Thông tin bài tập',
              icon: <Circle size={12} />,
              navLink: '/exercise-trainer/manage-excercise/excercise-information',
              action: 'read',
              resource: 'All'
            }
        ]
    }
]
