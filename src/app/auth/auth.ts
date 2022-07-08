export interface SignupCredentials {
    username: string;
    password: string;
    passwordConfirmation: string;
};

export interface SignedinResponse {
    authenticated: boolean;
    username: string;
};

export interface SigninCredentials {
    username: string;
    password: string;
};
