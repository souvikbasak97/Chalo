import "bootstrap/dist/css/bootstrap.min.css";
import React,{useState,Component,useEffect} from 'react';
import { Button,Modal,Input } from 'react-bootstrap';
import fireDb from '../firebase';
import {Link} from "react-router-dom";
import { SimpleForm } from "./SimpleForm";
import MapComponent from "./MapComponent.jsx";

export const Crud=()=>{
    const initialState={
        number:0,
        routename:"",
        routedirec: "",
        routeid:"",
        lat:"",
        lng:""
    };
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleInput=(e)=>{
        e.preventDefault();
        if(!routename||!routeid||!lat||!lng)
        {
            alert("Please provide value in each input field");
        }
        else{
            fireDb.child("routes").push(state,(err)=>{
                if(err)
                    alert(err);
                else
                    alert("Route added successfully"); 
            })
        }
    };
    const handleInputChange = (e)=>{
        const {name,value}=e.target;
        setState({...state,[name]:value});
    };
    const onDelete=(id)=>{
        if(window.confirm("Are you sure you want to delete?")){
            fireDb.child(`routes/${id}`).remove((err)=>{
                if(err){
                    alert(err);
                }
                else{
                    alert("Contact Deleted Successfully");
                }
            })
        }
    }

    const [state,setState]=useState(initialState);
    const [data,setData]=useState({});
    const {number,routename,routedirec,routeid,lat,lng}=state;

    useEffect(()=>{
        fireDb.child("routes").on("value", (snapshot)=>{
            if(snapshot.val()!==null){
                setData({...snapshot.val()});
            }
            else
                setData({});
        });
        return()=>{
            setData({});
        };
    },[]);
    const [search, setSearch] = React.useState('');

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };
    

  return (
      <>
        <SimpleForm/>
       <div className="container ">
          <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded"> 
          <div className="row ">
           
           <div className="col-sm-3 mt-5 mb-4 text-gred">
              <div className="search">
                <form className="form-inline">
                 <input className="form-control mr-sm-2" type="search" placeholder="Search Route" aria-label="Search" onChange={handleSearch}/>
                
                </form>
              </div>    
              </div>  
              <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"><h2><b>Route Details</b></h2></div>
              <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
              <Button variant="primary" onClick={handleShow}>
                Add New Route
              </Button>
             </div>
           </div>  
            <div className="row">
                <div className="table-responsive " >
                 <table className="table table-striped table-hover table-bordered" >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Route Name </th>
                            <th>Direction</th>
                            <th>Route Id</th>
                            <th>Latitude </th>
                            <th>Longitude</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {Object.keys(data).map((id,index)=>{
                            return (
                                <tr key={id}>
                                    <th scope="row">{index+1}</th>
                                    <td>{data[id].routename}</td>
                                    <td>{data[id].routedirec}</td>
                                    <td>{data[id].routeid}</td>
                                    <td>{data[id].lat}</td>
                                    <td>{data[id].lng}</td>
                        
                                    <td>
                                        <Link to={`/update/${id}`}>
                                        <button>
                                            <i class="bi bi-pen"></i>
                                        </button>
                                        </Link>
                                        <button onClick={()=>onDelete(id)}><i class="bi bi-x-lg"></i></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>   
        </div>  
 
        {/* <!--- Model Box ---> */}
        <div className="model_box">
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Record</Modal.Title>
        </Modal.Header>
            <Modal.Body>
            <form>
                <div className="form-group">
                    <input type="name" className="form-control" id="search" name="routename" value={routename}
                     placeholder="Enter Routename" onChange={e=>{handleInputChange(e)}}/>
                </div>
                <div className="form-group mt-3">
                    <label value="">Choose RouteDirection(Up/Down) </label>
                    <input type="text" name="routedirec" className="form-control" value={routedirec} onChange={handleInputChange}/>
                </div>
                <div className="form-group mt-3">
                    <input type="text" className="form-control" name="routeid" placeholder="Enter Route Id" value={routeid} onChange={handleInputChange}/>
                </div>
                <div className="form-group mt-3">
                    <input type="text" className="form-control" name="lat" placeholder="Enter Latitude separated by ','" value={lat} onChange={handleInputChange}/>
                </div>
                <div className="form-group mt-3">
                    <input type="text" className="form-control" name="lng" placeholder="Enter Longitude separated by ','" value={lng} onChange={handleInputChange}/>
                </div>
                <br/>
                <button type="submit" className="btn btn-success mt-4" onClick={handleInput}>Add Record</button>
            </form>
            </Modal.Body>
 
        <Modal.Footer>
            
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
       </div>  
      </div>    
      </div>  
      <div className="map">
          <p className="card text-center"><b>Add or Edit Existing Routes to visualise Polyline</b></p>
        <MapComponent/>
      </div>
      
      </>
  );
}
