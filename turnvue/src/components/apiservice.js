import axios from 'axios'
export default {
postdata(resource, data) {
        return axios.post(resource, data)
    },

}

