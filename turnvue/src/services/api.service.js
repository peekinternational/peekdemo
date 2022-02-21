import axios from 'axios'
import Vue from 'vue'


export default {
  getUsers(succes, error) {
      
    Vue.http.get('/getUsers/5d3e94ec4c09c13eb8d0e777/0/5d4c07fb030f5d0600bf5c03')
      .then(
	   (response) => {
                succes(response.data.usersList)
            },
            (response) => {
                error(response)
            })
  },
}

