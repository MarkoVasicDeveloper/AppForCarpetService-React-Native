import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, ImageBackground, TextInput } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TextInputCustom from '../shared/TextInputCustom';
import api from '../api/api';

const SingUp = ({navigation}) => {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [required, setRequired] = useState(false);
    const [message, setMessage] = useState(false);

    function sendData () {
        if (name === '' || surname === '' || city === '' || address === '' || phone === '' || email === '' || password === '') {
            setRequired(true)
            return;
        }

        api('api/user/addUser', 'post', {
            email: email,
            password: password,
            name: name,
            surname: surname,
            city: city,
            address: address,
            phone: phone
        })
        .then(res => {
            console.log(res.data)
            if (res.data.statusCode === -10001) {
                setMessage(true)
            }else {
                setMessage(false)
                navigation.navigate('LOG IN')
            }
        })
        .catch(error => console.log(error))
    }
    
    return (
        <ImageBackground style={style.background} source={require('../assets/hero-bg.jpg')}>
            <View style={style.backgroundView}>
                <View >
                    <Text style={style.title}>SING UP</Text>
                </View>
                <ScrollView style={style.scroll} contentContainerStyle={{alignItems: 'center'}}>
                    <View>
                        <TextInputCustom text='Ime: ' size = {30} color='#fec400' name='signature' value={name} changeText = {setName} />
                    </View>

                    <View>
                        <TextInputCustom text='Prezime: ' size = {30} color='#fec400' name='signature' value={surname} changeText = {setSurname}/>
                    </View>

                    <View>
                        <TextInputCustom text='Grad: ' size = {30} color='#fec400' name='city' value={city} changeText = {setCity}/>
                    </View>

                    <View>
                        <TextInputCustom text='Adresa: ' size = {30} color='#fec400' name='address-book' value={address} changeText = {setAddress}/>
                    </View>

                    <View>
                        <TextInputCustom text='Telefon: ' size = {30} color='#fec400' name='phone' value={phone} changeText = {setPhone} keyboard = 'phone-pad' />
                    </View>

                    <View>
                        <TextInputCustom text='Email: ' size = {30} color='#fec400' name='mail-bulk' value={email} changeText = {setEmail} keyboard = 'email-address' />
                    </View>

                    <View>
                        <TextInputCustom text='Lozinka: ' size = {30} color='#fec400' name='key' value={password} changeText = {setPassword} keyboard = 'visible-password' />
                    </View>
                    <View style={style.buttonView}>
                        <Button title='Posalji...' color={'#fec400'} onPress={() => sendData()} />
                    </View>
                </ScrollView>
                <View style={(required === false) ? style.hidden : style.showMessage}>
                    <TouchableOpacity onPress={() => {setRequired(false), setMessage(false)}}>
                        <Icon size={20} name='window-close' color={'#fec400'} />
                    </TouchableOpacity>
                    <Text style={style.text}>
                        {(message === true) ? 'Email je zauzet' : ''}
                        {(required === true) ? 'Sva polja moraju biti popunjena!' : ''}
                    </Text>
                </View>
            </View>
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    text: {
        fontSize: 20,
        color: '#fec400',
        textAlign: 'center'
    },
    showMessage: {
        position: 'absolute',
        top: 200,
        borderWidth: 1,
        borderColor: '#fec400',
        borderRadius: 20,
        width: '90%',
        height: 100,
        backgroundColor: '#000000dd',
        padding: 5,
        
    },
    hidden: {
        display: 'none'
    },
    buttonView: {
        margin: 10
    },
    scroll: {
        width: '100%',
    },
    background: {
        flex: 1,
    },
    backgroundView: {
        flex: 1,
        backgroundColor: '#00000099',
        paddingTop: 80,
        alignItems: 'center',
    },
    title: {
        fontSize: 42,
        color: '#fec400'
    },
})

export default SingUp
