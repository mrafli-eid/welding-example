export interface ProductionGraphPlan {
    id: string;
    shift?: string;
    plan: number;
    date_time: string;
    created_at: string;
}

export interface ProductionGraphPlanParams {
    range: number;
}
