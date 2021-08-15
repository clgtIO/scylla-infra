import pg from 'pg'

const generateRandomId = (n) => {
  const s = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return Array(n)
    .join()
    .split(',')
    .map(() => {
      return s.charAt(Math.floor(Math.random() * s.length))
    })
    .join('')
}

const client = new pg.Client({
  user: 'root',
  host: 'localhost',
  database: 'scylla',
  password: '',
  port: 26257,
})
await client.connect()

console.time('start')

for (let i = 0; i < 10000; i++) {
  const r = await client.query('INSERT INTO test_size (id, uid, link) VALUES (DEFAULT, \'100064286381616\', $1) RETURNING ID', [`https://scontent.fhan2-1.fna.fbcdn.net/v/t1.6435-9/fr/cp0/e15/q65/125085470_${generateRandomId(16)}_8504316935653276184_n.jpg?_nc_cat=101&ccb=1-4&_nc_sid=caaa8d&_nc_ohc=jp7bqh_RjF0AX-C9lVR&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan2-1.fna&_nc_rmd=260&oh=${generateRandomId(32)}&oe=${generateRandomId(8)}`.replace(10)])
  console.log(r.rows[0].id)
}

console.timeEnd('start')
console.log('ok')

await client.end()
