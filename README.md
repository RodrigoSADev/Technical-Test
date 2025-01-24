# Technical Test

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.2.

## Overview

The test involves writing a simple Angular frontend application to a REST web service that manages a collection of products for an online store.

## Requirements

1. The application will have a login screen where a user will be required to enter a single authorization key, of any length but not an empty string.
2. When an authorization key is entered, the application will retrieve the current list of products from the web service, using the entered authorization key as a bearer authorization token in an HTTP “Authorization” header (i.e. the content of the “Authorization” header should be “Bearer <token>”). The application will then show a table containing the list of products, showing the index, SKU, name, and price of each product.
3. The application will allow the user to click on a product listing to see its description and details.
4. The application will allow the user to modify the product list and will submit any modifications to the web service using the CRUD REST convention. The following modifications are allowed:
   - Delete existing products, but will require a confirmation for each delete action using a secondary dialog. To delete a product the application will use the DELETE verb.
   - The application will allow the user to create a new product listing entry by entering a new product’s name, description, SKU, cost, and properties. To create a product the application will use the POST verb.
   - The application will allow the user to edit existing products to change their name, description, cost, and properties, but not SKU. To edit a product the application will use the PATCH verb.
5. When editing/creating a product, the application’s product editor will have these features:
   - Edit the product’s text fields: name and description.
   - Edit the product’s cost, setting it to any positive value with up to 2 decimal points.
   - Edit 3 properties that will be stored as a key-value set in the product’s object’s profile field, expressed as the correct JSON data type for each property. The editors for these fields shall be implemented as a web component:
     - “type” - a string value that can be one of the following values: “furniture”, “equipment”, “stationary”, or “part”. This will be represented as a drop-down list to choose from. The default value if the property is unset is “furniture”.
     - “available” - a boolean value. This will be represented as a checkbox. The default value if the property is unset is true.
     - “backlog” - an integer value. This will be represented as a spin box. The default value if the property is unset is that this property is not set.
   - Edit custom properties - stored in the item objects’ profile field - using a dynamic key-value editor that allows the user to add a new key and value as strings, change existing values (but not keys), and delete existing key-value pairs. The editor shall be implemented as a web component.

## How to Run the Project

### Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/RodrigoSADev/Technical-Test.git
```

Navigate to the project directory:

```bash
cd technical-test
```

### Install Dependencies

Install the project dependencies using npm:

```bash
npm install
```

### Start the Development Server

Start the development server:

```bash
ng serve
```

Open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.
