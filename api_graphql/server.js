const express = require('express')
const { createHandler } = require('graphql-http')
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } = require('graphql')

const config = require('./config')
const database = require('./database')
database(config.DB_URL)

const ProductModel = require('./model')

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        value: { type: GraphQLInt },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        products: {
            type: new GraphQLList(ProductType),
            resolve:  async () => {
                try {
                    console.log('Resolviendo la consulta de productos');
                    const products = await ProductModel.find();
                    console.log('Productos encontrados:', products);
                    return products
                } catch (error) {
                    console.error('Error al obtener productos:', error);
                    throw new Error('Error fetching products');
                }
            },
        },
    },
});

const RootMutation = new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
        addProduct: {
        type: ProductType,
        args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            value: { type: new GraphQLNonNull(GraphQLInt) },
        },
        resolve: async (_, args) => {
            try {
                const product = new ProductModel(args);
                return await product.save();
            } catch (error) {
                console.error('Error al almacenar productos:', error);
                throw new Error('Error fetching products');
            }
        },
        },
    },
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});

const app = express();
app.use('/', express.static('public'))

app.use(
    '/graphql',
    createHandler({ 
        schema: schema, 
        graphiql: true,
        onError: (error) => {
            console.error('GraphQL Error: ', error);
        }
    })
);

app.listen(config.PORT, () => {
  console.log(`Server is running on port http://localhost:${config.PORT}.`);
});
