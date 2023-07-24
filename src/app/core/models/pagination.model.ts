export interface Pagination {
    page_number: number;
    page_size: number;
    total_count: number;
    total_pages: number;
    has_previous?: boolean;
    has_next?: boolean;
}
