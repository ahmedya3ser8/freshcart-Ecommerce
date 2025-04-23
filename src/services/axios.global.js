import axios from "axios";

axios.defaults.baseURL = 'https://ecommerce.routemisr.com'
axios.defaults.headers.common['token'] = localStorage.getItem('user-token');
axios.defaults.headers.common['Content-Type'] = 'application/json';
