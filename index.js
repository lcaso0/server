const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection(
    {
    user: "sql5419090",
    host: "sql5.freesqldatabase.com",
    password: "Hj3v3RnDVD",
    database: "sql5419090"
    }
)

app.post('/sendorderison', (req, res) => {
    const email = req.body.email;
    const orderid = req.body.orderid;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
          user: 'gtalcaso@gmail.com',
          pass: 'Jawad.qassab5680'
        }
      });

    var mailOptions = {
        from: 'gtalcaso@gmail.com',
        to: `${email}`,
        subject: `#${orderid}`,
        text: `طلبك قيد التنفيد ان لم تم استلامه خلال 24 ساعة ان لم استلمته تواصل معنا عبر الايميل.`
        // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.send(error);
        } else {
          console.log("Sented email")
        }
        transporter.close();
      });
})

app.post('/sendemail', (req, res) => {
    const email = req.body.email;
    const subject = req.body.subject;
    const text = req.body.text;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
          user: 'gtalcaso@gmail.com',
          pass: 'Jawad.qassab5680'
        }
      });

    var mailOptions = {
        from: 'gtalcaso@gmail.com',
        to: `${email}`,
        subject: `${subject}`,
        text: `${text}`
        // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.send(error);
        } else {
          console.log("Sented email")
        }
        transporter.close();
      });
})

app.get('/getproducts', (req, res) => {

    db.query("SELECT * FROM products", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })

})

app.get('/getorderison', (req, res) => {

    db.query("SELECT * FROM orderison", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })

})

app.post('/addorderison', (req, res) => {
    const title = req.body.title;
    const price = req.body.price;
    const email = req.body.email;
    const orderid = req.body.orderid;

    db.query("INSERT INTO orderison (title, price, email, orderid) VALUES(?,?,?,?)", [title, price, email, orderid], 
    (err, result) => {
        if (err) 
        {
            console.log(err)
        }
        else {
            res.send("Values inserted")
        }
    });
})

app.delete('/deleteorderison/:id', (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM orderison WHERE id = ?", id, (err, result) => {
      if (err) {
          console.log(err)
      }
      else {
          console.log("Value deleted")
      }
  })
})

app.post('/addorderisdone', (req, res) => {
  const title = req.body.title;
  const price = req.body.price;
  const email = req.body.email;
  const orderid = req.body.orderid;

  db.query("INSERT INTO orderisdone (title, price, email, orderid) VALUES(?,?,?,?)", [title, price, email, orderid], 
  (err, result) => {
      if (err) 
      {
          console.log(err)
      }
      else {
          res.send("Values inserted")
      }
  });
})

app.post('/addproduct', (req, res) => {
  const title = req.body.title;
  const price = req.body.price;
  const img = req.body.img

  db.query("INSERT INTO products (title, price, img) VALUES(?,?,?)", [title, price, img], 
  (err, result) => {
      if (err) 
      {
          console.log(err)
      }
      else {
          res.send("Values inserted")
      }
  });
})

app.put('/updateproductprice', (req, res) => {
  const id = req.body.id;
  const price = req.body.price;

  db.query("UPDATE products SET price = ? WHERE id = ?", [price, id], 
    (err, result) => {
        if (err)
        {
            console.log(err)
        }
        else {
            res.send("Values updated")
        }
    }
  )
})

app.delete('/deleteproduct/:id', (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM products WHERE id = ?", id, (err, result) => {
      if (err) {
          console.log(err)
      }
      else {
          console.log("Value deleted")
      }
  })
})

app.get('/getorderisdone', (req, res) => {

  db.query("SELECT * FROM orderisdone", (err, result) => {
      if (err) {
          console.log(err);
      }
      else {
          res.send(result);
      }
  })

})


app.listen('3001', () => {
    console.log('Server is running on port 3001');
})