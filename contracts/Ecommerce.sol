pragma solidity ^0.5.0;

import './ERC721.sol';

/// @notice The Ecommerce Token that implements the ERC721 token with mint functions without burning to avoid problems
/// @author Merunas Grincalaitis <merunasgrincalaitis@gmail.com>
contract EcommerceToken is ERC721 {
    /// @notice To generate a new token for the specified address
    /// @param _to The receiver of this new token
    /// @param _tokenId The new token id, must be unique
    function mint(address _to, uint256 _tokenId) public {
        _mint(_to, _tokenId);
    }
}

/// @notice The main ecommerce contract to buy and sell ERC-721 tokens representing physical or digital products because we are dealing with non-fungible tokens, there will be only 1 stock per product
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
        address payable owner;
        uint256 price;
        string image;
    }
    struct Order {
        uint256 id;
        string nameSurname;
        string lineOneDirection;
        string lineTwoDirection;
        bytes32 city;
        bytes32 stateRegion;
        uint256 postalCode;
        bytes32 country;
        uint256 phone;
        string state; // Either 'pending', 'completed'
    }
    // Seller address => products
    mapping(address => Product[]) public sellerProducts; // The published products by the seller
    // Seller address => products
    mapping(address => Order[]) public pendingSellerOrders; // The products waiting to be fulfilled by the seller, used by sellers to check which orders have to be filled
    // Buyer address => products
    mapping(address => Order[]) public pendingBuyerOrders; // The products that the buyer purchased waiting to be sent
    // Seller address => products
    mapping(address => Order[]) public completedSellerOrders; // A history of past orders fulfilled by the seller
    // Buyer address => products
    mapping(address => Order[]) public completedBuyerOrders; // A history of past orders made by this buyer
    // Product id => product
    mapping(uint256 => Product) public productById;
    // Product id => order
    mapping(uint256 => Order) public orderById;
    // Product id => true or false
    mapping(uint256 => bool) public productExists;
    Product[] public products;
    Order[] public orders;
    uint256 public lastId;
    address public token;
    uint256 public lastPendingSellerOrder;
    uint256 public lastPendingBuyerOrder;

    /// @notice To setup the address of the ERC-721 token to use for this contract
    /// @param _token The token address
    constructor(address _token) public {
        token = _token;
    }

    /// @notice To publish a product as a seller
    /// @param _title The title of the product
    /// @param _description The description of the product
    /// @param _price The price of the product in ETH
    /// @param _image The image URL of the product
    function publishProduct(string memory _title, string memory _description, uint256 _price, string memory _image) public {
        require(bytes(_title).length > 0, 'The title cannot be empty');
        require(bytes(_description).length > 0, 'The description cannot be empty');
        require(_price > 0, 'The price cannot be empty');
        require(bytes(_image).length > 0, 'The image cannot be empty');

        Product memory p = Product(lastId, _title, _description, now, msg.sender, _price * 1e18 , _image);
        products.push(p);
        sellerProducts[msg.sender].push(p);
        productById[lastId] = p;
        productExists[lastId] = true;
        EcommerceToken(token).mint(address(this), lastId); // Create a new token for this product which will be owned by this contract until sold
        lastId++;
    }

    /// @notice To buy a new product, note that the seller must authorize this contract to manage the token
    /// @param _id The id of the product to buy
    /// @param _nameSurname The name and surname of the buyer
    /// @param _lineOneDirection The first line for the user address
    /// @param _lineTwoDirection The second, optional user address line
    /// @param _city Buyer's city
    /// @param _stateRegion The state or region where the buyer lives
    /// @param _postalCode The postal code of his location
    /// @param _country Buyer's country
    /// @param _phone The optional phone number for the shipping company
    function buyProduct(uint256 _id, string memory _nameSurname, string memory _lineOneDirection, string memory _lineTwoDirection, bytes32 _city, bytes32 _stateRegion, uint256 _postalCode, bytes32 _country, uint256 _phone) public payable {
        // The line 2 address and phone are optional, the rest are mandatory
        require(productExists[_id], 'The product must exist to be purchased');
        require(bytes(_nameSurname).length > 0, 'The name and surname must be set');
        require(bytes(_lineOneDirection).length > 0, 'The line one direction must be set');
        require(_city.length > 0, 'The city must be set');
        require(_stateRegion.length > 0, 'The state or region must be set');
        require(_postalCode > 0, 'The postal code must be set');
        require(_country > 0, 'The country must be set');

        Product memory p = productById[_id];
        Order memory newOrder = Order(_id, _nameSurname, _lineOneDirection, _lineTwoDirection, _city, _stateRegion, _postalCode, _country, _phone, 'pending');
        require(msg.value >= p.price, "The payment must be larger or equal than the products price");

        // Return the excess ETH sent by the buyer
        if(msg.value > p.price) msg.sender.transfer(msg.value - p.price);
        pendingSellerOrders[p.owner].push(newOrder);
        pendingBuyerOrders[msg.sender].push(newOrder);
        orders.push(newOrder);
        orderById[_id] = newOrder;
        lastPendingSellerOrder = pendingSellerOrders[p.owner].length > 0 ? pendingSellerOrders[p.owner].length - 1 : 0;
        lastPendingBuyerOrder = pendingBuyerOrders[p.owner].length > 0 ? pendingBuyerOrders[p.owner].length - 1 : 0;
        EcommerceToken(token).transferFrom(p.owner, msg.sender, _id); // Transfer the product token to the new owner
        p.owner.transfer(p.price);
    }

    /// @notice To mark an order as completed
    /// @param _id The id of the order which is the same for the product id
    function markOrderCompleted(uint256 _id) public {
        Order memory order = orderById[_id];
        Product memory product = productById[_id];
        require(product.owner == msg.sender, 'Only the seller can mark the order as completed');
        order.state = 'completed';

        // Delete the seller order from the array of pending orders
        for(uint256 i = 0; i < pendingSellerOrders[product.owner].length; i++) {
            if(pendingSellerOrders[product.owner][i].id == _id) {
                Order memory lastElement = orderById[lastPendingSellerOrder];
                pendingSellerOrders[product.owner][i] = lastElement;
                pendingSellerOrders[product.owner].length--;
                lastPendingSellerOrder--;
            }
        }
        // Delete the seller order from the array of pending orders
        for(uint256 i = 0; i < pendingBuyerOrders[msg.sender].length; i++) {
            if(pendingBuyerOrders[msg.sender][i].id == order.id) {
                Order memory lastElement = orderById[lastPendingBuyerOrder];
                pendingBuyerOrders[msg.sender][i] = lastElement;
                pendingBuyerOrders[msg.sender].length--;
                lastPendingBuyerOrder--;
            }
        }
        completedSellerOrders[product.owner].push(order);
        completedBuyerOrders[msg.sender].push(order);
        orderById[_id] = order;
    }
}
