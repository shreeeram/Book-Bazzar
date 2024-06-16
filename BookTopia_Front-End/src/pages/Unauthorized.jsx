import UnAuthorizedImg from '../img/UnAuthorized.jpg';

const UnAuthorized = ()=>{
    return <>
            <div className="container-fluid d-flex justify-content-center align-items-center" 
                  style={{height : 'calc(100vh - 56px)', backgroundColor:'#FEA918'}}>
                <img src={UnAuthorizedImg} style={{width:'50%', marginTop:'60px'}} alt="UnAuthorized" />
            </div>
            {/* <div class="container"
                    style={{backgroundColor:'#FEA918'}}>
            </div> */}
            
            </>
}
export default UnAuthorized;