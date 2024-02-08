import { Typography } from "@mui/material";
import Image from "next/image";

const Navbar = () => {
    return (
        <nav className="bg-bg">
            <div className="max-w-screen-xl max-h-10 flex flex-wrap items-center justify-between mx-auto">
                <a href="" className="flex items-center space-x-0 rtl:space-x-reverse">
                    <Image src="/ers.png" width={200} height={200} alt="Flowbite Logo" />
                    <Typography className='text-center font-bold mt-18' variant='h6'>ERS Eventers</Typography>
                </a>
            </div>
        </nav>
    );
}

export default Navbar;