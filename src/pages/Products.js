import React from 'react';
import BaseManagementComponent from '../components/BaseManagementComponent/BaseManagementComponent';
import {
  fieldsConfig,
  entityName,
  fetchItems,
  addItem,
  updateItem,
  deleteItem,
  headCells
} from '../components/BaseManagementComponent/ProductsConfig';

import ProductsAnalysis from './Analysis/Products'

function ProductsManagement({showAnalytics}) {
  return (
    <>
      {
        showAnalytics ?
        ( <ProductsAnalysis fetchProducts={fetchItems} /> ) : (
            <BaseManagementComponent
            fieldConfig={fieldsConfig}
            entityName={entityName}
            fetchItems={fetchItems}
            addItem={addItem}
            updateItem={updateItem}
            deleteItem={deleteItem}
            headCells={headCells}
          />
        )
      }
    </>
  );
}

export default ProductsManagement;
