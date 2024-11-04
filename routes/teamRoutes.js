const router = require('express').Router();
const { TeamController } = require('../controller');

router.get('', TeamController.index);
router.post('', TeamController.create);
router.get('/:id', TeamController.show);
router.put('/:id', TeamController.update);
router.delete('/:id', TeamController.delete);

module.exports = router;
