const Bank = artifacts.require("Bank");

contract("Bank", (accounts) => {
    it("should deposit and withdraw correctly", async () => {
        const bank = await Bank.deployed();

        await bank.deposit({ from: accounts[0], value: web3.utils.toWei('1', 'ether') });
        let balance = await bank.balances(accounts[0]);
        assert.equal(balance.toString(), web3.utils.toWei('1', 'ether'));

        await bank.withdraw(web3.utils.toWei('0.5', 'ether'), { from: accounts[0] });
        balance = await bank.balances(accounts[0]);
        assert.equal(balance.toString(), web3.utils.toWei('0.5', 'ether'));

    })
})