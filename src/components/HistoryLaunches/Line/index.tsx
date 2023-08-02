
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
        <div className='flex flex-row bg-gray-400 h-16 my-4 py-10 items-center justify-around'>
            <div className="flex flex-col items-center justify-center gap-2" >    
                <img className="w-8 h-8" src={satelite} alt="" />
                <h1 className='font-semibold text-lg'>
                    {flight_number}
                </h1>
            </div>
            <div className="flex flex-col items-center justify-center ">
                <h1 className='font-semibold text-lg'>{name}</h1>
                <h1 className='font-semiBold text-lg'>{format(new Date(date_utc), 'dd/MM/yyyy')}</h1>
            </div>
            <div className="flex flex-col items-center justify-center gap-2" >
                <a href={webcast}>
                    <img className="w-8 h-8" src={youtube} alt="" />
                </a>
                {
                    success && <div className="bg-success-100 w-20 items-center p-1 text-white">
                        SUCESSO
                    </div>
                }{
                    !success && <div className="bg-failure-100 w-20 items-center p-1 text-white">
                        FALHA
                    </div>
                }
            </div>
        </div>
    </TableRow>)
}