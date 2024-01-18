import Image from 'next/image';
import styles from './transactions.module.css'

const Transactions = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Latest Transactions</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Type</td>
                        <td>Date</td>
                        <td>Amount</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className={styles.user}>
                                <Image
                                    src="/noavatar.png"
                                    alt=""
                                    width={40}
                                    height={40}
                                    className={styles.userImage}
                                />
                                Saif Khan
                            </div>
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.pending}`}>VIP</span>
                        </td>
                        <td>14-02-2024</td>
                        <td>$320</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>
                            <div className={styles.user}>
                                <Image
                                    src="/noavatar.png"
                                    alt=""
                                    width={40}
                                    height={40}
                                    className={styles.userImage}
                                />
                                Karan Singh
                            </div>
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.done}`}>General</span>
                        </td>
                        <td>14-02-2024</td>
                        <td>$320</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>
                            <div className={styles.user}>
                                <Image
                                    src="/noavatar.png"
                                    alt=""
                                    width={40}
                                    height={40}
                                    className={styles.userImage}
                                />
                                John Doe
                            </div>
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.cancelled}`}>Early Bird</span>
                        </td>
                        <td>14-02-2024</td>
                        <td>$320</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Transactions;