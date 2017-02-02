# Angular2 Domoticz Service demonstration
Domoticz service which deploys Observable technique to watch for changes, creating great async usage.

Including API calls to alter some aspects of the server (not all).

Wrapped in Ionic 2 demo app (sidemenu).

## Todo
* Fix UI (demo app) issues around range and toggles
* Add services (panel, scene)
* Error handling (if wrong server is added, no response, wrong response)

## Important!
Use at own discretion, but if you have any suggestion, let me know or do a PR. 

Provided under Apache2 License.

## Getting Started
* Install Node.JS and npm (https://nodejs.org/en/download/), as well as git (https://git-scm.com/downloads)
* Clone this repository: `git clone https://github.com/Tommertom/ng2domoticz.git`.
* Run `npm install` from the project root.
* Install the ionic CLI and Cordova (`npm install -g ionic@latest cordova@latest`) - although Cordova is not used (yet)
* Run `ionic serve` in a terminal from the project root.

Due to cross-origin restrictions, this may not work in a browser (although it does with me). So you may need to `ionic run android` or `ionic run ios` to a device 
or upload in ionic view to see it working. 

This demo is available in Ionic View (similar to Apple's Testflight) under app ID `96ecbaf2`. Download Ionic View in your app store (android/iOS), register free 
Ionic account (https://apps.ionic.io/signup) and enjoy. Assure you do a `Clear App Data` in Ionic View
if you want to enjoy the latest committed version.

## Usage of the service

* Embed the service as provider in your project - this version only supports one server per provider
* Define configuration file using the TypeScript definition:
```
export interface DomoticzSettingsModel {
    server: string;             // IP adress
    port: string;               // number as a string, with no colon ('8080')
    protocol: string;           // https:// or http://
    refreshdelay: number;       // the ms to wait before a full refresh
}
```
* When ready to start observing, do an initial `initDomoticzService(settings)` which will configure the service and will start regular polling of Data
* Get the Obserable for any of the following Domoticz items: `devices`, `panels` or `scenes` through the appropriate getter: 
```
getDomoticzDeviceObservable() : devices
getDomoticzPanelObservable()  : panels
getDomoticzSceneObservable()  : scenes
```
* Using RxJS operators, you can manipulate the datastream and subscribe for actions
* When you want to stop the service from working, do a `doneDomoticzService()`.


