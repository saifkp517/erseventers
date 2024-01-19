import SideBar from '../ui/dashboard/sidebar/sidebar';
import Navbar from '../ui/dashboard/navbar/navbar';
import React, { ReactNode } from "react";
import styles from '../ui/dashboard/dashboard.module.css'

interface Props {
    children?: ReactNode
}

const Layout = ({children}: Props) => {
    return ( 
        <div className={styles.container}>
            <div className={styles.menu}>
                <SideBar />
            </div>
            <div className={styles.content}>
                <Navbar />
                {children}
            </div>
        </div>
     );
}
 
export default Layout;
