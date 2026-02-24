import React, { useReducer, useMemo, useCallback } from 'react';

import PedidosReducer from './pedidosReducer';
import PedidosContext from './pedidosContext';

import { SELECCIONAR_PRODUCTO, CONFIRMAR_ORDENAR_PLATILLO, MOSTRAR_RESUMEN, ELIMINAR_PRODUCTO, PEDIDO_ORDENADO } from '../../types';

const PedidosState = props => {

    // Crear state inicial
    const initialState = {
        pedido: [],
        platillo: null,
        total: 0,
        idPedido: '',
    }


    // useReducer con dispatch y state
    const [state, dispatch] = useReducer(PedidosReducer, initialState);

    const guardarPedido = useCallback((pedido) => {
        dispatch({
            type: CONFIRMAR_ORDENAR_PLATILLO,
            payload: pedido
        })
    }, []);

    //Seleccionar el producto que el usuario desea ordenar
    const seleccionarPlatillo = useCallback((platillo) => {
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: platillo
        })
    }, []);

    const mostrarResumen = useCallback((total) => {
        dispatch({
            type: MOSTRAR_RESUMEN,
            payload: total
        })
    }, []);

    const eliminarProducto = useCallback((id) => {
        dispatch({
            type: ELIMINAR_PRODUCTO,
            payload: id
        });
    }, []);

    const pedidoOrdenado = useCallback((id) => {
        dispatch({
            type: PEDIDO_ORDENADO,
            payload: id
        });
    }, []);

    const value = useMemo(() => ({
        pedido: state.pedido,
        platillo: state.platillo,
        total: state.total,
        idPedido: state.idPedido,
        seleccionarPlatillo,
        guardarPedido,
        mostrarResumen,
        eliminarProducto,
        pedidoOrdenado,
    }), [state.pedido, state.platillo, state.total, state.idPedido, seleccionarPlatillo, guardarPedido, mostrarResumen, eliminarProducto, pedidoOrdenado]);

    return (
        <PedidosContext.Provider value={value}>
            {props.children}
        </PedidosContext.Provider>
    );
}

export default PedidosState;