import React from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, Modal } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextInputCustom from '../shared/TextInputCustom';
import { useState } from 'react';
import api, { saveRefreshToken, saveToken } from '../api/api';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function LogIn({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pay, setPay] = useState(false);
    const [message, setMessage] = useState(false);

    function sendData() {
        api('auth/user', 'post',{
            email: email,
            password: password
        }, 'user')
        .then(async res => {
            if (res.data.token !== undefined) {
                
                await saveToken('user', res.data.token)
                await saveRefreshToken('user', res.data.refreshToken)
                try {
                    await AsyncStorage.setItem('@user', JSON.stringify(res.data.Id))
                } catch (error) {
                    console.log(error)
                }
                api('api/subscriber/' + res.data.Id, 'get' , {}, 'user')
                .then(async res => {
                    if(res.data.length !== 0 && res.data[0].expireAt > new Date().toISOString().split('T')[0]){
                        navigation.navigate('ReceptionCarpet');
                    }else if (res.data.length === 0){
                        var date = new Date(); // Now
                        date.setDate(date.getDate() + 15)
                        
                        api('api/subscriber/add', 'post', {
                            userId: await AsyncStorage.getItem('@user'),
                            timeAt: new Date().toISOString().split('T')[0],
                            expireAt: date.toISOString().split('T')[0],
                            price: 0
                        }, 'user')
                        .then(() => {
                            navigation.navigate('ReceptionCarpet');
                        })
                        .catch(error => console.log(error))
                    }else {
                        setPay(true)
                    }
                })
                .catch(error => console.log(error))
                
            }else {
                setMessage(true)
            }
        })
        .catch(error => console.log(error))
    }

    return (
        <ImageBackground style = {styles.background} source={require('../assets/hero-bg.jpg')}>
            <View style={styles.backgrgoundView}>
                <View >
                    <Text style={styles.title}>LOG IN</Text>
                </View>
                <TextInputCustom text='Email:' changeText={setEmail} value={email} name='mail-bulk' size={30} color='#fec400' keyboard = 'email-address'/>
                <TextInputCustom text='Lozinka:' changeText={setPassword} value={password} name='key' size={30} color='#fec400' keyboard = 'visible-password'/>
                <View style={styles.button}>
                    <Button
                        color={'#fec400'}
                        title='Posalji'
                        onPress={() => {sendData()}}
                    />
                </View>
                <View style={styles.textBottom}>
                    <Text style={{color: '#fff', fontSize: 18}}>Nemate nalog? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SING UP')}>
                        <Text style={{color: '#fec400', fontSize:26}}>Sing Up</Text>
                    </TouchableOpacity>
                </View>
                <View style={(message === true || pay === true) ? styles.show : styles.hidden}>
                    <TouchableOpacity onPress={() => {setPay(false), setMessage(false)}}>
                        <Icon size={20} name='window-close' color={'#fec400'} />
                    </TouchableOpacity>
                    <Text style={styles.messageError}>
                        {(message === true) ? "Email adresa ili lozinka nisu tacni!" : ''}
                        {(pay === true) ? "Vasa pretplata je istekla!" : ''}
                    </Text>
                </View>
            </View>
            
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    messageError: {
        color: '#fec400',
        fontSize: 20
    },
    show: {
        display: 'flex',
        width: '80%',
        height: 100,
        borderColor: '#793ea5',
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '80%',
        backgroundColor: '#000000cc'
    },
    hidden: {
        display: 'none'
    },
    textBottom: {
        position: 'absolute',
        bottom: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 42,
        color: '#fec400'
    },
    button: {
        marginTop: 30,
        flexDirection: 'row'
    },
    background: {
        flex: 1
    },
    backgrgoundView: {
        flex: 1,
        backgroundColor: '#00000099',
        paddingTop: 150,
        alignItems: 'center',
    }
})
