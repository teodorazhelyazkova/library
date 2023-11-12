import { action, makeObservable, observable, computed } from 'mobx';

export class AuthStore {
    public userEmail: string | null = null;

    constructor() {
        makeObservable(this, {
            userEmail: observable,
            isAuthorized: computed,

            setUserEmail: action.bound,
            resetUserEmail: action.bound,
        });
    }

    public setUserEmail(email: string | null) {
        this.userEmail = email;
    }

    public resetUserEmail() {
        this.userEmail = null;
    }

    public get isAuthorized() {
        return !!this.userEmail;
    }
}
