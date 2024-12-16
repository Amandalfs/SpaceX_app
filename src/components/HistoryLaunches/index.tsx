import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { Line } from './Line';
import { useState } from 'react';
import { Button, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import searchIconUrl from "../../assets/search.svg";
import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getByListLaunches } from '../../services/request';
import Navigation from './Navigation/Navigation';

export function HistoryLaunches(){
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) ?? 1;
  const [valueSearch, setValueSearch] = useState("");
  const [search, setSearch] = useState("");

  const { data } = useQuery({
    queryKey: ["launches", page, search],
    queryFn: async () => {
      const response = await getByListLaunches(search, page);
      return response;
    }
  });

  const launches = data?.launches ?? [];
  const hasNext = data?.hasNext ?? false;
  const hasPrev = data?.hasPrev ?? false;
  const totalPages = data?.totalPages ?? 0;

  return (<div className='flex flex-col'>
    <div className='flex justify-center'>
      <h1 className='text-xl text-white font-bold'>
        Registros de lançamentos
      </h1>
    </div>
    <div className='flex justify-center items-center h-full'>
      <div className='flex flex-row gap-4 items-center md:mt-8 md:mb-8'>
      <TextField
        id="filled-basic"
        placeholder="Search here"
        variant="outlined"
        className="md:w-[800px]"
        sx={{
          borderRadius: '8px',
          color: 'white',
          background: 'gray',
        }}
        size="small"
        onChange={(e)=>{
          setValueSearch(e.target.value);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img className='h-6 w-6' src={searchIconUrl} alt="Search Icon" />
            </InputAdornment>
          ),
        }}
        />
        
        <Button variant='contained' size="small"
          className="md:w-36  md:h-36"
          sx={{
            height: 20,
            backgroundColor: '#F57C00',
            color:'black',
            "@media (min-width:600px)": {
              height: 30,
            },
          }}
          onClick={()=>setSearch(valueSearch)}
        >
          Buscar
        </Button>
      </div>
    </div>

    <div className='md:flex md:justify-center md:items-center mb-8 mt-8'>
      <div className='bg-gray-500 md:w-[90%] md:justify-center'>       
        <TableContainer className="md:flex md:justify-center">
          <Table sx={{ 
            minWidth: 300,
            "@media (min-width:600px)": {
              width: '80%',
            },
          }}>
            <TableHead>
              <TableRow>
                <TableCell className='hidden md:flex md:h-20 md:items-center md:justify-center'>
                  Nº Voo
                </TableCell>
                <TableCell className='hidden md:flex md:h-20 md:items-center md:justify-center'>
                  Logo
                </TableCell>
                <TableCell className='hidden md:flex md:h-20 md:items-center md:justify-center'>
                  Missão
                </TableCell>
                <TableCell className='hidden md:flex md:h-20 md:items-center md:justify-center'>
                  Data de lançamento
                </TableCell>
                <TableCell className='hidden md:flex md:h-20 md:items-center md:justify-center'>
                  Foguete
                </TableCell>
                <TableCell className='hidden md:flex md:h-20 md:items-center md:justify-center pr-6'>
                  Resultado
                </TableCell>
                <TableCell className='hidden md:flex md:h-20 md:items-center md:justify-center'>
                  Vídeo
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className='bg-gray-500 '>
              {
                launches && launches.map(({date_utc, flight_number, name, rocket, success, webcast, id})=>{
                    return (<Line 
                      date_utc={date_utc}
                      flight_number={flight_number}
                      name={name}
                      rocket_name={rocket.name}
                      success={success}
                      webcast={webcast}
                      key={id}
                    />)
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
        <Navigation 
          page={page} 
          totalPages={totalPages} 
          hasNext={hasNext} 
          hasPrev={hasPrev} 
        />
        </div>
      </div>
  </div>)
}