import React, {useState, useEffect} from 'react'
import './Nav.css'

function Nav() {
    const [show, handleShow] = useState(false)
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scroll > 100) {
                handleShow(true)
            
            }else handleShow(false); 
        })
        return () => {
                window.removeEventListener("scroll")
            }
        
    }, [])

    return (
        <div className={`nav ${show && "nav_black"}`}>
            <img 
                className="nav_logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Logo_Netflix.png/800px-Logo_Netflix.png"
                alt="Netflix logo"
            />

            <img
                className="nav_avatar"
                src="https://pbs.twing.com/profile_images/124011999041155.png"
                alt="Netflix logo"
            />
        </div>
    )
}

export default Nav
