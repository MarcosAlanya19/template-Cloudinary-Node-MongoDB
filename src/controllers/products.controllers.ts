import { Request, Response } from 'express';
import { Product } from '../models/product.model';
import { deleteImage, uploadImage } from '../configs/cloudinary.config';
import fs from 'fs-extra';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json({
      response: 'success',
      products,
    });
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json({ response: 'error', msg: error.message, type: 'server-error' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const { image } = req.files as any;

    console.log(image);

    const product = new Product({
      name,
      description,
      price,
    });

    if (image) {
      const result = await uploadImage(image.tempFilePath);
      product.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };

      await fs.unlink(image.tempFilePath);
    }

    await product.save();

    res.json({
      response: 'success',
      product,
    });
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json({ response: 'error', msg: error.message, type: 'server-error' });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({
        response: 'error',
        msg: 'El producto no existe',
        type: 'product-not-exist',
      });
      return;
    }

    res.json({
      response: 'success',
      product,
    });
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json({ response: 'error', msg: error.message, type: 'server-error' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const productUpdated = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({
      response: 'success',
      productUpdated,
    });
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json({ response: 'error', msg: error.message, type: 'server-error' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      res.status(404).json({
        response: 'error',
        msg: 'El producto no existe',
        type: 'product-not-found',
      });
      return;
    }

    await deleteImage(product?.image?.public_id || '');

    res.json({
      response: 'success',
      product,
    });
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json({ response: 'error', msg: error.message, type: 'server-error' });
  }
};
