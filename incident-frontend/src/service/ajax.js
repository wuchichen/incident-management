import { toast } from "react-toastify";

/**
 *
 * @param {string} url end point url
 * @param {"get"|"post"|"put"|"delete"} method request method
 * @param {object=} options optional info
 * @param {string=} options.token access token
 * @param {object=} options.data request body
 * @returns {Promise<any>} response promise
 */
async function restCall(url, method, options) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw;
  if (options) {
    // Auth header
    if (options.token) {
      myHeaders.append("Authorization", `Bearer ${options.token}`);
    }

    // JSON request body
    if (options.data) {
      raw = JSON.stringify(options.data);
    }
  }

  var requestOptions = {
    method: method,
    headers: myHeaders,
    ...(!!raw && { body: raw }),
  };

  return fetch(url, requestOptions).then((res) => {
    if (res.ok) {
      return res.json();
    }

    const statusText = res.statusText;

    return res.json().then((err) => {
      if (err.message) {
        toast.error(err.message);
      } else {
        toast.error(statusText);
      }
      throw err;
    });
  });
}

const Ajax = {
  restCall,
};

export default Ajax;
