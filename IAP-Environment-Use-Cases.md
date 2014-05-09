## Problem to solve

In App Purchase(IAP) is becoming significant important to current mobile OS, it is one of the key reasons that attracts developers to contribute to current web stores. It would be good to define an API for web applications so that they can access IAP service by a unified way.

## High Level Use Case

An IAP process typically contains following steps:

1. The user navigates to an app's interested content, and the app displays details of its available products. 
1. The user selects a product to buy.
1. The app requests payment for that product from the vendor's web store.
1. The web store processes the payment and returns success or failure.
1. The app delivers the purchased product on success payment.

## Detailed Use Cases

### A webapp wants to query details of available product(s).
  
Product information is managed by vendor's web store, which typically contains: product name, product type(consumable or non-consumable) and price. 

The webapp need to get these details before purchasing a product.

### A webapp wants to purchase a product.
  
Only product name is enough for purchasing, as security will be handled by vendor's payment framework.
  
There are two choices for a user to pay for the product:
  1. Pay by his/her account on vendor's web store
  1. Pay by direct billing via mobile carrier (for example some users don't want to enter a credit card number).

### A webapp wants to restore previous products.

Normally an app is supposed to restore products during its initialization, so that if a user change to another device, e.g. a new phone, he/she will be able to get all completed transactions back.

Vendor's web store will return a transaction list containing details of product and transaction related information.