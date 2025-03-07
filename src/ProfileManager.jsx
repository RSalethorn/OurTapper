import React, { useState } from 'react';

import './ProfileManager.css';

import ProfileSelect from './ProfileSelect';
import ProfileCreate from './ProfileCreate';

function ProfileManager({
  currentSessionDuration,
  setCurrentSessionDuration,
  currentTapDuration,
  setCurrentTapDuration,
  currentBreakDuration,
  setCurrentBreakDuration,
  currentVibrationParameters,
  setCurrentVibrationParameters,
}) {
  // isAddingProfile: Tracks if user is current adding a profile
  const [isAddingProfile, setIsAddingProfile] = useState(false);

  // currentProfileID: id of the profile that is currently loaded
  const [currentProfileID, setCurrentProfileID] = useState(0);

  // profiles: list of saved profiles
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: 'Profile 1',
      sessionDuration: 57,
      tapDuration: 2.6,
      breakDuration: 1,
      vibrationParameters: {
        type: 'flat',
        intensity: 80,
      },
    },
    {
      id: 2,
      name: 'Profile 2',
      sessionDuration: 20,
      tapDuration: 4.2,
      breakDuration: 0.5,
      vibrationParameters: {
        type: 'parabola',
        a: -50,
        h: 2,
        k: 54,
      },
    },
  ]);

  // Params - currentID: the ID of the profile to be changed to
  // Changes the currently loaded profile
  const loadProfile = (currentID) => {
    // Finds the profile in profiles list that has ID of currentID
    const currentProfile = profiles.find(({ id }) => id === Number(currentID));

    setCurrentProfileID(Number(currentID));

    setCurrentSessionDuration(currentProfile.sessionDuration);
    setCurrentTapDuration(currentProfile.tapDuration);
    setCurrentBreakDuration(currentProfile.breakDuration);
    setCurrentVibrationParameters(currentProfile.vibrationParameters);
  };

  // Params - name: the name input for the new profile
  // Adds a new profile to saved profiles list
  const createProfile = (name) => {
    const newProfileID = profiles.length + 1;

    setCurrentProfileID(newProfileID);

    setProfiles([
      ...profiles,
      {
        id: newProfileID,
        name: name,
        sessionDuration: currentSessionDuration,
        tapDuration: currentTapDuration,
        breakDuration: currentBreakDuration,
        vibrationParameters: currentVibrationParameters,
      },
    ]);
  };

  // Updates the current profile to have the settings that are currently input
  const saveProfile = () => {
    // Loop all profiles
    const updatedProfiles = profiles.map((profile) => {
      // Update profile if it is the current profile
      if (profile.id === currentProfileID) {
        return {
          ...profile,
          sessionDuration: currentSessionDuration,
          tapDuration: currentTapDuration,
          breakDuration: currentBreakDuration,
          vibrationParameters: currentVibrationParameters,
        };
        // Don't change profile
      } else {
        return profile;
      }
    });
    setProfiles(updatedProfiles);
  };

  // Delete the profile that is currently loaded
  const deleteProfile = () => {
    // Remove profile with the currently loaded profile ID.
    let updatedProfiles = profiles.filter(
      (profile) => profile.id !== currentProfileID,
    );

    // Update ids to keep continuous sequence starting at 1
    let idCounter = 0;
    updatedProfiles = updatedProfiles.map((profile) => {
      idCounter += 1;
      return {
        ...profile,
        id: idCounter,
      };
    });

    setCurrentProfileID(0);

    setProfiles(updatedProfiles);
  };

  const profileManagerCurrentComponent = isAddingProfile ? (
    <ProfileCreate
      createProfile={createProfile}
      setIsAddingProfile={setIsAddingProfile}
    />
  ) : (
    <ProfileSelect
      setIsAddingProfile={setIsAddingProfile}
      profiles={profiles}
      loadProfile={loadProfile}
      saveProfile={saveProfile}
      deleteProfile={deleteProfile}
      currentProfileID={currentProfileID}
    />
  );

  return (
    <div className='profile_manager_container'>
      {profileManagerCurrentComponent}
    </div>
  );
}

export default ProfileManager;
