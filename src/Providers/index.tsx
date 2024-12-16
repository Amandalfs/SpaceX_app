import { Outlet } from 'react-router';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export function Providers() {
    return (<QueryClientProvider client={queryClient}>
        <Outlet /> 
    </QueryClientProvider>) 
}