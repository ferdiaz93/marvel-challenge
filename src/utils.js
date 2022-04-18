import axios from "axios"
import md5 from "md5";

export const getCharacterInfo = (id) => {
    let milliseconds = Number(new Date());
    let hash = md5(milliseconds + process.env.REACT_APP_PRIVATE_KEY + process.env.REACT_APP_PUBLIC_KEY);
    let apiParameters = `ts=${milliseconds}&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${hash}`;
    
    return axios.get(`${process.env.REACT_APP_API_URL}/characters/${id}/comics?${apiParameters}`)
}