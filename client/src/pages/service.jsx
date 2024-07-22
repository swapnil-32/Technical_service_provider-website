import { useAuth } from "../store/auth"
export const Service= ()=>{
    const {services}=useAuth()
    return <>
        {/* <Serv/> */}
        <section className='section_services'>
            <div className="container2">
                <h1 className="main_heading">Services</h1>
            </div>

            <div className="container2 grid grid-three-cols">
                {
                    services.map((currelement,idx)=>{                     //services is array of documents(object) of service database see in auth.jsx file
                        const {price,provider,service,description}=currelement    //we destruct the currelement object
                        
                        return(
                            <div className="card">
                    <div className="card_img">
                        <img src="/images/service.jpeg" alt="service info" width="250" />
                    </div>
                    <div className="card_details">
                        <div className="grid grid-two-cols">
                            <p>{provider}</p>
                            <p>{price}</p>
                        </div>
                        <h2>{service}</h2>
                        <p>{description}</p>
                    </div>
                </div>
                        )
                    })
                }



                
            </div>
        </section>
        </>
}
// export default Service;