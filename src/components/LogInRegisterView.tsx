import { useStoreRehydrated } from "easy-peasy";
import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { useStoreState, useStoreActions } from "../store/hooks"


const LogInRegisterView = () => {
	const [loginText, onChangeLoginText] = React.useState("");
	const [passwordText, onChangePasswordText] = React.useState("");

	const errorMsg = useStoreState(state => state.logInRegisterErrorMessage);
	const isLoggingIn = useStoreState(state => state.isLoggingIn);
	const isRegistering = useStoreState(state => state.isRegistering);
	const setIsLoggingIn = useStoreActions(actions => actions.setIsLoggingIn);
	const setIsRegistering = useStoreActions(actions => actions.setIsRegistering);
	const setLogInRegisterErrorMessage =
		useStoreActions(actions => actions.setLogInRegisterErrorMessage);
	const logIn = useStoreActions(actions => actions.logIn);
	const register = useStoreActions(actions => actions.register);

	const style: object[] = [styles.container, styles.hidden];
	let infoText = "";
	if (isLoggingIn) {
		style[1] = styles.visible;
		infoText = "Log in";
	}
	if (isRegistering) {
		style[1] = styles.visible;
		infoText = "Register";
	}

	const onConfirmPress = () => {
		setLogInRegisterErrorMessage("");
		if (isLoggingIn) {
			logIn({ name: loginText, password: passwordText })
		}
		else {
			return register({ name: loginText, password: passwordText })
		}
		onChangeLoginText("");
		onChangePasswordText("");
	};

	const onCancelPress = () => {
		setIsLoggingIn(false);
		setIsRegistering(false);
		setLogInRegisterErrorMessage("");
		onChangeLoginText("");
		onChangePasswordText("");
	};

	return (
		<View style={style}>
			<Text style={styles.text}>{infoText}</Text>
			<TextInput style={styles.text} placeholder="Login"
				onChangeText={onChangeLoginText} value={loginText} />
			<TextInput style={styles.text} secureTextEntry={true}
				placeholder="Password" onChangeText={onChangePasswordText}
				value={passwordText} />
			<Button onPress={onConfirmPress} title="Confirm" />
			<Button onPress={onCancelPress} title="Cancel" />
			<Text style={styles.text}>{errorMsg}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	visible: {
		display: "flex",
	},
	hidden: {
		display: "none",
		height: 0,
		width: 0,
	},
	container: {
		position: "absolute",
		zIndex: 1,
		left: 0,
		top: 0,
		width: "100%",
		height: "100%",
		overflow: "visible",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.8)",
		justifyContent: "center"
	},
	text: {
		color: "white",
		fontSize: 40,
	}
});
export default LogInRegisterView;