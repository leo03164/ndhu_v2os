const Web3 = require("web3");

// check user already install metamask plugin
if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  alert("Can Not Find Metamsk!");
}

const contractAddress = "0x57be6CFf250f6e7cCB6D1ed650c70db5d0ea811B";
const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "UID",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "distributor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "country",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bornDate",
				"type": "uint256"
			}
		],
		"name": "addDistributorEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "UID",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "manager",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "country",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bornDate",
				"type": "uint256"
			}
		],
		"name": "addManagerEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "who",
				"type": "address"
			}
		],
		"name": "addShoesEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "manager",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "reason",
				"type": "string"
			}
		],
		"name": "addShoesToBlackListEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "who",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "reason",
				"type": "string"
			}
		],
		"name": "delShoesEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "shoesId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "distributor",
				"type": "address"
			}
		],
		"name": "empowerShoesEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newBornDate",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "who",
				"type": "address"
			}
		],
		"name": "modifyShoesBornDateEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "newBornFrom",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "who",
				"type": "address"
			}
		],
		"name": "modifyShoesBornFromEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "newCompany",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "who",
				"type": "address"
			}
		],
		"name": "modifyShoesCompanyEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "newName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "who",
				"type": "address"
			}
		],
		"name": "modifyShoesNameEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "newSN",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "who",
				"type": "address"
			}
		],
		"name": "modifyShoesSNEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "distributor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "shoesId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "randomValue",
				"type": "bytes32"
			}
		],
		"name": "shoesRandomValueEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "shoesId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "location",
				"type": "string"
			}
		],
		"name": "shoesRegisterEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "location",
				"type": "string"
			}
		],
		"name": "transferShoesEvent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_CID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_SN",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_company",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_bornFrom",
				"type": "string"
			}
		],
		"name": "addShoes",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_avatarPath",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_UID",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_targetAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_country",
				"type": "string"
			}
		],
		"name": "addShoesDistributor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_avatarPath",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_UID",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_targetAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_country",
				"type": "string"
			}
		],
		"name": "addShoesManager",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "targetId",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "reason",
				"type": "string"
			}
		],
		"name": "addToBlackList",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "agent",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "shoesId",
				"type": "bytes32"
			}
		],
		"name": "buyShoesFromProxy",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "shoesId",
				"type": "bytes32"
			}
		],
		"name": "cancelOrderByBuyer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "shoesId",
				"type": "bytes32"
			}
		],
		"name": "confirmOrder",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contractOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "customerShoesCount",
		"outputs": [
			{
				"internalType": "uint64",
				"name": "",
				"type": "uint64"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "customerShoesIds",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "shoesId",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "reason",
				"type": "string"
			}
		],
		"name": "delShoes",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "targetAddress",
				"type": "address"
			}
		],
		"name": "delShoesDistributor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "targetAddress",
				"type": "address"
			}
		],
		"name": "delShoesManager",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "distributorArray",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "distributorCount",
		"outputs": [
			{
				"internalType": "uint16",
				"name": "",
				"type": "uint16"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "distributorList",
		"outputs": [
			{
				"internalType": "string",
				"name": "avatar",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "UID",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "chainAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "country",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "bornDate",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isBan",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "shoesId",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "distributor",
				"type": "address"
			}
		],
		"name": "empowerShoesToDistributor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "target",
				"type": "address"
			}
		],
		"name": "getAddressBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "temp",
				"type": "string"
			}
		],
		"name": "getByte32Hash",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "shoesId",
				"type": "bytes32"
			}
		],
		"name": "getReportReason",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "imagePath",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "reason",
						"type": "string"
					}
				],
				"internalType": "struct kernel.ReportReason",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "SN",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "company",
				"type": "string"
			}
		],
		"name": "getShoesIdByShoesAttribute",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "shoesId",
				"type": "bytes32"
			}
		],
		"name": "getShoesOwnersHistory",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getShoesReportList",
		"outputs": [
			{
				"internalType": "bytes32[]",
				"name": "",
				"type": "bytes32[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32[]",
				"name": "arr",
				"type": "bytes32[]"
			},
			{
				"internalType": "bytes32",
				"name": "shoesId",
				"type": "bytes32"
			}
		],
		"name": "indexOf",
		"outputs": [
			{
				"internalType": "uint64",
				"name": "",
				"type": "uint64"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "isShoesPaid",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "managerArray",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "managerCount",
		"outputs": [
			{
				"internalType": "uint16",
				"name": "",
				"type": "uint16"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "managerList",
		"outputs": [
			{
				"internalType": "string",
				"name": "avatar",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "UID",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "chainAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "country",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "bornDate",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isBan",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_bornDate",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "shoesId",
				"type": "bytes32"
			}
		],
		"name": "modifyShoesBornDate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_bornFrom",
				"type": "string"
			},
			{
				"internalType": "bytes32",
				"name": "shoesId",
				"type": "bytes32"
			}
		],
		"name": "modifyShoesBornFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_company",
				"type": "string"
			},
			{
				"internalType": "bytes32",
				"name": "shoesId",
				"type": "bytes32"
			}
		],
		"name": "modifyShoesCompany",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "bytes32",
				"name": "shoesId",
				"type": "bytes32"
			}
		],
		"name": "modifyShoesName",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_SN",
				"type": "string"
			},
			{
				"internalType": "bytes32",
				"name": "shoesId",
				"type": "bytes32"
			}
		],
		"name": "modifyShoesSN",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "shoesId",
				"type": "bytes32"
			}
		],
		"name": "payForShoes",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "randomValueOfShoes",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "shoesId",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "randomValue",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			}
		],
		"name": "registerShoes",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "shoesId",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "imagePath",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "reason",
				"type": "string"
			}
		],
		"name": "reportShoes",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "shoesId",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "randomValueHash",
				"type": "bytes32"
			}
		],
		"name": "setShoesRandomValue",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "shoesBeforeEmpowerCount",
		"outputs": [
			{
				"internalType": "uint64",
				"name": "",
				"type": "uint64"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "shoesBeforeRegisterCount",
		"outputs": [
			{
				"internalType": "uint64",
				"name": "",
				"type": "uint64"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "shoesBlackList",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "shoesBlockCounter",
		"outputs": [
			{
				"internalType": "uint64",
				"name": "",
				"type": "uint64"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "shoesCount",
		"outputs": [
			{
				"internalType": "uint64",
				"name": "",
				"type": "uint64"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "shoesDistributors",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "shoesInfoBeforeEmpower",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "shoesInfoBeforeRegister",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "shoesList",
		"outputs": [
			{
				"internalType": "string",
				"name": "CID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "SN",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "company",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "bornFrom",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "bornDate",
				"type": "uint256"
			},
			{
				"internalType": "enum kernel.State",
				"name": "state",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "agent",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "lastBuyerLocation",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "shoesPrice",
		"outputs": [
			{
				"internalType": "uint64",
				"name": "",
				"type": "uint64"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "shoesId",
				"type": "bytes32"
			},
			{
				"internalType": "address payable",
				"name": "buyer",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			}
		],
		"name": "transferShoesByOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "shoesId",
				"type": "bytes32"
			},
			{
				"internalType": "uint64",
				"name": "price",
				"type": "uint64"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			}
		],
		"name": "transferShoesToContract",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];


let provider;
export default {	
	contractAddress,
	abi,
	provider,
	async init() {
		// if user have metamask access it
		if (window.ethereum) {
			await ethereum.enable();
			provider = web3.currentProvider;
			web3.setProvider(provider);
		}
        return new web3.eth.Contract(
            abi,
            contractAddress
        );
	},
	async loadDistributorData(contract) {
	  
	  const distributorCount = Number(
        await contract.methods.distributorCount().call()
	  );
		
      if (distributorCount === 0) {
        return;
      }

      let i;
      let distributorIds = [];
      let distributorIdsPromiseArr = [];

      for (i = 0; i < distributorCount; i += 1) {
        distributorIdsPromiseArr.push(
          contract.methods.distributorArray(i).call()
        );
	  }
		
	  distributorIds = await Promise.all(distributorIdsPromiseArr);
	  let distributorList = [];

      for (i = 0; i < distributorIds.length; i += 1) {
        const distributorInfo = await contract.methods
          .distributorList(distributorIds[i])
          .call();

        if (distributorInfo.isBan === false) {
          distributorList.push(distributorInfo);
        }
	  }
	  return distributorList;
    }
}