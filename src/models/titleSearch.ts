import {IMovie} from "@/models/movie";

export interface ITitleSearchState {
    movie: IMovie | null;
    error: string | null;
    isLoading: boolean;
}