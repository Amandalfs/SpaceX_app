
interface ILaunches {
    id: string;
    success: boolean;
    flight_number: number;
    date_utc: string;
    webcast: string;
    reused: boolean;
    name: string;
    rocket_id: string;
    rocket: {
        id: string;
        name: string;
    };
    Payload: {
        id: string;
        name: string;
        launchId: string;
    }[];
}


export interface ResponseGetLaunchesByList {
    totalDocs: number;
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
    launches: ILaunches[]
}


export interface StatsPizzaResponse {
    statsPizza: Array<{
        name: string;
        used: boolean;
        count: number;
    }>;
    success: number;
    failures: number;
}

export interface StatsColumnResponse {
    [key: string]: Array<{
        rocketName: string;
        rocketId: string;
        year: string;
        reused: boolean;
        count: number;
    }>;
}