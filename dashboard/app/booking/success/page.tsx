import Navbar from "@/app/ui/booking/navbar";
import { Typography } from "@mui/material";

const Success = () => {
    return (
        <div>
            <Navbar />
            <div className="h-screen flex items-center justify-center">
            <div className="mx-10">
                <Typography variant="h4" gutterBottom>
                    Tickets Booked Successfully!
                </Typography>
                <Typography variant="subtitle1">
                    You will recieve a mail containing the details of your purchased tickets<br />
                    <sub>Haven't recieved a mail yet?, Contact <u>+91 9148654500</u></sub>
                </Typography>
            </div>
        </div>
        </div>
    );
}

export default Success;
