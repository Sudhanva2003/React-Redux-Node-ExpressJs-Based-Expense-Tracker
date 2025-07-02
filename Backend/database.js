import sqlite3 from 'sqlite3';

const db=new sqlite3.Database('./expenses.db',(err)=>{
   if(err){
       console.log('error connecting to database',err.message);
   }
   else{
       console.log("connected to sqlite database");
   }
  
  
});

db.serialize(()=>{
   //db.serialize ensures that all db operations inside callback are executed sequentially
//(one after another)
   db.run('CREATE TABLE IF NOT EXISTS expenses ( id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT,fullDate DATE,item TEXT, price NUMBER, category TEXT)');
  
});


export default db;
