import  PageNotFoundImg  from '../img/PageNotFound.jpg';

const PageNotFound = ()=>{
    return <>
            <div style={{height : 'calc(100vh - 56px)', backgroundColor:'#131E3A'}} className="container-fluid d-flex justify-content-center align-items-center" 
                 >
                <img src={PageNotFoundImg} style={{width:'50%'}}   alt="Page Not Found" />
            </div>
            </>
}
export  {PageNotFound};