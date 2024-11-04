const router = require('express').Router();
const {TaskController } = require('../controller');

router.get('', TaskController.index);
router.post('', TaskController.create);
router.get('/:id', TaskController.show);
router.put('/:id', TaskController.update);
router.delete('/:id', TaskController.delete);

module.exports = router;