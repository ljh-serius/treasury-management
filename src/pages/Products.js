import React from 'react';
import BaseManagementComponent from '../components/BaseManagementComponent/BaseManagementComponent';
import {
  productsFieldsConfig,
  productEntityName,
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  productsHeadCells
} from '../components/BaseManagementComponent/FieldsConfig';

import ProductsAnalysis from './Analysis/Products'

function ProductsManagement({showAnalytics}) {
  return (
    <>
      {
        showAnalytics ?
        ( <ProductsAnalysis fetchProducts={fetchProducts} /> ) : (
            <BaseManagementComponent
            fieldConfig={productsFieldsConfig}
            entityName={productEntityName}
            fetchItems={fetchProducts}
            addItem={addProduct}
            updateItem={updateProduct}
            deleteItem={deleteProduct}
            headCells={productsHeadCells}
          />
        )
      }
    </>
  );
}

export default ProductsManagement;
