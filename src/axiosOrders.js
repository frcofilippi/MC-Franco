import axios from 'axios';

const orderInstance = axios.create({
    baseURL: 'https://react-mc-franco.firebaseio.com/'
})

export default orderInstance;