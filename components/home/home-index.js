import React,{useContext} from 'react';
import './home-styles.scss';
import Header from '../header/header-index';
import JobList from '../job/job-list';
import MockAPI from '../../services/mock-api';
import { AppContext, loadingJobs, updateJobs } from '../../context/state-provider';

function Home() {
  const [state, dispatch] = useContext(AppContext);
  React.useEffect(() => {
    dispatch(loadingJobs(true));
    // useEffect async / await example usage
    // ref: https://stackoverflow.com/a/56838577
    const getJobs = async () => {
      let mockJobs = await MockAPI.getJobs();
      dispatch(updateJobs(mockJobs));
      dispatch(loadingJobs(false));
    }
    getJobs();
  }, []);

  console.log('current jobState', state.jobState);
  return (
      <main className="jngl__home">
        <JobList currentJobs={state.jobState.currentJobs} />
      </main>
  );
}

export default Home;
