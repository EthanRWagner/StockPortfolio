const myPortfolio = require("./stockPortfolio.js");

let folio = new myPortfolio.Portfolio();
let stock1 = new myPortfolio.Stock("GME", 5);
let stock2 = new myPortfolio.Stock("RBLX", 2);

beforeEach(() => {
    folio.stocks = [];
});

// test("Initialize portfolio", () => {
//     let folio = new myPortfolio.Portfolio();
// });

test("Initialize portfolio structure", () => {
    const target_elements =  [];
    expect(target_elements).toEqual(folio.stocks);
});

test("check if portfolio is empty", () => {
    expect(folio.empty()).toBeTruthy();
});

test("check if portfolio is not empty", () => {
    folio.addStock("GME", 5);
    expect(folio.empty()).toBeFalsy();
});

// test("check stocks content", () => {
//     let stock1 = new myPortfolio.Stock("GME", 5);
//     let stock2 = new myPortfolio.Stock("RBLX", 2);
//     const target = [stock1, stock2];
//     folio.addStock("GME", 5);
//     folio.addStock("RBLX", 2);
//     expect(target).toEqual(folio.stocks);
//     folio.stocks = [];
// });


test("check stock count, empty", () => {
    const target = 0;
    expect(target).toEqual(folio.stockCount());
});

test("check stock count", () => {
    const target = 2;
    folio.addStock("GME", 5);
    folio.addStock("RBLX", 2);
    expect(target).toEqual(folio.stockCount());
});

test("find stock in list", () => {
    const target = 0;
    folio.addStock('GME', 5);
    const res = folio.findStock('GME');
    expect(res).toBe(target);
});

test("find stock in list", () => {
    const target = null;
    let ticker = 'GME';
    expect(target).toEqual(folio.findStock(ticker));
});

test("buy share in portfolio", () => {
    let stock3 = new myPortfolio.Stock("GME", 15)
    const target = [stock3, stock2];
    folio.addStock("GME", 5);
    folio.addStock("RBLX", 2);
    folio.buyStock("GME", 10);
    expect(target).toEqual(folio.stocks);
});

test("buy new shares", () => {
    let stock3 = new myPortfolio.Stock("GME", 10)
    const target = [stock3];
    folio.buyStock("GME", 10);
    expect(target).toEqual(folio.stocks);
});

test("sell share in portfolio with enough shares", () => {
    let stock3 = new myPortfolio.Stock("GME", 1)
    const target = [stock3, stock2];
    folio.addStock("GME", 6);
    folio.addStock("RBLX", 2);
    folio.sellStock("GME", 5);
    expect(target).toEqual(folio.stocks);
});

test("sell share in portfolio with enough shares, but gets removed", () => {
    const target = [stock2];
    folio.addStock("GME", 5);
    folio.addStock("RBLX", 2);
    folio.sellStock("GME", 5);
    expect(target).toEqual(folio.stocks);
});

test("sell share in portfolio without enough shares", () => {
    folio.addStock("GME", 5);
    folio.addStock("RBLX", 2);
    expect(() => folio.sellStock("GME", 6)).toThrow(myPortfolio.ShareSaleException);
    folio.addStock("GME", 5);
    expect(() => folio.sellStock("GME", 6)).toThrow(new myPortfolio.ShareSaleException("Insufficient shares."));
});

test("sell shares error", () => {
    expect(() => folio.sellStock("GME", 10)).toThrow(Error);
    expect(() => folio.sellStock("GME", 10)).toThrow(new Error("No shares owned."));
});

test("get shares, normal", () => {
    const target = 1;
    folio.addStock("GME", 6);
    folio.addStock("RBLX", 2);
    folio.sellStock("GME", 5);
    expect(target).toEqual(folio.retShares("GME"));
});

test("get shares that are not owned", () => {
    folio.addStock("GME", 5);
    folio.addStock("RBLX", 2);
    folio.sellStock("GME", 5);
    expect(() => folio.retShares("GME")).toThrow(Error);
    expect(() => folio.retShares("GME")).toThrow(new Error("No shares owned."));
});

