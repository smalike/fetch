buster.spec.expose();

describe("storage base", function () {
    beforeAll(function () {
        var T = this;
        T.timestampDay = 0.166;
        T.keytest = "keytest"
        T.expires = new Date().getTime() + (1000 * 60 * 60 * (24 * T.timestampDay));
        fetch("assets/utils/storage", function (storage) {
            T.storage = new storage(T.keytest, T.timestampDay);
        });
    });
    
    it("setget", function () {
        var test = "aaa";
        test.expires = +this.expires;
        this.storage.set(this.keytest, test);
        var r = this.storage.get(this.keytest);
        buster.assert.equals(r, "aaa");
    });
    
    it("setnotget", function () {
        var test = "aaa";
        test.expires = +this.expires;
        this.storage.set(this.keytest, test);
        var r = this.storage.get(this.keytest);
        buster.assert(r !== "aaa2");
    });
    
    it("remove", function () {
        this.storage.remove(this.keytest);
        var test = this.storage.get(this.keytest);
        buster.assert(!test);
    });
});