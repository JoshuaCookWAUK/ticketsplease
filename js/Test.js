class Test {
    constructor() {
        this.test = "failed";
        test();
        function test() {
            console.log('testing');
            Test.test = "success";
        }
        console.log(this.test);
    }
}
