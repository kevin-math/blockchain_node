//main.js
const crypto = require('crypto');

class Block {
   constructor(index, data, prevHash) {
       this.index = index;
       this.timestamp = Math.floor(Date.now() / 1000);
       this.data = data;
       this.prevHash = prevHash;
       this.hash=this.getHash();
   }

   getHash() {
       var encript=JSON.stringify(this.data) + this.prevHash + this.index + this.timestamp;
       var hash=crypto.createHmac('sha256', "secret")
       .update(encript)
       .digest('hex');
       // return sha(JSON.stringify(this.data) + this.prevHash + this.index + this.timestamp);
       return hash;
   }
}


class BlockChain {
   constructor() {
       this.chain = [];
   }

   addBlock(data) {
       let index = this.chain.length;
       let prevHash = this.chain.length !== 0 ? this.chain[this.chain.length - 1].hash : 0;
       let block = new Block(index, data, prevHash);
       this.chain.push(block);
   }

   chainIsValid(){
           for(var i=0;i<this.chain.length;i++){
               if(this.chain[i].hash !== this.chain[i].getHash())
                   return false;
               if(i > 0 && this.chain[i].prevHash !== this.chain[i-1].hash)
                   return false;
           }
           return true;
       }
}


const BChain = new BlockChain();
BChain.addBlock({sender: "Kevin", reciver: "Navin", amount: 100, senderId: "6ufertvd5wmcypoh" , reciverId: 'fjw7zvsxi7b24glt'});
BChain.addBlock({sender: "Aravind", reciver: "Padmaj", amount: 50 ,  senderId: "0ufertvfi2jcypoh" , reciverId: 'jdksi87sxi7b24glt'});
BChain.addBlock({sender: "Anu", reciver: "Stark", amount: 75,  senderId: "duuertvd5wmcypoh" , reciverId: 'lr8mzvsxi7b24glt'});

console.dir(BChain,{depth:null})

console.log("******** Validity of this blockchain: ", BChain.chainIsValid());