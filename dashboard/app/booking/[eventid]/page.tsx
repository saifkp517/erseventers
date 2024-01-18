'use client'
import { usePathname } from "next/navigation";

const Booking = () => {

    const pathname = usePathname();

    console.log(pathname)

    return ( 
        <div>
            Booking
        </div>
     );
}
 
export default Booking;