import React from 'react';
import gitHub from '../github_fpykxh.png';
import linkedIn from '../linkedin_vnvo6s.png';
export default function Footer(props) {

  return (
    <footer>
      <a href="https://github.com/bgrzybowski29/Invest">
        <img className='image-footer' src={gitHub} border="0" alt="" />
      </a>
      <a href="http://www.linkedin.com/in/ben-grzybowski-27739b1b">
        <img className='image-footer' src={linkedIn} border="0" alt="" />
      </a>
      <p id='copyright'>Ben Grzybowski 2019</p>
    </footer>
  )
}

