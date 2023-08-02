
import TableRow from '@mui/material/TableRow';
import youtube from "../../../assets/youtube.png";
import satelite from "../../../assets/rocket.png";
import { format } from "date-fns";

interface IHistory {
    date_utc: string,
    flight_number: number,
    name: string,
    webcast: string,
    rocket_name: string,
    success: boolean
}

export function Line({ date_utc, flight_number, name, rocket_name, success, webcast}: IHistory){
    return (<TableRow>
        <div className='flex flex-row bg-gray-400 h-16 my-4 py-10 items-center justify-around md:justify-evenly'>
                <div className="flex flex-col items-center justify-center gap-2 md:gap-16 md:flex-row-reverse" >
                    <img className="w-8 h-8" src={satelite} alt="" />
                    <h1 className='font-semibold text-lg'>
                        {flight_number}
                    </h1>
                </div>
                <div className="flex flex-col items-center justify-center md:flex-row md:gap-16">
                    <h1 className='font-semibold text-lg'>{name}</h1>
                    <h1 className='font-semiBold text-lg'>{format(new Date(date_utc), 'dd/MM/yyyy')}</h1>
                    <h1 className='hidden md:font-semiBold md:text-lg md:flex'>{rocket_name}</h1>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 md:flex-row-reverse md:gap-24" >
                    <a href={webcast}>
                        <img className="w-8 h-8" src={youtube} alt="" />
                    </a>
                    {
                        success && <div className="flex bg-success-50 w-20 justify-center items-center p-1 text-white">
                            SUCESSO
                        </div>
                    }{
                        !success && <div className="flex bg-failure-50 w-20 justify-center items-center p-1 text-white">
                            FALHA
                        </div>
                    }
                </div>
            </div>
    </TableRow>)
}