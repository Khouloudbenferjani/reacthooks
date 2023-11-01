//Import Express & Database function to connect
const express = require("express");
const dbConn = require("./Config/dbConfig");
const filmSchema = require("./modeles/film");
const userSchema = require("./modeles/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
  
    

var cors = require('cors');


//Define port number and express module
const port = 5000;
const app = express();

require('dotenv').config()

//Use json to be able to read json files
app.use(express.json());
app.use(cors())

dbConn();

// --------------------------------------------------------------------------------------
// realted to login


// login-----------------------
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  userSchema.findOne({ email }).then((chekedUser) => {
    if (chekedUser) {
      bcrypt.compare(password, chekedUser.password, function (err, result) {

        if (result) {
          const token = jwt.sign( {id:chekedUser._id }, 'thisisakey');
          res.status(200).send({token:token})
        }else{
          res.status(401).send("Check your password");
        }
       
      });
    } else {
      res.status(400).send("try to register first or check your email");
    }
  });
});


// register---------------------------------------
app.post("/register", (req, res) => {
  const { email, password } = req.body;

  userSchema.findOne({ email }).then((checkedUser) => {
    console.log(checkedUser);
    if (checkedUser) {
      res.status(200).send("email already used !");
    } else {
      const newUser = new userSchema(req.body);

      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          newUser.password = hash;
          newUser.save()
            .then((result) => {
              res.status(200).send(result);
            })
            .catch((error) => {
              res.status(500).send("unable to register user");
              console.log(error);
            });
        });
      });
    }
  });
});



// --------------------------------------------------------------------------------------------
// app.get("/getFilm", async (req, res) => {
//   try {
//     const Film = await filmSchema.find();
//     res.status(200).send(film);
//   } catch (error) {
//     res.status(500).send("cannot get films");
//     console.log(error);
//   }
// });

app.get("/getFilms", async (req, res) => {
  try {
    const Film = await filmSchema.find()
    res.status(200).send(Film);
    
  } catch (error) {
    
    res.status(500).send("cannot get films");
    console.log(error);
  }

})
//--------------------------------------
app.get("/getFilmbyid/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const film = await filmSchema.findById(id);
    film
      ? res.status(200).send(film)
      : res.status(404).send("film not found");
  } catch (error) {
    res.status(500).send("cannot get film");
    console.log(error);
  }
});

// update from DB by Field
app.put('/UpdateFilmByName/:name', (req, res) => {
  try {
    const { name } = req.params
    filmSchema.findOneAndUpdate(
      {
        name: name  // search query
      },
      {
        ...req.body  // field:values to update
      },
      {
        new: true,                       // return updated doc
        runValidators: true              // validate before update
      })
      .then(doc => {
        console.log(doc)
        if (doc) {
          res.send({ result: "user updated", newuser: doc })

        }else{
          res.send({ result: "cannot find user", newuser: doc })

        }
      })
      .catch(err => {
        console.error(err)
      })

  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }

})
// update from DB by ID
app.put('/UpdateFilmById/:id', (req, res) => {
  try {
    const { id } = req.params
    filmSchema.findByIdAndUpdate(

      id,  // search query

      {
        $set: {
          ...req.body  // field:values to update
        }
      }
      ,
      {
       // overwrite : true,
        new: true,                       // return updated doc
        runValidators: true              // validate before update
      })
      .then(doc => {
        console.log(doc)
        res.send({ result: "user updated", newuser: doc })
      })
      .catch(err => {
        console.error(err)
      })

  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }

})

//delete from DB by ID 

app.delete('/deleteFilmById/:id', (req, res) => {
    try {
      const { id } = req.params
      filmSchema.findByIdAndDelete(id).then(async response=>{
        if (response) {
          const newList = await filmSchema.find()
            res.send(newList)
            
        }else{
            res.send("error")
        }
      })
        } catch (error) {
            console.log(error);
            res.status(500).send("server error")
          }   
    })


    app.post('/addFilm', async (req, res) => {
      try {
        console.log(req.body);
        const newfilm =  new filmSchema(req.body)
        console.log("schema",newfilm);
        newfilm.save().then(result=>{
          if (result) {
            res.send(result)
          }
        })
      }
      catch (error) {
        res.status(500).send("unable to add new film")
        console.log(error)
      }
    })

    
  //Start our server

app.listen(port, (error) => {
  error
    ? console.log(error)
    : console.log(`server running on.. http://localhost:${port}`);
});
    
  