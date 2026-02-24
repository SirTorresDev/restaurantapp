import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import PedidosContext from "@/context/pedidos/pedidosContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import globalStyles from "@/styles/global";
import firebase from "@/firebase";
import CountDownTimer from "react-native-countdown-timer-hooks";

const ProgresoPedido = () => {

    const navigation = useNavigation();
    const route = useRoute();

    const { idPedido } = useContext(PedidosContext);
    const pedidoId = idPedido || route.params?.idPedido;

    const [tiempoEntrega, setTiempoEntrega] = useState(0);
    const [completado, setCompletado] = useState(false);

    useEffect(() => {
        if (!pedidoId) {
            return undefined;
        }

        const unsubscribe = firebase.db
            .collection("ordenes")
            .doc(pedidoId)
            .onSnapshot(function(doc) {
                if (!doc.exists) {
                    setTiempoEntrega(0);
                    setCompletado(false);
                    return;
                }
                const data = doc.data();
                const tiempoFinal = Number(data?.tiempoEntrega) || 0;
                setTiempoEntrega(tiempoFinal);
                setCompletado(Boolean(data?.completado));
            });

        return () => unsubscribe();
    }, [pedidoId]);


    const segundosTotales = Math.max(0, Math.round(tiempoEntrega * 60));

    const renderContent = () => {
        if (!pedidoId) {
            return (
                <View>
                    <Text style={globalStyles.titulo}>No hay pedido activo</Text>
                </View>
            );
        }

        if (completado) {
            return (
                <View style={globalStyles.contenido}> 
                    <Text style={styles.textoCompletado}>¡Tu orden está lista!</Text>
                    <Text style={styles.textoCompletado}>Pase a recoger su pedido</Text>

                    <Button style={[ globalStyles.button, styles.button ]}
                            mode="contained"
                            onPress={ () => navigation.navigate("NuevaOrden") }
                    >
                        <Text style={globalStyles.botonTexto}>Comenzar Una Orden Nueva</Text>
                    </Button>
                </View>
            );
        }

        if (tiempoEntrega === 0) {
            return (
                <View>
                    <Text style={globalStyles.titulo}>Hemos recibido tu orden...</Text>
                    <Text style={globalStyles.titulo}>Estamos calculando el tiempo de entrega</Text>
                </View>
            );
        }

        return (
            <View>
                <Text style={globalStyles.titulo}>Su orden estará lista en {tiempoEntrega} minutos</Text>
                <CountDownTimer
                    key={`countdown-${segundosTotales}`}
                    timestamp={segundosTotales}
                    containerStyle={styles.timerContainer}
                    textStyle={styles.timerText}
                />
            </View>
        );
    };

    return (
        <View style={globalStyles.container}>
            <View style={[globalStyles.contenido, styles.contenido]}>
                {renderContent()}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contenido: {
        flex: 1,    
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    tiempo: {
        marginBottom: 20,
        fontSize: 20,
        textAlign: 'center',
        marginTop: 30,
    },
    timerContainer: {
        marginTop: 12,
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#000',
    },
    timerText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFDA00',
    },
    textoCompletado: {
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 20,
    },
});

export default ProgresoPedido;