export interface MicrosoftSecurityUpdates {
    currentReleaseDate?: String;
    cvrfUrl?: String;
    documentTitle?: String;
    id?: number;
    id_ms_log?: String;
    initialReleaseDate?: String;
};

export interface PaginatedResponse<T> {
    content: T;
    totalElements: number;
    totalPages: number;
}

export type TypeAlert = 'danger'|'warning'|'primary'|String;