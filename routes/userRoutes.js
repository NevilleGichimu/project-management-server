const router = require('express').Router();
const { UserController } = require('../controller');

router.get('', UserController.index);
router.post('', UserController.create);
router.get('/:id', UserController.show);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

module.exports = router;