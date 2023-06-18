import { Router } from 'express';
import * as productCtrl from '../controllers/products.controllers';

export const router = Router();

router.get('/', productCtrl.getProducts);

router.put('/:id', productCtrl.updateProduct);

router.post('/', productCtrl.createProduct);

router.delete('/:id', productCtrl.deleteProduct);
