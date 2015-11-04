# Mindlife-Starter-Ionic-Firebase
Mindlife-Starter-Ionic-Firebase

Inspired from :
https://github.com/loicknuchel/ionic-starter

And:
https://github.com/Wizcorp/phonegap-facebook-plugin

Install
This plugin requires Cordova CLI.
Installing this plugin directly from Cordova Registry currently breaks the symlinks in FacebookSDK.framework CB-6092. Easiest solution for now is to just git clone this project and install it with Cordova CLI using the local clone.

$ git clone https://github.com/Wizcorp/phonegap-facebook-plugin.git

cordova -d plugin add /Users/numerized/Work/00_Github/phonegap-facebook-plugin/ --variable APP_ID="535488459936374" --variable APP_NAME="audimatR"

FIREBASE SECURITY RULES :

{
  "rules": {
    "welcome_message": {
      ".read": true,
      ".write": true
    },
    "users": {
      "$uid": {
        "data": {
        // grants write access to the owner of this user account whose uid must exactly match the key ($uid)
        ".write": "auth !== null && auth.uid === $uid",
        // grants read access to to the owner of this user account whose uid must exactly match the key ($uid)
        ".read": "auth !== null && $uid === auth.uid"
        },
        "permission": {
          ".read": "auth !== null && auth.uid === $uid",
          ".write": "!data.exists() && newData.exists() && auth !== null && auth.uid == $uid"
        }
      }
    }
  }
}
