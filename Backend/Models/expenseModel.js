import db from '../database.js';
const ExpenseModel={
   fetch: (callback)=>{
       db.all('SELECT * FROM expenses',[],callback);
   },
   add:(type,fullDate,item,price,category,callback)=>{
       db.run('INSERT INTO expenses(type,fullDate,item,price,category) VALUES(?,?,?,?,?)',[type,fullDate,item,price,category],callback);
   },
   delete:(id,callback)=>{
       db.run('DELETE FROM expenses WHERE id=?',[id],callback);
   },
   update:(id,type,fullDate,item,price,category,callback)=>{
       db.run('UPDATE expenses SET type=? ,fullDate=?,item=?,price=?,category=? WHERE id=?',[type,fullDate,item,price,category,id],callback);
   }
};

export default ExpenseModel;
