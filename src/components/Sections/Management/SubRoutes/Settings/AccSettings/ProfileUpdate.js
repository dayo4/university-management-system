import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const ProfileUpdate = () => {

    let navigate = useNavigate();

    
    const gobackSettings = () => {
        // navigate(`/settings`);
        setTimeout(() => {
            window.location.assign("/management/settings");
          }, 0);
    };


  return (
   <div className="profile-update-cont">
       <div className="prof-update-top">
           <img src="./backarrow.svg" alt="" onClick={gobackSettings}  />
           <p>Profile Update</p>
       </div>

       <form action="" className="profile-update-admin-form">
           <div className="top-pro-update">
               <div className="etp">
                   <p>Name</p>
                   <input type="text" />
               </div>

               <div className="etp">
                   <p>Phone number</p>
                   <input type="number" />
               </div>
           </div>


           <div className="top-pro-update">
               <div className="etp">
                   <p>Job position</p>
                   <input type="text" />
               </div>

               <div className="etp">
                   <p>Level </p>
                   <input type="number" />
               </div>
           </div>
       </form>

       <div className="update-pua">
           <Link to="/">Update</Link>
       </div>
   </div>
  )
}

export default ProfileUpdate