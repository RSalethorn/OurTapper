import './ProfileManager.css';
import save_icon from '../assets/save.png';
import add_icon from '../assets/add.png';

import React, { useState } from 'react';

// Inputs to create new profile
function ProfileCreate({ setIsAddingProfile, createProfile }) {
  // profileName: the input profile name
  const [profileName, setProfileName] = useState('');

  const handleProfileNameChange = (e) => {
    setProfileName(e.target.value);
  };

  const clickCreateProfile = () => {
    createProfile(profileName);
    setIsAddingProfile(false);
  };

  return (
    <div className='profile_manager_create_container'>
      <input
        type='text'
        id='profile_create_name'
        value={profileName}
        onChange={handleProfileNameChange}
      />
      <button class='profile_manager_button' onClick={clickCreateProfile}>
        Create Profile
      </button>
    </div>
  );
}

export default ProfileCreate;
