import React from 'react';
import { withRouter } from 'react-router';
import './job-list-item-styles.scss';
import parseISO from 'date-fns/parseISO';
import parse from 'date-fns/parse';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import JobDefaultAvatar from './job-default-avatar';

function JobImageAvatar() {
  return (
    <div className="job__company-avatar">
        <img src="https://i.stack.imgur.com/ss4z8.png?s=96" />
    </div>
  );
}

function JobListItem({router,job}) {
  const avatarDisplayOptions = {
    'default': JobDefaultAvatar,
    'image': JobImageAvatar
  }
  const handleClick = evt => {
    router.push({
      pathname: `/job/${job.id}`,
      query: {}
    });
  }
  let AvatarDisplay = avatarDisplayOptions['default'];
  let parsedDate = formatDistanceToNow(parse(job.createdAt, 'yyyy-MM-dd', new Date()));
  return (
    <li className="Grid-cell">
      <a className="jngl__job__list-item" onClick={handleClick}>
        <div className="job__info">
          <AvatarDisplay />
          <h3>{job.title}</h3>
        </div>
        <div className="job__meta">
          <div className="job__tags">
            <span className="job__tag keyword">javascript</span>
            <span className="job__tag keyword">react</span>
            <span className="job__tag keyword">agile</span>
          </div>
        </div>
        <ul className="job__featured">
          <li>{job.type}</li>
          <li>{parsedDate}</li>
        </ul>
      </a>
    </li>
  );
}

export default withRouter(JobListItem);
