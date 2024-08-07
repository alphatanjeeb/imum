# Pharmacy Products Mapping App

This Express.js MVC application processes CSV files containing pharmacy products from various sources, matches products, and maps related manufacturers. It includes batch processing and fuzzy matching for efficient data handling.

## Features

- **Batch Processing**: Handles large CSV files in batches to optimize memory usage and performance.
- **Fuzzy Matching**: Uses fuzzy matching to identify similar manufacturer names.
- **Manufacturer Mapping**: Maps related manufacturers and identifies relationship types (parent/child/sibling).
- **Automatic Manufacturer Assignment**: Assigns a manufacturer to a product title based on related manufacturer mapping.
- **Validation**: Provides mechanisms to flag potential mismatches for manual review.

## Requirements

- Node.js (v14 or higher)
- SQLite3

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/alphatanjeeb/imum.git
    cd imum
    ```

2. Install dependencies:
    ```bash
    npm install
    ```


## Usage

1. Start the server:
    ```bash
    npm start
    ```
2. Browser: http://localhost:3000/

3. Upload a CSV file containing  products:
    - Endpoint: `POST /upload`
    - Form field name: `file`

4. Upload a CSV file containing  matches:
    - Endpoint: `POST /upload-match`
    - Form field name: `file`

2. Browser: http://localhost:3000/products
    - Endpoint: `GET /products`

## Project Structure

imum
├── controllers
│ └── productController.js
├── models
│ ├── db.js
│ └── productModel.js
├── routes
│ └── index.js
├── services
│ └── manufacturerService.js
├── uploads
|  └── ...
├── views
| ├── error.ejs
| ├── index.ejs
| └── success.ejs
| └──products.ejs
├── public
| └── css
|    └── styles.css
├── server.js
├── package.json
└── README.md


## Endpoints
- `GET /products`
  - Get all pharmacy products.
  - Example: `curl -F "file=@/path/to/products.csv" http://localhost:3000/products`

- `POST /upload`
  - Uploads a CSV file containing pharmacy products.
  - Example: `curl -F "file=@/path/to/products.csv" http://localhost:3000/upload`

- `POST /upload-match`
  - Uploads a CSV file containing product matches.
  - Example: `curl -F "file=@/path/to/matches.csv" http://localhost:3000/upload-match`

## Batch Processing and Fuzzy Matching

The application processes CSV files in batches of 10,000 records to optimize memory usage. It uses the `fuzzy` library to perform fuzzy matching of manufacturer names to handle variations and inaccuracies.

## Manufacturer Mapping

The app includes a service to map related manufacturers and classify the relationships as parent, child, or sibling. It also provides a function to assign a manufacturer to a product title based on the related manufacturer mapping.

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request.

## License

This project is licensed under the MIT License.
