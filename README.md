### todo list

При всех запросах кроме `POST : /daily-rate` нужен Headers: Autorization :
Bearer {token}

## GET : /products?search={название}

## POST : /auth/signup

`{ "name": "Maks", "login":"MaksYary", "password": "MaksYary" }`

## POST : /auth/login

`{ "login": "MaksYary", "password": "MaksYary" }`

## POST : /auth/logout

`-`

## POST : /daily-rate

`{ "currentWeight": 105, "height": 179, "age": 26, "desiredWeight": 80, "bloodType": 2 }`

## POST : /daily-rate/{userId} USERID

`{ "currentWeight": 105, "height": 179, "age": 26, "desiredWeight": 80, "bloodType": 2 }`

## POST : /day

`{ "date": "2021-07-25", "productId": "5d51694802b2373622ff552f", "weight": 200 }`

## DELETE : /day

`{ "dayId": "5d51694802b2373622ff552f", "eatenProductId": "5feaa504ac348a44e08b76ac" }`

## POST : /day/info

`{ "date": "2021-07-25" }`

## GET /user

`-`
