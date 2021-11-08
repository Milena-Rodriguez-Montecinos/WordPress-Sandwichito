import instances from '../../resources/instances.json'

class CredentialsManager{
    static getCredentials(authCredentials) {
        switch(authCredentials) {
            case "AdminCredentials":
                return instances.AdminCredentials
            case "InvalidCredentials":
                return instances.InvalidCredentials
        }
    }
}

export default CredentialsManager;