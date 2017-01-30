# Angular2 Domoticz Service demonstration
Domoticz service which deploys Observable technique to watch for changes, creating great async usage.

Including API calls to alter some aspects of the server (not all).

Wrapped in Ionic 2 demo app (sidemenu).

## Todo
* initial service needs to be added (nothing there yet)

## Important!
Use at own discretion, but if you have any suggestion, let me know or do a PR. 

Provided under Apache2 License.

## Getting Started
* Install Node.JS and npm (https://nodejs.org/en/download/), as well as git (https://git-scm.com/downloads)
* Clone this repository: `git clone https://github.com/Tommertom/ng2domoticz.git`.
* Run `npm install` from the project root.
* Install the ionic CLI and Cordova (`npm install -g ionic@latest cordova@latest`) - although Cordova is not used (yet)
* Run `ionic serve` in a terminal from the project root.

Due to cross-origin restrictions, this actually won't work in a browser. So you need to `ionic run android` or `ionic run ios` to a device 
or upload in ionic view to see it working. 

This demo is available in Ionic View under app ID `96ecbaf2`. Download Ionic View in your app store (android/iOS), register free 
Ionic account (https://apps.ionic.io/signup) and enjoy. Assure you do a `Clear App Data` in Ionic View
if you want to enjoy the latest committed version.


