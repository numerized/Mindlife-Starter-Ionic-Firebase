describe("HomeController",function(){beforeEach(module("app"));var e;beforeEach(inject(function(o,c){scope=o.$new(),e=c})),it("should assign welcome_message as 'Welcome Home'",function(){var o=e("HomeController",{$scope:scope});expect(o.welcome_message).toBe("Welcome Home")})});