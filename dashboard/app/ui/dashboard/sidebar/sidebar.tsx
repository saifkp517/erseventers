import styles from './sidebar.module.css'
import {MdEvent,MdDashboard , MdCreate, MdLogout} from "react-icons/md"
import MenuLink from './menuLink/menuLink';
import Image from 'next/image';


const menuItems = [
    // {
    //     title: "Pages",
    //     list: [
    //         {
    //             title: "Events",
    //             path: "/dashboard",
    //             icon: <MdEvent />
    //         },
    //         {
    //             title: "Users",
    //             path: "/dashboard/users",
    //             icon: <MdSupervisedUserCircle />
    //         },
    //         {
    //             title: "Orders",
    //             path: "/dashboard/orders",
    //             icon: <IoTicket />
    //         }
    //     ]
    // },
    {
        title: "Users",
        list: [
            {
                title: "Events",
                path: "/dashboard/events",
                icon: <MdEvent />
            },
            {
                title: "Create Event",
                path: "/dashboard/create",
                icon: <MdCreate />
            }
        ]
    }
]

const SideBar = () => {
    return ( 
        <div className={styles.container}>
            <div className={styles.user}>
                <Image className={styles.userImage} src="/noavatar.png" alt='' width={50} height={50} />
                <div className={styles.userDetails}>
                    <span className={styles.username}>Saif Khan</span>
                    <span className={styles.userTitle}>Administrator</span>
                </div>
            </div>
            <ul>
                {menuItems.map((item) => (
                    <li key={item.title}>
                        <span className={styles.item}>{item.title}</span>
                        {
                            item.list.map((item) => (
                                <MenuLink item={item} key={item.title} />
                            ))
                        }
                    </li>
                ))}
            </ul>
            <button className={styles.logout}>
                <MdLogout size={20} />
                Logout
            </button>
        </div>
     );
}
 
export default SideBar;