const { viewLanguage, translationData, createLanguage, editLanguage, blockLanguage, deleteLanguage, getLanguages } = require('../controllers/languageController')

const router = require('express').Router()


router.get('/view-languages',  viewLanguage)
router.get('/translations',  translationData)
router.post('/create-language',  createLanguage)
router.put('/edit-language/:id',  editLanguage)
router.put('/block-language/:id',  blockLanguage)
router.put('/delete-language/:id',  deleteLanguage)

router.get('/language/:lng', getLanguages)

module.exports = router