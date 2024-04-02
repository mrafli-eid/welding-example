import { Pagination } from "../models/pagination.model";

export function getDefaultPagination(): Pagination {
    return {
        page_number: 1,
        page_size: 10,
        total_count: 100,
        total_pages: 10,
    };
}