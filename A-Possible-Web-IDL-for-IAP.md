### 1. *Navigator* interface

```Java
partial interface Navigator {
    readonly    attribute InAppPurchase iap;
};
```

#### 1.1 Attributes

_iap_ of type _InAppPurchase_, readonly

- The object that exposes the In App Purchase functionality.

### 2. *InAppPurchase* interface

The _InAppPurchase_ interface exposes the In App Purchase functionality.

```Java
interface InAppPurchase {
  Promise queryProductDetails(sequence<DOMString> products);
  Promise purchase(DOMString id);
  Promise restore();
};
```

#### 2.1 Methods

_`queryProductDetails`_
- This method allows to query details of available products from payment provider. It returns a `Promise` that will allow the caller to be notified about the result of the operation.
- _Type_: `sequence<DOMString>`
- _Nullable_: `N`
- _Optional_: `N`
- _Return type_: `Promise`

_`purchase`_
- This method allows to buy an available product from payment provider. It returns a `Promise` that will allow the caller to be notified about the result of the operation.
- _Parameter_: `id`
- _Type_: `DOMString`
- _Nullable_: `N`
- _Optional_: `N`
- _Return type_: `Promise`

_`restore`_
- This method allows to restore transactions of current user which already been finished. It returns a `Promise` that will allow the caller to be notified about the result of the operation.
- _No parameters._
- _Return type_: `Promise`

#### 2.2 Method Procedures

The _queryProductDetails_ method when invoked MUST run the following steps:

1. Let _promise_ be a new _Promise_ object and resolver its associated resolver.
1. Return _promise_ and continue the following steps asynchronously.
1. Make a request to the system to retrieve details of the available products which indicated by an array of product IDs.
1. If there is an error invoke resolver's _reject algorithm_ with no argument and terminate these steps.
1. When the request has been completed:
 - Let _products_ be a new array of _IAPProduct_ objects providing the results of the queryAvailableProducts operation.
 - Invoke resolver's _fulfill algorithm_ with products as the _value_ argument. 

The purchase method when invoked MUST run the following steps:

1. Let _promise_ be a new _Promise_ object and resolver its associated resolver.
1. Return _promise_ and continue the following steps asynchronously.
1. Make a request to the system to purchase a product which indicated by the id parameter.
1. If there is an error invoke resolver's _reject algorithm_ with no argument and terminate these steps.
1. When the request has been completed:
 - Let _transaction_ be the IAPTransactionDetails object as returned by the system.
 - Invoke resolver's _fulfill algorithm_ with transaction as the _value_ argument. 

The restore method when invoked MUST run the following steps:

1. Let _promise_ be a new _Promise_ object and resolver its associated resolver.
1. Return _promise_ and continue the following steps asynchronously.
1. Make a request to the system to restore transactions of current user which already been finished.
1. If there is an error invoke resolver's _reject algorithm_ with no argument and terminate these steps.
1. When the request has been completed:
 - Let _transactions_ be an array of IAPTransactionDetails objects as returned by the system.
 - Invoke resolver's _fulfill algorithm_ with transactions as the _value_ argument. 

### 3. *IAPProduct* interface

The _IAPProduct_ interface represents a product's attributes and the types associated to it.

```Java
interface IAPProduct {
  attribute DOMString id;
  attribute DOMString price;
  attribute DOMString title;
  attribute DOMString type;
  attribute DOMString description;
}
```

#### 3.1 Attributes

`id` of type _DOMString_
- Represents a unique identifier of the product.

`price` of type _DOMString_
- A string representing the product's price (might include its currency information).

`title` of type _DOMString_
- A string representing the product's title.

`type` of type _DOMString_
- A string representing the product's type (e.g. "consumable", "non-consumable", "subscription")

`description` of type _DOMString_
- A string describes the product.

### 4. *IAPTransactionDetails* interface

The _IAPTransactionDetails_ interface represents a transaction's attributes.

```Java
interface IAPTransactionDetails {
  attribute DOMString id;
  attribute date time;
  attribute DOMString token;
}
```

#### 4.1 Attributes

`id` of type _DOMString_
- A string representing an unique identifier of the transaction.

`time` of type _date_
- A _date_ element representing the transactions issue time. 

`token` of type _DOMString_
- A string that uniquely identifies a purchase for a given item and user pair. 

### 5. API Examples

#### 5.1 Query product details

User wants to know details of products that are available for purchasing.

```JavaScript
navigator.iap.queryProductDetails(["gas", "tyre", "accelerator"]).then(
  function(products) {
    for (var i=0; i<products.length; i++) {
      console.log("ID: " + products[i]["productId"]);
      console.log("Price: " + products[i]["price"]);
      console.log("Currency: " + products[i]["price_currency_code"]);
      console.log("Title: " + products[i]["title"]);
      console.log("Description: " + products[i]["description"]);
    }
  },
  function(error) { window.console.log('IAP queryProductDetails() error: ' + error); } );
```

#### 5.2 Purchase an item

User wants to buy an item, and would like to know when the transaction is done.

```JavaScript
var id = 'gas';
navigator.iap.purchase(id).then(
  function(transaction) { window.console.log('Successfully brought ' + transaction.id + ' at ' + transaction.time); },
  function(error) { window.console.log('IAP purchase for ' + id + ' error: ' + error); } );
```

#### 5.3 Restore previous transactions

User wants to restore all his/her finished transactions, and would like to know how many transactions are restored.

```JavaScript
navigator.iap.restore().then(
  function(transactions) { window.console.log('Successfully restored ' + transactions.length + ' transactions.'); },
  function(error) { window.console.log('IAP purchase for ' + id + ' error: ' + error); } );
```
