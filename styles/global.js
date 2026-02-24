import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'center',

    },
    cantidad:{
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
    },
    container: {
        flex: 1,
    },

    content: {
        marginHorizontal: '2.5%',
        flex: 1,
    },

    button: {
        backgroundColor: '#FFDA00',
    },

    botonTexto: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#000',
    }
});

export default globalStyles;