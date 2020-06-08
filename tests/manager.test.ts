import { Event } from "../src/interfaces";
import { Manager } from "../src/Manager";

describe("manager methods", () => {
    const manager = new Manager();
    const subscriber_a_1 = jest.fn(() => undefined);
    const subscriber_a_2 = jest.fn(() => undefined);
    const subscriber_b_1 = jest.fn(() => undefined);

    it("adding/deleting modals", () => {
        manager.addModal("a");
        manager.addModal("b");
        manager.addModal("c");
        expect(manager.modals).toEqual(["a", "b", "c"]);
        manager.delModal("c");
        expect(manager.modals).toEqual(["a", "b"]);
    });

    it("adding already exist modal", () => {
        manager.addModal("a");
        expect(manager.modals).toEqual(["a", "b"]);
    });

    it("open modal", () => {
        manager.openModal("a");
        expect(manager.isOpen("a")).toBe(true);
    });

    it("close modal", () => {
        manager.closeModal("a");
        expect(manager.isOpen("a")).toBe(false);
    });

    it("open modal second modal", () => {
        manager.openModal("a");
        manager.openModal("b", false);
        expect(manager.isOpen("a")).toBe(true);
    });

    it("open modal and close another", () => {
        manager.openModal("a");
        manager.openModal("b");
        expect(manager.isOpen("a")).toBe(false);
    });

    it("open undefined modal", () => {
        expect(() => manager.openModal("f")).toThrow();
    });

    it("close undefined modal", () => {
        expect(() => manager.closeModal("f")).toThrow();
    });

    it("check subscribers list", () => {
        expect(manager.subscribers["a"]).toEqual([]);
    });

    it("add subscriber for modal 'a'", () => {
        manager.addSubscriber("a", subscriber_a_1);
        manager.addSubscriber("a", subscriber_a_2);
        expect(manager.subscribers["a"]).toHaveLength(2);
    });

    it("add subscriber for modal 'b'", () => {
        manager.addSubscriber("b", subscriber_b_1);
        expect(manager.subscribers["b"]).toHaveLength(1);
    });

    it("subscriber will call on open modal", () => {
        manager.openModal("a");
        expect(subscriber_a_1.mock.calls.length).toBe(1);
        expect(subscriber_a_2.mock.calls.length).toBe(1);
    });

    it("subscribers will call on open other modal with cloasing another modals", () => {
        manager.openModal("b", true);
        expect(subscriber_a_1.mock.calls.length).toBe(2);
        expect(subscriber_a_2.mock.calls.length).toBe(2);
    });

    it("subscriber deleting", () => {
        manager.removeSubscriber("a", subscriber_a_2);
        expect(manager.subscribers["a"]).toEqual([subscriber_a_1]);
    });

    it("deleting of modal on delete all it's subscribers", () => {
        manager.removeSubscriber("a", subscriber_a_1);
        expect(manager.modals).not.toContain("a");
    });
});

describe("registration of callbacks", () => {
    const manager = new Manager();
    manager.addModal("a");

    const beforeOpen1 = jest.fn(() => undefined);
    const afterOpen1 = jest.fn(() => undefined);
    const beforeClose1 = jest.fn(() => undefined);
    const afterClose1 = jest.fn(() => undefined);

    manager.on("beforeOpen", beforeOpen1);
    manager.on("afterOpen", afterOpen1);
    manager.on("beforeClose", beforeClose1);
    manager.on("afterClose", afterClose1);

    it("error on undefined event", () => {
        expect(() =>
            manager.on("undefined" as Event, () => undefined)
        ).toThrow();
    });

    it("manager must call callbacks on open", () => {
        manager.openModal("a");
        console.log(beforeOpen1.mock.calls);
        expect(beforeOpen1.mock.calls.length).toBe(1);
        expect(afterOpen1.mock.calls.length).toBe(1);
    });

    it("manager must call callbacks on close", () => {
        manager.closeModal("a");
        expect(beforeClose1.mock.calls.length).toBe(1);
        expect(afterClose1.mock.calls.length).toBe(1);
    });
});
