
export type MetaType = {
    pagination: PaginationType;
}

export type PaginationType = {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}