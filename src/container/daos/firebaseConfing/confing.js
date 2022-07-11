import admin from 'firebase-admin'
import serviceAccount from '../../../../db/firebase-key.json' assert {type: "json"};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://proyectofinal-backend-coder.firebaseio.com'
});
const db = admin.firestore()

let productsRef= db.collection('products')
let cartsRef = db.collection('carts')
const FieldValue = admin.firestore.FieldValue
export {productsRef,cartsRef,FieldValue}