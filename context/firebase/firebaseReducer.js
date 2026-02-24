import { OBTENER_PRODUCTOS, OBTENER_PRODUCTOS_EXITO } from '../../types';

export default (state, action) => {
    switch (action.type) {

        case OBTENER_PRODUCTOS:
            return {
                ...state,
                menu: action.payload
            }

        case OBTENER_PRODUCTOS_EXITO:
            return {
                ...state,
                menu: action.payload
            }

        default:
            return state;
    }
}