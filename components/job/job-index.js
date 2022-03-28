import React,{useContext} from 'react';
import { AppContext } from '../../context/state-provider';
import './job-styles.scss';

function Job({params}) {
  const [state, dispatch] = useContext(AppContext);
  let selectedJob = state.jobState.jobs[params.id];
  console.log('router params', params);
  return (
      <div className="jngl__job">
          <h1>jngl job</h1>
          <h2>{selectedJob.title}</h2>
      </div>
  );
}

export default Job;
