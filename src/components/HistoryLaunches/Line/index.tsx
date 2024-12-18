
import youtube from "../../../assets/youtube.png";
import satelite from "../../../assets/rocket.png";
import { format } from "date-fns";
import { TableCell, TableRow } from "@/components/ui/table";

interface IHistory {
    date_utc: string,
    flight_number: number,
    name: string,
    webcast: string,
    rocket_name: string,
    success: boolean
}

export function Line({ date_utc, flight_number, name, rocket_name, success, webcast}: IHistory){
    return (<TableRow className="bg-white text-center">
        <TableCell>
            <h1 className='font-semibold text-lg'>
                {flight_number}
            </h1>
        </TableCell>
        <TableCell>
            <img className="w-8 h-8 mx-auto" src={satelite} alt="" />
        </TableCell>
        <TableCell>
            <h1 className='font-medium text-lg'>{name}</h1>
        </TableCell>
        <TableCell>
            <h1 className='font-medium text-lg'>{format(new Date(date_utc), 'dd/MM/yyyy')}</h1>
        </TableCell>
        <TableCell>
            <h1 className='font-medium text-lg'>{rocket_name}</h1>
        </TableCell>
        <TableCell>
            {
                success ? (
                    <div className="flex bg-success-50 w-20 justify-center items-center p-1 text-white rounded-lg mx-auto">
                        SUCESSO
                    </div>
                ) : (
                    <div className="flex bg-red-600 w-20 justify-center items-center p-1 text-white rounded-lg mx-auto">
                        FALHA
                    </div>
                )
            }
        </TableCell>
        <TableCell>
            <a href={webcast} target="_blank">
                <img className="w-8 h-8 mx-auto" src={youtube} alt="" />
            </a>
        </TableCell>
    </TableRow>)
}
