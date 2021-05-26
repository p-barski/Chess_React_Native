export default class AuthenticationMessage {
	Registration: boolean;
	Username: string;
	Password: string;
	constructor(registration: boolean, name: string, password: string) {
		this.Registration = registration;
		this.Username = name;
		this.Password = password;
	}
}
