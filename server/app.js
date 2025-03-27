require("dotenv").config();

const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')

app.use(cors({
    // origin: process.env.FRONT_END_PORT,
    origin: [process.env.FRONT_END_PORT, process.env.FRONT_END_PORT1, process.env.FRONT_END_PORT2],
    credentials: true, //access-control-allow-credentials:true
}))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

const laguagehRouter = require('./routes/languageRouter')

app.use('/api', laguagehRouter)

// const languages = {
//     en: {
//         welcome: "hello world",
//         description: "Edit <1>src/App.jsx</1> and save to test HMR",
//         other: "its a dynamic value {{name_field}} here you see"

//     },
//     de: {
//         welcome: "Hallo Wereld",
//         description: "Bewerk <1>src/App.jsx</1> en sla op om HMR te testen",
//     },
//     ar: {
//         welcome: "مرحبا بالعالم",
//         description: "قم بتحرير <1>src/App.jsx</1> واحفظه لاختبار HMR",
//         other: "إنها قيمة ديناميكية {{name_field}} هنا كما ترى"
//     },
// };

// app.get('/api/language/:lng', (req, res) => {
//     const { lng } = req.params;
//     const languageData = languages[lng] || languages['en'];
//     // console.log(languageData,'qwrty');
//     res.json(languageData);
// });

const { connectDb } = require('./config/connection')
connectDb()

app.use((err, req, res, next) => {
    const error = {
        success: false,
        status: err.status || 500,
        message: err.message || "Something went wrong",
    };
    res.status(error.status).json(error)
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));