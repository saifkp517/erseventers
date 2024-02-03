    import Image from 'next/image';
import styles from './transactions.module.css'

const Transactions = ({ orders }: any) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Latest Transactions</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Type</td>
                        <td>Date</td>
                        <td>Tickets</td>
                        <td>Amount</td>
                    </tr>
                </thead>
                {
                    orders.map((order: any) => (
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
                                        {order.email}
                                    </div>
                                </td>
                                <td>
                                    <span className={`${styles.status} ${styles.done}`}>{order.type}</span>
                                </td>
                                <td>{new Date(order.purchasedate).toDateString()}</td>
                                <td>{ order.tickets }</td>
                                <td>{ order.amt }</td>
                            </tr>
                        </tbody>

                    ))
                }
            </table>
        </div>
    );
}

export default Transactions;