import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from 'react-native-paper';
import globalStyles from "../styles/global";
import { useNavigation } from "@react-navigation/native";


const NuevaOrden = () => {

    const navigation = useNavigation();

    
    return (
        <View style={[globalStyles.container, styles.container]}>
            <Button 
                mode="contained" 
                onPress={() => navigation.navigate('Menu')}
                style={globalStyles.button}
            >
                <Text style={globalStyles.botonTexto}>Crear Nueva Orden</Text>
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginHorizontal: '2.5%',
    }
});


export default NuevaOrden;