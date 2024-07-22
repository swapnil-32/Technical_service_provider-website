import { useAuth } from "../store/auth"
export const About=()=>{
    const {user}=useAuth();
    return <>
    <section className="uppersection">
        <div className="upper_container">
            <div className="content">
                <p>Welcome, {user?`${user.username} to our website`:'to our website'}</p>
                {/* <p>welcome to swapnil tech</p> */}
                <h1>why choose us</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat pariatur, unde consequuntur facilis est dolor.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur, fugiat?</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates dolorum deserunt inventore excepturi, consectetur molestiae reprehenderit et iure dignissimos.</p>
            </div>
            <div className="btncontainer">
                <a href=""><button className="btn">contact now</button></a>
                <a href=""><button className="btn secondbtn">learn more</button></a>
            </div>
        </div>
        <div className="imagecontainer">
            <img src="/images/me.jpg" alt="" height="400" width="400"/>
        </div>
    </section>
    <section className="midsection">
        <div className="container grid grid-four-column">
                <div className="div1">
                    <h2>50+</h2>
                    <p>registered companies</p>
                </div>
                <div className="div1">
                    <h2>1000</h2>
                    <p>happy clients</p>
                </div>
                <div className="div1">
                    <h2>500+</h2>
                    <p>wel known developers</p>
                </div>
                <div className="div1">
                    <h2>24/7</h2>
                    <p>service</p>
                </div>
        </div>
    </section>
    </>
}
// export default About;