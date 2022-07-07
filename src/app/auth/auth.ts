export interface SignupCredentials {
    username: string;
    password: string;
    passwordConfirmation: string;
};

export interface SignedinResponse {
    authenticated: boolean;
    username: string | null;
};

export interface SigninCredentials {
    username: string;
    password: string;
};
