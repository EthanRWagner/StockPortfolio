class ShareSaleException extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
    }
  }

class Stock {
    constructor(name, shares) {
        this.name = name;
        this.shares = shares;
    }

    getName(){
        return this.name;
    }

    getShares(){
        return this.shares;
    }

    addShare(num){
        this.shares += num;
    }
}

class Portfolio {
    constructor(){
        this.stocks = [];
    }

    empty(){
        if(this.stocks.length === 0)
            return true;
        else {
            for(var i=0; i<this.stocks.length; i++){
                if(this.stocks[i].shares != 0){
                    return false;
                }
            }
            return true;
        }
    }
    
    addStock(ticker, shares){
        this.stocks.push(new Stock(ticker, shares));
    }

    stockCount(){
        return this.stocks.length;
    }

    buyStock(ticker, newShare){
        const pos = this.findStock(ticker);
        if(pos === null){
            this.stocks.push(new Stock(ticker, newShare));
        }
        else{
            this.stocks[pos].addShare(newShare);
        }
    }

    sellStock(ticker, newShare){
        const pos = this.findStock(ticker);
        if(pos === null){
            throw new Error('No shares owned.');
        }
        else{
            if(this.stocks[pos].getShares() >= newShare){
                this.stocks[pos].addShare(-1*newShare);
                if(this.stocks[pos].getShares() === 0){
                    this.stocks.splice(pos, 1);
                }
            }
            else{
                throw new ShareSaleException('Insufficient shares.');
            }
        }
    }

    findStock(ticker){
        for(let i=0; i<this.stocks.length; i++){
            if(this.stocks[i].getName() === ticker){
                return i;
            }
        }
        return null;
    }

    retShares(ticker){
        const pos = this.findStock(ticker);
        if(pos === null){
            throw new Error('No shares owned.');
        }
        else{
            return this.stocks[pos].getShares();
        }
    }

}

exports.ShareSaleException = ShareSaleException;
exports.Stock = Stock;
exports.Portfolio = Portfolio;
