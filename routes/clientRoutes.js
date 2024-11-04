const router = require('express').Router();
const { ClientController } = require('../controller');

router.get('', ClientController.index);
router.post('', ClientController.create);
router.get('/:id', ClientController.show);
router.put('/:id', ClientController.update);
router.delete('/:id', ClientController.delete);

module.exports = router;