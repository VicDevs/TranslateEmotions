import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomInput from "../../Components/CustomInput";
import Botao from "../../Components/Botao";
import { CONTAINER_CENTER } from "../../Theme/styles";
import { ERROR_COLOR, WHITE } from "../../utils/constants";
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useTranslation } from "react-i18next";

export default function Login() {

    const schema = yup.object({
        username: yup.string().required("Informe seu usuário").min(4, "Usuário deve conter no minimo 4 dígitos"),
        senha: yup.string().min(6, "A senha deve conter 6 digitos").required("Informe sua senha")
    })

    const {control, handleSubmit, formState:{ errors }} = useForm({
        resolver: yupResolver(schema)
    })

    const handleLogin = (data) => {
       console.log(data)
    }

    const { t } = useTranslation();
    
    return(
        <ScrollView style={{backgroundColor : WHITE}}>
            <SafeAreaView style={styles.container}>
            <Controller
                control={control}
                name="username"
                render={({ field : { onChange, onBlur, value } }) => (
                    <CustomInput label={t('user')} placeholder={t('PH_user')} onChange={onChange} value={value} isInvalid={errors.username}/>
                )}
            />
            {errors.username && <Text style={styles.error}>{errors.username?.message}</Text>}

            <Controller
                control={control}
                name="senha"
                render={({ field : { onChange, onBlur, value } }) => (
                    <CustomInput label={t('senha')} placeholder={t('PH_senha')} secure={true} onChange={onChange} value={value} isInvalid={errors.senha}/>       
                )}
            />
            {errors.senha && <Text style={styles.error}>{errors.senha?.message}</Text>}

            <View style={{width : '90%', paddingTop : 10}}>
                <Botao titulo={t('login')} onPressBtn={handleSubmit(handleLogin)}/>
            </View>
        </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container : CONTAINER_CENTER,
    error : {
        color : ERROR_COLOR,
        alignSelf : 'flex-start',
        paddingLeft : '5%'
    }
})