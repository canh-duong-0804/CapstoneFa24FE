// ** Icons Import
import { BarChart, User} from 'react-feather'
export default [
    {
        id: '1',
        title: 'Statistic',
        icon: <BarChart size={12} />,
        navLink: '/charts/apex'
    },
    {
        id: '2',
        title: 'Quản lý tài khoản',
        icon: <User size={12} />,
        navLink: '/admin/manage-account'
    }

]
