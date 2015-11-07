describe("HomeController", function () {

  beforeEach(module("app"));
  var controller;

  beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      controller = $controller;
  }));

  it("should assign welcome_message as 'Welcome Home'", function () {
      var vm = controller("HomeController", { $scope: scope });
      expect(vm.welcome_message).toBe("Welcome Home");
  });

});