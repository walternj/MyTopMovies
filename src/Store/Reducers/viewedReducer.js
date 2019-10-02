const initialState = { viewedMovies: []}

export default function toogleViewed (state = initialState, action) {
    let nextState
    switch(action.type) {
        case 'TOGGLE_VIEWED':
            const viewedMoviesIndex = state.viewedMovies.findIndex(item => item.id === action.value.id )
            if (viewedMoviesIndex !== -1) {
                //supression
                nextState = {
                    ...state,
                    viewedMovies: state.viewedMovies.filter((item, index) => index !== viewedMoviesIndex),
                }
            } else {
                //ajouter
                nextState = {
                    ...state,
                    viewedMovies: [...state.viewedMovies, action.value],
                } 
            } 
            return nextState || state
        default:
            return state
    }
}