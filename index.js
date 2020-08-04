const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())

app.disable('x-powered-by')

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}
app.use(cors(corsOptions))

app.get('/api/users', (req, res) => {
  const users = [
      {id: 1, firstName: 'Khaled', lastName: 'Saidi'},
      {id: 2, firstName: 'Haythem', lastName: 'Saidi'},
      {id: 3, firstName: 'Azza', lastName: 'Saidi'},
      {id: 4, firstName: 'Dalel', lastName: 'Saidi'}
  ]

  res.json(users)
})

const PORT = 5000

app.listen(PORT, 
  () => console.log(`Server started and running on port ${PORT}, http://localhost:5000/api/users`)
)
