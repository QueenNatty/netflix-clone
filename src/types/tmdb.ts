export interface Movie{
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
}

export interface TmdbListResponse<T> {
    page: number;
    results: T[];
    total_page: number;
    total_results: number;
}

export interface Genre {
    id:number;
    name: string;
}

export interface Video {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
    official:boolean;
}

export interface MovieDetails extends Movie {
    runtime: number | null;
    tagline: string;
    genres: Genre[];
    videos: { results: Video[] };
}