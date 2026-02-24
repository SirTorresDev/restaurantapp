import React, { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Divider, List, Avatar, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import globalStyles from "@/styles/global";

import FirebaseContext from "../context/firebase/firebaseContext";
import PedidosContext from "../context/pedidos/pedidosContext";


const Menu = () => {

    // Context de Firebase
    const { menu, obtenerProductos } = useContext(FirebaseContext);

    // Context de Pedidos
    const { seleccionarPlatillo } = useContext(PedidosContext);

    // Hook para redireccionar
    const navigation = useNavigation();

    useEffect(() => {
        obtenerProductos();
    }, []);

    const mostrarHeading = (categoria, index) => {
        if(index === 0 || menu[index - 1].categoria !== categoria) {
            return (
                <View style={styles.separador}>
                    <Text style={styles.separadorTexto}>{categoria}</Text>
                    <Divider />
                </View>
            );
        }
    }

    return (
        <View style={globalStyles.container}>
            <View style={styles.container}>
    
                {menu.map((platillo, index) => (
                    <View key={platillo.id}>
                    {mostrarHeading(platillo.categoria, index)}

                        <List.Item
                            title={platillo.nombre}
                            description={platillo.descripcion}
                            titleStyle={{fontWeight: 'bold'}}
                            left={props => <Avatar.Image style={{marginLeft: 10}} size={60} source={{uri: platillo.imagen}} />}
                            right={props => <Text style={{padding: 20, fontWeight: 'bold'}}>{platillo.precio} €</Text>}
                            onPress={() => {
                                seleccionarPlatillo(platillo);
                                navigation.navigate("DetallePlatillo");
                            }}
                        />
                        <Divider />
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    separador: {
        backgroundColor: '#000',
    },
    separadorTexto: {
        color: '#FFDA00',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginLeft: 10,
        padding: 5,
    }
});

export default Menu;