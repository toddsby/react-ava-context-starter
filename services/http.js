import isNil from 'lodash/isNil';
import MockAPI from './mock-api';
import HttpCodes from '../utils/http-codes';

/**
 * HttpError
 * error handling for failed http requests
 * @author toddsby
 */

function HttpError(message) {
   this.message = message;
   var last_part = new Error().stack.match(/[^\s]+$/);
   this.stack = `${this.name} at ${last_part}`;
}
Object.setPrototypeOf(HttpError, Error);
HttpError.prototype = Object.create(Error.prototype);
HttpError.prototype.name = 'HttpError';
HttpError.prototype.message = 'http request failed';
HttpError.prototype.constructor = HttpError;

/**
 * HttpService
 * class for coordinating restful api requests
 * @author toddsby
 */
class HttpService {

  constructor() {
    this.res = {};
    this.status = undefined;
    this.config = undefined;
    this.options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    };
  };

  // verify http request was successful
  async checkStatus( response ) {
    console.log( 'response status', response.status );
    this.status = response.status;
    // if ( response.status >= 200 && response.status < 300 ) {
    if ( response.status >= 200 && response.status < 300 ) {
      return response;
    } else {
      throw new HttpError(`http request failed with code ${response.status}`);
    }
  };

  async getResponse( rawResponse ) {
    let response = undefined;
    response = await this.checkStatus( rawResponse );
    console.log( 'what is the response - getResponse', response );
    return await this.getJson( response );
  };

  async getConfig() {
    if ( isNil( this.config ) ) {
      this.config = await MockAPI.getSettings();
    }
    return this.config;
  };

  async getJson( response ) {
    let json = undefined;
    json = await response.json();
    return json;
  };

  async getApiUrl() {
    if ( isNil( this.config ) ) {
      await this.getConfig();
    }
    return this.config.API_PROTOCOL + '://' + this.config.API_URL + '/';
  };

  prepareFormData( data ) {
    let formBody = [];
    for (let property in data) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    return formBody.join("&");
  };
  /**
   * post
   * @returns { response } an object containing the api response
   */
  async post( data, endpoint ) {
    let response = undefined;
    let API_URL = undefined;
    API_URL = await this.getApiUrl();
    try {
      response = await fetch( API_URL + endpoint, {
        ...this.options,
        body: this.prepareFormData( data ),
        method: 'POST'
      });
    } catch ( e ) {
      console.log( e );
    }

    let parsedResponse = await this.getResponse( response );
    //this.res.status = response.status;
    //this.res.response = parsedResponse;

    return {
      status: response.status,
      response: parsedResponse
    };
  };

  /**
   * post
   * @returns { response } an object containing the api response
   */
  async patch( data, endpoint ) {
    let response = undefined;
    let API_URL = undefined;
    API_URL = await this.getApiUrl();
    try {
      response = await fetch( API_URL + endpoint, {
        ...this.options,
        body: this.prepareFormData( data ),
        method: 'PATCH'
      });
    } catch ( e ) {
      console.log( e );
    }

    let parsedResponse = await this.getResponse( response );
    //this.res.status = response.status;
    //this.res.response = parsedResponse;

    return {
      status: response.status,
      response: parsedResponse
    };
  };

  /**
   * get
   * @returns { response } an object containing the api response
   */
  async get( endpoint, options ) {
    let response = undefined;
    let API_URL = undefined;
    API_URL = await this.getApiUrl();
    try {
      response = await fetch( API_URL + endpoint, {
        ...this.options, options
      });
    } catch ( e ) {
      console.log( e );
    }
    let parsedResponse = await this.getResponse( response );
    //this.res.status = response.status;
    //this.res.response = parsedResponse;

    return {
      status: response.status,
      response: parsedResponse
    };
  };

};

export default new HttpService();
