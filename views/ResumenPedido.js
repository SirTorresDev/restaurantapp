import React, { useContext, useEffect } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { List, Button, Avatar, Divider } from "react-native-paper";
import PedidosContext from "@/context/pedidos/pedidosContext";
import globalStyles from "@/styles/global";
import {useNavigation} from "@react-navigation/native";
import firebase from "@/firebase";



const ResumenPedido = () => {

    const navigation = useNavigation();

    //Context de Pedidos
    const { pedido, total, mostrarResumen, eliminarProducto, pedidoOrdenado } = useContext(PedidosContext);

    useEffect(() => {
        const totalCalculado = pedido.reduce((acumulado, platillo) => acumulado + platillo.total, 0);
        mostrarResumen(totalCalculado);
    }, [pedido, mostrarResumen]);

    const confirmarEliminarProducto = id => {
        Alert.alert(
            "¿Deseas eliminar este producto?",
            "Una vez eliminado no podrás recuperarlo",
            [
                {
                    text: "Confirmar",
                    onPress: () => {
                       eliminarProducto(id);
                    },
                },
                {
                    text: "Cancelar",
                    style: "cancel"
                }
            ]
        );
    }

    const progresoPedido = () => {
        Alert.alert(
            "Revisa tu pedido",
            "Una vez confirmado no podrás cambiar el pedido",
            [
                {
                    text: "Confirmar",
                    onPress: async () => {
                        const pedidoObj = {
                            tiempoEntrega: 0,
                            completado: false,
                            totalPagar: Number(total),
                            orden: pedido,
                            creado: Date.now(),
                        }
                        try {
                            const pedidoRef = await firebase.db.collection("ordenes").add(pedidoObj);
                            pedidoOrdenado(pedidoRef.id);
                            navigation.navigate("ProgresoPedido", { pedido: pedidoObj, idPedido: pedidoRef.id });
                        } catch (error) {
                            console.error("Error al guardar el pedido:", error);
                        }
                    }
                },
                {
                    text: "Revisar",
                    style: "cancel"
                },
            ])
    }



    return (
        <View style={globalStyles.container}>
            <View style={styles.content}>
                <Text style={globalStyles.titulo}>Resumen del pedido</Text>
                {pedido.length === 0 ? (
                    <Text>No hay platillos en el pedido.</Text>
                ) : (
                    pedido.map((platillo, index) => {
                        const { cantidad, nombre, imagen, id, precio } = platillo;
                        return (
                            <List.Item 
                                key={`${id}-${index}`} 
                                style={styles.item} 
                                title={nombre} 
                                description={`Cantidad: ${cantidad} \nPrecio: ${precio}€`} 
                                left={props => <Avatar.Image {...props} style={styles.avatar} source={{uri: imagen}} />} 
                                right={props => <Button onPress={() => confirmarEliminarProducto(id)} mode={'text'} style={styles.botonEliminar}><Text style={styles.textoEliminar}>Eliminar</Text></Button>} 
                            />
                        );
                    })
                )}
                <Divider />
                <Text style={[globalStyles.cantidad, styles.total]}>Total a pagar: {total} €</Text>
                <Button onPress={() => navigation.navigate("Menu")} style={[globalStyles.button, styles.button]}>
                    <Text style={[globalStyles.botonTexto, styles.botonTexto]}>Continuar Comprando</Text>
                </Button>
            </View>
            <View>
                <View style={styles.footer}>
                    <Button mode={'text'} style={[globalStyles.button, styles.buttonOrder]} onPress={progresoPedido}>
                        <Text style={globalStyles.botonTexto}>Confirmar Pedido</Text>
                    </Button>
                </View>
            </View> 
        </View>
        
    );
}

const styles = StyleSheet.create({
    content: {
        marginHorizontal: '2.5%',
        flex: 1,
    },
    item: {
        marginBottom: 10,
    },
    avatar: {
        backgroundColor: 'transparent',
        marginLeft: 10,
    },
    botonTexto: {
        color: 'white',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    button: {
        marginHorizontal: '2.5%',
        backgroundColor: '#000000',
        marginTop: 20,
    },
    total: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20,
    },
    footer: {
        height: 70,
        alignItems: 'center',
    },
    buttonOrder: {
       width: '90%',
       marginBottom: 30,
    },
    textoEliminar: {
        color: 'white',
        fontWeight: 'bold',
    },
    botonEliminar: {
        backgroundColor: '#E6615E',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },

});

export default ResumenPedido;