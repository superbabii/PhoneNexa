import { createSlice } from "@reduxjs/toolkit";

// import {dispatch} from "../store";

const initialState = {
    sidebar: {
        open: false,
        type: "CONTACT",
    }
}

const slice = createSlice ({
    name: 'app',
    initialState,
    reducers: {
        toggleSidebar(state, action) {
            state.sidebar.open = !state.sidebar.open;
        },
        updateSidebarType(state, action) {
            state.sidebar.type = action.payload.type;
        }
    }
});

export default slice.reducer;

export const toggleSidebar = () => async (dispatch) => {
    dispatch(slice.actions.toggleSidebar());
};

export const updateSidebarType = (type) => async (dispatch) => {
    dispatch(slice.actions.updateSidebarType({ type }));
};