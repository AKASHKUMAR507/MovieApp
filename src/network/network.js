// Note for another dev: This file contains the network configuration and utility functions for making HTTP requests.
// It includes setting up Axios with a base URL, handling caching, and checking network connectivity.
// The Request function is the main entry point for making requests, and it handles caching for GET requests.
// The ResponseEncodings and RequestContentType objects define the types of responses and request content types that can be used.
// The SetHeaders and RemoveHeaders functions allow for dynamic modification of request headers.
// The StoreCache and GetCache functions handle storing and retrieving data from AsyncStorage for caching purposes.
// The NetInfo library is used to check network connectivity before making requests.

const { default: AsyncStorage } = require("@react-native-async-storage/async-storage");
const { default: axios } = require("axios")
import NetInfo from "@react-native-community/netinfo";

const BASE_URL = Object.freeze({
    DEV: 'https://www.freetestapi.com/api/v1/',
    PROD: null
})

const instance = axios.create({
    baseURL: BASE_URL.DEV,
    timeout: 60 * 1000
})

const SetHeaders = (key, value) => {
    instance.defaults.headers.common[key] = value;
}

const RemoveHeaders = (key) => {
    delete instance.defaults.headers.common[key];
}

const StoreCache = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        return error;
    }
}

const GetCache = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        const item = JSON.parse(value);
        if (!item) return null;

        return item;
    } catch (error) {
        return error;
    }
}

const ResponseEncodings = {
    JSON: 'json',
    Stream: 'blob',
}

const RequestContentType = {
    JSON: 'application/json',
    FormData: 'multipart/form-data',
}

const Request = async (method, url, body, nocache = false, responseType = ResponseEncodings.JSON, requestContentType = RequestContentType.JSON) => {

    const requestOptions = {
        method: method,
        url: url,
        data: body,
        responseType: responseType,
        headers: { 'Content-Type': requestContentType }
    }

    try {
        const connected = await NetInfo.fetch();
        if (!connected.isConnected) {
            if (method === 'GET' && !nocache) {
                const cache = await GetCache(url);
                if (cache) return cache
            }

            throw new Error("Please check your internet connection");
        }

        const response = await instance.request(requestOptions);

        if (method === 'GET' && !nocache) { await StoreCache(url, response); }

        return response

    } catch (error) {
        throw error;
    }
}


export { Request, ResponseEncodings, RequestContentType, SetHeaders, RemoveHeaders }