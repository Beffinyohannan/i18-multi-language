const Languages = require("../model/languageModel");

const viewLanguage = async (req, res, next) => {
    try {
        const languages = await Languages.find({ status: { $ne: "delete" } }).sort({ createdDate: -1 })

        res.status(200).json({ success: true, languages, message: "all Languages" });
    } catch (error) {
        // console.log(error);
        next(error)
    }
}

const translationData = async (req, res, next) => {
    try {
        const languages = await Languages.findOne({ languageCode: 'en' })
        // const translations =await languages.languageDatas

        res.status(200).json({ success: true, translations: languages?.languageDatas, message: "all Languages" });
    } catch (error) {
        // console.log(error);
        next(error)
    }
}

const createLanguage = async (req, res, next) => {
    try {
        // console.log(req.body);
        const body = req.body;

        // check weather the coupon is already exist
        let isExist = await Languages.findOne({ languageCode: body?.languageCode });
        if (isExist) throw createHttpError.Conflict("This laguage already in use");


        const newLanguage = new Languages(body)

        const language = await newLanguage.save();
        res.send({ success: true, language });
    } catch (error) {
        // console.log(error);
        next(error)
    }
}

const editLanguage = async (req, res, next) => {
    const id = req.params.id
    try {
        // console.log(id,'dfgfgfhg');
        // console.log(req.body);
        const { language, languageCode, flagCode, languageDatas } = req.body;

        const data = await Languages.updateOne({ _id: id },
            {
                $set: {
                    language: language,
                    languageCode: languageCode,
                    flagCode: flagCode,
                    languageDatas: languageDatas
                }
            })
        if (data) {
            res.status(200).json({ update: true, message: "language updated" });
        }

    } catch (error) {
        // console.log(error);
        next(error)
    }
}

const blockLanguage = async (req, res, next) => {
    try {
        const language = await Languages.findById(req.params.id)
        // console.log(user, 'users')
        if (language?.status === 'active') {
            await language.updateOne({ status: 'blocked' })
            res.status(200).json({ block: true, message: "blocked" })
        } else {
            await language.updateOne({ status: 'active' })
            res.status(200).json({ active: true, message: "unblocked" })
        }
    } catch (error) {
        next(error)
    }
}

const deleteLanguage = async (req, res, next) => {
    try {
        await Languages.updateOne({ _id: req.params.id }, { $set: { status: "delete" } })
        res.status(200).json({ delete: true, message: "deleted" })
    } catch (error) {
        next(error)
    }
}


const languages = {
    en: {
        welcome: "hello world",
        description: "Edit <1>src/App.jsx</1> and save to test HMR",
        other: "its a dynamic value {{name_field}} here you see"

    },
    de: {
        welcome: "Hallo Wereld",
        description: "Bewerk <1>src/App.jsx</1> en sla op om HMR te testen",
    },
    ar: {
        welcome: "مرحبا بالعالم",
        description: "قم بتحرير <1>src/App.jsx</1> واحفظه لاختبار HMR",
        other: "إنها قيمة ديناميكية {{name_field}} هنا كما ترى"
    },
};

const getLanguages = async (req, res, next) => {
    // console.log('hello hai');
    try {
        const { lng } = req.params;
        const languageDetails = await Languages.findOne({ languageCode: lng ? lng : 'en' })

        // const languageData = languages[lng] || languages['en'];
        let languageData
        if (languageDetails) {
            //taking from database
            languageData = languageDetails?.languageDatas
        } else {
            languageData = languages[lng] || languages['en'];

        }
        // console.log(languageData, 'qwrty');
        res.json(languageData);
    } catch (error) {
        next(error)
    }

}


module.exports = {
    viewLanguage,
    translationData,
    createLanguage,
    editLanguage,
    blockLanguage,
    deleteLanguage,
    getLanguages

}