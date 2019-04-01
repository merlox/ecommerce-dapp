pragma ^0.5.5;

import './ERC721.sol';

/// @notice The Ecommerce Token that implements the ERC721 token with mint functions
/// @author Merunas Grincalaitis <merunasgrincalaitis@gmail.com>
contract EcommerceToken is ERC721 {
    /// @notice To generate a new token for the specified address
    /// @param _to The receiver of this new token
    /// @param _tokenId The new token id, must be unique
    function mint(address _to, uint256 _tokenId) public {
        _mint(_to, _tokenId);
    }

    /// @notice To delete an existing token if you're the owner of that token
    /// @param _tokenId The id of the token you want to burn
    function burn(uint256 _tokenId) public {
        _burn(_tokenId);
    }
}

/// @notice The main ecommerce contract to buy and sell ERC-721 tokens representing physical or digital products
/// @author Merunas Grincalaitis <merunasgrincalaitis@gmail.com>
contract Ecommerce {
    // We need the following:
    /*
        - A function to publish, sell products with unique token ids
        - A function to buy products
        - A function to mark purchased products as completed by the seller
        - A function to get all the orders
        - A function to get the recent products
    */
    struct Product {
        uint256 id;
        string title;
        string description;
        uint256 date;
        address owner;
        uint256 price;
        uint256 quantity;
        string image;
        string state; // Either 'published', 'pending', 'completed'
    }
    // Seller address => products
    mapping(address => Product[]) public sellerProducts; // The published products by the seller
    // Buyer address => products
    mapping(address => Products[]) public purchasedProducts; // The products that a buyer bought
    // Seller address => products
    mapping(address => Products[]) public pendingSellerOrders; // The products waiting to be fulfilled by the seller, used by sellers to check which orders have to be filled
    // Buyer address => products
    mapping(address => Products[]) public pendingBuyerOrders; // The products that the buyer purchased waiting to be sent
    Product[] public products;
    uint256 public lastId;

    /// @notice To publish a product as a seller
    /// @param _title The title of the product
    /// @param _description The description of the product
    /// @param _price The price of the product in ETH
    /// @param _quantity The amount of products a user gets
    /// @param _image The image URL of the product
    function publishProduct(string memory _title, string memory _description, uint256 _price, uint256 _quantity, string memory _image) public {
        require(bytes(_title).length == 0, 'The title cannot be empty');
        require(bytes(_description).length == 0, 'The description cannot be empty');
        require(_price == 0, 'The price cannot be empty');
        require(_quantity == 0, 'The quantity cannot be empty');
        require(_image == 0, 'The image cannot be empty');

        Product p = Product(lastId, _title, _description, now, msg.sender, _price, _quantity, _image, 'published');
        product.push(p);
        sellerProducts[msg.sender].push(p);
        lastId++;
    }
}
