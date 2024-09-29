const express = require('express');
const cookieParser = require('cookie-parser');
require("dotenv").config()
const swaggerConfig = require("./src/config/swagger.config");
const { AllRoutes } = require('./src/index.routes');
const NotFoundException = require('./src/common/exceptions/notfound.exception');
const AllErrors = require('./src/common/exceptions/all.exception');
const expressEjsLayouts = require('express-ejs-layouts');
const moment = require('jalali-moment');
const methodOverride = require('method-override');
function main(){
    const app = express()
    const PORT = process.env.PORT || 5000
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(cookieParser(process.env.COOKIE_SECRET_KEY))
    app.use(express.static('public'))
    require("./src/config/mongoose.config")
    app.use(expressEjsLayouts)
    app.set("view engine", "ejs")
    app.set("layout extractScript",true)
    app.set("layout extractStyle",true)
    app.set("view engine", "ejs")
    app.set("layout", "./layouts/panel/main.ejs")
    app.use(methodOverride("_method"))
    app.use(AllRoutes)
    app.locals.moment = moment
    swaggerConfig(app)
    NotFoundException(app)
    AllErrors(app)
    app.listen(PORT,()=>{
        console.log(`server: http://localhost:${PORT}`);
    })
}
main()