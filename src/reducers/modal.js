import * as types from './../contants/modal';

const initialState = {
    showmodal: false,
    component: null,
    showmodalGiay: false,
    componentGiay: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_MODAL:
            {
                return {
                    ...state,
                    showmodal: true,
                };
            }
        case types.HIDE_MODAL:
            {
                return {
                    ...state,
                    showmodal: false,
                    title: '',
                    component: null,
                };
            }
        case types.CHANGE_MODAL_TITLE:
            {
                const { title } = action.payload;
                return {
                    ...state,
                    title,
                };
            }
        case types.CHANGE_MODAL_CONTENT:
            {
                const { component } = action.payload;
                return {
                    ...state,
                    component,
                };
            }

            //modal giay
        case types.SHOW_MODAL_GIAY:
            {
                return {
                    ...state,
                    showmodalGiay: true,
                };
            }
        case types.HIDE_MODAL_GIAY:
            {
                return {
                    ...state,
                    showmodalGiay: false,
                    title: '',
                    componentGiay: null,
                };
            }
        case types.CHANGE_MODAL_GIAY_TITLE:
            {
                const { titleGiay } = action.payload;
                return {
                    ...state,
                    titleGiay,
                };
            }
        case types.CHANGE_MODAL_GIAY_CONTENT:
            {
                const { componentGiay } = action.payload;
                return {
                    ...state,
                    componentGiay,
                };
            }
        default:
            return state;
    }
};

export default reducer;