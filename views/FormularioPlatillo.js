import React, { useContext, useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Text, IconButton, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "@/styles/global";
import PedidosContext from "@/context/pedidos/pedidosContext";


const FormularioPlatillo = () => {

    const navigation = useNavigation();
    const { platillo, guardarPedido } = useContext(PedidosContext);

    // State para la cantidad
    const [cantidad, setCantidad] = React.useState("1");
    const [total, setTotal] = React.useState(0);

    useEffect(() => {
        if (!platillo) {
            navigation.navigate("Menu");
            return;
        }

        const cantidadNumerica = Number.parseInt(cantidad, 10) || 0;
        setTotal(cantidadNumerica * platillo.precio);
    }, [cantidad, platillo, navigation]);


     const incremetarCantidad = () => {
        setCantidad(prev => (Number.parseInt(prev) + 1).toString());
    }

    const decrementarCantidad = () => {
        setCantidad(prev => (Number.parseInt(prev) - 1).toString());
    }

    const confirmarOrden = () => {
        Alert.alert(
            "¿Deseas confirmar tu pedido?",
            "Una vez confirmado no podrás cambiar la cantidad",
            [
                {
                    text: "Confirmar",  
                    onPress: () => {
                        // Almacenar el pidido al pedido actual

                        // Navegar hacia el resumen de pedido
                        const pedido = {
                            ...platillo,
                            cantidad: Number.parseInt(cantidad, 10) || 1,
                            total,
                        }
                        guardarPedido(pedido);
                        navigation.navigate("ResumenPedido");
                    },
                },
                {
                    text: "Cancelar",   
                    style: "cancel"
                }
            ]
        );
    }

    return (
          <View style={[globalStyles.container, styles.container]}>
            <View style={styles.content}>
                <Text style={styles.title}>Cantidad</Text>
                <View style={styles.row}>
                    <IconButton mode="contained" icon="minus" size={16} style={styles.button} onPress={() => cantidad > 1 ? decrementarCantidad() : null}/>
                    <TextInput
                        mode="outlined"
                        style={styles.input}
                        keyboardType="numeric"
                        value={cantidad}
                        onChangeText={(text) => setCantidad(text)}
                    />
                    <IconButton mode="contained" icon="plus" size={16} style={styles.button} onPress={() => cantidad >= 1 ? incremetarCantidad() : null} />
                </View>
                <Text style={[globalStyles.cantidad, styles.total]}>Total: {total}€</Text>
            </View>
                <View style={styles.footer}>
                    <Button mode={'text'} style={[globalStyles.button, styles.buttonOrder]} onPress={() => confirmarOrden()}>
                        <Text style={globalStyles.botonTexto}>Agregar a Pedido</Text>
                    </Button>
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
     content: {
        flex: 1, // Toma el espacio restante,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
    },
    title: {
        fontWeight: "bold",
        marginVertical: 20,
        textAlign: "center",
        fontSize: 24,
    },
    button: {
        height: 80,
        width: '30%',
        backgroundColor: '#FFDA00',
    },
    input: {
        height: 80,
        textAlign: "center",
    },
     footer: {
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    total: {
        fontWeight: "bold",
        fontSize: 24,
        marginTop: 20,
        textAlign: "center",
    },
    buttonOrder: {
       width: '90%',
       marginBottom: 30,
    },
});

export default FormularioPlatillo;