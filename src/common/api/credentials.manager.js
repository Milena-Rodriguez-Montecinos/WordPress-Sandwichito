import instances from '../../resources/instances.json'

class CredentialsManager{
    static getCredentials(authCredentials, baseURL = null) {
        switch(authCredentials) {
            case "AdminCredentials":
                instances.AdminCredentials.baseURL = baseURL !=null ? baseURL: instances.AdminCredentials.baseURL;                                    
                return instances.AdminCredentials
            case "InvalidCredentials":
                instances.InvalidCredentials.baseURL = baseURL !=null ? baseURL: instances.AdminCredentials.baseURL;                                    
                return instances.InvalidCredentials
        }
    }
}

export default CredentialsManager;