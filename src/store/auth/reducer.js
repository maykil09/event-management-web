import {SET_USER_ROLE} from "./constant";

const initialState = {
    userSession: {}
};

export default function (state = initialState, {type, payload}) {
    switch (type) {
        case SET_USER_ROLE:
            break;

        default:
            return state;
    }
}
