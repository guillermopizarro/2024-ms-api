import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'

//import create_roles from './libs/initialSetup'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import productRoutes from './routes/product.routes'

const app = express()
//create_roles()

app.set('pkg', pkg)
app.set('json spaces', 4)
app.use( morgan('dev') )

app.use( express.json() )
app.use( express.urlencoded({extended:false}) )

app.use('/users', userRoutes)
app.use('/auth', authRoutes)
app.use('/products', productRoutes)

export default app