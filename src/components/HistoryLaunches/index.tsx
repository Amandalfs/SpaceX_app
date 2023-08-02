import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { Line } from './Line';
import { apiSpace } from '../../services/api';
import {  useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

import searchIconUrl from "../../assets/search.svg";

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
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [update, setUpdate] = useState(false);
  const [launches, setLaunches] = useState<Ilaunches[]>([]);
  const [valueSearch, setValueSearch] = useState("");

  async function getBylist(){
    const url = valueSearch?`/launches?limit=4&page=${page}&search=${valueSearch}`:`/launches?limit=4&page=${page}`
    const response = await apiSpace.get(url);
    setHasNext(response.data.hasNext);  
    setHasPrev(response.data.hasPrev);
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
          onClick={()=>{
            getBylist();
          }}
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
              <div className='hidden md:flex md:h-20 md:items-center md:justify-center'>
                <div className='flex justify-start gap-[56px] font-bold pr-12'>
                  <div>
                    Nº Voo
                  </div>
                  <div>
                    Logo
                  </div>
                <div>
                  Missão
                </div>
                <div>
                  Data de lançamento
                </div>
                <div>
                  Foguete
                </div>
                <div className='pr-6'>
                  Resultado
                </div>
                <div>
                  Vídeo
                </div>
                </div>
              </div>
              <TableBody className='bg-gray-500 '>
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
          <div className='flex row text-right justify-end md:w-[90%]'>
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
        </div>
      </div>
  </div>)
}