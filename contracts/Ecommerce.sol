pragma ^0.5.5;

import './ERC721.sol';

/// @notice The Ecommerce Token that implements the ERC721 token with mint functions
/// @author Merunas Grincalaitis <merunasgrincalaitis@gmail.com>
contract EcommerceToken is ERC721 {
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, 'This function can only be called by the owner');
        _;
    }

    /// @notice To generate a new token for the specified address, only executable by the contract owner
    /// @param _to The receiver of this new token
    /// @param _tokenId The new token id, must be unique
    function mint(address _to, uint256 _tokenId) public onlyOwner {
        _mint(_to, _tokenId);
    }

    /// @notice To delete an existing token if you're the owner of that token
    /// @param _tokenId The id of the token you want to burn
    function burn(uint256 _tokenId) public {
        _burn(_tokenId);
    }

    /// @notice To setup a new owner
    /// @param _newOwner The new owner
    function transferOwnership(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }
}

contract Ecommerce {

}
