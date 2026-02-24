import React, { useContext }  from "react";
import { View, } from "react-native";
import { Button, Text, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "@/styles/global";


import PedidosContext from "../context/pedidos/pedidosContext";



const DetallePlatillo = () => {
    const { platillo } = useContext(PedidosContext);
    const navigation = useNavigation();

    if (!platillo) {
        return (
            <View style={[globalStyles.container, styles.container]}>
                <View style={styles.content}>
                    <Text style={styles.cardTitle}>No hay platillo seleccionado</Text>
                </View>
                <View style={styles.footer}>
                    <Button mode={'text'} style={[globalStyles.button, styles.button]} onPress={() => navigation.navigate("Menu")}>
                        <Text style={globalStyles.botonTexto}>Volver al menú</Text>
                    </Button>
                </View>
            </View>
        );
    }

    const { nombre, imagen, descripcion, precio } = platillo;

    return (
        <View style={[globalStyles.container, styles.container]}>
             <View style={styles.content}>
                <Text style={styles.cardTitle}>{nombre}</Text>
                <Card mode={'elevated'} style={styles.card}>
                    <Card.Cover source={{uri: imagen}} />
                    <Text style={styles.descripcion}>{descripcion}</Text>
                    <Text style={styles.precio}>Precio: {precio} €</Text>
                </Card>
             </View>
            <View style={styles.footer}>
                <Button mode={'text'} style={[globalStyles.button, styles.button]} onPress={() => navigation.navigate("FormularioPlatillo")}>
                    <Text style={globalStyles.botonTexto}>Ordenar Platillo</Text>
                </Button>
            </View>
        </View>
    );
}

const styles = {
    card: {
        margin: 20,
        padding: 10,
    },
    cardTitle: {
        marginTop: 20,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    descripcion: {
        marginHorizontal: 10,
        marginTop: 10,
        fontSize: 16
    },
    precio: {
        marginHorizontal: 10,
        textAlign: 'left',
        fontSize: 24,
        fontWeight: 'bold'
    },
    container: {
        flex: 1, // Ocupa toda la pantalla
        justifyContent: 'space-between', // Separa contenido y footer
    },
    content: {
        flex: 1, // Toma el espacio restante,
    },
    footer: {
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
       width: '90%',
       marginBottom: 30,
    },
}

export default DetallePlatillo;