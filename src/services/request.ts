import { apiSpace } from "./api";
import { ResponseGetLaunchesByList } from "./types";

export const getByListLaunches =  async (value: string, page: number): Promise<ResponseGetLaunchesByList> => {
    const filters = [];
    filters.push({ type: 'page', value: page });
    filters.push({ type: 'limit', value: 5 });
    if (value) filters.push({ type: 'search', value });

    const filterUrl = filters.map((filter) => `${filter.type}=${filter.value}`).join('&');
    const requestFilter = `/launches?${filterUrl}`
    const response = await apiSpace.get(requestFilter);
    return response.data
}