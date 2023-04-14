// Подключаемся к контракту
const contractAddress = "0x551c7Ebc72E4257C85A5bd288F62c69Ac33641C3"; //Замените вашим контрактом

// Указываем ABI (Application Binary Interface) контракта
const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_note",
        type: "string",
      },
    ],
    name: "setNote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getNote",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

// Подключаемся к web3 провайдеру (метамаск)
const provider = new ethers.providers.Web3Provider(window.ethereum, 97);

let signer;
let contract;

//Запрашиваем аккаунты пользователя и подключаемся к первому аккаунту
provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    //Создаем объект контракта
    contract = new ethers.Contract(contractAddress, abi, signer);
    console.log(contract);
  });
});

//Вызываем setNote() в смарт-контракте
async function setNote() {
  const note = document.getElementById("note").value;
  const setNote = await contract.setNote(note);
}

//Вызываем getNote() в смарт-контракте и показываем пользователю
async function getNote() {
  const note = await contract.getNote();
  console.log(getNote);
  document.getElementById("result").innerText = note;
}
