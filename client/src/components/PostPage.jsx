import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import CommentBox from './CommentBox';
import Comments from "./Comments";
import UserContext from '../components/Contexts/UserContext';
import { useContext } from "react";

const PostPage = (props) => {
  const { currUser } = useContext(UserContext);

  const [twatData, setTwatData] = useState({});
  const [statDisplay, setDisplay] = useState(false);
  const [postLiked, setLiked] = useState(false);
  const [likeData, setLikeData] = useState(null);
  const [body, setBody] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const data = {
      "id": twatData.id,
      "user_id": currUser.id
    }

    if(twatData.id && currUser) {
      fetch(`https://twatter-backend-api.herokuapp.com/api/twat_exists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      .then(data => data.json())
      .then(data => {
        if(data.length > 0) {
          setLikeData(data[0]);
          setLiked(true);
          return true;
        }
        setLikeData([{}])
        return false;
      });
    }
  }, [currUser.id, twatData.id, currUser]);

  useEffect(() => {
    const twatId = props.match.params.id;

    fetch(`https://twatter-backend-api.herokuapp.com/api/get_twat/${twatId}`)
      .then(data => data.json())
      .then(data => {setTwatData(data); setBody(data.body)})
    
    fetch(`https://twatter-backend-api.herokuapp.com/api/get_comments/${twatId}`)
      .then(data => data.json())
      .then(data => {
        setComments(data);
        setLoading(false);
      })
  }, [props.match.params.id]);
  

  const handleDisplay = () => {
    setDisplay(oldState => !oldState);
  };

  const handleChange = (e) => {
    setBody(e.target.value);
  };

  const handleConfirm = (e) => {
    const newPost = twatData;
    newPost.body = body;

    fetch(`https://twatter-backend-api.herokuapp.com/twats/${newPost.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost)
    });
    
    setDisplay(oldDisplay => !oldDisplay);
  };

  const handleLike = (e) => {

    const data = {
      "like": {
        "user_id": currUser.id,
        "twat_id": twatData.id
        } 
      };
      
    if(postLiked) {
      fetch(`https://twatter-backend-api.herokuapp.com/likes/${likeData.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(setLiked(false));
    } else {
      fetch(`https://twatter-backend-api.herokuapp.com/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }).then(setLiked(true));
    }
  }

  const handleDelete = (postId) => {
    fetch(`https://twatter-backend-api.herokuapp.com/twats/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    history.push('/twatter/home')
  };

  const handleRedirect = () => {
    history.push(`/twatter/post/${props.post.id}`);
  };

  return(
    loading ? 
      <div className="d-flex justify-content-center">
        <Spinner animation="border" variant="primary" className="mt-5" style={{width: 200, height: 200}} />
      </div>
        :  
      <div className="row justify-content-center mx-0">
          <div className="card col-md-6 m-3">
            <img src={twatData.image} className="w-25" alt="Post" />
            <h3><Link style={{textDecoration:"none"}} to={`/user/${twatData.user_id}`}>@{twatData.poster}</Link></h3>
            <h3 style={{display: !statDisplay ? "block" : "none", cursor:"pointer"}} onClick={handleRedirect}>{twatData.body}</h3>
            <textarea className="form-control" style={{display: statDisplay ? "block" : "none"}} value={body} onChange={handleChange}></textarea>
            
            <Button className="m-1" onClick={handleLike} style={{display: !statDisplay ? "block" : "none"}}>
              {postLiked ? "Remove Like" : "Like"}
            </Button>
            
            {
            currUser.id === twatData.user_id ? 
              <Button className="m-1" onClick={handleDisplay}>Edit</Button> 
              : 
              null
            }

            <Button className="m-1" onClick={handleConfirm} style={{display: statDisplay ? "block" : "none"}}>Confirm</Button>
            
            {
            currUser.id === twatData.user_id ? 
              <Button className="m-1" onClick={() => handleDelete(twatData.id)} 
                      style={{display: !statDisplay ? "block" : "none"}}>Delete</Button> 
            : 
              null
            }   
        </div>
        <CommentBox setComments={setComments} postId={props.match.params.id} />
        <Comments comments={comments} setComments={setComments} />
      </div>
  
  )
};  

export default withRouter(PostPage);