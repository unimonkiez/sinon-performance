const sinon = require('sinon');
const jsdom = require('jsdom');

const createTest = (title = 'Test', fn) => {
    const startTime = Date.now();
    fn();
    const endTime = Date.now();
    const result = endTime - startTime;
    console.log(`${title}: ${result}ms.`);
};

createTest('create spy', () => {
    sinon.spy();
});

createTest('create spy and call it', () => {
    const spy = sinon.spy();
    spy();
});

createTest('create stub', () => {
    const stub = sinon.stub();
});

createTest('create stub which some functionality', () => {
    sinon.stub().returns(3);
});

createTest('create stub which some functionality and call it', () => {
    const stub = sinon.stub().returns(3);
});

createTest('create stub on object', () => {
    const obj = {
        do() {
            console.throw('gg');
        }
    }
    sinon.stub(obj, 'do').returns(3);
});

createTest('create stub on object with sandbox', () => {
    const sandbox = sinon.sandbox.create();
    const obj = {
        do() {
            console.throw('gg');
        }
    }
    sandbox.stub(obj, 'do').returns(3);
});

createTest('create stub on object with sandbox and restore', () => {
    const sandbox = sinon.sandbox.create();
    const obj = {
        do() {
            console.throw('gg');
        }
    }
    sandbox.stub(obj, 'do').returns(3);
    sandbox.restore();
});

createTest('create stub on object with sandbox and restore 100 times', () => {
    const sandbox = sinon.sandbox.create();
    const obj = {
        do1() {
            console.throw('gg');
        },
        do2() {
            console.throw('gg');
        },
        do3() {
            console.throw('gg');
        },
        do4() {
            console.throw('gg');
        },
        do5() {
            console.throw('gg');
        }
    }
    Array.from({ length: 100 }).forEach(() => {
        sandbox.stub(obj, 'do1').returns(3);
        sandbox.stub(obj, 'do2').returns(3);
        sandbox.stub(obj, 'do3').returns(3);
        sandbox.stub(obj, 'do4').returns(3);
        sandbox.stub(obj, 'do5').returns(3);

        sandbox.restore();
    });
});

createTest('create spy on object with sandbox and restore (manually) 100 times', () => {
    const sandbox = sinon.sandbox.create();
    const obj = {
        do1() {
            console.throw('gg');
        },
        do2() {
            console.throw('gg');
        },
        do3() {
            console.throw('gg');
        },
        do4() {
            console.throw('gg');
        },
        do5() {
            console.throw('gg');
        }
    }
    Array.from({ length: 100 }).forEach(() => {
        const originalDo1 = obj.do1;
        obj.do1 = sandbox.spy(() => 3);
        const originalDo2 = obj.do2;
        obj.do2 = sandbox.spy(() => 3);
        const originalDo3 = obj.do3;
        obj.do3 = sandbox.spy(() => 3);
        const originalDo4 = obj.do4;
        obj.do4 = sandbox.spy(() => 3);
        const originalDo5 = obj.do5;
        obj.do5 = sandbox.spy(() => 3);

        obj.do1 = originalDo1;
        obj.do2 = originalDo2;
        obj.do3 = originalDo3;
        obj.do4 = originalDo4;
        obj.do5 = originalDo5;
    });
});
