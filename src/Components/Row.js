import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Row.css'
import Youtube from 'react-youtube'
import movieTrailer from 'movie-trailer'


const base_url = "https://image.tmdb.org/t/p/original/"


function Row({ title, fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        // if [], run once when the row loads, and dont run again
        async function fetchData() {
            const request = await axios.get("https://api.themoviedb.org/3"+fetchUrl);
        
            //console.log(request.data.results)
            setMovies(request.data.results)
            return request

        }
        fetchData()
    }, [fetchUrl])

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        }
    }

    const handleClick = (movie) => {
        if (trailerUrl) {
        setTrailerUrl('')
        } else {
            movieTrailer(movie?.name || "")
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search)
                setTrailerUrl(urlParams.get('v'))
            }).catch((error) => console.log(error))
        }
    }

    //console.table(movies)

    return (
        <div className="row">
            {/** title */}
            <h2>{title}</h2>

            {/** Container -> posters */}
            <div className="row_posters">
                {/**several row_posters */}
                {movies.map(movie => (
                    <img 
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`} 
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name}   
                    />
                ))}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
/**"https://api.themoviedb.org/3" + */