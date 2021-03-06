import React, { Component } from 'react';
import { Alert, Picker, ScrollView, View } from 'react-native';
import { Button, FormLabel, FormInput, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import firebase from 'firebase';
import styles from 'assets/styles/default';
import styleRegister from 'assets/styles/register';
import estados from 'config/estados';

export default class CadastroEvento extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            nameEvent: '', descEvent: '', dateEvent: '', 
            city: '', uf: '', hours: '',
            buttonDisabled: true
        };

        this.createEvent = this.createEvent.bind(this);
    }

    componentWillMount() {
        if(!firebase.apps.length){
            firebase.initializeApp({
                apiKey: "AIzaSyBACpCdpjfehh2--YWyidK5P8iU4XvTNnY",
                authDomain: "app-fretbus.firebaseapp.com",
                databaseURL: "https://app-fretbus.firebaseio.com",
                projectId: "app-fretbus",
                storageBucket: "app-fretbus.appspot.com",
                messagingSenderId: "411818722996"
            });
        }
    }

    fieldsInWhite = () => {
        const { nameEvent, descEvent, dateEvent, city, uf, hours } = this.state;
    
        if( nameEvent != '' && descEvent != '' && dateEvent != '' 
            && uf != '' && city != '' && hours != '') {
            this.setState({ buttonDisabled: false });
        } else {
            this.setState({ buttonDisabled: true });
        }
    };

    
    createEvent() {
        const events = firebase.database().ref('eventos');

        events.push().set({
            nome_evento: this.state.nameEvent,
            desc_evento: this.state.descEvent,
            data_evento: this.state.dateEvent,
            cidade: this.state.city,
            uf: this.state.uf,
            horario: this.state.hours
        });

        Alert.alert(
            'Sucesso!',
            'Evento cadastrado com sucesso!!',
            [
                {text: 'CONCLUIR', onPress: () => Actions.principal({index: 1})}
            ]
        );
    }

    render() {
        return(
            
            <View style={styles.container}>
                <ScrollView>
                    <Icon
                        raised name='arrow-back'
                        color='#0083B7'
                        onPress={() => Actions.principal({index: 1})} 
                    />

                    <View style={styleRegister.listDatas}>

                        <Icon
                            name='event-note'
                            iconStyle={styleRegister.iconBus}
                            size={100}
                        />

                        <FormLabel labelStyle={styles.labels}>Nome</FormLabel>
                        <FormInput
                            inputStyle={styles.inputs}
                            placeholder={'Nome do Evento'}
                            placeholderTextColor={'#CCC'}
                            maxLength={30}
                            onChangeText={(nameEvent) => this.setState({nameEvent})}
                            onKeyPress={() => this.fieldsInWhite()}
                            value={this.state.nameEvent}
                        />

                        <FormLabel labelStyle={styles.labels}>Descrição</FormLabel>
                        <FormInput
                            inputStyle={styles.inputs}
                            placeholder={'Descrição do Evento'}
                            placeholderTextColor={'#CCC'}
                            multiline={true}
                            onChangeText={(descEvent) => this.setState({descEvent})}
                            onKeyPress={() => this.fieldsInWhite()}
                            value={this.state.descEvent}
                        />

                        <FormLabel labelStyle={styles.labels}>Data</FormLabel>
                        <FormInput
                            inputStyle={styles.inputs}
                            placeholder={'Data do Evento'}
                            placeholderTextColor={'#CCC'}
                            keyboardType={'numeric'}
                            maxLength={10}
                            onChangeText={(dateEvent) => this.setState({dateEvent})}
                            onKeyPress={() => this.fieldsInWhite()}
                            value={this.state.dateEvent}
                        />

                        <FormLabel labelStyle={styles.labels}>Cidade</FormLabel>
                        <FormInput
                            inputStyle={styles.inputs}
                            placeholder={'Cidade do Evento'}
                            placeholderTextColor={'#CCC'}
                            maxLength={40}
                            onChangeText={(city) => this.setState({city})}
                            onKeyPress={() => this.fieldsInWhite()}
                            value={this.state.city}
                        />

                        <FormLabel labelStyle={styles.labels}>Estado</FormLabel>
                        <View style={[styles.inputs, {marginHorizontal: 15}]}>
                            <Picker
                                selectedValue={this.state.uf}
                                onValueChange={(uf) => this.setState({uf})}
                                style={{color: '#FFF'}}>
                                <Picker.Item label="Selecione o estado do evento" value="" />
                                {
                                    estados.map((estado, key) => 
                                        (
                                            <Picker.Item key={key} label={estado.uf} value={estado.uf} />
                                        )
                                    )
                                }
                            </Picker>  
                        </View>

                        <FormLabel labelStyle={styles.labels}>Horário</FormLabel>
                        <FormInput
                            inputStyle={styles.inputs}
                            placeholder={'Horário de Início'}
                            placeholderTextColor={'#CCC'}
                            maxLength={5}
                            onChangeText={(hours) => this.setState({hours})}
                            onKeyPress={() => this.fieldsInWhite()}
                            value={this.state.hours}
                        />

                        <Button
                            buttonStyle={styles.button}
                            title={'Cadastrar'}
                            color={'#0083B7'}
                            fontSize={20}
                            icon={{name: 'check', color: '#0083B7', size: 20}}
                            onPress={() => this.createEvent()}
                            disabled={this.state.buttonDisabled}
                        />
                    </View>
                </ScrollView>

            </View>
        );
    };
}
