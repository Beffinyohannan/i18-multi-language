const mongoose = require("mongoose")


const LanguageSchema = mongoose.Schema({
    language: {
        type: String,
    },
    languageCode: {
        type: String,
    },
    flagCode: {
        type: String,
    },
    languageDatas: {
        type: Object,
    },
    status: {
        type: String,
        default: 'active'
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },

})
mongoose.set('strictQuery', false);

const Languages = mongoose.model('Language', LanguageSchema)
module.exports = Languages