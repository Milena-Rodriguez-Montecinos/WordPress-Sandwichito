import axios from 'axios'
import CredentialsManager from '../../common/api/credentials.manager'

class HttpRequestManager{

    static makeRequest(verb, uri, data = '', authCredentials = 'AdminCredentials') {
        let instance = axios.create(CredentialsManager.getCredentials(authCredentials));

        switch(verb) {
            case "GET":
                return instance.get(instance.defaults.baseURL + "/wp-json/" + uri, instance.defaults.auth);
            case "POST":
                return instance.post(instance.defaults.baseURL + "/wp-json/" + uri, data, instance.defaults.auth);
            case "DELETE": 
                return instance.delete(instance.defaults.baseURL + "/wp-json/" + uri, {data: { force: data.force, reassign: data.reassign }}, instance.defaults.auth); 
        }
    }
}

export default HttpRequestManager;