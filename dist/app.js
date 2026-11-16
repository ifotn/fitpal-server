// express imports
import express from "express";
import mongoose from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
// local file imports using .js for runtime
import exercises from './controllers/exercises.controller.js';
// create new express application
const app = express();
app.use(express.json()); //bodyParser.json());
// mongoose db conn
const db = process.env.DB || '';
mongoose.connect(db, {})
    .then((res) => console.log('Connected to MongoDB'))
    .catch((err) => console.log(`Connection Error: ${err}`));
// cors config - allow our react client to make api calls
app.use(cors({
    origin: process.env.CLIENT_DOMAIN,
    methods: 'GET,POST,PUT,DELETE,HEAD,OPTIONS',
    allowedHeaders: 'Content-Type'
}));
// swagger setup for api doc generation
const swaggerSpec = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'FitPal API',
            version: '1.0.0'
        }
    },
    apis: ['./dist/controllers/*.js'] // api methods w/YAML comment location
};
// create new document from these specs
const openApiSpecs = swaggerJSDoc(swaggerSpec);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpecs));
// map urls to appropriate controllers
app.use('/api/v1/exercises', exercises);
// start server.  use random port on Render server w/4000 as fallback
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Express running on port ` + port);
});
