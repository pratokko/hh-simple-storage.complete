//SPDX-License-Identifier: MIT
pragma solidity 0.8.8;

contract SimpleStorage {
    struct People {
        uint256 favoriteNumber;
        string name;
    }

    mapping(string => uint256) public nameToFavoriteNum;

    People[] public person;

    uint256 favoriteNumber;

    function store(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
    }

    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    function addPerson(string memory _name, uint256 _favoriteNumber) public {
       person.push(People(_favoriteNumber, _name));
        nameToFavoriteNum[_name] = _favoriteNumber;
    }
}
