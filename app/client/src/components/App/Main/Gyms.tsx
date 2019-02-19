import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import GymsAdmin from './GymsAdmin';

import g from '../../../globals';
import * as gt from '../../../globals';

function Gyms(props: {gyms: gt.gymType[]}) {
  return (
    <div>
      <div>The Climbing App</div>
      {props.gyms.map((gym) => 
        <p key={gym.id}><Link to={`/gym/${gym.path}`}>{gym.name} | {gym.description}</Link></p>
      )}
      {g.common().user.is_admin && <GymsAdmin />}
    </div>
  );
}

export default Gyms;
