import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import MovieCard from "./MoviaCard";
import * as Yup from 'yup'
import { useFormik } from "formik";


function MovieList() {
 const [film, setFilm] = useState({
    title: "",
    rate: null,
    date: null,
    imgUrl: "",
    description: "",
    category: ""
  })
 const [movieList, setMovieList] = useState([])
  // const movieSchema = Yup.object({
  //     name:Yup.string().required("please add a name")

  //   })
  //   const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
  //     initialValues: { name:name, name:rate, name:image },
  //     validationSchema:movieSchema,
  //     onSubmit: (values) => {
  //       values.name = ""
  // console.log("values",values.name);
  //       AddName(values.name)
  //     },
  //   });

  // -----------------------------------------------------------------------------------------




  // Function to add a new movie to the movie list
  const AddFilm = async () => {
    try {
      // send a post resuest to the server to add a person
      const response = await axios.post("http://localhost:5000/addFilm", film);
      // if the request is successful (status code 200), update the state
      if (response.status === 200) {
        setFilm({ ...film, title: "" })   // Clear the input field
        setMovieList([...movieList, response.data]); // add the new movie to the movie list
      }
    } catch (error) {
      console.log(error); // Log any errors that occur during the request 

    }
  }

  // Function to delete a person by their ID
  const DeleteFilm = async (id) => {
    console.log("this is the id", id);
    // Send a DELETE request to the server to delete a person by ID
    const response = await axios.delete(`http://localhost:5000/deleteFilmByid/${id}`);
    if (response.status === 200) {
      setMovieList(response.data); // Update the contact list after successful deletion
      console.log(MovieList)
      alert("Film deleted"); // Show a success message
    } else {
      alert("Something went wrong!"); // Show an error message if the deletion fails
    }
  };

  useEffect(() => {

    const getFilms = async () => {
      try {
        // Send a GET request to the server to fetch the list of persons
        const response = await axios.get("http://localhost:5000/getFilms");
        console.log(response); // Log the response for debugging
        setMovieList(response.data); // Update the contact list with the fetched data
      } catch (error) {
        console.log(error); // Log any errors that occur during the request
      }
    };
    getFilms(); // Call the getContacts function when the component mounts (empty dependency array)
  }, []);


  return (
    <div className="App">
      <input
        type="text"
        name="name"
        value={film.title}
        placeholder="Add your film please"
        onChange={(event) => {
          setFilm({ ...film, title: event.target.value });
        }}
      />
      <input
        type="text"
        name="rate"
        value={film.rate}
        placeholder="Add your film rate please"
        onChange={(event) => {
          setFilm({ ...film, rate: event.target.value });
        }}
      />

      <input
        type="text"
        name="image"
        value={film.imgUrl}
        placeholder="Add your url img please"
        onChange={(event) => {
          setFilm({ ...film, imgUrl: event.target.value });
        }}
      />
      <button onClick={() => AddFilm()} type="button" class="btn btn-outline-success">Add</button>



      <Row>
        {movieList.map((film, key) => (
          <>
            <Col>
              {/*         
      <ul  key={key}>    

          title : 
          {film.title} / rate : {film.rate} / Image :<img height={500} width={300} src={film.imgUrl}  />  <button onClick={()=>DeleteFilm(film._id)}>delete</button>
      
          </ul>  */}
              <MovieCard title={film.title} id={key} Image={film.imgUrl} rate={film.rate} />
            </Col>

          </>

        ))}

      </Row>



    </div>
  );
}


export default MovieList;

