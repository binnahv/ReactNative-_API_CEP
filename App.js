import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function App() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);

  const buscarEndereco = async () => {
    if (!cep) {
      Alert.alert('Erro', 'Por favor, digite um CEP válido');
      return;
    }

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      
      if (response.data.erro) {
        Alert.alert('Erro', 'CEP não encontrado');
        setEndereco(null);
      } else {
        setEndereco(response.data);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar o endereço');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Endereço por CEP</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o CEP"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
      />
      <Button title="Buscar" onPress={buscarEndereco} />

      {endereco && (
        <View style={styles.result}>
          <Text style={styles.label}>Endereço: {endereco.logradouro}</Text>
          <Text style={styles.label}>Bairro: {endereco.bairro}</Text>
          <Text style={styles.label}>Cidade: {endereco.localidade}</Text>
          <Text style={styles.label}>Estado: {endereco.uf}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f0f0f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  result: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});
