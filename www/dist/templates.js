angular.module("templates",[]).run(["$templateCache",function(e){e.put("templates/tab-myprivacysettings.html",'<ion-view><ion-nav-title><h2 ng-if="statistics.numberActivities == 1">{{statistics.numberActivities}} Chance</h2><h2 ng-if="statistics.numberActivities > 1">{{statistics.numberActivities}} Chances</h2></ion-nav-title><ion-nav-buttons side=left><a ng-if=!firstTimeUser class="button button-icon button-clear icon ion-ios-ionic-outline dark" ui-sref=home></a></ion-nav-buttons><ion-content delegate-handle=content><div class=offline ng-if="online == \'offline\'"><p>You are now in offline mode.<br>You can continue to use the app.</p></div><div class=brow><div class="col-xs-12 col-xs-B-offset-2 col-xs-B-8 col-sm-offset-3 col-sm-6 col-lg-offset-4 col-lg-4"><span ng-if=firstTimeUser><h1 style="text-align: center;">Welcome to<br>iAspireLab</h1><br class=hidden-xs><br class=hidden-xs><h2 style="text-align: center;">and thank you for joining us to help develop the InspireAspire App.</h2><br class=hidden-xs><br class=hidden-xs></span><h4>We’re committed to respecting your privacy and will only use the information you provide to aid the research and development of the full InspireAspire App.<br><br>To understand how we will treat your personal data, suggestions and other information after it has been collected by us through your use of iAspireLab click on the read more link.<br><a style=color:blue;text-decoration:underline ng-click="scrollToAnchorWithinCurrentPage(\'privacy-notice\')">Read More...</a></h4></div></div><div class=brow id=question1 ng-if=firstTimeUser><div class="col-xs-12 col-xs-B-offset-2 col-xs-B-8 col-sm-offset-3 col-sm-6 col-lg-offset-4 col-lg-4"><h2>Before starting please fill this form.</h2></div></div><div ng-repeat="Question in myPrivacySettings"><div class=brow ng-if="myPrivacySettings[Question.conditionQuestion].replyNumber == Question.conditionAnswer || !Question.conditionAnswer"><div class="col-xs-12 col-xs-B-offset-2 col-xs-B-8 col-sm-offset-3 col-sm-6 col-lg-offset-4 col-lg-4"><h4>{{Question.label}}</h4><h4 ng-if="Question.type == \'slider\'">{{priority[Question.replyNumber]}}</h4></div></div><div class=brow><div class="col-xs-12 col-xs-B-offset-2 col-xs-B-8 col-sm-offset-3 col-sm-6 col-lg-offset-4 col-lg-4"><div class="item range range-positive" ng-if="Question.type == \'slider\'"><i class="icon ion-ios-minus-outline" ng-click="Question.replyNumber = Question.replyNumber-1"></i> <input class=range-zoom ng-model=Question.replyNumber type=range ng-change="saveReply($index, \'Privacy\', Question.label, priority[Question.replyNumber], Question.replyNumber, Question.type)" name=volume min=0 max=4 step=1> <i class="icon ion-ios-plus-outline" ng-click="Question.replyNumber = Question.replyNumber+1"></i></div><label class="item item-input list_dashed" ng-if="Question.type == \'freetext\'"><textarea enter-submit="saveReply($index, \'Privacy\', Question.label, Question.replyText, -1)" msd-elastic name=desc id=desc placeholder="Click here to input text" ng-model=Question.replyText ng-blur="saveReply($index, \'Privacy\', Question.label, Question.replyText, -1, Question.type)"></textarea></label> <label class="item item-input list_dashed" ng-if="Question.type == \'inputtext\' && (myPrivacySettings[Question.conditionQuestion].replyNumber == Question.conditionAnswer || !Question.conditionAnswer)"><input type=text enter-submit="saveReply($index, \'Privacy\', Question.label, Question.replyText, -1)" name=desc id=desc placeholder="Click here to input text" ng-model=Question.replyText ng-blur="saveReply($index, \'Privacy\', Question.label, Question.replyText, -1, Question.type)"></label><div class=list ng-if="Question.type == \'radio\'"><label class="list_dashed item item-radio" ng-repeat="(optionIndex, label) in myPrivacySettings[$index].options"><ion-radio-fix icon=ion-checkmark ng-model=Question.replyText value={{label}} ng-click="saveReply($index, \'Privacy\', Question.label, label, optionIndex, Question.type)">{{label}}</ion-radio-fix></label></div><div ng-if="Question.type == \'yesno\' && (myPrivacySettings[Question.conditionQuestion].replyNumber == Question.conditionAnswer || !Question.conditionAnswer)"><ion-toggle class=list_dashed ng-model=Question.replyNumber ng-change="saveReply($index, \'Privacy\', Question.label, Question.replyNumber, Question.replyNumber, Question.type)"><span ng-if="Question.replyNumber != true"><h2>No</h2></span> <span ng-if="Question.replyNumber == true"><h2>Yes</h2></span></ion-toggle></div></div></div></div><div class=brow ng-if=firstTimeUser><div class="col-xs-12 col-xs-B-offset-2 col-xs-B-8 col-sm-offset-3 col-sm-6 col-lg-offset-4 col-lg-4"><button class="button button-block button-balanced icon-left ion-android-star" ui-sref=tabs.help>Start !</button></div></div><div class=brow><div class="col-xs-12 col-xs-B-offset-2 col-xs-B-8 col-sm-offset-3 col-sm-6 col-lg-offset-4 col-lg-4"><br><br><h2 id=privacy-notice>Personal Data and Privacy Commitment</h2><h6>We will not disclose any personal data to any third party without your prior consent.<h6>As part of our development process we conduct focus group research to help us ensure our Apps are appealing and attractive to those who use them. Any information collected is stored securely on our database and is only used to help us decide the best content to include in our Apps.</h6><h6>All personal data is kept confidential and is only used to help us locate you if you win prize, if your contribution has been nominated for inclusion in the App, or you have elected to receive newsletters and/or other updates. We promise not to use any of this information for commercial purposes or gain, and we won’t give any of your personal information to a third party. Any data used for further research purposes will be saved anonymously.</h6><h6>By “playing” or entering any information into this iAspireLab research App you understand and agree to let us collect, store and use the information entered as described above. To edit or delete personal data held return to “Privacy Settings” by clicking <i class="icon ion-gear-a"></i> at any time, or email iaspire@help.org.uk</h6><br><a class="button button-small button-balanced button-block" ng-click="scrollToAnchorWithinCurrentPage(\'question1\')">Back to Top</a><br><br><br><br><br><br><br><br></h6></div></div></ion-content></ion-view>')}]);