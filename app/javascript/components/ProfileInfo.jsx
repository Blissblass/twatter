import React from 'react';

const ProfileInfo = (props) => {

  const [inputName, setInputName] = useState({username: ""});
  const [inputFile, setInputFile] = useState();
  const [isEditing, setEditing] = useState(false);
  const addData = props.addData;
  const profUser = props.profUser;

  const handleProfileEdit = () => {
    const CSRF = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    

    if(inputName != profUser.username) {
      fetch('/api/update_user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': CSRF
        },
        body: JSON.stringify({user: {username: inputName}})
      })
      .then(data => data.json())
      .then(data => props.setCurrUser(data))
    }

    if(inputFile) {
      const formData = new FormData();
      formData.append('img', inputFile)
      fetch('/api/change_user_image', {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'X-CSRF-Token': CSRF
        },
        body: formData
      });
    }
    setEditing(false);
    
  }

  return(

    <div className="card col-md-6 m-4 mw-100"> 
        <div className="row"> 
          <div className="col-md-8 col-sm-8">
            <img src={addData.image} alt="User's profile image" className="rounded w-25" style={{}} />
            <input 
            style={{display: isEditing ? "block" : "none"}} 
            type="file" 
            className="form-control my-1"
            onChange={(e) => setInputFile(e.currentTarget.files[0])} 
            />
          </div>
        </div>
        <h1 className="card-text" style={{display: isEditing ? "none" : "block"}}>@{profUser.username}</h1> 
        <div className="d-flex">
          <h4 style={{display: isEditing ? "none" : "block"}}>
            <Link style={{color:"black", textDecoration: "none"}}to={`/user/${profUser.id}/followers`}>
              Followers: {addData.followers}
            </Link>
          </h4>
          <h4 className="mx-2" style={{display: isEditing ? "none" : "block"}}>
            <Link style={{color:"black", textDecoration: "none"}} to={`/user/${profUser.id}/follows`}>
              Following: {addData.follows}
            </Link>
          </h4>
        </div>
        <input 
          type="text"
          className="form-control my-2" 
          value={inputName} 
          style={{display: !isEditing ? "none" : "block", width: 300}} 
          onChange={(e) => setInputName(e.currentTarget.value)}
        />
      </div>
  )
};

export default ProfileInfo;