import axios from 'axios';
import Cookies from 'universal-cookie';
import { isBrowser } from './common';

const AjaxFactoryUtil = {
  /**
   * [triggerServerRequest Initiate the ajax call and return the data object]
   * @param  {[type]} options [All the data to be sent to server. The formate of options is below]
   * {
   *   method: 'GET',
   *   url: URL,
   *   params: {
   *     param1: 'x'
   *   }
   * };
   * @return {[type]} [It return the data object]
   */
  triggerServerRequest(options) {
    // const data = options.body;
    return new Promise((resolve, reject) => {
      if (isBrowser()) {
        const cookies = new Cookies();
        const _token = cookies.get('_token');
        if (_token) {
          if (!options.headers) {
            options.headers = {};
          }
          options.headers['Authorization'] = `Bearer ${_token}`;
        }
      }
      const config = {
        method: options.method,
        url: options.url,
        json: true,
        headers: options.headers,
        data: options.data
      };

      if (!options.headers) {
        delete config.headers;
      }
      axios(config).then(
        response => {
          const dataFromResponse = response.data;
          const status = response.status;
          if (dataFromResponse) {
            const responseObject = {
              data: dataFromResponse
            };
            if (!dataFromResponse.hasOwnProperty('errorCode')) {
              responseObject.ajaxRequestStatus = 'SUCCESS';
            } else {
              responseObject.ajaxRequestStatus = 'FAILURE';
              return reject(responseObject && (responseObject.data || {}));
            }
            return resolve({
              body: responseObject
            });
          } else if (status === 204) {
            return resolve({
              body: status
            });
          }
          return reject({
            body: dataFromResponse
          });
        },
        error => {
          const errorResponse = error && error.response;
          // Return the error object to display call failure message
          const responseObject = {
            ajaxRequestStatus: 'FAILURE',
            errorCode: errorResponse && errorResponse.status,
            errorData: (errorResponse && errorResponse.data) || null
          };
          return reject({
            body: responseObject
          });
        }
      );
    });
  }
};
export default AjaxFactoryUtil;
