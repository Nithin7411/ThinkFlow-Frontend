import '../draft/draft.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import PageHeader from './PageHeader';
import fetchApi from '../script/fetchApi';
import ProfileDropDown from './ProfileDropdown';
import PublishButton from './PublishButton';
import WriteButton from './WriteButton';
import SearchOption from './SearchOption';
import LoginButton from '../WelcomePage/LoginButton';

const Header = function ({ onClick, storyId, data, setTags }) {
  const location = useLocation();
  const [avatar, setAvatar] = useState('');
  const [modal, setModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleModal = function () {
    setModal(prev => !prev);
  };

  const getProfileIcon = async function () {
    const data = await fetchApi(`${import.meta.env.VITE_API_URL}/user/dashboard`);
    
  };

  const checkLoggedInStatus = async function () {
   const data = await fetchApi(`${import.meta.env.VITE_API_URL}/isLoggedIn`);
    setIsLoggedIn(data.isLoggedIn);
    if (data.isLoggedIn) {
      setAvatar(data.user.avatar_url);
    }
  };

  useEffect(() => {
    checkLoggedInStatus();
  }, []);

const publishStory = function ( tags, coverImageUrl) {
  console.log("header => ",coverImageUrl);
  onClick(storyId, tags, coverImageUrl);
};


  return (
    <header className='navBar'>
      <PageHeader />
      <div className='navbarFeatures'>
      {
        location.pathname === '/dashboard' && isLoggedIn ? <SearchOption /> : null
      }
      {
        location.pathname !== '/add-story' && isLoggedIn ? <WriteButton /> : null
      }
      {
        location.pathname === '/add-story' && isLoggedIn ? <PublishButton handleClick={publishStory} id={storyId} setTags={setTags} data={data} /> : null
      }
      {
        !isLoggedIn ? (
          <LoginButton />
        ) : (
          <>
            <img src={avatar} alt="profile-pic" className='profile-avatar' onClick={toggleModal} />
            { modal && <ProfileDropDown /> }
          </>
        )
      }
      </div>
    </header>
  )
};

export default Header;
