import config from '../local-config';
import jobs from '../mocks/jobs';
import jobRoles from '../mocks/job-roles';
import jobTags from '../mocks/job-tags';
import isNil from 'lodash/isNil';

/**
 * MockAPI
 * Mock api for local mocks
 * @author toddsby
 */
class MockAPI {

  /**
   * getSettings
   * @returns { config } an object with settings defined in
   * local-config.js
   */
  static getSettings() {
    return new Promise((resolve, reject) => {
      resolve( config );
    });
  }

  static getJobs() {
    return new Promise((resolve, reject) => {
      if ( !isNil( this.jobs ) ) resolve ( this.jobs )
      setTimeout(() => {
        this.jobs = jobs;
        resolve( jobs );
      }, this.delay);
    });
  }

  static getJobRoles() {
    return new Promise((resolve, reject) => {
      if ( !isNil( this.jobRoles ) ) resolve ( this.jobRoles )
      setTimeout(() => {
        this.jobRoles = jobRoles;
        resolve( jobRoles );
      }, this.delay);
    });
  }

  static getJobTags() {
    return new Promise((resolve, reject) => {
      if ( !isNil( this.jobTags ) ) resolve ( this.jobTags )
      setTimeout(() => {
        this.jobTags = jobTags;
        resolve( jobTags );
      }, this.delay);
    });
  }

};
// define delay length for testing
MockAPI.delay = config.apiDelay;
MockAPI.jobs = undefined;
MockAPI.jobRoles = undefined;
MockAPI.jobTags = undefined;

export default MockAPI;
