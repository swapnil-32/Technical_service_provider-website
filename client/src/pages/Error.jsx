import { NavLink } from "react-router-dom"
export const Error=()=>{
    return <>
    <section id="error-page">
        <div className="content">
            <h2 className="header">404</h2>
            <h4>sorry! page not found</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime laudantium accusantium nulla repellat nostrum reprehenderit distinctio, sapiente voluptatibus tenetur laborum.</p>
            <div className="btns">
                <div><NavLink className="btn" to="/">return home</NavLink></div>
                <div><NavLink className="btn" to="/contact">report problem</NavLink></div>
                
                
            </div>
        </div>
    </section>
    </>
}