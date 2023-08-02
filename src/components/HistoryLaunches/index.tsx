import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { Line } from './Line';
import { apiSpace } from '../../services/api';
import { FormEvent, useEffect, useState } from 'react';
import { Button, Input, TextField } from '@mui/material';

interface Ilaunches {
  id: string,
  date_utc: string,
  flight_number: number,
  name: string,
  webcast: string,
  rocket: {
    id: string,
    name: string,
  },
  success: boolean
}

export function HistoryLaunches(){
  const [hasNext, setHasNext] = useState(null);
  const [hasPrev, setHasPrev] = useState(null);    
  const [totalDocs, setTotalDocs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [update, setUpdate] = useState(false);
  const [launches, setLaunches] = useState<Ilaunches[]>([]);
  
  async function getBylist(){
    const response = await apiSpace.get(`/launches?limit=4&page=${page}`);
    setHasNext(response.data.hasNext);  
    setHasPrev(response.data.hasPrev);
    setTotalDocs(response.data.totalDocs);
    setTotalPages(response.data.totalPages);
    setLaunches(response.data.launches);
  }

  function onNextPage(nextPage: string){
    if(hasNext){
      setPage(Number(nextPage));
      setUpdate(!update);
    }
  }

  function onPrevPage(prevPage: string){
    if(hasPrev){
      setPage(Number(prevPage)-1);
      setUpdate(!update);
    }
  }

  useEffect(()=>{
    getBylist();
  },[update]);

  return (<div className='flex flex-col'>
    <div className='flex justify-center items-center h-full'>
      <div className='flex flex-row gap-4 items-center'>
        <TextField id="filled-basic" label="Search here" variant="filled"
          sx={{
            border: '1px solid #F57C00',
            borderRadius: '8px',
            color: 'white',
          }}
          size='small'
        />
        <Button variant='contained' size="small"
          sx={{
            height: 20,
            backgroundColor: '#F57C00',
            color:'black'
          }}
        >
          Buscar
        </Button>
      </div>
    </div>
    <TableContainer>
        <Table sx={{ minWidth: 300 }}>
          <TableBody className='bg-gray-150'>
            {
              launches.map(({date_utc, flight_number, name, rocket, success, webcast, id})=>{
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
      <div className='flex row text-right justify-end'>
        <div className='flex flex-row gap-1 m-2'>
          <button className='flex bg-orange-50 h-8 w-8 rounded-lg items-center justify-center'
            onClick={(e: any)=>{
              onPrevPage(e.target.innerText);
            }}
          >
            {page}   
          </button>
          {
          hasNext  && (<><button className='flex bg-orange-50 h-8 w-8 rounded-lg items-center justify-center'
            onClick={(e: any)=>{
              onNextPage(e.target.innerText);
            }}
          >
            {Number(page)+1}          
          </button>
          <button className='flex h-8 w-8 rounded-lg items-center justify-center'>
            ...          
          </button>
          <button className='flex bg-orange-50 h-8 w-8 rounded-lg items-center justify-center'
            onClick={(e: any)=>{
              onNextPage(e.target.innerText);
            }}
          >
            {totalPages}
          </button></>)
          }
        </div>
      </div>
  </div>)
}