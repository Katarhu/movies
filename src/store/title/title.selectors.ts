import {RootState} from "@/store";
import {createSelector} from "reselect";


const selectFeature = (state: RootState) => state.titleSearch;

export const selectTitleMovie = createSelector(selectFeature, (state) => state.movie);
export const selectTitleIsLoading = createSelector(selectFeature, (state) => state.isLoading);
export const selectTitleError = createSelector(selectFeature, (state) => state.error);