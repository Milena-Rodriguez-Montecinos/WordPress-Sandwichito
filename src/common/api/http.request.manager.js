import axios from 'axios'
import CredentialsManager from '../../common/api/credentials.manager'

class HttpRequestManager{

    static makeRequest(verb, uri, data = '', authCredentials = 'AdminCredentials', baseURL=null) {

        let instance = axios.create(CredentialsManager.getCredentials(authCredentials, baseURL));
        let endpoint = instance.defaults.baseURL + "/wp-json/" + uri;

        switch(verb) {
            case "GET":
                return instance.get(endpoint, instance.defaults.auth);
            case "POST":
                return instance.post(endpoint, data, instance.defaults.auth)
            case "DELETE":   
                return instance.delete(endpoint, data, instance.defaults.auth) 
        }
    }
}

export default HttpRequestManager;
