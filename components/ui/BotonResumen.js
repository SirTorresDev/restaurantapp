import React from 'react';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '@/styles/global';
import { StyleSheet } from 'react-native';


const BotonResumen = () => {

    const navigation = useNavigation();

    return (
        <Button onPress={() => navigation.navigate("ResumenPedido")} style={[globalStyles.button, styles.button]}>
            <Text style={[globalStyles.botonTexto, styles.botonTexto]}>Ir al Pedido</Text>
        </Button>
    );
    

}

const styles = StyleSheet.create({
    botonTexto: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#FFDA00',
        marginRight: 10,
    },
});

export default BotonResumen;