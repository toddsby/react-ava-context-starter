import React, { useReducer, createContext }  from 'react';
import {normalr} from '../utils/state-utils';

const AppContext = createContext();

const jobActions = {
  UPDATE_JOBS: 'UPDATE_JOBS',
  SELECT_JOB: 'SELECT_JOB',
  LOADING_JOBS: 'LOADING_JOBS'
};

const appInitialState = {
  jobState: {
    loading: false,
    error: null,
    jobs: {},
    currentJobs: [],
    selectedJob: {
      id: 2,
      title: 'Senior Frontend Engineer',
      type: 'Full Time',
      createdAt: '2021-01-07',
      archivedAt: null,
      remoteFriendly: true,
      applicationUrl: 'https://careers.microsoft.com',
      salary: {
        start: '125,000',
        end: '150,000',
        currency: {
          label: 'US Dollars',
          symbol: '$'
        },
        equity: false
      }
    }
  }
};

// action creator
const loadingJobs = bool => {
  return {
    type: jobActions.LOADING_JOBS,
    payload: {
      loading: bool
    }
  };
};

// action creator
const updateJobs = jobs => {
  return {
    type: jobActions.UPDATE_JOBS,
    payload: {
      jobs: jobs
    }
  };
};

// action creator
const updateSelectedJob = jobId => {
  return {
    type: jobActions.updateSelectedJob,
    payload: {
      jobId: jobId
    }
  };
};

const getCurrentJobs = (jobs, jobsIds) => {
  return jobsIds.map(id => jobs[id]);
}

const prepareJobs = (state, action) => {
  let {jobs, jobsIds} = normalr(action.payload.jobs,'jobs','id');
  let currentJobs = getCurrentJobs(jobs, jobsIds);
  return {
    ...state,
    jobState: {
      ...state.jobState,
      currentJobs: currentJobs,
      jobs: jobs,
      jobsIds: jobsIds
    }
  };
};

// reducers
const reducers = (state, action) => {
  switch (action.type) {
    case jobActions.UPDATE_JOBS:
      return prepareJobs(state, action);
    case jobActions.SELECT_JOB:
      return {
        ...state,
        jobState: {
          ...state.jobState,
          selectedJob: state.jobState.jobs[action.payload.jobId]
        }
      };
    case jobActions.LOADING_JOBS:
      return {
        ...state,
        jobState: {
          ...state.jobState,
          loading: action.payload.loading
        }
      }
    default:
      throw new Error();
  }
};

const AppContextProvider = props => {
  const [state, dispatch] = useReducer(reducers, appInitialState);
  return (
    <AppContext.Provider value={[state, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
};

export {
  AppContext,
  AppContextProvider,
  loadingJobs,
  updateJobs,
  updateSelectedJob
};
