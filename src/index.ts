import express, {Request, Response} from 'express'

const app = express()

app.get('/', (req: Request, res:Response) => {
    res.send('Hello World')
})

app.get('/users', (req: Request, res: Response) => {
    res.send('endoint de users')
})

app.listen(3000, () => {
    console.log('Server on port 3000')
})

