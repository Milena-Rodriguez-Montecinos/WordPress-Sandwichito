import axios from 'axios'
import CredentialsManager from '../../common/api/credentials.manager'

class HttpRequestManager{

    static makeRequest(verb, uri, data = '', authCredentials = 'AdminCredentials', baseURL=null) {
        let instance = axios.create(CredentialsManager.getCredentials(authCredentials, baseURL));

        switch(verb) {
            case "GET":
                return instance.get(instance.defaults.baseURL + "/wp-json/" + uri, instance.defaults.auth);
            case "POST":
                return instance.post(instance.defautls.baseURL + "/wp-json/" + uri, data, instance.defaults.auth)
            case "DELETE":   
                return instance.delete(instace.defaults.baseURL + "/wp-json/" + uri, data, instance.defaults.auth) 
        }
    }
}

export default HttpRequestManager;