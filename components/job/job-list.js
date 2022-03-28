import React from 'react';
import JobListItem from './job-list-item';
import './job-list-styles.scss';

function JobList({currentJobs}) {
  let items = currentJobs.map((job, idx) => {
    let id = `show-${job.id}`;
    let key = `${job.id}-${idx}-item`;
    return (
      <JobListItem key={key} id={id} job={job} />
    )
  });

  return (
    <section className="jngl__jobs">
        <ul className="jngl__job__list Grid Grid-full med-Grid-1of3 small-Grid-1of2 large-Grid-fit">
          {items}
        </ul>
    </section>
  );
}

export default JobList;
