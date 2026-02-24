import React, { useReducer } from 'react';
import FirebaseReducer from './firebaseReducer';
import FirebaseContext from './firebaseContext';
import { OBTENER_PRODUCTOS, OBTENER_PRODUCTOS_EXITO } from '../../types';
import firebase from '../../firebase';
import _ from 'lodash'; 

const FirebaseState = props => {

    // Crear state inicial
    const initialState = {
        menu: [],
    }


    // useReducer con dispatch y state
    const [state, dispatch] = useReducer(FirebaseReducer, initialState);

    //Función para obtener los productos
    const obtenerProductos = () => {
        dispatch({
            type: OBTENER_PRODUCTOS,
            payload: []
        });

        // consultar firebase, los que tengan existencia = true
        firebase.db.collection('productos').where('existencia', '==', true).onSnapshot(manejarSnapshot);

        function manejarSnapshot(snapshot) {
            let platillos = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });

            // Ordenar por categoria con lodash
            platillos = _.sortBy(platillos, 'categoria');

            dispatch({
                type: OBTENER_PRODUCTOS_EXITO,
                payload: platillos
            });
        }
    }

    return (
        <FirebaseContext.Provider value={{menu: state.menu, firebase, obtenerProductos}}>
            {props.children}
        </FirebaseContext.Provider>
    );
}

export default FirebaseState;