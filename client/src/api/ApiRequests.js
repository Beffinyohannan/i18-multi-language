import axios from '../api/Axios'

export const getLanguages = () => axios.get('/view-languages')

export const getTranslationData = () => axios.get('/translations')

export const createLanguages = (languageDetails) => axios.post('/create-language', languageDetails)

export const editLanguages = (id, languageDetails) => axios.put(`/edit-language/${id}`, languageDetails)

export const deactiveLanguages = (id) => axios.put(`/block-language/${id}`)

export const deleteLanguages = (id) => axios.put(`/delete-language/${id}`)