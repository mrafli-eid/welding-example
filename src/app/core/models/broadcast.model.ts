export interface BroadcastResponse {
    timestamp: number;
    values: BroadcastData[];
}

export interface BroadcastData {
    id: string;
    q: boolean;
    t: number;
    v: number;
}
