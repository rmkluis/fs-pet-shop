import pg from 'pg';

const pool = new pg.pool({
    database: 'petshop',
})

pool.query('SELECT * FROM pets').then((res)=>{
    console.log(res.rows);
    pool.end();
})