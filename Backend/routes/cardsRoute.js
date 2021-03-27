const express= require('express');

const myFunctions1= require('../controllers/cardsController');
const myFunctions2= require( '../middlewares/verifyAuth');

const router = express.Router();

// Cards Routes

router.post('/cards',myFunctions2.verifyToken,myFunctions1.AddCard);
router.get('/cards/:user_id',myFunctions2.verifyToken,myFunctions1.getAllCards);
router.post('/cards/:card_id/statements/:year/:month',myFunctions2.verifyToken,myFunctions1.AddStatement);
router.get('/cards/:card_id/statements/:year/:month',myFunctions2.verifyToken,myFunctions1.getAllStatements);
router.post('/cards/:card_id/pay',myFunctions2.verifyToken,myFunctions1.PayBill);

module.exports= router;
