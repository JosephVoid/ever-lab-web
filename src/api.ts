import axios from 'axios';

export const getTests = async () => {
    try {
        let result = await axios.get((process.env.REACT_APP_BASE_URL as string)+"/getTests");
        console.log(result)
        return result.status === 200 ? result.data : null
    } catch (error) {
        alert("Netowrk Error")
        console.log(error);
        return false
    }
}

export const uploadORU = async (file: File):Promise<boolean> => {
    var formData = new FormData();
    formData.append("oru", file);
    try {
        let result = await axios.post((process.env.REACT_APP_BASE_URL as string)+"/upload", formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
        return result.status === 200
    } catch (error) {
        alert("Netowrk Error")
        console.log(error);
        return false;
    }
}