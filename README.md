# Mindlife-Starter-Ionic-Firebase
Mindlife-Starter-Ionic-Firebase

Inspired from :
https://github.com/loicknuchel/ionic-starter

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
