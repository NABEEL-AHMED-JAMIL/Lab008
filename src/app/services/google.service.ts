import { Injectable } from '@angular/core';
import { Router} from '@angular/router';

const url = 'https://apis.google.com/js/client.js?onload=__onGoogleLoaded';
const gapiOnLoaded = '__onGoogleLoaded';
const clientName = 'gapi';
const endpointhost = 'end pien host name';
const apiEndPoint = endpointhost + '/_ah/api';


export class GoogleAPIService {
  private static instance: GoogleAPIService;
  public gapi: any;
  private loadAPI: Promise<any>;
  private constructor() {
    this.loadAPI = new Promise((resolve) => {
        window[gapiOnLoaded] = (ev) => {
        this.gapi = window[clientName];
        // Loads the OAuth and other APIs asynchronously, and triggers login
        // when they have completed.
        let apisToLoad;
        let callback = function() {
        if (--apisToLoad === 0) {
            resolve(window[clientName]);
          }
        };
        apisToLoad = 6; // must match number of calls to gapi.client.load()
        this.gapi.client.load('dcontactcacheendpoint', 'v1', callback, apiEndPoint);
        this.gapi.client.load('daccountendpoint', 'v1', callback, apiEndPoint);
        this.gapi.client.load('duserendpoint', 'v1', callback, apiEndPoint);
        this.gapi.client.load('dmatterendpoint', 'v1', callback, apiEndPoint);
        this.gapi.client.load('dtaskendpoint', 'v1', callback, apiEndPoint);
        this.gapi.client.load('dquestionnaireendpoint', 'v1', callback, apiEndPoint);
        this.gapi.client.load('oauth2', 'v2', callback);

      };
      this.loadScript();
    });
  }

  static getInstance(): GoogleAPIService {
        if (!GoogleAPIService.instance) {
            GoogleAPIService.instance = new GoogleAPIService();
        }
        return GoogleAPIService.instance;
    }

  public GetClient(): any {
      return this.loadAPI.then((res) => {
        return this.gapi;
      });
  }

  private loadScript()  {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}