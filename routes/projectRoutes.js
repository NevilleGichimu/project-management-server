const router = require('express').Router();
const {ProjectController } = require('../controller');

router.get('', ProjectController.index);
router.post('', ProjectController.create);
router.get('/:id', ProjectController.show);
router.put('/:id', ProjectController.update);
router.delete('/:id', ProjectController.delete);

module.exports = router;
