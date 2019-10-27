import axios from 'axios';
import config from '../config';

export const loadInventories = (callBack)=>{
    return axios({
        method:'get',
        url: `${config.api}/api/inventories`,
    }).then(response=>{
        callBack(response.data)
    })
}