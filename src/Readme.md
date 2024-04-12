---
# Admin Module APIs

## Authentication
Authentication for admin access remains a prerequisite for utilizing these APIs.
---

## Admin Banner

### Create Banner

#### Route

```
POST baseUrl/admin/banner/createBanner
```

#### Request Format (multipart/form-data)

| Key       | Value                          |
| --------- | ------------------------------ |
| bannerImg | [banner(1).png, banner(2).png] |

#### Response

```json
{
  "status": true,
  "message": "Banner created successfully",
  "data": {
    "bannerImg": {
      "public_Id": "cv2bwc5gnj8gt9xnmweo",
      "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703370668/cv2bwc5gnj8gt9xnmweo.png"
    },
    "_id": "65875fac1ad6f1eb5a0e2d2f",
    "createdAt": "2023-12-23T22:31:08.063Z",
    "updatedAt": "2023-12-23T22:31:08.063Z",
    "__v": 0
  }
}
```

---

### Get All Banners

#### Route

```
GET baseUrl/public/getAllBanner
```

#### Response

```json
{
  "status": true,
  "data": [
    {
      "bannerImg": {
        "public_Id": "uuyihesdr7odrolhypzy",
        "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703370653/uuyihesdr7odrolhypzy.png"
      },
      "_id": "65875f9c1ad6f1eb5a0e2d2b",
      "createdAt": "2023-12-23T22:30:52.976Z",
      "updatedAt": "2023-12-23T22:30:52.976Z",
      "__v": 0
    },
    {
      "bannerImg": {
        "public_Id": "oremndgodhqyzlpqguyz",
        "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703370664/oremndgodhqyzlpqguyz.png"
      },
      "_id": "65875fa71ad6f1eb5a0e2d2d",
      "createdAt": "2023-12-23T22:31:03.857Z",
      "updatedAt": "2023-12-23T22:31:03.857Z",
      "__v": 0
    }
  ],
  "count": 2
}
```

---

### Delete Particular Banner

#### Route

```
DELETE baseUrl/admin/banner/deleteSingleBanner/:bannerId
```

#### Response

```json
{
  "status": true,
  "message": "Banner deleted successfully"
}
```

---

# Admin Module APIs - Pincode Operations

## Add Pincode

### Route

```
POST baseUrl/admin/pincodeLocation/createPincode
```

#### req.body

```json
{
  "pincode": "271312"
}
```

#### Response

```json
{
  "status": true,
  "data": {
    "pincode": "271312",
    "state": "Uttar Predesh",
    "city": "Basti",
    "_id": "6587624a1ad6f1eb5a0e2d38",
    "createdAt": "2023-12-23T22:42:18.884Z",
    "updatedAt": "2023-12-23T22:42:18.884Z",
    "__v": 0
  }
}
```

---

## Get All Pincodes

### Route

```
GET baseUrl/admin/pincodeLocation/getAllPincode
```

#### Response

```json
{
  "status": true,
  "data": [
    {
      "_id": "6587624a1ad6f1eb5a0e2d38",
      "pincode": "271312",
      "createdAt": "2023-12-23T22:42:18.884Z",
      "updatedAt": "2023-12-23T22:42:18.884Z",
      "__v": 0
    },
    {
      "_id": "658762fd1ad6f1eb5a0e2d3c",
      "pincode": "271316",
      "createdAt": "2023-12-23T22:45:17.316Z",
      "updatedAt": "2023-12-23T22:45:17.316Z",
      "__v": 0
    }
  ]
}
```

---

## Delete Pincode

### Route

```
DELETE baseUrl/admin/pincodeLocation/deletePincode/:id
```

#### Response

```json
{
  "status": true,
  "message": "Pincode deleted successfully"
}
```

pincodeAvailable

---

## get (check pincode availbility) query params

### Route

```
get baseUrl/user/pincode/pincodeAvailable?pincode=272189
```

#### Response

```json
{
  "status": true,
  "message": "good to go ",
  "data": {
    "_id": "64e48082c207be01afd40f02",
    "pincode": "272189",
    "createdAt": "2023-08-22T09:31:46.834Z",
    "updatedAt": "2023-08-22T09:31:46.834Z",
    "__v": 0
  }
}
```

---

# Admin Module APIs - Category and Subcategory Operations

## Category Operations

### Add Category

#### Route

```
POST baseUrl/admin/categoryAndSubCategory/addCategory
```

#### Request Body (multipart/form-data)

| Key                | Value       |
| ------------------ | ----------- |
| categoryName       | chicken     |
| categoryImg (file) | chicken.png |

#### Response

```json
{
  "status": true,
  "message": "Category created successfully",
  "data": {
    "categoryName": "chicken",
    "categoryImg": {
      "public_Id": "categories/fpstrpfqkkgyva8ollf6",
      "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703417390/categories/fpstrpfqkkgyva8ollf6.png"
    },
    "_id": "6588162d7c377c7057b247fc",
    "__v": 0
  }
}
```

---

### Update Category

#### Route

```
PUT baseUrl/admin/categoryAndSubCategory/updateCategory/:catId
```

#### Request Body (multipart/form-data)

| Key                | Value       |
| ------------------ | ----------- |
| categoryName       | chicken     |
| categoryImg (file) | chicken.png |

#### Response

```json
{
  "status": true,
  "message": "Category updated successfully",
  "data": {
    "categoryImg": {
      "public_Id": "categories/xemyxiwkcxnsogkvv7ci",
      "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703418220/categories/xemyxiwkcxnsogkvv7ci.png"
    },
    "_id": "6588162d7c377c7057b247fc",
    "categoryName": "chicken",
    "__v": 0
  }
}
```

---

### Get All Categories

#### Route

```
GET baseUrl/admin/categoryAndSubCategory/getAllCategory
```

#### Response

```json
{
  "status": true,
  "data": [
    {
      "categoryImg": {
        "public_Id": "categories/xemyxiwkcxnsogkvv7ci",
        "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703418220/categories/xemyxiwkcxnsogkvv7ci.png"
      },
      "_id": "6588162d7c377c7057b247fc",
      "categoryName": "chicken",
      "__v": 0
    }
  ]
}
```

---

### Get Single Category

#### Route

```
GET baseUrl/admin/categoryAndSubCategory/getSingleCategory/:catId
```

#### Response

```json
{
  "status": true,
  "data": {
    "categoryImg": {
      "public_Id": "categories/xemyxiwkcxnsogkvv7ci",
      "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703418220/categories/xemyxiwkcxnsogkvv7ci.png"
    },
    "_id": "6588162d7c377c7057b247fc",
    "categoryName": "chicken",
    "__v": 0
  }
}
```

---

### Delete Category

#### Route

```
DELETE baseUrl/admin/categoryAndSubCategory/deleteSingleCategory/:catId
```

#### Response

```json
{
  "status": true,
  "message": "Category deleted successfully",
  "data": {
    "categoryImg": {
      "public_Id": "categories/xemyxiwkcxnsogkvv7ci",
      "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703418220/categories/xemyxiwkcxnsogkvv7ci.png"
    },
    "_id": "6588162d7c377c7057b247fc",
    "categoryName": "chicken",
    "__v": 0
  }
}
```

---

## Subcategory Operations

### Add Subcategory

#### Route

```
POST baseUrl/admin/categoryAndSubCategory/addSubCategory/:catId
```

#### Request Body (multipart/form-data)

| Key             | Value          |
| --------------- | -------------- |
| subCategoryName | Chicken Leg    |
| subCategoryImg  | chickenLeg.png |

#### Response

```json
{
  "status": true,
  "message": "Subcategory created successfully",
  "data": {
    "categoryId": "6588228d7c377c7057b24807",
    "subCategoryName": "Chicken Leg",
    "subCategoryImg": {
      "public_Id": "subCategories/ezgrm3i39tqyszbztxul",
      "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703420991/subCategories/ezgrm3i39tqyszbztxul.png"
    },
    "_id": "6588243d7c377c7057b24809",
    "__v": 0
  }
}
```

---

### Get All Subcategories

#### Route

```
GET baseUrl/admin/categoryAndSubCategory/getAllSubCategory/:catId
```

#### Response

```json
{
  "data": [
    {
      "subCategoryImg": {
        "public_Id": "subCategories/ezgrm3i39tqyszbztxul",
        "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703420991/subCategories/ezgrm3i39tqyszbztxul.png"
      },
      "_id": "6588243d7c377c7057b24809",
      "categoryId": "6588228d7c377c7057b24807",
      "subCategoryName": "Chicken Leg",
      "__v": 0
    }
  ]
}
```

---

### Update Subcategory

#### Route

```
PUT baseUrl/admin/categoryAndSubCategory/updateSubCategory/:catId/:subCatId
```

#### Request Body (multipart/form-data)

| Key             | Value          |
| --------------- | -------------- |
| subCategoryName | Chicken Leg    |
| subCategoryImg  | chickenLeg.png |

#### Response

```json
{
  "status": true,
  "message": "Subcategory updated successfully",
  "data": {
    "subCategoryImg": {
      "public_Id": "subCategories/ezgrm3i39tqyszbztxul",
      "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703420991/subCategories/ezgrm3i39tqyszbztxul.png"
    },
    "_id": "6588243d7c377c7057b24809",
    "categoryId": "6588228d7c377c7057b24807",
    "subCategoryName": "Chicken Leg",
    "__v": 0
  }
}
```

---

### Get Single Subcategory

#### Route

```
GET baseUrl/admin/categoryAndSubCategory/getSingleSubCategory/:subCatId
```

#### Response

```json
{
  "status": true,
  "data": {
    "subCategoryImg": {
      "public_Id": "subCategories/ezgrm3i39tqyszbztxul",
      "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703420991/subCategories/ezgrm3i39tqyszbztxul.png"
    },
    "_id": "6588243d7c377c7057b24809",
    "categoryId": "6588228d7c377c7057b24807",
    "subCategoryName": "Chicken Leg",
    "__v": 0
  }
}
```

---

### Delete All Subcategories of a Category

#### Route

```
DELETE baseUrl/admin/categoryAndSubCategory/deleteAllSubCategory/:catId
```

#### Response

```json
{
  "status": true,
  "message": "All subcategories of the category deleted successfully"
}
```

---

### Delete Single Subcategory

#### Route

```
DELETE baseUrl/admin/categoryAndSubCategory/deleteSingleSubCategory/:subCatId
```

#### Response

```json
{
  "status": true,
  "message": "Subcategory deleted successfully",
  "data": {
    "subCategoryImg": {
      "public_Id": "subCategories/ezgrm3i39tqyszbztxul",
      "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703420991/subCategories/ezgrm3i39tqyszbztxul.png"
    },
    "_id": "6588243d7c377c7057b24809",
    "categoryId": "6588228d7c377c7057b24807",
    "subCategoryName": "Chicken Leg",
    "__v": 0
  }
}
```

---

## Time Slot Operations

### Add Time Slot

#### Route

```
POST baseUrl/admin/timeSlot/addTimeSlot
```

#### Request Body

```json
{
  "day": "Sunday (24 Dec)",
  "timeRange": "04:23PM to 7:40PM"
}
```

#### Response

```json
{
  "message": "Time slot added successfully",
  "timeSlot": {
    "day": "Sunday (24 Dec)",
    "startTime": "04:23PM",
    "endTime": "7:40PM",
    "_id": "658854f8e068838253240e7f",
    "__v": 0
  }
}
```

---

### Get All Time Slots

#### Route

```
GET baseUrl/admin/timeSlot/allSlots
```

#### Response

```json
{
  "status": true,
  "timeSlots": [
    {
      "_id": "658854cee068838253240e7d",
      "day": "Thursday (27 Jul)",
      "startTime": "04:23PM",
      "endTime": "7:40PM",
      "__v": 0
    },
    {
      "_id": "658854f8e068838253240e7f",
      "day": "Sunday (24 Dec)",
      "startTime": "04:23PM",
      "endTime": "7:40PM",
      "__v": 0
    }
  ]
}
```

---

### Update Time Slot

#### Route

```
PUT baseUrl/admin/timeslot/updateTimeSlot/:slotId
```

#### Request Body

```json
{
  "day": "Sunday (24 Dec)",
  "timeRange": "06:00AM to 8:00AM"
}
```

#### Response

```json
{
  "message": "Time slot updated successfully",
  "timeSlot": {
    "_id": "658854f8e068838253240e7f",
    "day": "Sunday (24 Dec)",
    "startTime": "06:00AM",
    "endTime": "8:00AM",
    "__v": 0
  }
}
```

---

### Delete Specific Time Slot

#### Route

```
DELETE baseUrl/admin/timeslot/deleteTimeSlot/:slotId
```

#### Response

```json
{
  "status": true,
  "message": "Time slot deleted successfully"
}
```

---

### Delete All Time Slots

#### Route

```
DELETE baseUrl/admin/timeslot/deleteAllTimeSlots
```

#### Response

```json
{
  "status": true,
  "message": "All time slots deleted successfully"
}
```

---

---

## Shipping Operations

### Add Shipping Charges

#### Route

```
POST baseUrl/admin/shipping/shippingCharge
```

#### Request Body

```json
{
  "shippingCharge": 70,
  "freeShipingLimit": 500
}
```

#### Response

```json
{
  "status": true,
  "data": {
    "freeShipingLimit": 500,
    "shippingCharge": 70,
    "_id": "658858d8722df0de95654e18",
    "createdAt": "2023-12-24T16:14:16.466Z",
    "updatedAt": "2023-12-24T16:14:16.466Z",
    "__v": 0
  }
}
```

---

### Get Shipping Details

#### Route

```
GET baseUrl/admin/shipping/getShipping
```

#### Response

```json
{
  "status": true,
  "message": [
    {
      "_id": "658858d8722df0de95654e18",
      "freeShipingLimit": 500,
      "shippingCharge": 70,
      "createdAt": "2023-12-24T16:14:16.466Z",
      "updatedAt": "2023-12-24T16:14:16.466Z",
      "__v": 0
    }
  ]
}
```

---

### Delete Shipping Charges

#### Route

```
DELETE baseUrl/admin/shipping/deleteShipping/:shippingId
```

#### Response

```json
{
  "status": true,
  "message": "Shipping amount and limit are successfully deleted"
}
```

---

---

## Promo Code Operations

### Add Promo Code

#### Route

```
POST baseUrl/admin/coupon/addPromo
```

#### Request Body

```json
{
  "promoCode": "SUMMER28",
  "discount": 35,
  "expiry": "2023-12-28"
}
```

#### Response

```json
{
  "status": true,
  "data": {
    "promoCode": "SUMMER28",
    "expiry": "2023-12-28T00:00:00.000Z",
    "discount": 35,
    "_id": "65885cd5f78a6baa55a7b0ea",
    "__v": 0
  }
}
```

---

### Get All Promo Codes

#### Route

```
GET baseUrl/admin/coupon/getAllPromo
```

#### Response

```json
{
  "status": true,
  "data": [
    {
      "_id": "65885cd5f78a6baa55a7b0ea",
      "promoCode": "SUMMER28",
      "expiry": "2023-12-31T00:00:00.000Z",
      "discount": 35,
      "__v": 0
    }
  ]
}
```

---

### Get a Particular Promo Code

#### Route

```
GET baseUrl/admin/coupon/getPromo/:id
```

#### Response

```json
{
  "status": true,
  "data": {
    "_id": "65885cd5f78a6baa55a7b0ea",
    "promoCode": "SUMMER28",
    "expiry": "2023-12-31T00:00:00.000Z",
    "discount": 35,
    "__v": 0
  }
}
```

---

### Update Promo Code

#### Route

```
PUT baseUrl/admin/coupon/updatePromo/:id
```

#### Request Body

```json
{
  "name": "SUMMER25",
  "discount": 35,
  "expiry": "2023-12-31"
}
```

#### Response

```json
{
  "status": true,
  "data": {
    "_id": "65885cd5f78a6baa55a7b0ea",
    "promoCode": "SUMMER28",
    "expiry": "2023-12-31T00:00:00.000Z",
    "discount": 35,
    "__v": 0
  }
}
```

---

### Delete a Specific Promo Code

#### Route

```
DELETE baseUrl/admin/coupon/deletePromo/:id
```

#### Response

```json
{
  "status": true,
  "message": "Promo deleted Successfully",
  "data": {
    "_id": "65885cd5f78a6baa55a7b0ea",
    "promoCode": "SUMMER28",
    "expiry": "2023-12-31T00:00:00.000Z",
    "discount": 35,
    "__v": 0
  }
}
```

---

---

## Admin Product Listing

### Add Product

#### Route

```
POST baseUrl/admin/product/addProduct
```

#### Request Body

```json
{
  "title": "Best delicious Item for sale",
  "description": "This is a delicious item, buy this fresh item for you",
  "unit": 250,
  "measureUnit": "gram",
  "MRP": 550,
  "price": 300,
  "discount": "46%",
  "productImg": "chickenLeg.png",
  "category": "Chicken",
  "sub_category": "Chicken Leg",
  "Stock": 1,
  "setAs": "Combos"
}
```

#### Response

```json
{
  "status": true,
  "data": {
    "title": "Best delicious Item for sale ",
    "description": "This is for you delicious item buy this fresh item for you ",
    "unit": 250,
    "measureUnit": "gram",
    "MRP": 550,
    "price": 300,
    "discount": "46%",
    "productImg": [
      {
        "public_id": "products/dscag0gva4nwtjs3itwm",
        "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703436536/products/dscag0gva4nwtjs3itwm.png",
        "_id": "658860f7d2f02c69ec72b39a"
      }
    ],
    "category": "Chicken",
    "sub_category": "Chicken Leg",
    "Stock": 1,
    "setAs": "Combos",
    "_id": "658860f7d2f02c69ec72b399",
    "createdAt": "2023-12-24T16:48:55.083Z",
    "updatedAt": "2023-12-24T16:48:55.083Z",
    "__v": 0
  }
}
```

---

### Get All Products

#### Route

```
GET baseUrl/admin/product/getAllproduct
```

#### Response

```json
{
  "status": true,
  "data": [
    {
      "_id": "658860f7d2f02c69ec72b399",
      "title": "Best delicious Item for sale ",
      "description": "This is for you delicious item buy this fresh item for you ",
      "unit": 250,
      "measureUnit": "gram",
      "MRP": 550,
      "price": 300,
      "discount": "46%",
      "productImg": [
        {
          "public_id": "products/dscag0gva4nwtjs3itwm",
          "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703436536/products/dscag0gva4nwtjs3itwm.png",
          "_id": "658860f7d2f02c69ec72b39a"
        }
      ],
      "category": "Chicken",
      "sub_category": "Chicken Leg",
      "Stock": 1,
      "setAs": "Combos",
      "createdAt": "2023-12-24T16:48:55.083Z",
      "updatedAt": "2023-12-24T16:48:55.083Z",
      "__v": 0
    }
  ]
}
```

---

### Get a Particular Product

#### Route

```
GET baseUrl/admin/product/getProduct/:Id
```

#### Response

```json
{
  "status": true,
  "data": {
    "title": "Best delicious Item for sale ",
    "description": "This is for you delicious item buy this fresh item for you ",
    "unit": 250,
    "measureUnit": "gram",
    "MRP": 550,
    "price": 300,
    "discount": "46%",
    "productImg": [
      {
        "public_id": "products/dscag0gva4nwtjs3itwm",
        "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703436536/products/dscag0gva4nwtjs3itwm.png",
        "_id": "658860f7d2f02c69ec72b39a"
      }
    ],
    "category": "Chicken",
    "sub_category": "Chicken Leg",
    "Stock": 1,
    "setAs": "Combos",
    "_id": "658860f7d2f02c69ec72b399",
    "createdAt": "2023-12-24T16:48:55.083Z",
    "updatedAt": "2023-12-24T16:48:55.083Z",
    "__v": 0
  }
}
```

---

### Update a Particular Product

#### Route

```
PUT baseUrl/admin/product/updateProduct/:Id
```

#### Request Body

```json
{
  "title": "Best delicious Item for sale",
  "description": "This is a delicious item, buy this fresh item for you",
  "unit": 250,
  "measureUnit": "gram",
  "MRP": 550,
  "price": 300,
  "discount": "46%",
  "productImg": "chickenLeg.png",
  "category": "Chicken",
  "sub_category": "Chicken Leg",
  "Stock": 1,
  "setAs": "Combos"
}
```

#### Response

```json
{
  "status": true,
  "message": "Product updated Successfully",

  "data": {
    "title": "Best delicious Item for sale ",
    "description": "This is for you delicious item buy this fresh item for you ",
    "unit": 250,
    "measureUnit": "gram",
    "MRP": 550,
    "price": 300,
    "discount": "46%",
    "productImg": [
      {
        "public_id": "products/dscag0gva4nwtjs3itwm",
        "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703436536/products/dscag0gva4nwtjs3itwm.png",
        "_id": "658860f7d2f02c69ec72b39a"
      }
    ],
    "category": "Chicken",
    "sub_category": "Chicken Leg",
    "Stock": 1,
    "setAs": "Combos",
    "_id": "658860f7d2f02c69ec72b399",
    "createdAt": "2023-12-24T16:48:55.083Z",
    "updatedAt": "2023-12-24T16:48:55.083Z",
    "__v": 0
  }
}
```

### Delete a Particular Product

#### Route

```
DELETE baseUrl/admin/product/deleteProduct/:Id
```

#### Response

```json
{
  "status": true,
  "message": "deleted Successfully"
}
```

# Admin Order Details

## All Orders

- **Method**: GET
- **Route**: `baseUrl/admin/order/getAllOrders`
- **Response**:

  ```json
  {
    "status": true,
    "data": [
      {
        "shippingInfo": {
          "deliverySlot": {
            "day": "Monday (25 Dec)",
            "startTime": "08:40AM",
            "endTime": "10:40AM"
          },
          "name": "Sumit",
          "phoneNo": "9978675XXX",
          "houseFlatNo": "90A",
          "blockName": "shibvali",
          "street": "chaunhan",
          "landMark": "shiv temple",
          "pinCode": "140301",
          "locality": "haridwar",
          "saveAddressAs": "Home"
        },
        "paymentMethod": {
          "cod": true,
          "online": false
        },
        "_id": "65889cbfc00668a378995b4a",
        "items": [
          {
            "productId": "658860f7d2f02c69ec72b399",
            "quantity": 1,
            "_id": "65889cbfc00668a378995b4b"
          }
        ],
        "shippingPrice": 70,
        "totalPrice": 265,
        "totalItems": 1,
        "orderStatus": "Processing",
        "userId": "658882e94b6448823f970046",
        "orderId": "ORD0001",
        "userID": "00002",
        "createdAt": "2023-12-24T21:03:59.729Z",
        "updatedAt": "2023-12-24T21:03:59.729Z",
        "__v": 0
      }
    ]
  }
  ```

## Particular Order Data

- **Method**: GET
- **Route**: `baseUrl/admin/order/getSingleOrder/:orderId`
- **Response**:

  ```json
  {
    "status": true,
    "orderData": {
      "address": {
        "name": "Sumit",
        "phone": "9978675XXX",
        "houseNo": "90A",
        "block": "shibvali",
        "street": "chaunhan",
        "Landmark": "shiv temple",
        "pincode": "140301",
        "locality": "haridwar",
        "AddressAs": "Home",
        "deliverySlot": "Monday (25 Dec),08:40AM - 10:40AM"
      },
      "ProductDetails": [
        {
          "Product_title": "Best delicius Item for sale ",
          "Product_category": "Chicken",
          "Product_price": 300,
          "Product_quantity": 1,
          "Product_unit": 250,
          "product_mesureUnit": "gram"
        }
      ],
      "totalPrice": 265,
      "Discount": 285,
      "orderId": "ORD0001",
      "PaymentInfo": {},
      "Order_Status": "Processing",
      "_id": "65889cbfc00668a378995b4a",
      "Payment_Method": "COD",
      "Shipping": 70
    }
  }
  ```

## Update Order Status

- **Method**: PUT
- **Route**: `baseUrl/admin/order/updateOrder/:orderId`
- **Request Body**:

  ```json
  {
    "orderStatus": "Shipped"
  }
  ```

- **Response**:

  ```json
  {
    "status": true,
    "message": "updated order",
    "data": {
      "shippingInfo": {
        "deliverySlot": {
          "day": "Monday (25 Dec)",
          "startTime": "08:40AM",
          "endTime": "10:40AM"
        },
        "name": "Sumit",
        "phoneNo": "997867XXXX",
        "houseFlatNo": "90A",
        "blockName": "shibvali",
        "street": "chaunhan",
        "landMark": "shiv temple",
        "pinCode": "140301",
        "locality": "haridwar",
        "saveAddressAs": "Home"
      },
      "paymentMethod": {
        "cod": true,
        "online": false
      },
      "_id": "65889cbfc00668a378995b4a",
      "items": [
        {
          "productId": "658860f7d2f02c69ec72b399",
          "quantity": 1,
          "_id": "65889cbfc00668a378995b4b"
        }
      ],
      "shippingPrice": 70,
      "totalPrice": 265,
      "totalItems": 1,
      "orderStatus": "Shipped",
      "userId": "658882e94b6448823f970046",
      "orderId": "ORD0001",
      "userID": "00002",
      "createdAt": "2023-12-24T21:03:59.729Z",
      "updatedAt": "2023-12-25T20:18:25.261Z",
      "__v": 0
    }
  }
  ```

# Admin Payment Info

## Complete Amount Paid by User

- **Method**: GET
- **Route**: `baseurl/admin/paymentData/paymentByUser/:userId`
- **Response**:

  ```json
  {
    "status": true,
    "data": {
      "userId": "00002",
      "userName": "Sumit",
      "totalAmount": 265
    }
  }
  ```

## Payment by Order ID Using User ID in Params

- **Method**: GET
- **Route**: `baseurl/admin/paymentData/paymentByOrder/:userId`
- **Response**:

  ```json
  {
    "status": true,
    "data": {
      "orderId": ["ORD0001"],
      "userName": "Sumit",
      "totalAmount": 265
    }
  }
  ```

# Admin Abandoned Cart

## Retrieve Abandoned Carts

- **Method**: GET
- **Route**: `baseUrl/admin/abandonCart/abandonCart`
- **Response**:

  ```json
  {
    "status": true,
    "data": [
      {
        "cartId": "658883204b6448823f970052",
        "_Id": "658882e94b6448823f970046",
        "items": [
          {
            "productId": {
              "_id": "658860f7d2f02c69ec72b399",
              "title": "Best delicius Item for sale",
              "description": "This is for you delicious item buy this fresh item for you",
              "MRP": 550,
              "price": 300
            },
            "quantity": 1
          }
        ],
        "totalPrice": 300,
        "totalItems": 1,
        "userID": "00002"
      }
    ]
  }
  ```

# User Details by Admin

## All Users Data

- **Route**: `baseUrl/admin/userDetails/allProfile`
- **Method**: GET
- **Response**:

  ```json
  {
    "status": true,
    "data": [
      {
        "address": {
          "pincode": "140301",
          "locality": "haridwar"
        },
        "_id": "6589da52767e68f38e63cbf6",
        "userObjectId": "658882e94b6448823f970046",
        "name": "Sumit",
        "customerNumber": "912529XXXX",
        "customerId": "00002",
        "joinedDate": "Dec 25, 2023, 12:43 AM",
        "createdAt": "2023-12-25T19:38:58.118Z",
        "updatedAt": "2023-12-25T19:46:46.713Z",
        "__v": 0
      }
    ],
    "count": 1
  }
  ```

## Single Profile Data

- **Route**: `baseUrl/admin/userDetails/getSingleProfile/:profileId`
- **Method**: GET
- **Response**:

  ```json
  {
    "status": true,
    "data": {
      "address": {
        "pincode": "140301",
        "locality": "haridwar"
      },
      "_id": "6589da52767e68f38e63cbf6",
      "userObjectId": "658882e94b6448823f970046",
      "name": "Sumit",
      "customerNumber": "912529XXXX",
      "customerId": "00002",
      "joinedDate": "Dec 25, 2023, 12:43 AM",
      "createdAt": "2023-12-25T19:38:58.118Z",
      "updatedAt": "2023-12-25T19:46:46.713Z",
      "__v": 0
    }
  }
  ```

## Update Single Profile Data

- **Route**: `baseUrl/admin/userDetails/updateSingleProfile/:profileId`
- **Method**: PUT
- **Response**:

  ```json
  {
    "status": true,
    "data": {
      "address": {
        "pincode": "140305",
        "locality": "haridwar"
      },
      "_id": "6589da52767e68f38e63cbf6",
      "userObjectId": "658882e94b6448823f970046",
      "name": "Sumit",
      "customerNumber": "912529XXXX",
      "customerId": "00002",
      "joinedDate": "Dec 25, 2023, 12:43 AM",
      "createdAt": "2023-12-25T19:38:58.118Z",
      "updatedAt": "2023-12-25T19:46:46.713Z",
      "__v": 0
    }
  }
  ```

## Export Data into Excel Sheet

- **Route**: `baseUrl/admin/userDetails/exportsProfiledata`
- **Method**: GET
- **Excel Downloaded**: Once accessed, an Excel file with the user details is downloaded.

#

### User Authentication Routes

#### Sign-Up

#### Route

```
POST baseUrl/user/auth/signUp
```

#### Request Body

```json
{
  "number": "912529XXXX"
}
```

#### Response

```json
{
  "message": "OTP sent successfully!"
}
```

### Verification (Scenario 1)

#### Route

```
POST baseUrl/user/auth/verification
```

#### Request Body

```json
{
  "number": "912529XXXX",
  "otp": "2195",
  "items": [],
  "totalPrice": null,
  "totalItems": null
}
```

#### Response

```json
{
  "status": true,
  "message": "User verified successfully!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMDAwMiIsIl9pZCI6IjY1ODg4MmU5NGI2NDQ4ODIzZjk3MDA0NiIsIm51bWJlciI6IjkxMjUyOTI5MTIiLCJpYXQiOjE3MDM0NDUyNzh9.8Bb7_h6uT0oBqkMgIlvX1WC6zMjvmDlP2JDnWRj-msU",
  "data": {
    "_id": "658882e94b6448823f970046",
    "number": "912529XXXX",
    "userId": "00002",
    "createdAt": "2023-12-24T19:13:45.394Z",
    "updatedAt": "2023-12-24T19:13:45.394Z",
    "__v": 0
  },
  "cartId": "658883204b6448823f970052"
}
```

### Verification (Scenario 2)

Description: If the cart has some items before login.

#### Route

```
POST baseUrl/user/auth/verification
```

#### Request Body

```json
{
  "number": "912529XXXX",
  "otp": "2373",
  "items": [
    {
      "productId": "658860f7d2f02c69ec72b399",
      "quantity": 1
    }
  ],
  "totalPrice": 300,
  "totalItems": 1
}
```

#### Response

```json
{
  "status": true,
  "message": "User verified successfully!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMDAwMSIsIl9pZCI6IjY1ODg3ZjM2NGI2NDQ4ODIzZjk3MDAyYyIsIm51bWJlciI6IjkxMjUyOTI5MTAiLCJpYXQiOjE3MDM0NDQ4NTF9.rSY5qQKc2iT9_iwjNajGE5wVWJpoThWmejGc_wa_r2Y",
  "data": {
    "_id": "65887f364b6448823f97002c",
    "number": "912529XXXX",
    "userId": "00001",
    "createdAt": "2023-12-24T18:57:58.281Z",
    "updatedAt": "2023-12-24T18:57:58.281Z",
    "__v": 0
  }
}
```

### User Cart Route

#### Add to Cart

#### Route

```
POST baseUrl/user/cart/addToCart
```

#### Headers

```
x-auth-token: werdtyfyguhijugyftrdestcygvhbjnhugyftrdesxdfcggvhbgfdr
```

#### Request Body

```json
{
  "productId": "64a06e26f57db7ce4817f296"
}
```

#### Response

```json
{
  "status": false,
  "data": {
    "_id": "658883204b6448823f970052",
    "userId": "658882e94b6448823f970046",
    "items": [
      {
        "productId": "658860f7d2f02c69ec72b399",
        "quantity": 2
      }
    ],
    "totalPrice": 600,
    "totalItems": 1,
    "userID": "00002",
    "createdAt": "2023-12-24T19:14:40.535Z",
    "updatedAt": "2023-12-24T19:31:17.221Z",
    "__v": 0
  }
}
```

#### Update Cart

##### Route

```
PUT baseUrl/user/cart/updateCart
```

##### Headers

```
x-auth-token: werdtyfyguhijugyftrdestcygvhbjnhugyftrdesxdfcggvhbgfdr
```

##### Request Body (Remove Product)

```json
{
  "productId": "658860f7d2f02c69ec72b399",
  "removeProduct": "0"
}
```

##### Response (Remove Product)

```json
{
  "status": true,
  "message": "Success",
  "data": {
    "_id": "658883204b6448823f970052",
    "userId": "658882e94b6448823f970046",
    "items": [],
    "totalPrice": 0,
    "totalItems": 0,
    "userID": "00002",
    "createdAt": "2023-12-24T19:14:40.535Z",
    "updatedAt": "2023-12-24T19:36:49.595Z",
    "__v": 0
  }
}
```

##### Request Body (Reduce Product Quantity)

```json
{
  "productId": "658860f7d2f02c69ec72b399",
  "removeProduct": "1"
}
```

##### Response (Reduce Product Quantity)

```json
{
  "status": true,
  "message": "Success",
  "data": {
    "_id": "658883204b6448823f970052",
    "userId": "658882e94b6448823f970046",
    "items": [
      {
        "productId": "658860f7d2f02c69ec72b399",
        "quantity": 1
      }
    ],
    "totalPrice": 300,
    "totalItems": 1,
    "userID": "00002",
    "createdAt": "2023-12-24T19:14:40.535Z",
    "updatedAt": "2023-12-24T19:40:28.514Z",
    "__v": 0
  }
}
```

#### Checkout Cart

##### Route

```
GET baseUrl/user/cart/checkOut
```

##### Headers

```
x-auth-token: werdtyfyguhijugyftrdestcygvhbjnhugyftrdesxdfcggvhbgfdr
```

##### Response

```json
{
  "status": true,
  "message": "success",
  "data": {
    "productsData": [
      {
        "Product_id": "658860f7d2f02c69ec72b399",
        "Product_title": "Best delicius Item for sale ",
        "Product_category": "Chicken",
        "Product_MRP": 550,
        "Product_price": 300,
        "Product_quantity": 1,
        "Product_image": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703436536/products/dscag0gva4nwtjs3itwm.png",
        "Product_unit": 250,
        "product_mesureUnit": "gram"
      }
    ],
    "totalItems": 1,
    "Discount": 250,
    "TotalMrp": 550,
    "cartId": "658883204b6448823f970052",
    "userId": "658882e94b6448823f970046",
    "Price": 300,
    "TotalPrice": 370,
    "Shipping": 70
  }
}
```

#### Delete Cart (Clear Cart)

##### Route

```
DELETE baseUrl/user/cart/deleteCart
```

##### Headers

```
x-auth-token: werdtyfyguhijugyftrdestcygvhbjnhugyftrdesxdfcggvhbgfdr
```

##### Request Body

```json
{
  "cartId": "658883204b6448823f970052"
}
```

##### Response

```json
{
  "status": true,
  "message": "Cart has been deleted"
}
```

### User Address Route

#### Add Address

- **Route**: `POST baseUrl/user/address/addAddress`
- **Auth**: Mandatory
- **Request Body**:

  ```json
  {
    "name": "Sumit",
    "phoneNo": "99786756XX",
    "houseFlatNo": "90A",
    "blockName": "shibvali",
    "street": "chaunhan",
    "landMark": "shiv temple",
    "pinCode": "140301",
    "locality": "haridwar",
    "saveAddressAs": "Home"
  }
  ```

- **Response**:

  ```json
  {
    "status": true,
    "message": "Address added successfully",
    "data": {
      "_id": "658893f183296b33e5953e22",
      "name": "Sumit",
      "phoneNo": "99786756XX",
      "houseFlatNo": "90A",
      "blockName": "shibvali",
      "street": "chaunhan",
      "landMark": "shiv temple",
      "pinCode": "140301",
      "locality": "haridwar",
      "saveAddressAs": "Home",
      "userId": "658882e94b6448823f970046",
      "userID": "00002",
      "setAsDefault": true,
      "createdAt": "2023-12-24T20:26:25.286Z",
      "updatedAt": "2023-12-24T20:26:26.104Z",
      "__v": 0
    }
  }
  ```

#### Get All Addresses

- **Route**: `GET baseurl/user/address/allAddress`
- **Auth**: Mandatory
- **Response**:

  ```json
  {
    "status": true,
    "data": [
      {
        "_id": "658893f183296b33e5953e22",
        "name": "Sumit",
        "phoneNo": "99786756XX",
        "houseFlatNo": "90A",
        "blockName": "shibvali",
        "street": "chaunhan",
        "landMark": "shiv temple",
        "pinCode": "140301",
        "locality": "haridwar",
        "saveAddressAs": "Home",
        "userId": "658882e94b6448823f970046",
        "userID": "00002",
        "setAsDefault": true,
        "createdAt": "2023-12-24T20:26:25.286Z",
        "updatedAt": "2023-12-24T20:26:26.104Z",
        "__v": 0
      },
      {
        "_id": "6588941783296b33e5953e27",
        "name": "Sumit",
        "phoneNo": "99786756XX",
        "houseFlatNo": "90A",
        "blockName": "shibvali",
        "street": "chaunhan",
        "landMark": "shiv temple",
        "pinCode": "140301",
        "locality": "haridwar",
        "saveAddressAs": "Home",
        "userId": "658882e94b6448823f970046",
        "userID": "00002",
        "setAsDefault": false,
        "createdAt": "2023-12-24T20:27:03.612Z",
        "updatedAt": "2023-12-24T20:27:03.612Z",
        "__v": 0
      }
    ]
  }
  ```

#### Set Default Address

- **Route**: `PUT baseUrl/user/address/setDefaultAddress/:addressId`
- **Auth**: Mandatory
- **Response**:

  ```json
  {
    "status": true,
    "message": "Default address set successfully",
    "data": {
      "_id": "658893f183296b33e5953e22",
      "name": "Sumit",
      "phoneNo": "99786756XX",
      "houseFlatNo": "90A",
      "blockName": "shibvali",
      "street": "chaunhan",
      "landMark": "shiv temple",
      "pinCode": "140301",
      "locality": "haridwar",
      "saveAddressAs": "Home",
      "userId": "658882e94b6448823f970046",
      "userID": "00002",
      "setAsDefault": true,
      "createdAt": "2023-12-24T20:26:25.286Z",
      "updatedAt": "2023-12-24T20:26:26.104Z",
      "__v": 0
    }
  }
  ```

#### Update Existing Address

- **Route**: `PUT baseUrl/user/address/changeAddress/:addressId`
- **Auth**: Mandatory
- **Request Body**:

  ```json
  {
    "name": "Sumit",
    "phoneNo": "99786756XX",
    "houseFlatNo": "90A",
    "blockName": "shibvali",
    "street": "chaunhan",
    "landMark": "shiv temple",
    "pinCode": "140301",
    "locality": "haridwar",
    "saveAddressAs": "Home"
  }
  ```

- **Response**:

  ```json
  {
    "status": true,
    "message": "Address updated successfully",
    "data": {
      "_id": "658893f183296b33e5953e22",
      "name": "Sumit",
      "phoneNo": "99786756XX",
      "houseFlatNo": "90A",
      "blockName": "shibvali",
      "street": "chaunhan",
      "landMark": "shiv temple",
      "pinCode": "140301",
      "locality": "haridwar",
      "saveAddressAs": "Home",
      "userId": "658882e94b6448823f970046",
      "userID": "00002",
      "setAsDefault": true,
      "createdAt": "2023-12-24T20:26:25.286Z",
      "updatedAt": "2023-12-24T20:26:26.104Z",
      "__v": 0
    }
  }
  ```

#### Get Particular Address

- **Auth**: Mandatory

- **Route**: `GET baseUrl/user/address/getSingleAddress/:addressId`
- **Response**:

  ```json
  {
    "status": true,
    "message": "Address updated successfully",
    "data": {
      "_id": "658893f183296b33e5953e22",
      "name": "Sumit",
      "phoneNo": "99786756XX",
      "houseFlatNo": "90A",
      "blockName": "shibvali",
      "street": "chaunhan",
      "landMark": "shiv temple",
      "pinCode": "140301",
      "locality": "haridwar",
      "saveAddressAs": "Home",
      "userId": "658882e94b6448823f970046",
      "userID": "00002",
      "setAsDefault": true,
      "createdAt": "2023-12-24T20:26:25.286Z",
      "updatedAt": "2023-12-24T20:26:26.104Z",
      "__v": 0
    }
  }
  ```

#### Delete Address

- **Route**: `DELETE baseUrl/user/address/deleteAddress/:addressId`
- **Auth**: Mandatory
- **Response**:

  ```json
  {
    "status": true,
    "message": "address removed"
  }
  ```

### Select Time Slot for Delivery

- **Route**: `GET baseurl/public/getTimeSlot`
- **Response**:

  ```json
  {
    "status": true,
    "timeSlots": [
      {
        "_id": "65889993c00668a378995b3a",
        "day": "Monday (25 Dec)",
        "startTime": "04:23AM",
        "endTime": "7:40AM",
        "__v": 0
      },
      {
        "_id": "658899afc00668a378995b3c",
        "day": "Monday (25 Dec)",
        "startTime": "07:40AM",
        "endTime": "8:40AM",
        "__v": 0
      },
      {
        "_id": "658899bbc00668a378995b3e",
        "day": "Monday (25 Dec)",
        "startTime": "08:40AM",
        "endTime": "10:40AM",
        "__v": 0
      }
    ]
  }
  ```

### User Order Route

#### Create Order

- **Auth**: Mandatory

- **Route**: `POST baseUrl/user/order/createOrder/:addressId`
- **Request Body**:

  ```json
  {
    "deliverySlot": {
      "day": "Monday (25 Dec)",
      "startTime": "08:40AM",
      "endTime": "10:40AM"
    },
    "promoCode": "SUMMER28",
    "paymentMethod": {
      "cod": true
    }
  }
  ```

- **Response**:

  ```json
  {
    "status": true,
    "message": "Order created successfully",
    "data": {
      "shippingInfo": {
        "name": "Sumit",
        "phoneNo": "99786756XX",
        "houseFlatNo": "90A",
        "blockName": "shibvali",
        "street": "chaunhan",
        "landMark": "shiv temple",
        "pinCode": "140301",
        "locality": "haridwar",
        "saveAddressAs": "Home",
        "deliverySlot": {
          "day": "Monday (25 Dec)",
          "startTime": "08:40AM",
          "endTime": "10:40AM"
        }
      },
      "items": [
        {
          "productId": "658860f7d2f02c69ec72b399",
          "quantity": 1,
          "_id": "65889cbfc00668a378995b4b"
        }
      ],
      "shippingPrice": 70,
      "totalPrice": 265,
      "totalItems": 1,
      "paymentMethod": {
        "cod": true,
        "online": false
      },
      "orderStatus": "Processing",
      "userId": "658882e94b6448823f970046",
      "orderId": "ORD0001",
      "userID": "00002",
      "_id": "65889cbfc00668a378995b4a",
      "createdAt": "2023-12-24T21:03:59.729Z",
      "updatedAt": "2023-12-24T21:03:59.729Z",
      "__v": 0
    }
  }
  ```

#### Get All Orders

- **Auth**: Mandatory

- **Route**: `GET baseUrl/user/order/allOrders`
- **Response**:

  ```json
  {
    "status": true,
    "message": "success",
    "data": [
      {
        "shippingInfo": {
          "deliverySlot": {
            "day": "Monday (25 Dec)",
            "startTime": "08:40AM",
            "endTime": "10:40AM"
          },
          "name": "Sumit",
          "phoneNo": "99786756XX",
          "houseFlatNo": "90A",
          "blockName": "shibvali",
          "street": "chaunhan",
          "landMark": "shiv temple",
          "pinCode": "140301",
          "locality": "haridwar",
          "saveAddressAs": "Home"
        },
        "paymentMethod": {
          "cod": true,
          "online": false
        },
        "_id": "65889cbfc00668a378995b4a",
        "items": [
          {
            "productId": "658860f7d2f02c69ec72b399",
            "quantity": 1,
            "_id": "65889cbfc00668a378995b4b"
          }
        ],
        "shippingPrice": 70,
        "totalPrice": 265,
        "totalItems": 1,
        "orderStatus": "Processing",
        "userId": "658882e94b6448823f970046",
        "orderId": "ORD0001",
        "userID": "00002",
        "createdAt": "2023-12-24T21:03:59.729Z",
        "updatedAt": "2023-12-24T21:03:59.729Z",
        "__v": 0
      }
    ]
  }
  ```

#### Get Single Order

- **Auth**: Mandatory

- **Route**: `GET baseUrl/user/order/getOrder/:orderId`
- **Response**:

  ```json
  {
    "status": true,
    "orderData": {
      "address": {
        "name": "Sumit",
        "phone": "99786756XX",
        "houseNo": "90A",
        "block": "shibvali",
        "street": "chaunhan",
        "Landmark": "shiv temple",
        "pincode": "140301",
        "locality": "haridwar",
        "AddressAs": "Home",
        "deliverySlot": "Monday (25 Dec),08:40AM - 10:40AM"
      },
      "ProductDetails": [
        {
          "Product_id": "658860f7d2f02c69ec72b399",
          "Product_title": "Best delicius Item for sale ",
          "Product_category": "Chicken",
          "ProductImg": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703436536/products/dscag0gva4nwtjs3itwm.png",
          "Product_MRP": 550,
          "Product_price": 300,
          "Product_quantity": 1,
          "Product_unit": 250,
          "product_mesureUnit": "gram"
        }
      ],
      "totalPrice": 265,
      "Discount": 285,
      "orderId": "ORD0001",
      "PaymentInfo": {},
      "PaymentMethod": {
        "cod": true,
        "online": false
      },
      "Order_Status": "Processing",
      "Shipping": 70
    }
  }
  ```

### User Details Route

#### Update Profile

- **Auth**: Mandatory

- **Route**: `POST baseUrl/user/details/profile`
- **Description**: User can update name, address, locality, pincode... other data will remain the same
- **Request Body**:

  ```json
  {
    "userObjectId": "658882e94b6448823f970046",
    "name": "",
    "address": {
      "pincode": "",
      "locality": ""
    },
    "customerNumber": "9125292XXX",
    "customerId": "00002",
    "joinedDate": "Dec 25, 2023, 12:43 AM"
  }
  ```

- **Response**:

  ```json
  {
    "status": true,
    "data": {
      "userObjectId": "658882e94b6448823f970046",
      "name": "",
      "address": {
        "pincode": "",
        "locality": ""
      },
      "customerNumber": "9125292XXX",
      "customerId": "00002",
      "joinedDate": "Dec 25, 2023, 12:43 AM",
      "_id": "6589da52767e68f38e63cbf6",
      "createdAt": "2023-12-25T19:38:58.118Z",
      "updatedAt": "2023-12-25T19:38:58.118Z",
      "__v": 0
    }
  }
  ```

#### Get Profile

- **Auth**: Mandatory

- **Route**: `GET baseUrl/user/details/getprofile`
- **Description**: Fetches user profile details
- **Response**:

  ```json
  {
    "status": true,
    "data": {
      "number": "912529XXXX",
      "customerId": "658882e94b6448823f970046",
      "createdAt": "2023-12-24",
      "address": {
        "pincode": "140301",
        "locality": "haridwar"
      },
      "name": "Sumit"
    }
  }
  ```

#### Set Default Address

- **Auth**: Mandatory

- **Route**: `PUT baseurl/user/details/default/:addressId`
- **Description**: Set a default address for the user
- **Response**:

  ```json
  {
    "status": true,
    "data": {
      "address": {
        "pincode": "140301",
        "locality": "haridwar"
      },
      "_id": "6589da52767e68f38e63cbf6",
      "userObjectId": "658882e94b6448823f970046",
      "name": "Sumit",
      "customerNumber": "912529XXXX",
      "customerId": "00002",
      "joinedDate": "Dec 25, 2023, 12:43 AM",
      "createdAt": "2023-12-25T19:38:58.118Z",
      "updatedAt": "2023-12-25T19:46:46.713Z",
      "__v": 0
    }
  }
  ```

### Public Routes

#### All Products

- **Description**: Filter by all possible fields by passing key-value pairs in the query parameters

- **Method**: GET
- **Route**: `baseUrl/public/products`
- **Response**:

  ```json
  {
    "stats": true,
    "data": [
      {
        "_id": "658860f7d2f02c69ec72b399",
        "title": "Best delicious Item for sale",
        "description": "This is for you delicious item buy this fresh item for you",
        "unit": 250,
        "measureUnit": "gram",
        "MRP": 550,
        "price": 300,
        "discount": "46%",
        "productImg": [
          {
            "public_id": "products/dscag0gva4nwtjs3itwm",
            "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703436536/products/dscag0gva4nwtjs3itwm.png",
            "_id": "658860f7d2f02c69ec72b39a"
          }
        ],
        "category": "Chicken",
        "sub_category": "Chicken Leg",
        "Stock": 1,
        "setAs": "Combos",
        "createdAt": "2023-12-24T16:48:55.083Z",
        "updatedAt": "2023-12-24T16:48:55.083Z",
        "__v": 0
      }
      //...
    ]
  }
  ```

#### Best Deals

- **Method**: GET
- **Route**: `baseUrl/public/bestDeals`
- **Response**: Here, products that are under the best deals will be shown.

#### Best Seller

- **Method**: GET
- **Route**: `baseUrl/public/bestSeller`
- **Response**: Here, products that are considered Best Sellers will be displayed.

#### Combos

- **Method**: GET
- **Route**: `baseUrl/public/combos`
- **Response**: Here, products that are part of combos will be showcased.
