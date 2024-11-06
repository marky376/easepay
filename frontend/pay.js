document.addEventListener("DOMContentLoaded", function() {
  const greetingElement = document.getElementById('user-greeting');
  const currentHour = new Date().getHours(); // Get the current hour
  let greetingMessage; // Variable to hold the greeting message

  // Determine greeting based on the time of day
  if (currentHour < 12) {
      greetingMessage = 'Good Morning, Mark!';
  } else if (currentHour < 18) {
      greetingMessage = 'Good Afternoon, Mark!';
  } else {
      greetingMessage = 'Good Evening, Mark!';
  }

  greetingElement.innerHTML = greetingMessage;


  // Web3.js and contract interaction
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
  const abi = [
    {
        "inputs" : [
        {    
            "internalType": "address",
            "name": "",
            "type": "address"
        }
        ],
        "name": "balances",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function",
        "payable": true
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
    ];

    const web3 = new Web3(Web3.givenProvider);
    const bankContract = new web3.eth.Contact(abi, contractAddress);

    async function updateBalance(account) {
        const balance = await bankContract.methods.balances(account).call();
        document.getElementById('balance').innerText = 'Ksh ' + web3.utils.fromWei(balance, 'ether') + '.00';

    }

    document.getElementById('addMoneyButton').onclick = async () => {
        const accounts = await web3.eth.requestAccounts();
        const amount = web3.utils.toWei('1', 'ether'); // 1 ether
        await bankContract.methods.deposit().send({ from: accounts[0], value: amount });
        updateBalance(accounts[0]);
    }

    document.getElementById('withdrawButton').onclick = async () => {
        const accounts = await web3.eth.requestAccounts();
        const amount = web3.utils.toWei('0.5', 'ether'); // 0.5 ether
        await bankContract.methods.withdraw(amount).send({ from: accounts[0] });
        updateBalance(accounts[0]);
    }

    // Initializing the balance on the load page
    window.onload = async () => {
        const accounts = await web3.eth.requestAccounts();
        updateBalance(accounts[0]);
    }
});
