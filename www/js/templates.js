angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("templates/login.html","<ion-view hide-nav-bar=true><ion-content><br><br><br><div class=bsrow ng-if=!uid><div class=\"col-xs-12 col-xs-B-12 col-sm-offset-1 col-sm-4\"><span class=hidden-xs><br><br><h2 style=text-align:center>{{ \'LOGIN_TITLE\' | translate }}</h2></span></div><div class=\"col-xs-12 col-xs-B-12 col-sm-offset-1 col-sm-4\"><h4 style=text-align:center ng-if=\"!spinner && !login_message\">{{ \'LOGIN_TEXT\' | translate }}</h4><h4 style=text-align:center ng-if=login_message>{{ login_message }}</h4><h4 style=text-align:center ng-if=\"spinner && !login_message\">please wait</h4><br><div ng-if=device><button class=\"button button-dark button-block icon-left ion-social-facebook\" ng-click=fbLogin()>{{ \'FACEBOOK_SIGNIN\' | translate }}</button></div><div ng-if=!device><button class=\"button button-dark button-block icon-left ion-social-facebook\" ng-click=fbLogin()>{{ \'FACEBOOK_SIGNIN\' | translate }}</button></div><div><button class=\"button button-dark button-block icon-left ion-social-twitter\" ng-click=twitterLogin()>{{ \'TWITTER_SIGNIN\' | translate }}</button></div><div><button class=\"button button-dark button-block icon-left ion-social-googleplus-outline\" ng-click=googleLogin()>{{ \'GOOGLE_SIGNIN\' | translate }}</button></div><div><button class=\"button button-dark button-block icon-left ion-person-add\" ng-click=userRegister()>{{ \'USER_REGISTER_BUTTON\' | translate }}</button></div><div><button class=\"button button-dark button-block icon-left ion-person\" ng-click=userLoginPage()>{{ \'USER_LOGIN_BUTTON\' | translate }}</button></div><p>Use same route to sign in each time (i.e if you created your account via Facebook, continue to use Facebook to sign in, or create a new account using one of the other routes).</p></div></div><div class=bsrow ng-if=\"uid && !spinner\"><div class=\"col-xs-12 col-xs-B-12 col-sm-offset-1 col-sm-4\"><h4 style=text-align:center ng-if=\"!spinner && !login_message\">Do you want to disconnect from iAspireLab ?</h4><h4 style=text-align:center ng-if=login_message>{{ login_message }}</h4><h4 style=text-align:center ng-if=\"spinner && !login_message\">please wait</h4><br><div><a class=\"button button-calm button-block\" ui-sref=home>Stay Connected</a></div><div><button class=\"button button-assertive button-block icon-left ion-log-out\" ng-click=unAuth()>Disconnect</button></div></div></div></ion-content></ion-view>");
$templateCache.put("templates/register.html","<ion-view hide-nav-bar=true><ion-content style=\"text-align:center; padding-top:2%\"><div class=bsrow><div class=\"col-xs-12 col-xs-B-offset-2 col-xs-B-8 col-sm-offset-3 col-sm-6 col-lg-offset-4 col-lg-4\"><br><h1>{{ \'REGISTER_TITLE\' | translate }}</h1><br><h4 ng-if=\"!spinner && !login_message\">{{ \'REGISTER_TEXT\' | translate }}</h4><h4 ng-if=login_message>{{ login_message }}</h4><h4 ng-if=\"spinner && !login_message\">Please wait</h4><br><div class=list><label class=\"item item-input item-floating-label list_dashed\"><span class=input-label>Email</span> <input type=email placeholder=\"{{\'LOGIN_EMAIL_LABEL\' | translate }}\" ng-model=register.email required></label> <label class=\"item item-input item-floating-label list_dashed\"><span class=input-label>Password</span> <input type=password placeholder=\"{{\'LOGIN_PASSWORD_LABEL\' | translate }}\" ng-model=register.password required></label></div></div></div><div class=bsrow><div class=\"col-xs-12 col-xs-B-offset-2 col-xs-B-8 col-sm-offset-3 col-sm-6 col-lg-offset-4 col-lg-4\"><button class=\"button button-calm button-block icon-left ion-person-add\" ng-click=\"register(register.email, register.password)\" ng-disabled=spinner>{{ \'REGISTER\' | translate }}<ion-spinner ng-if=spinner class=spinner-button-right icon=spiral></ion-spinner></button> <button class=\"button button-block button-assertive icon-left ion-android-cancel\" ng-click=returnToLogin() ng-disabled=spinner>{{ \'CANCEL_REGISTER\' | translate }}</button></div></div></ion-content></ion-view>");
$templateCache.put("templates/tab-account.html","<ion-view><ion-nav-buttons side=left><a class=\"button button-icon button-clear icon ion-ios-ionic-outline dark\" ng-click=goHomeAndAnim()></a></ion-nav-buttons><ion-content><div class=offline ng-if=\"online == \'offline\'\"><p>You are now in offline mode.<br>You can continue to use the app.</p></div><div class=brow><div class=\"col-xs-12 col-md-offset-3 col-md-6\"><div class=list ng-if=\"authData.provider == \'google\'\"><div class=\"item item-avatar\"><img ng-src={{authData.google.cachedUserProfile.picture}}><h2>{{authData.google.cachedUserProfile.name}}</h2><p>{{authData.google.cachedUserProfile.link}}</p></div><div class=\"item item-body\"><p>{{privateData.$value}}</p><p>{{ \'ACCOUNT_FOLLOWERS_LABEL\' | translate }} : {{authData.google.cachedUserProfile.followers_count}}<br>{{ \'ACCOUNT_FRIENDS_LABEL\' | translate }} : {{authData.google.cachedUserProfile.friends_count}}</p></div></div><div class=list ng-if=\"authData.provider == \'password\'\"><div class=\"item item-avatar\"><img ng-src={{authData.google.cachedUserProfile.picture}}><h2>{{authData.password.email}}</h2></div><div class=\"item item-body\"><p>{{privateData.$value}}</p></div></div><div class=list ng-if=\"authData.provider == \'twitter\'\"><div class=\"item item-avatar\"><img ng-src={{authData.twitter.cachedUserProfile.profile_image_url}}><h2>{{authData.twitter.cachedUserProfile.name}}</h2><p>{{authData.twitter.cachedUserProfile.entities.url.urls[0].expanded_url }}</p></div><div class=\"item item-body\"><p>{{privateData.$value}}</p><p>{{ \'ACCOUNT_FOLLOWERS_LABEL\' | translate }} : {{authData.twitter.cachedUserProfile.followers_count}}<br>{{ \'ACCOUNT_FOLLOWINGS_LABEL\' | translate }} : {{authData.twitter.cachedUserProfile.friends_count}}</p></div></div><div class=list ng-if=\"authData.provider == \'facebook\'\"><div class=\"item item-avatar\"><img ng-src={{authData.facebook.cachedUserProfile.picture.data.url}}><h2>{{authData.facebook.cachedUserProfile.name}}</h2><p>{{authData.facebook.cachedUserProfile.email}}</p></div><div class=\"item item-body\"><p>{{privateData.$value}}</p><p ng-if=friendsData>{{ \'ACCOUNT_FRIENDS_DATA\' | translate }} :<br><div ng-repeat=\"friend in friendsData.data\"><div class=list><div class=\"item item-avatar\"><img ng-src={{friend.picture.data.url}}><p>{{friend.name}}</p><p>48 Chances to win</p><p>14 Qualities</p><p>34 Activities</p></div></div></div></p></div><div class=row><div class=col><button class=\"button button-dark button-block icon-left ion-android-contacts\" ng-click=inviteFbFriend()>{{ \'ACCOUNT_INVITE_FRIENDS_BUTTON\' | translate }}</button></div></div><div class=row><div class=col><button class=\"button button-dark button-block icon-left ion-share\" ng-click=postFbStatus()>{{ \'ACCOUNT_POST_STATUS_BUTTON\' | translate }}</button></div></div></div><div class=row><div class=col><button class=\"button button-block button-dark\" ui-sref=tab.myprivacysettings>My Privacy Settings</button> <button class=\"button button-block button-assertive icon-left ion-log-out\" ng-click=unAuth()>{{ \'ACCOUNT_DISCONNECT_BUTTON\' | translate }}</button></div></div></div></div></ion-content></ion-view>");
$templateCache.put("templates/tab-help.html","<ion-view><ion-nav-buttons side=left><a class=\"button button-icon button-clear icon ion-ios-ionic-outline dark\" ui-sref=home></a></ion-nav-buttons><ion-nav-buttons side=right><button class=\"button button-icon button-clear icon dark\" ng-click=nextSlide() ng-show=\"currentSlide < 4 || !currentSlide\">Next</button> <button class=\"button button-icon button-clear icon dark\" ui-sref=home ng-show=\"currentSlide == 4\">I\'m In !</button></ion-nav-buttons><ion-content><ion-slide-box on-slide-changed=slideHasChanged($index) delegate-handle=theHelpSlider show-pager=false><ion-slide><div class=\"helpBox brow\"><div class=\"col-xs-12 col-md-offset-3 col-md-6\"><h2>Calling all Students!<br><br></h2><h4>Join our Young Creative Crew and you could win £100!<br><br>In collaboration with Character Scotland, Help2Help is on a mission to develop an amazing App with you, for you!<br>Based on the Inspire>Aspire Poster Programme this App will inspire you and your friends to be the best you can be, fulfil your dreams, and unfold your unique potential to achieve a flourishing meaningful life.<br><br><br></h4><button class=\"button button-balanced button-block\" ng-click=nextSlide()>Next!</button></div></div></ion-slide><ion-slide><div class=\"helpBox brow\"><div class=\"col-xs-12 col-md-offset-3 col-md-6\"><h2>We invite you to work with us.<br><br></h2><h4>This development is part of a research program to inspire and encourage you, your friends and all young people to nurture your strengths, and develop positive character qualities to truly awaken your ability to feel fully alive and in charge of your own destiny.<br><br><br></h4><button class=\"button button-balanced button-block\" ng-click=nextSlide()>Next!</button></div></div></ion-slide><ion-slide><div class=\"helpBox brow\"><div class=\"col-xs-12 col-md-offset-3 col-md-6\"><br><br><br><h4>You know better than anyone what makes an App appealing and how to stimulate you and your friends to use it. So tell us what features are important and what motivates you.<br><br><br></h4><button class=\"button button-balanced button-block\" ng-click=nextSlide()>Next!</button></div></div></ion-slide><ion-slide><div class=\"helpBox brow\"><div class=\"col-xs-12 col-md-offset-3 col-md-6\"><br><br><h4>Follow the prompts to enter your ideas. Every input will be entered into a prize draw, with each comment counted as a separate entry. Play all categories and you could be the lucky winner of a cash prize!<br><br><br></h4><button class=\"button button-balanced button-block\" ng-click=nextSlide()>Next!</button></div></div></ion-slide><ion-slide><div class=\"helpBox brow\"><div class=\"col-xs-12 col-md-offset-3 col-md-6\"><br><br><h4>Let your creativity flow and watch your chances of winning, and unlocking the next level, increase with every input! All contributions are eagerly anticipated. Best contributions will receive credits and ideas will be incorporated in the App.<br><br><br></h4><button class=\"button button-balanced button-block\" ui-sref=home>I\'m In !</button></div></div></ion-slide></ion-slide-box></ion-content></ion-view>");
$templateCache.put("templates/tab-home.html","<ion-view><ion-nav-title>Mindlife Starter App</ion-nav-title><ion-nav-buttons side=left><a class=\"button button-icon button-clear icon ion-ios-help-outline\" ng-click=goHelp()></a></ion-nav-buttons><ion-nav-buttons side=right><a class=\"button button-icon button-clear icon ion-gear-a\" ng-click=goAccount()></a></ion-nav-buttons><ion-content><div class=offline ng-if=\"online == \'offline\'\"><p>You are now in offline mode.<br>You can continue to use the app.</p></div>{{welcome_message}}</ion-content></ion-view>");
$templateCache.put("templates/tab-myprivacysettings.html","<ion-view><ion-nav-title><h2 ng-if=\"statistics.numberActivities == 1\">{{statistics.numberActivities}} Chance</h2><h2 ng-if=\"statistics.numberActivities > 1\">{{statistics.numberActivities}} Chances</h2></ion-nav-title><ion-nav-buttons side=left><a ng-if=!firstTimeUser class=\"button button-icon button-clear icon ion-ios-ionic-outline dark\" ui-sref=home></a></ion-nav-buttons><ion-content delegate-handle=content><div class=offline ng-if=\"online == \'offline\'\"><p>You are now in offline mode.<br>You can continue to use the app.</p></div><div class=brow><div class=\"col-xs-12 col-xs-B-offset-2 col-xs-B-8 col-sm-offset-3 col-sm-6 col-lg-offset-4 col-lg-4\"><span ng-if=firstTimeUser><h1 style=\"text-align: center;\">Welcome to<br>iAspireLab</h1><br class=hidden-xs><br class=hidden-xs><h2 style=\"text-align: center;\">and thank you for joining us to help develop the InspireAspire App.</h2><br class=hidden-xs><br class=hidden-xs></span><h4>We’re committed to respecting your privacy and will only use the information you provide to aid the research and development of the full InspireAspire App.<br><br>To understand how we will treat your personal data, suggestions and other information after it has been collected by us through your use of iAspireLab click on the read more link.<br><a style=color:blue;text-decoration:underline ng-click=\"scrollToAnchorWithinCurrentPage(\'privacy-notice\')\">Read More...</a></h4></div></div><div class=brow id=question1 ng-if=firstTimeUser><div class=\"col-xs-12 col-xs-B-offset-2 col-xs-B-8 col-sm-offset-3 col-sm-6 col-lg-offset-4 col-lg-4\"><h2>Before starting please fill this form.</h2></div></div><div ng-repeat=\"Question in myPrivacySettings\"><div class=brow ng-if=\"myPrivacySettings[Question.conditionQuestion].replyNumber == Question.conditionAnswer || !Question.conditionAnswer\"><div class=\"col-xs-12 col-xs-B-offset-2 col-xs-B-8 col-sm-offset-3 col-sm-6 col-lg-offset-4 col-lg-4\"><h4>{{Question.label}}</h4><h4 ng-if=\"Question.type == \'slider\'\">{{priority[Question.replyNumber]}}</h4></div></div><div class=brow><div class=\"col-xs-12 col-xs-B-offset-2 col-xs-B-8 col-sm-offset-3 col-sm-6 col-lg-offset-4 col-lg-4\"><div class=\"item range range-positive\" ng-if=\"Question.type == \'slider\'\"><i class=\"icon ion-ios-minus-outline\" ng-click=\"Question.replyNumber = Question.replyNumber-1\"></i> <input class=range-zoom ng-model=Question.replyNumber type=range ng-change=\"saveReply($index, \'Privacy\', Question.label, priority[Question.replyNumber], Question.replyNumber, Question.type)\" name=volume min=0 max=4 step=1> <i class=\"icon ion-ios-plus-outline\" ng-click=\"Question.replyNumber = Question.replyNumber+1\"></i></div><label class=\"item item-input list_dashed\" ng-if=\"Question.type == \'freetext\'\"><textarea enter-submit=\"saveReply($index, \'Privacy\', Question.label, Question.replyText, -1)\" msd-elastic name=desc id=desc placeholder=\"Click here to input text\" ng-model=Question.replyText ng-blur=\"saveReply($index, \'Privacy\', Question.label, Question.replyText, -1, Question.type)\"></textarea></label> <label class=\"item item-input list_dashed\" ng-if=\"Question.type == \'inputtext\' && (myPrivacySettings[Question.conditionQuestion].replyNumber == Question.conditionAnswer || !Question.conditionAnswer)\"><input type=text enter-submit=\"saveReply($index, \'Privacy\', Question.label, Question.replyText, -1)\" name=desc id=desc placeholder=\"Click here to input text\" ng-model=Question.replyText ng-blur=\"saveReply($index, \'Privacy\', Question.label, Question.replyText, -1, Question.type)\"></label><div class=list ng-if=\"Question.type == \'radio\'\"><label class=\"list_dashed item item-radio\" ng-repeat=\"(optionIndex, label) in myPrivacySettings[$index].options\"><ion-radio-fix icon=ion-checkmark ng-model=Question.replyText value={{label}} ng-click=\"saveReply($index, \'Privacy\', Question.label, label, optionIndex, Question.type)\">{{label}}</ion-radio-fix></label></div><div ng-if=\"Question.type == \'yesno\' && (myPrivacySettings[Question.conditionQuestion].replyNumber == Question.conditionAnswer || !Question.conditionAnswer)\"><ion-toggle class=list_dashed ng-model=Question.replyNumber ng-change=\"saveReply($index, \'Privacy\', Question.label, Question.replyNumber, Question.replyNumber, Question.type)\"><span ng-if=\"Question.replyNumber != true\"><h2>No</h2></span> <span ng-if=\"Question.replyNumber == true\"><h2>Yes</h2></span></ion-toggle></div></div></div></div><div class=brow ng-if=firstTimeUser><div class=\"col-xs-12 col-xs-B-offset-2 col-xs-B-8 col-sm-offset-3 col-sm-6 col-lg-offset-4 col-lg-4\"><button class=\"button button-block button-balanced icon-left ion-android-star\" ui-sref=tabs.help>Start !</button></div></div><div class=brow><div class=\"col-xs-12 col-xs-B-offset-2 col-xs-B-8 col-sm-offset-3 col-sm-6 col-lg-offset-4 col-lg-4\"><br><br><h2 id=privacy-notice>Personal Data and Privacy Commitment</h2><h6>We will not disclose any personal data to any third party without your prior consent.<h6>As part of our development process we conduct focus group research to help us ensure our Apps are appealing and attractive to those who use them. Any information collected is stored securely on our database and is only used to help us decide the best content to include in our Apps.</h6><h6>All personal data is kept confidential and is only used to help us locate you if you win prize, if your contribution has been nominated for inclusion in the App, or you have elected to receive newsletters and/or other updates. We promise not to use any of this information for commercial purposes or gain, and we won’t give any of your personal information to a third party. Any data used for further research purposes will be saved anonymously.</h6><h6>By “playing” or entering any information into this iAspireLab research App you understand and agree to let us collect, store and use the information entered as described above. To edit or delete personal data held return to “Privacy Settings” by clicking <i class=\"icon ion-gear-a\"></i> at any time, or email iaspire@help.org.uk</h6><br><a class=\"button button-small button-balanced button-block\" ng-click=\"scrollToAnchorWithinCurrentPage(\'question1\')\">Back to Top</a><br><br><br><br><br><br><br><br></h6></div></div></ion-content></ion-view>");
$templateCache.put("templates/tab-register.html","<ion-view hide-nav-bar=true><ion-content style=\"text-align:center; padding-top:2%\"><div class=bsrow><div class=\"col-xs-12 col-xs-B-offset-2 col-xs-B-8 col-sm-offset-3 col-sm-6 col-lg-offset-4 col-lg-4\"><br><h1>{{ \'REGISTER_TITLE\' | translate }}</h1><br><h4 ng-if=\"!spinner && !login_message\">{{ \'REGISTER_TEXT\' | translate }}</h4><h4 ng-if=login_message>{{ login_message }}</h4><h4 ng-if=\"spinner && !login_message\">Please wait</h4><br><div class=list><label class=\"item item-input item-floating-label list_dashed\"><span class=input-label>Email</span> <input type=email placeholder=\"{{\'LOGIN_EMAIL_LABEL\' | translate }}\" ng-model=register.email required></label> <label class=\"item item-input item-floating-label list_dashed\"><span class=input-label>Password</span> <input type=password placeholder=\"{{\'LOGIN_PASSWORD_LABEL\' | translate }}\" ng-model=register.password required></label></div></div></div><div class=bsrow><div class=\"col-xs-12 col-xs-B-offset-2 col-xs-B-8 col-sm-offset-3 col-sm-6 col-lg-offset-4 col-lg-4\"><button class=\"button button-calm button-block icon-left ion-person-add\" ng-click=\"register(register.email, register.password)\" ng-disabled=spinner>{{ \'REGISTER\' | translate }}<ion-spinner ng-if=spinner class=spinner-button-right icon=spiral></ion-spinner></button> <button class=\"button button-block button-assertive icon-left ion-android-cancel\" ng-click=returnToLogin() ng-disabled=spinner>{{ \'CANCEL_REGISTER\' | translate }}</button></div></div></ion-content></ion-view>");
$templateCache.put("templates/tabs.html","<ion-nav-bar><ion-nav-back-button></ion-nav-back-button></ion-nav-bar><ion-tabs class=tabs-item-hide><ion-tab title=\"{{ \'DEVICE_VIEW_TITLE\' | translate }}\" icon-off=ion-ios-information-outline icon-on=ion-ios-information ui-sref=home><ion-nav-view name=tab-home></ion-nav-view></ion-tab><ion-tab title=\"{{ \'ACCOUNT_VIEW_TITLE\' | translate }}\" icon-off=ion-ios-gear-outline icon-on=ion-ios-gear ui-sref=tabs.account><ion-nav-view name=tab-account></ion-nav-view></ion-tab><ion-tab title=\"{{ \'ACCOUNT_VIEW_TITLE\' | translate }}\" icon-off=ion-ios-gear-outline icon-on=ion-ios-gear ui-sref=tabs.myprivacysettings><ion-nav-view name=tab-myprivacysettings></ion-nav-view></ion-tab><ion-tab title=\"{{ \'ACCOUNT_VIEW_TITLE\' | translate }}\" icon-off=ion-ios-gear-outline icon-on=ion-ios-gear ui-sref=tabs.help><ion-nav-view name=tab-help></ion-nav-view></ion-tab></ion-tabs>");
$templateCache.put("templates/user-login-password-reset.html","<ion-view hide-nav-bar=true><ion-content style=\"text-align:center; padding-top:2%\"><br><h1>{{ \'PASSWORD_RESET_TITLE\' | translate }}</h1><div class=bsrow><div class=\"col-xs-12 col-xs-B-offset-2 col-xs-B-8 col-sm-offset-3 col-sm-6 col-lg-offset-4 col-lg-4\"><h4 ng-if=\"!spinner && !login_message\">{{ \'PASSWORD_RESET_TEXT\' | translate }}</h4><h4 ng-if=login_message>{{ login_message }}</h4><h4 ng-if=\"spinner && !login_message\">please wait</h4><div class=list><br><label class=\"item item-input item-floating-label list_dashed\"><span class=input-label>Email</span> <input type=email placeholder=\"&nbsp;{{\'LOGIN_EMAIL_LABEL\' | translate }}\" ng-model=login.email required></label></div></div><div class=\"col-xs-12 col-xs-B-offset-2 col-xs-B-8 col-sm-offset-3 col-sm-6 col-lg-offset-4 col-lg-4\"><button class=\"button button-dark button-block icon-left ion-log-in\" ng-click=userLoginPasswordReset(login.email) ng-disabled=spinner>{{ \'PASSWORD_RESET_BUTTON\' | translate }}<ion-spinner ng-if=spinner class=spinner-button-right icon=spiral></ion-spinner></button> <button class=\"button button-block button-assertive icon-left ion-android-cancel\" ng-click=userLoginPage() ng-disabled=spinner>{{ \'CANCEL_REGISTER\' | translate }}</button></div></div></ion-content></ion-view>");
$templateCache.put("templates/user-login.html","<ion-view hide-nav-bar=true><ion-content style=\"text-align:center; padding-top:2%\"><br><div class=bsrow><div class=\"col-xs-12 col-xs-B-offset-2 col-xs-B-8 col-sm-offset-3 col-sm-6 col-lg-offset-4 col-lg-4\"><h1>{{ \'INTERNAL_LOGIN_TITLE\' | translate }}</h1><h4 ng-if=\"!spinner && !login_message\">{{ \'INTERNAL_LOGIN_TEXT\' | translate }}</h4><h4 ng-if=login_message>{{ login_message }}</h4><h4 ng-if=\"spinner && !login_message\">please wait</h4><div class=list><br><label class=\"item item-input item-floating-label list_dashed\"><span class=input-label>Email</span> <input type=email placeholder=\"&nbsp;{{\'LOGIN_EMAIL_LABEL\' | translate }}\" ng-model=login.email required></label> <label class=\"item item-input item-floating-label list_dashed\"><span class=input-label>Password</span> <input type=password placeholder=\"&nbsp;{{\'LOGIN_PASSWORD_LABEL\' | translate }}\" ng-model=login.password required></label></div></div><div class=\"col-xs-12 col-xs-B-offset-2 col-xs-B-8 col-sm-offset-3 col-sm-6 col-lg-offset-4 col-lg-4\"><button class=\"button button-dark button-block icon-left ion-log-in\" ng-click=\"userLogin(login.email, login.password)\" ng-disabled=spinner>{{ \'LOGIN_BUTTON\' | translate }}<ion-spinner ng-if=spinner class=spinner-button-right icon=spiral></ion-spinner></button> <button class=\"button button-block button-assertive icon-left ion-android-cancel\" ng-click=returnToLogin() ng-disabled=spinner>{{ \'CANCEL_REGISTER\' | translate }}</button> <button class=\"button button-dark button-block icon-left ion-log-in\" ui-sref=userLoginPasswordReset ng-disabled=spinner>{{ \'PASSWORD_RESET_BUTTON\' | translate }}</button></div></div></ion-content></ion-view>");}]);