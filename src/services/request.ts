import { apiSpace } from "./api";
import { ResponseGetLaunchesByList, StatsPizzaResponse } from "./types";

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

export const getStatsPizza = async (): Promise<StatsPizzaResponse> => {
    const response = await apiSpace.get("/launches/stats");
    return response.data;
}



interface StatsColumnResponse {
    [key: string]: Array<{
        rocketName: string;
        rocketId: string;
        year: string;
        reused: boolean;
        count: number;
    }>;
}

export const listDatasByYears = async (): Promise<StatsColumnResponse> => {
    const response = await apiSpace.get("/launches/stats/years");
    return response.data.stats
}
