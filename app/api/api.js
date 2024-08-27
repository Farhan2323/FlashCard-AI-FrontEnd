const axios = require("axios")
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getFlashcards = async(flashcardSetName) => {
    return await axios.get(`${apiUrl}/get-flashcards`, {
        params: {flashcardSetName: flashcardSetName}
    })
    .then(response => {
        console.log('data in api: ', response.data)
        return response.data;
    })
    .catch(error => {
        console.log(error)
        return null
    })
 }
 export default getFlashcards